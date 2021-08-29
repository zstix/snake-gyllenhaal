interface Game {
  id: string;
  timeout: number;
  ruleset: {
    name: string;
    version: string;
  }
}

export interface GameState {
  game: Game
}