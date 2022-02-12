export interface Game {
  id: string;
  timeout: number;
  ruleset: {
    name: string;
    version: string;
  };
}

export interface Position {
  x: number;
  y: number;
}

export type Direction = "up" | "down" | "left" | "right";

interface BattlesnakeCustomizations {
  color: string;
  head: string;
  tail: string;
}

export interface Battlesnake {
  id: string;
  name: string;
  health: number;
  body: Position[];
  latency: string;
  head: Position;
  length: number;
  shout?: string;
  squad?: string;
  customizations: BattlesnakeCustomizations;
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
