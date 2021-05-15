import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../store';
import { Point, Robot, Target } from '../../game/types';

export interface GameBuilderState {
    selectedCell: Point|null,
    robots: Robot[],
    target: Target|null,
    solving: boolean;
}

export const gameBuilderSlice = createSlice({
    name: 'gameBuilder',
    initialState: {
        selectedCell: null,
        robots: [],
        target: null,
        solving: false,
    } as GameBuilderState,
    reducers: {
        selectCell: (state, action) => {
            state.selectedCell = action.payload;
        },

        setRobot: (state, action) => {
            state.robots = state.robots.filter((r: Robot): boolean => r.colour !== action.payload.colour);
            state.robots.push(action.payload);
        },

        setTarget: (state, action) => {
            state.target = action.payload;
        },

        setEmpty: (state, action) => {
            if (state.target?.point.x === action.payload.x && state.target?.point.y === action.payload.y) {
                state.target = null;
            }

            state.robots = state.robots.filter(
                (r: Robot): boolean => r.point.x !== action.payload.x && r.point.y !== action.payload.y
            );
        },

        startSolving: (state) => {
            state.solving = true;
        },

        finishSolving: (state) => {
            state.solving = false;
        }
    },
});

export const selectCurrentlySelectedCell = (state: State): Point|null => state.gameBuilder.selectedCell;
export const selectRobots = (state: State): Robot[] => state.gameBuilder.robots;
export const selectTarget = (state: State): Target|null => state.gameBuilder.target;
export const selectSolving = (state: State): boolean => state.gameBuilder.solving;

export const { finishSolving, selectCell, setEmpty, setRobot, setTarget, startSolving } = gameBuilderSlice.actions;

export default gameBuilderSlice.reducer;
