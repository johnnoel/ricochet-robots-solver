import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from './features/gameBuilder/Board';
import { Colours, Point, Robot, Target } from './game/types';
import { selectCurrentlySelectedCell } from './features/gameBuilder/gameBuilderSlice';
import CellWidget from './features/gameBuilder/CellWidget';

const App = () => (
    <div>
        <h1>Ricochet Robots Solver</h1>
        <div className="row">
            <div className="col-9">
                <Board />
            </div>
            <div className="col-3">
                <CellWidget />
            </div>
        </div>
    </div>
)

/*

                <CellWidget
                    onChangeType={(type: CellTypes) => {
                        console.log(type);
                    }}
                    onChangeColour={() => {}}
                    point={state.selectedCell}
                    type={getSelectedType(state.selectedCell, state.robots, state.target)}
                    colour={getSelectedColour(state.selectedCell, state.robots, state.target)}
                />
const getSelectedType = (point: Point|null, robots: Robot[], target: Target|null): CellTypes => {
    if (point === null) {
        return CellTypes.EMPTY;
    }

    if (target !== null && target.point.x === point.x && target.point.y === point.y) {
        return CellTypes.TARGET;
    }

    for (const robot of robots) {
        if (robot.point.x === point.x && robot.point.y === point.y) {
            return CellTypes.ROBOT;
        }
    }

    return CellTypes.EMPTY;
}

const getSelectedColour = (point: Point|null, robots: Robot[], target: Target|null): Colours => {
    if (point === null) {
        return Colours.SILVER;
    }

    if (target !== null && target.point.x === point.x && target.point.y === point.y) {
        return target.colour;
    }

    for (const robot of robots) {
        if (robot.point.x === point.x && robot.point.y === point.y) {
            return robot.colour;
        }
    }

    return Colours.SILVER;
}*/

export default App;
