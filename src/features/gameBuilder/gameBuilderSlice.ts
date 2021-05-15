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
            { points: [ { x: 8, y: 0 }, { x: 8, y: 1 } ] },
            { points: [ { x: 8, y: 15 }, { x: 8, y: 16 } ] },
            { points: [ { x: 0, y: 8 }, { x: 1, y: 8 } ] },
            { points: [ { x: 15, y: 8 }, { x: 16, y: 8 } ] },
            { points: [ { x: 4, y: 4 }, { x: 4, y: 3 }, { x: 5, y: 3 } ] },
            { points: [ { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 7, y: 4 } ] },
            { points: [ { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 5 } ] },
            { points: [ { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 7, y: 6 } ] },
            { points: [ { x: 9, y: 9 }, { x: 11, y: 9 }, { x: 11, y: 11 }, { x: 9, y: 11 }, { x: 9, y: 9 } ] },
        ],
        selectedCell: null,
        robots: [
            { colour: Colours.RED, point: { x: 0, y: 0 } },
            { colour: Colours.BLUE, point: { x: 0, y: 5 } },
            { colour: Colours.GREEN, point: { x: 7, y: 0 } },
            { colour: Colours.YELLOW, point: { x: 6, y: 0 } },
            { colour: Colours.SILVER, point: { x: 5, y: 0 } },
        ],
        target: { colour: Colours.RED, point: { x: 4, y: 3 } },
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
