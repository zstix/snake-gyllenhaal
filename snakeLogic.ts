import { Board, Direction, Position, GameState } from './types';

const chooseRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getNextMove = ({ x, y}: Position, dir: Direction): Position => {
  const moves: Record<Direction, Position> = {
    "left":  { x: x - 1, y },
    "right": { x: x + 1, y },
    "down":  { x, y: y - 1 },
    "up":    { x, y: y + 1 },
  };

  return moves[dir];
}

const avoidWalls = ({ width, height }: Board, pos: Position) => (dir: Direction): boolean => {
  const { x, y } = getNextMove(pos, dir);
  return x >= 0 && x < width && y >= 0 && y < height;
}

export const chooseMove = (state: GameState): Direction => {
  const { board, you } = state;

  const possibleMoves = <Direction[]>["left", "right", "up", "down"]
    .filter(avoidWalls(board, you.head));

  const chosenMove = chooseRandom(possibleMoves);

  console.log(`${state.game.id} MOVE ${state.turn}: ${chosenMove} (out of ${possibleMoves})`);
  
  return chosenMove;
}