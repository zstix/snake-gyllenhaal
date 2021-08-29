interface Game {
  id: string;
  timeout: number;
  ruleset: {
    name: string;
    version: string;
  }
}

interface GameState {
  game: Game
}