import React, { ReactElement } from 'react';
import isEqual from 'lodash/isEqual';
import { Move, Point, Solution } from '../../game/types';

const Solution = ({ solution }: SolutionProps): ReactElement|null => {
    if (solution === null) {
        return null;
    }

    const paths = createPaths(solution.moves);

    return <svg width="100%" height="100%" viewBox="0 0 100 100" className="traces">
        {paths.map((path: Path, idx: number): JSX.Element => {
            // move to the first point, then draw a line to every other point
            const d = path.map((point: Point, idx: number): string => {
                const action = (idx === 0) ? 'M' : 'L';
                return [ action, centre(point.x), centre(point.y) ].join(' ');
            });

            return <path
                key={idx}
                className="trace"
                d={d.join(' ')}
                stroke="black"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
            />
        })}
    </svg>;
}


/**
 * Create a set of paths representing the moves taken
 *
 * So with a set of moves: 0, 0 -> 0, 1; 5, 5 -> 6, 5; 0, 1 -> 1, 1, this will create two paths: 0, 0 -> 0, 1 -> 1, 1
 * and 5, 5 -> 6, 5
 */
const createPaths = (moves: Move[]): Path[] => {
    const paths: Path[] = [],
        unusedMoves = moves.slice();

    for (let i = 0; i < unusedMoves.length; i++) {
        const moveA: Move = unusedMoves[i];
        const path: Path = [ moveA.start, moveA.end ];

        while (true) {
            const segmentCount = path.length;
            let lastPoint = path[path.length - 1];

            for (let j = 0; j < unusedMoves.length; j++) {
                const moveB: Move = unusedMoves[j];

                if (isEqual(moveA, moveB)) {
                    continue;
                }

                // if the first point of the move is the same as the last point on the path
                if (lastPoint.x === moveB.start.x && lastPoint.y === moveB.start.y) {
                    path.push(moveB.end);
                    lastPoint = moveB.end;
                    unusedMoves.splice(j, 1);
                    j--;
                }
            }

            // if after a full iteration of the moves we haven't found another path segment, stop
            if (segmentCount === path.length) {
                break;
            }
        }

        paths.push(path);
    }

    return paths;
}

const centre = (xy: number): number => (xy * 6.25) + 3.125;

interface SolutionProps {
    solution: Solution|null;
}

type Path = Point[];

export default Solution;
