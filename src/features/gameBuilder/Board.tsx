import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClickGrid from './ClickGrid';
import { selectCell, selectCurrentlySelectedCell, selectRobots, selectTarget } from './gameBuilderSlice';
import Robots from './Robots';

const Board = () => {
    const selectedCell = useSelector(selectCurrentlySelectedCell);
    const robots = useSelector(selectRobots);
    const target = useSelector(selectTarget);
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
                        <path className="grid-obstacle" d="M 37.5 0 L 37.5 6.25" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 18.75 18.75 L 18.75 12.5 25 12.5" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 31.25 18.75 L 31.25 25 37.5 25" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 0 25 L 6.25 25" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 12.5 25 L 18.75 25 18.75 31.25" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 25 37.5 L 31.25 37.5 31.25 31.25" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 100 12.5 L 93.75 12.5" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 93.75 25 L 93.75 31.25 87.5 31.25" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 81.25 6.25 L 75 6.25 75 12.5" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 62.5 0 L 62.5 6.25" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 56.25 18.75 L 56.25 25 62.5 25" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 62.5 31.25 L 68.75 31.25 68.75 37.5" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 81.25 100 L 81.25 93.75" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 68.75 93.75 L 68.75 87.5 62.5 87.5" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 56.25 81.25 L 50 81.25 50 87.5" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 100 75 L 93.75 75" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 81.25 68.75 L 75 68.75 75 75" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 93.75 62.5 L 87.5 62.5 87.5 56.25" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 62.5 62.5 L 62.5 68.75 56.25 68.75" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 0 87.5 L 6.25 87.5" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 12.5 81.25 L 6.25 81.25 6.25 75" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 25 62.5 L 25 56.25 18.75 56.25" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 25 93.75 L 31.25 93.75 31.25 87.5" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 37.5 75 L 37.5 68.75 43.75 68.75" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <path className="grid-obstacle" d="M 43.75 100 L 43.75 93.75" stroke="black" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                        <polygon className="grid-obstacle" points="43.75,43.75 56.25,43.75 56.25,56.25 43.75,56.25 " stroke="black" fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    </g>

                    {(target !== null) ? <g id="targets">
                        <circle
                            className={'grid-target grid-target-' + target.colour}
                            cx={target.point.x * 6.25 + 3.125}
                            cy={target.point.y * 6.25 + 3.125}
                            r="2.25"
                            fill="none"
                            strokeWidth="2" vectorEffect="non-scaling-stroke"
                        />
                    </g> : null}
                </svg>

                <Robots robots={robots} />
            </div>

            <ClickGrid onSelect={(p) => dispatch(selectCell(p))} selected={selectedCell} />
        </div>
    );
}

export default Board;
