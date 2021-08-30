import { Board, Direction, Position, GameState } from './types';
import { randomItem } from './utils';

const getNextMove = ({ x, y}: Position, dir: Direction): Position => {
  const moves: Record<Direction, Position> = {
    "left":  { x: x - 1, y },
    "right": { x: x + 1, y },
    "down":  { x, y: y - 1 },
    "up":    { x, y: y + 1 },
  };

  return moves[dir];
}

const notWalls = (board: Board, pos: Position) => (dir: Direction): boolean => {
  const { width, height } = board;
  const { x, y } = pos;

  const moves: Record<Direction, boolean> = {
    "left": x > 0,
    "right": x < width,
    "down": y > 0,
    "up": y < height
  };

  return moves[dir];
}

const notBody = (body: Position[], pos: Position) => (dir: Direction): boolean => {
  const { x, y } = getNextMove(pos, dir);

  return body.some((segment) => (segment.x !== x && segment.y !== y));
}

export const chooseMove = (state: GameState, debug = false): Direction => {
  const { board, you } = state;
  const { head, body } = you;

  const possibleMoves = <Direction[]>["left", "right", "up", "down"]
    .filter(notWalls(board, head))
    .filter(notBody(body, head));

  const chosenMove = randomItem(possibleMoves);

  if (debug) {
    console.log(`${state.game.id} MOVE ${state.turn}: ${chosenMove} (out of ${possibleMoves})`);
  }
  
  return chosenMove;
}