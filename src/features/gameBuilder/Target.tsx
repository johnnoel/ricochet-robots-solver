import React, { ReactElement } from 'react';
import { Target } from '../../game/types';

const Target = ({ target }: TargetProps): ReactElement|null => {
    if (target === null) {
        return null;
    }

    return (
        <g id="targets">
            <circle
                className={'grid-target grid-target-' + target.colour}
                cx={target.point.x * 6.25 + 3.125}
                cy={target.point.y * 6.25 + 3.125}
                r="2.25"
                fill="none"
                strokeWidth="2" vectorEffect="non-scaling-stroke"
            />
        </g>
    );
};

interface TargetProps {
    target: Target|null;
}

export default Target;
