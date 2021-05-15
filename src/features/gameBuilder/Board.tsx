import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClickGrid from './ClickGrid';
import {
    selectCell,
    selectCurrentlySelectedCell,
    selectObstacles,
    selectRobots, selectSolution,
    selectTarget
} from './gameBuilderSlice';
import Robots from './Robots';
import Obstacle from './Obstacle';
import { Obstacle as ObstacleType } from '../../game/types';
import Target from './Target';
import Solution from './Solution';

const Board = () => {
    const selectedCell = useSelector(selectCurrentlySelectedCell);
    const robots = useSelector(selectRobots);
    const target = useSelector(selectTarget);
    const obstacles = useSelector(selectObstacles);
    const solution = useSelector(selectSolution);
    const dispatch = useDispatch();

    return (
        <div className="board">
            <div className="board-container">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g id="grid">
                        <path className="grid-line" fill="none" stroke="gray" strokeWidth="1" vectorEffect="non-scaling-stroke" d="M 6.25 0 L 6.25 100 M 12.5 0 L 12.5 100 M 18.75 0 L 18.75 100 M 25 0 L 25 100 M 31.25 0 L 31.25 100 M 37.5 0 L 37.5 100 M 43.75 0 L 43.75 100 M 50 0 L 50 100 M 56.25 0 L 56.25 100 M 62.5 0 L 62.5 100 M 68.75 0 L 68.75 100 M 75 0 L 75 100 M 81.25 0 L 81.25 100 M 87.5 0 L 87.5 100 M 93.75 0 L 93.75 100"/>
                        <path className="grid-line" fill="none" stroke="gray" strokeWidth="1" vectorEffect="non-scaling-stroke" d="M 0 6.25 L 100 6.25 M 0 12.5 L 100 12.5 M 0 18.75 L 100 18.75 M 0 25 L 100 25 M 0 31.25 L 100 31.25  M 0 37.5 L 100 37.5 M 0 43.75 L 100 43.75 M 0 50 L 100 50 M 0 56.25 L 100 56.25 M 0 62.5 L 100 62.5 M 0 68.75 L 100 68.75 M 0 75 L 100 75 M 0 81.25 L 100 81.25 M 0 87.5 L 100 87.5 M 0 93.75 L 100 93.75"/>
                        <rect className="grid-container" width="100%" height="100%" stroke="gray" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke"/>
                    </g>
                    <g id="enclosed">
                        <rect className="grid-enclosed" width="6.25" height="6.25" x="43.75" y="43.75" fill="gray" />
                        <rect className="grid-enclosed" width="6.25" height="6.25" x="50" y="43.75" fill="gray" />
                        <rect className="grid-enclosed" width="6.25" height="6.25" x="50" y="50" fill="gray" />
                        <rect className="grid-enclosed" width="6.25" height="6.25" x="43.75" y="50" fill="gray" />
                    </g>
                    <g id="obstacles">
                        {obstacles.map((o: ObstacleType) => <Obstacle key={o.points.map(p => p.x + ',' + p.y).join()} obstacle={o} />)}
                    </g>

                    <Target target={target} />
                </svg>

                <Solution solution={solution} />
                <Robots robots={robots} />
            </div>

            <ClickGrid onSelect={(p) => dispatch(selectCell(p))} selected={selectedCell} />
        </div>
    );
}

export default Board;
