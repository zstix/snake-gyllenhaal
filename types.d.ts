export interface Game {
  id: string;
  timeout: number;
  ruleset: {
    name: string;
    version: string;
  }
}

export interface Position {
  x: number;
  y: number;
}

export type Direction = "up" | "down" | "left" | "right";

export interface Battlesnake {
  id: string;
  name: string;
  health: number;
  body: Position[],
  latnecy: string;
  head: Position;
  length: number;
  shout?: string;
  squad?: string;
}

export interface Board {
  height: number;
  width: number;
  food: Position[];
  snakes: Battlesnake[];
  hazards?: Position[];
}

export interface GameState {
  game: Game;
  turn: number;
  board: Board;
  you: Battlesnake;
}