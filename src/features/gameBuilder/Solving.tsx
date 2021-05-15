import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { finishSolving } from './gameBuilderSlice';

const Solving = (): null => {
    const dispatch = useDispatch();

    useEffect(() => {
        const worker = new Worker(new URL('./worker.ts', import.meta.url));

        const onMessage = (e: MessageEvent<any>) => {
            console.log(e);
            dispatch(finishSolving());
        };

        console.log('post message');
        worker.postMessage('hello there, this would be game state');
        worker.addEventListener('message', onMessage);

        return () => {
            console.log('cleaning up');
            worker.removeEventListener('message', onMessage);
        }
    });

    return null;
}

export default Solving;
