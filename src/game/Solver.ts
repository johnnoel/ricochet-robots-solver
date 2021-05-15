// @ts-ignore
import FlatQueue from 'flatqueue';
import now from 'performance-now';
import Game from './Game';
import { Colours, Obstacle, Point, Robot, Solution, Target } from './types';
import State from './State';
import Movement from './Movement';

export default class Solver {
    private precalculatedMoves: PrecalculatedMoves = {};
    private precalculatedDistances: MinDistances = {};
    private statesVisited: number = 0;

    /**
     * Solve the provided game and return a solution
     */
    solve(game: Game): Solution {
        const sol: Solution = {
            precalculationDuration: null,
            searchDuration: null,
            statesVisited: 0,
            moves: [],
            solution: null,
        };

        const precalcStart = now();
        this.precalculatedMoves = this.precalculateMoves(game.board.obstacles);
        this.precalculatedDistances = this.precalculateMinimumDistances(game.target);
        sol.precalculationDuration = (now() - precalcStart);

        const initialState = new State(null, game.robots, 0, null);

        const searchStart = now();
        const finalState = this.search(initialState, game.target);
        sol.statesVisited = this.statesVisited;
        sol.searchDuration = (now() - searchStart);

        if (finalState !== null) {
            sol.moves = finalState.getSolution();
            sol.solution = finalState.getPrintableSolution();
        }

        return sol;
    }

    /**
     * From the initial state, generate moves until a solution is found (or all moves are exhausted) then return the
     * winning state
     */
    private search(initialState: State, target: Target): State|null {
        this.statesVisited = 0;
        const seenStates: SeenStates = {};

        // a priority queue of all the possible next states to visit
        const q = new FlatQueue();
        q.push(initialState, 0);

        while (q.length > 0) {
            this.statesVisited++;
            const newState: State = q.pop();
            const nextStates: State[] = this.getNextStates(newState, target.colour);

            // go through all the possible next states and vet them for searching
            for (const nextState of nextStates) {
                const key = nextState.getKey(target.colour);

                // if seen this state before, continue
                if (key in seenStates) {
                    continue;
                }

                // done!
                if (nextState.isSolution(target)) {
                    return nextState;
                }

                // heuristic for how "good" a state is and whether we should look at it next
                // using the distance of the closest robot to the target
                const bestimate = Math.min(...nextState.robotPositions.map((r: Robot): number => {
                    return this.precalculatedDistances[r.point.x][r.point.y];
                }));

                const priority = ((nextState.depth + bestimate) * 10);
                q.push(nextState, priority);
                seenStates[key] = nextState.depth;
            }
        }

        return null;
    }

    /**
     * From the provided state, get all the possible next states (i.e. possible robot moves)
     */
    private getNextStates(state: State, targetColour: Colours): State[] {
        const nextStates: State[] = [];

        for (const robotPosition of state.robotPositions) {
            const moves: Point[] = this.getValidMoves(robotPosition.point, state.robotPositions);

            for (const move of moves) {
                // make sure the target robot moves are considered first
                if (robotPosition.colour === targetColour) {
                    nextStates.unshift(state.nextState(robotPosition.colour, move));
                } else {
                    nextStates.push(state.nextState(robotPosition.colour, move));
                }
            }
        }

        return nextStates;
    }

    /**
     * Using the precalculated move set, get the valid moves for the provided point and current robot positions
     */
    private getValidMoves(point: Point, robots: Robot[]): Point[] {
        const moves: Point[] = [];
        const precalculatedMoves = this.precalculatedMoves[point.x][point.y];

        // the precalcuated moves assume no robots so need to check if any of the current robot positions intersect
        for (const precalculatedMove of precalculatedMoves) {
            const xDelta: number = precalculatedMove.x - point.x;
            const yDelta: number = precalculatedMove.y - point.y;
            let moveX = precalculatedMove.x;
            let moveY = precalculatedMove.y;

            for (const robot of robots) {
                if (robot.point.x === point.x && robot.point.y === point.y) {
                    continue;
                }

                // moving horizontally
                if (xDelta !== 0) {
                    if (robot.point.y !== point.y) {
                        continue;
                    }

                    if (robot.point.x >= Math.min(moveX, point.x) && robot.point.x <= Math.max(moveX, point.x)) {
                        moveX = robot.point.x + ((xDelta > 0) ? -1 : 1);
                    }
                } else {
                    if (robot.point.x !== point.x) {
                        continue;
                    }

                    if (robot.point.y >= Math.min(moveY, point.y) && robot.point.y <= Math.max(moveY, point.y)) {
                        moveY = robot.point.y + ((yDelta > 0) ? -1 : 1);
                    }
                }
            }

            moves.push({ x: moveX, y: moveY });
        }

        return moves;
    }

    /**
     * For every board square, calculate all the possible moves as if there were no robots
     */
    private precalculateMoves(obstacles: Obstacle[]): PrecalculatedMoves {
        const moves: PrecalculatedMoves = {};

        for (let x = 0; x < 16; x++) {
            if (!(x in moves)) {
                moves[x] = {};
            }

            for (let y = 0; y < 16; y++) {
                moves[x][y] = Movement.getAvailableMoves({ x, y }, obstacles);
            }
        }

        return moves;
    }

    /**
     * For every board square, calculate the "minimum distance" to the target position
     *
     * Used as a heuristic for A* search, the distance is the number of moves it would take if the robots could stop
     * anywhere i.e. move like rooks in chess
     *
     * Note: you should have already called precalculateMoves before calling this method
     */
    private precalculateMinimumDistances(target: Target): MinDistances {
        const minDistances: MinDistances = {
            [target.point.x]: {
                [target.point.y]: 0, // if on the target then distance is 0
            },
        };

        let positions: Point[] = [ target.point ];
        let depth = 1;

        // move outward from the target and for every square along that move that hasn't already been visited, add to
        // the queue to visit and increase the depth
        while (positions.length > 0) {
            const newPositions: Point[] = [];

            for (const position of positions) {
                const moves = this.precalculatedMoves[position.x][position.y];

                for (const move of moves) {
                    const x1 = position.x;
                    const y1 = position.y;
                    const x2 = move.x;
                    const y2 = move.y;

                    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                        if (x in minDistances && y1 in minDistances[x]) {
                            continue;
                        }

                        if (!(x in minDistances)) {
                            minDistances[x] = {};
                        }

                        minDistances[x][y1] = depth;
                        newPositions.push({ x, y: y1 });
                    }

                    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                        if (x1 in minDistances && y in minDistances[x1]) {
                            continue;
                        }

                        if (!(x1 in minDistances)) {
                            minDistances[x1] = {};
                        }

                        minDistances[x1][y] = depth;
                        newPositions.push({ x: x1, y });
                    }
                }
            }

            depth++;
            positions = newPositions;
        }

        return minDistances;
    }
}

interface SeenStates {
    [key: string]: number;
}

interface MinDistances {
    [x: number]: {
        [y: number]: number;
    };
}

interface PrecalculatedMoves {
    [x: number]: {
        [y: number]: Point[];
    };
}
