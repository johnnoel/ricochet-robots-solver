
export enum Colours {
    RED = 'red',
    YELLOW = 'yellow',
    GREEN = 'green',
    BLUE = 'blue',
    SILVER = 'silver',
    MULTI = 'multi',
}

export enum Directions {
    N = 'N',
    S = 'S',
    E = 'E',
    W = 'W',
}

export interface Point {
    x: number;
    y: number;
}

export interface Robot {
    point: Point;
    colour: Colours;
}

export interface Target {
    point: Point;
    colour: Colours;
}

export interface Move {
    start: Point;
    end: Point;
}

// obstacles don't use quite the same coordinate space as everything else, they're weird
export interface Obstacle {
    points: Point[];
}

export interface Solution {
    precalculationDuration: number|null;
    searchDuration: number|null;
    statesVisited: number;
    moves: Move[];
    solution: string|null;
}
