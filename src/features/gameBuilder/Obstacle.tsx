import React, { ReactElement } from 'react';
import { Obstacle, Point } from '../../game/types';

const Obstacle = ({ obstacle: o }: ObstacleProps): ReactElement => {
    const last = o.points.length - 1;

    // if the obstacle is a loop
    if (o.points[0].x === o.points[last].x && o.points[0].y === o.points[last].y) {
        const points = o.points.map((p: Point): string => (p.x * 6.25) + ',' + (p.y * 6.25));

        return (
            <polygon
                className="grid-obstacle"
                points={points.join(' ')}
                stroke="black"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
            />
        )
    }

    // draw a line to all subsequent points
    const d: string[] = o.points.slice(1).map((p: Point): string => (p.x * 6.25) + ' ' + (p.y * 6.25));
    // move to the first point
    d.unshift('M ' + (o.points[0].x * 6.25) + ' ' + (o.points[0].y * 6.25) + ' L');

    return (
        <path
            className="grid-obstacle"
            d={d.join(' ')}
            stroke="black"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
        />
    )
}

interface ObstacleProps {
    obstacle: Obstacle;
}

export default Obstacle;
