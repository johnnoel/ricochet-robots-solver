/// <reference lib="webworker" />

import gameJson from '../../game.json';
import Game from '../../game/Game';
import { Colours, Point } from '../../game/types';
import Solver from '../../game/Solver';
import Board from '../../game/Board';

self.addEventListener('message', () => {
    const board: Board = new Board();

    for (const o of gameJson.board) {
        const points: Point[] = [];
        for (const p of o) {
            points.push({ x: p[0], y: p[1] });
        }

        board.obstacles.push({ points });
    }

    const game: Game = new Game();

    game.board = board;
    game.target = { point: { x: 0, y: 0 }, colour: Colours.GREEN };
    game.robots = [
        { point: { x: 11, y: 15 }, colour: Colours.RED },
        { point: { x: 12, y: 15 }, colour: Colours.BLUE },
        { point: { x: 13, y: 15 }, colour: Colours.GREEN },
        { point: { x: 14, y: 15 }, colour: Colours.YELLOW },
        { point: { x: 15, y: 15 }, colour: Colours.SILVER },
    ];

    const solver: Solver = new Solver();
    const solution = solver.solve(game);

    self.postMessage(solution.solution);
});
