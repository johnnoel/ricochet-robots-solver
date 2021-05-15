import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import gameBuilderReducer, { GameBuilderState } from './features/gameBuilder/gameBuilderSlice';

export interface State {
    gameBuilder: GameBuilderState,
}

const logger = createLogger({
    collapsed: true,
});

const store = configureStore({
    reducer: {
        gameBuilder: gameBuilderReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;

export default store;
