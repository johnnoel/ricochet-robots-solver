import { createSlice } from '@reduxjs/toolkit';
import { State } from '../../store';
import { Colours, Obstacle, Point, Robot, Solution, Target } from '../../game/types';

export interface GameBuilderState {
    obstacles: Obstacle[];
    selectedCell: Point|null;
    robots: Robot[];
    target: Target|null;
    solution: Solution|null;
    solving: boolean;
}

export const gameBuilderSlice = createSlice({
    name: 'gameBuilder',
    initialState: {
        obstacles: [
            // straight
            { points: [ { x: 6, y: 0 }, { x: 6, y: 1 } ] },
            { points: [ { x: 10, y: 0 }, { x: 10, y: 1 } ] },
            { points: [ { x: 15, y: 2 }, { x: 16, y: 2 } ] },
            { points: [ { x: 0, y: 4 }, { x: 1, y: 4 } ] },
            { points: [ { x: 15, y: 12 }, { x: 16, y: 12 } ] },
            { points: [ { x: 0, y: 14 }, { x: 1, y: 14 } ] },
            { points: [ { x: 7, y: 15 }, { x: 7, y: 16 } ] },
            { points: [ { x: 13, y: 15 }, { x: 13, y: 16 } ] },
            // l shaped
            { points: [ { x: 12, y: 2 }, { x: 12, y: 1 }, { x: 13, y: 1 } ] },
            { points: [ { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 2 } ] },
            { points: [ { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 6, y: 4 } ] },
            { points: [ { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 10, y: 4 } ] },
            { points: [ { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 3, y: 5 } ] },
            { points: [ { x: 15, y: 4 }, { x: 15, y: 5 }, { x: 14, y: 5 } ] },
            { points: [ { x: 5, y: 5 }, { x: 5, y: 6 }, { x: 4, y: 6 } ] },
            { points: [ { x: 10, y: 5 }, { x: 11, y: 5 }, { x: 11, y: 6 } ] },
            { points: [ { x: 3, y: 9 }, { x: 4, y: 9 }, { x: 4, y: 10 } ] },
            { points: [ { x: 14, y: 9 }, { x: 14, y: 10 }, { x: 15, y: 10 } ] },
            { points: [ { x: 9, y: 11 }, { x: 10, y: 11 }, { x: 10, y: 10 } ] },
            { points: [ { x: 6, y: 12 }, { x: 6, y: 11 }, { x: 7, y: 11 } ] },
            { points: [ { x: 12, y: 12 }, { x: 12, y: 11 }, { x: 13, y: 11 } ] },
            { points: [ { x: 1, y: 12 }, { x: 1, y: 13 }, { x: 2, y: 13 } ] },
            { points: [ { x: 8, y: 14 }, { x: 8, y: 13 }, { x: 9, y: 13 } ] },
            { points: [ { x: 4, y: 15 }, { x: 5, y: 15 }, { x: 5, y: 14 } ] },
            { points: [ { x: 10, y: 14 }, { x: 11, y: 14 }, { x: 11, y: 15 } ] },
            // central reservation
            { points: [ { x: 7, y: 7 }, { x: 9, y: 7 }, { x: 9, y: 9 }, { x: 7, y: 9 }, { x: 7, y: 7 } ] },
        ],
        selectedCell: null,
        robots: [
            { colour: Colours.RED, point: { x: 6, y: 6 } },
            { colour: Colours.BLUE, point: { x: 6, y: 9 } },
            { colour: Colours.GREEN, point: { x: 4, y: 2 } },
            { colour: Colours.YELLOW, point: { x: 12, y: 6 } },
            { colour: Colours.SILVER, point: { x: 13, y: 15 } },
        ],
        target: { colour: Colours.BLUE, point: { x: 10, y: 14 } },
        solution: null,
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

        finishSolving: (state, action) => {
            state.solving = false;
            state.solution = action.payload;
        }
    },
});

export const selectObstacles = (state: State): Obstacle[] => state.gameBuilder.obstacles;
export const selectCurrentlySelectedCell = (state: State): Point|null => state.gameBuilder.selectedCell;
export const selectRobots = (state: State): Robot[] => state.gameBuilder.robots;
export const selectTarget = (state: State): Target|null => state.gameBuilder.target;
export const selectSolution = (state: State): Solution|null => state.gameBuilder.solution;
export const selectSolving = (state: State): boolean => state.gameBuilder.solving;

export const { finishSolving, selectCell, setEmpty, setRobot, setTarget, startSolving } = gameBuilderSlice.actions;

export default gameBuilderSlice.reducer;
