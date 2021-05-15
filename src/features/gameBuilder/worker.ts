/// <reference lib="webworker" />

import Game from '../../game/Game';
import { Obstacle, Robot, Target } from '../../game/types';
import Solver from '../../game/Solver';
import Board from '../../game/Board';

self.addEventListener('message', (e) => {
    const messageData = e.data as MessageData;

    const board: Board = new Board();
    board.obstacles = messageData.obstacles;

    const game: Game = new Game();
    game.board = board;
    game.target = messageData.target;
    game.robots = messageData.robots;

    const solver: Solver = new Solver();
    const solution = solver.solve(game);

    self.postMessage(solution.solution);
});

export interface MessageData {
    obstacles: Obstacle[];
    robots: Robot[];
    target: Target;
}
