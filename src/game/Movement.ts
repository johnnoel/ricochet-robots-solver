import { Obstacle, Point } from './types';

export default class Movement {
    /**
     * Get all of the available moves from the provided point
     */
    static getAvailableMoves(point: Point, obstacles: Obstacle[]): Point[] {
        // would be interesting to see if this is necessary and whether the extra iterations hinder rather than help
        const relevantObstacles: Obstacle[] = Movement.getRelevantObstacles(point, obstacles);

        // this would be where you would filter out invalid moves e.g. bounce backs

        return [
            Movement.getAvailableMove(point, Axes.Y, Bearings.BEHIND, relevantObstacles), // N
            Movement.getAvailableMove(point, Axes.X, Bearings.AHEAD, relevantObstacles), // E
            Movement.getAvailableMove(point, Axes.Y, Bearings.AHEAD, relevantObstacles), // S
            Movement.getAvailableMove(point, Axes.X, Bearings.BEHIND, relevantObstacles), // W
        ].filter((p: Point): boolean => { // filter out any moves that are on the provided point (i.e. not moves at all)
            return !(p.x === point.x && p.y === point.y);
        });
    }

    /**
     * Get all obstacles on the same axes as the provided point, so any obstacles relevant for moving from that point
     */
    private static getRelevantObstacles(point: Point, obstacles: Obstacle[]): Obstacle[] {
        // obstacle coordinate space
        const f: Point = { x: point.x + 0.5, y: point.y + 0.5 };

        // could simulate robots here by treating them as four sided obstacles

        const relevant: Obstacle[] = [];

        for (const obstacle of obstacles) {
            for (let i = 1; i < obstacle.points.length; i++) {
                const p1 = obstacle.points[i - 1];
                const p2 = obstacle.points[i];

                if (
                    (f.x >= Math.min(p1.x, p2.x) && f.x <= Math.max(p1.x, p2.x)) ||
                    (f.y >= Math.min(p1.y, p2.y) && f.y <= Math.max(p1.y, p2.y))
                ) {
                    relevant.push({ points: [ p1, p2 ] });
                }
            }
        }

        return relevant;
    }

    /**
     * Get the valid for the provided point on the supplied axis on the given bearing
     *
     * To get the eastern (right) move of point, use Axes.X and Bearing.AHEAD, whereas for the western (left) move, use
     * Axes.X and Bearing.BEHIND
     *
     * N.B. This could do with being simplified if possible, it's bizarrely structured but currently "working" so I
     * don't mess with it
     */
    private static getAvailableMove(point: Point, axis: Axes, bearing: Bearings, obstacles: Obstacle[]): Point {
        // obstacle coordinate space
        const f: Point = { x: point.x + 0.5, y: point.y + 0.5 };
        const filteredObstacles: Obstacle[] = [];

        for (const obstacle of obstacles) {
            for (let i = 1; i < obstacle.points.length; i++) {
                const p1 = obstacle.points[i - 1];
                const p2 = obstacle.points[i];

                const xDiff = (p1.x - f.x) * bearing;
                const yDiff = (p1.y - f.y) * bearing;
                const xMin = Math.min(p1.x, p2.x);
                const xMax = Math.max(p1.x, p2.x);
                const yMin = Math.min(p1.y, p2.y);
                const yMax = Math.max(p1.y, p2.y);

                if (axis === Axes.X && xDiff > 0 && f.y >= yMin && f.y <= yMax) {
                    filteredObstacles.push({ points: [ p1, p2 ] });
                } else if (axis === Axes.Y && yDiff > 0 && f.x >= xMin && f.x <= xMax) {
                    filteredObstacles.push({ points: [ p1, p2 ] });
                }
            }
        }

        // no relevant obstacles, board edge
        if (filteredObstacles.length === 0) {
            const p = (bearing === Bearings.AHEAD) ? 15 : 0;

            return (axis === Axes.X) ? { x: p, y: point.y } : { x: point.x, y: p };
        }

        // sort obstacles by their relevant axis and bearing, putting the closest first
        filteredObstacles.sort((a: Obstacle, b: Obstacle): number => {
            // get either the x or y coordinate depending on the axis
            const ap = a.points[0][axis];
            const bp = b.points[0][axis];

            if (ap === bp) {
                return 0;
            }

            return bearing * ((ap > bp) ? 1 : -1);
        });

        // need to shift the returned point back into the non-obstacle (weird) coordinate space
        const offset: number = (bearing === Bearings.AHEAD) ? -1 : 0;
        const closestObstacle = filteredObstacles[0];

        return (axis === Axes.X) ?
            { x: closestObstacle.points[0].x + offset, y: point.y } :
            { x: point.x, y: closestObstacle.points[0].y + offset }
        ;
    }
}

enum Axes {
    X = 'x',
    Y = 'y',
}

enum Bearings {
    AHEAD = 1,
    BEHIND = -1,
}
