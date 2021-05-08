import { Colours, Point, Robot, Target } from './types';

/**
 * Represents a game state during solving
 */
export default class State {
    previous: State|null;
    robotPositions: Robot[];
    depth: number;
    lastMovedRobotColour: Colours|null;

    constructor(previous: State|null, robotPositions: Robot[], depth: number, lastMovedRobotColour: Colours|null) {
        this.previous = previous;
        this.robotPositions = robotPositions;
        this.depth = depth;
        this.lastMovedRobotColour = lastMovedRobotColour;

        // ensure consistent ordering (necessary for stable key generation)
        this.robotPositions.sort((a: Robot, b: Robot): number => {
            if (a.point.x === b.point.x && a.point.y === b.point.y) {
                return 0;
            }

            return (a.point.x > b.point.x) ? 1 : -1;
        });
    }

    /**
     * Is this state a solution for the given target?
     */
    isSolution(target: Target): boolean {
        for (let i = 0; i < this.robotPositions.length; i++) {
            if (
                this.robotPositions[i].point.x === target.point.x &&
                this.robotPositions[i].point.y === target.point.y
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Generate a new state as if we are moving the robot of the provided colour to specified point
     */
    nextState(colour: Colours, point: Point): State {
        const newPositions: Robot[] = this.robotPositions.slice();

        for (let i = 0; i < newPositions.length; i++) {
            if (newPositions[i].colour !== colour) {
                continue;
            }

            newPositions[i] = { point, colour };
        }

        return new State(this, newPositions, this.depth + 1, colour);
    }

    /**
     * Get the unique key for this state, used for checking whether a state has been seen before
     *
     * The key treats all non-target colour robot positions as the same: so if the target colour was blue, if yellow was
     * at 1,1 and red was at 2,2 - it doesn't matter if those positions are switched, the state is considered equal
     */
    getKey(targetColour: Colours): string {
        const parts: string[] = [];

        for (const robotPosition of this.robotPositions) {
            if (robotPosition.colour === targetColour) {
                parts.unshift(targetColour + robotPosition.point.x + ',' + robotPosition.point.y);
            } else {
                parts.push('X' + robotPosition.point.x + ',' + robotPosition.point.y);
            }
        }

        return parts.join();
    }

    /**
     * Get the sequence of states leading up to and including this one
     */
    private getSolutionStates(): State[] {
        const states: State[] = [ this ];
        let parentState = this.previous;

        while (parentState !== null) {
            states.push(parentState);
            parentState = parentState.previous;
        }

        return states.reverse();
    }
}
