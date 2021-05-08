import Board from './Board';
import { Colours, Robot, Target } from './types';

export default class Game {
    target: Target;
    robots: Robot[];
    board: Board;

    constructor() {
        this.target = { point: { x: 0, y: 0 }, colour: Colours.RED };
        this.robots = [];
        this.board = new Board();
    }
}
