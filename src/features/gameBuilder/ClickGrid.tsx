import React from 'react';
import classNames from 'classnames';
import { Point } from '../../game/types';

const ClickGrid = ({ onSelect, selected }: ClickGridProps) => {
    const cells = [];

    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            const classname = classNames({
                'clickgrid-cell': true,
                'clickgrid-selected': (selected !== null && selected.x === x && selected.y === y)
            });

            cells.push(<div className={classname} key={x+','+y} onClick={() => onSelect({ x, y })} />);
        }
    }

    return <div className="board-container">
        {cells}
    </div>;
};

interface ClickGridProps {
    onSelect(point: Point): void;
    selected: Point|null;
}

export default ClickGrid;
