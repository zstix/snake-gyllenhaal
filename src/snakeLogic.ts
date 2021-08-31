import { Board, Direction, Position, GameState, Battlesnake } from './types';
import { randomItem } from './utils';

const MOVES: Direction[] = ["left", "right", "up", "down"];

const getNextMove = ({ x, y}: Position, dir: Direction): Position => {
  const moves: Record<Direction, Position> = {
    "left":  { x: x - 1, y },
    "right": { x: x + 1, y },
    "down":  { x, y: y - 1 },
    "up":    { x, y: y + 1 },
  };

  return moves[dir];
}

const bodyContainsPos = (body: Position[], pos: Position): boolean =>
  body.some((segment) => (segment.x == pos.x && segment.y == pos.y))

const notWalls = (board: Board, pos: Position) => (dir: Direction): boolean => {
  const { width, height } = board;
  const { x, y } = pos;

  const moves: Record<Direction, boolean> = {
    "left": x > 0,
    "right": x < width - 1,
    "down": y > 0,
    "up": y < height - 1
  };

  return moves[dir];
}

const notSnakeBodies = (snakes: Battlesnake[], pos: Position) => (dir: Direction): boolean =>
  snakes.reduce((okay, { body }) => okay && !bodyContainsPos(body, getNextMove(pos, dir)), true);

export const chooseMove = (state: GameState, debug = false): Direction => {
  const { board, you } = state;
  const { head } = you;
  const { snakes } = board;

  const possibleMoves = MOVES
    .filter(notWalls(board, head))
    .filter(notSnakeBodies(snakes, head));

  const chosenMove = randomItem(possibleMoves);

  if (debug) {
    console.log(`${state.game.id} MOVE ${state.turn}: ${chosenMove} (out of ${possibleMoves})`);
  }
  
  return chosenMove;
}