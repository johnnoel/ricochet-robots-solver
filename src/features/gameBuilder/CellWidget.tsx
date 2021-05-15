import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Colours, Point, Robot, Target } from '../../game/types';
import { selectCurrentlySelectedCell, selectRobots, selectTarget, setEmpty, setRobot, setTarget } from './gameBuilderSlice';

const CellWidget = () => {
    const dispatch = useDispatch();
    const selectedCell = useSelector(selectCurrentlySelectedCell);
    const robots = useSelector(selectRobots);
    const target = useSelector(selectTarget);

    if (selectedCell === null) {
        return null;
    }

    const selected = whatsInThisCell(selectedCell, robots, target);
    const canSolve = (target !== null && robots.length === 5);

    return <div className="cellwidget">
        <h5>{selectedCell.x}, {selectedCell.y}</h5>
        <div>
            <select value={selected} onChange={(e) => dispatch(getDispatchable(selectedCell, parseInt(e.target.value, 10) as CellTypes))}>
                <option value={CellTypes.EMPTY}>(Empty)</option>
                <optgroup label="Robots">
                    <option value={CellTypes.RED_ROBOT}>Red robot</option>
                    <option value={CellTypes.BLUE_ROBOT}>Blue robot</option>
                    <option value={CellTypes.GREEN_ROBOT}>Green robot</option>
                    <option value={CellTypes.YELLOW_ROBOT}>Yellow robot</option>
                    <option value={CellTypes.SILVER_ROBOT}>Silver robot</option>
                </optgroup>
                <optgroup label="Targets">
                    <option value={CellTypes.RED_TARGET}>Red target</option>
                    <option value={CellTypes.BLUE_TARGET}>Blue target</option>
                    <option value={CellTypes.GREEN_TARGET}>Green target</option>
                    <option value={CellTypes.YELLOW_TARGET}>Yellow target</option>
                    <option value={CellTypes.MULTI_TARGET}>Multicoloured target</option>
                </optgroup>
            </select>
        </div>

        <button type="button" className="btn btn-lg btn-primary" disabled={!canSolve}>Solve</button>
    </div>;
}

const whatsInThisCell = (point: Point, robots: Robot[], target: Target|null): CellTypes => {
    for (const robot of robots) {
        if (robot.point.x !== point.x || robot.point.y !== point.y) {
            continue;
        }

        switch (robot.colour) {
            case Colours.RED:
                return CellTypes.RED_ROBOT;
            case Colours.BLUE:
                return CellTypes.BLUE_ROBOT;
            case Colours.GREEN:
                return CellTypes.GREEN_ROBOT;
            case Colours.YELLOW:
                return CellTypes.YELLOW_ROBOT;
            case Colours.SILVER:
                return CellTypes.SILVER_ROBOT;
        }
    }

    if (target !== null && target.point.x === point.x && target.point.y === point.y) {
        switch (target.colour) {
            case Colours.RED:
                return CellTypes.RED_TARGET;
            case Colours.BLUE:
                return CellTypes.BLUE_TARGET;
            case Colours.GREEN:
                return CellTypes.GREEN_TARGET;
            case Colours.YELLOW:
                return CellTypes.YELLOW_TARGET;
            case Colours.MULTI:
                return CellTypes.MULTI_TARGET;
        }
    }

    return CellTypes.EMPTY;
}

const getDispatchable = (point: Point, selected: CellTypes) => {
    switch (selected) {
        case CellTypes.RED_ROBOT:
            return setRobot({ point, colour: Colours.RED } as Robot);
        case CellTypes.BLUE_ROBOT:
            return setRobot({ point, colour: Colours.BLUE } as Robot);
        case CellTypes.GREEN_ROBOT:
            return setRobot({ point, colour: Colours.GREEN } as Robot);
        case CellTypes.YELLOW_ROBOT:
            return setRobot({ point, colour: Colours.YELLOW } as Robot);
        case CellTypes.SILVER_ROBOT:
            return setRobot({ point, colour: Colours.SILVER } as Robot);
        case CellTypes.RED_TARGET:
            return setTarget({ point, colour: Colours.RED } as Target);
        case CellTypes.BLUE_TARGET:
            return setTarget({ point, colour: Colours.BLUE } as Target);
        case CellTypes.GREEN_TARGET:
            return setTarget({ point, colour: Colours.GREEN } as Target);
        case CellTypes.YELLOW_TARGET:
            return setTarget({ point, colour: Colours.YELLOW } as Target);
        case CellTypes.MULTI_TARGET:
            return setTarget({ point, colour: Colours.MULTI } as Target);
        default:
            return setEmpty(point);
    }
}

enum CellTypes {
    EMPTY,
    RED_ROBOT,
    BLUE_ROBOT,
    GREEN_ROBOT,
    YELLOW_ROBOT,
    SILVER_ROBOT,
    RED_TARGET,
    BLUE_TARGET,
    GREEN_TARGET,
    YELLOW_TARGET,
    MULTI_TARGET,
}

export default CellWidget;
