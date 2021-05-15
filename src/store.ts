import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import gameBuilderReducer, { GameBuilderState } from './features/gameBuilder/gameBuilderSlice';

export interface State {
    gameBuilder: GameBuilderState,
}

const logger = createLogger({
    collapsed: true,
});

export default configureStore({
    reducer: {
        gameBuilder: gameBuilderReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
