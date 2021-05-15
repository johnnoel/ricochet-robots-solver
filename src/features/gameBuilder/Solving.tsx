import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { finishSolving } from './gameBuilderSlice';
import { Obstacle, Robot, Solution, Target } from '../../game/types';
import { MessageData } from './worker';

const Solving = ({ obstacles, robots, target }: SolvingProps): null => {
    const dispatch = useDispatch();

    useEffect(() => {
        const worker = new Worker(new URL('./worker.ts', import.meta.url));

        const onMessage = (e: MessageEvent<any>) => {
            const solution = e.data as Solution;
            dispatch(finishSolving(solution));
        };

        worker.postMessage({ obstacles, robots, target } as MessageData);
        worker.addEventListener('message', onMessage);

        return () => {
            worker.removeEventListener('message', onMessage);
        }
    });

    return null;
}

interface SolvingProps {
    obstacles: Obstacle[];
    robots: Robot[];
    target: Target;
}

export default Solving;
