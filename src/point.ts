import { Board, Direction, Position } from "./types";
import { curry } from "./utils";

export const getAdjacent =
  ({ x, y }: Position) =>
  (dir: Direction): Position & { dir: Direction } => {
    const moves = {
      left: { x: x - 1, y },
      right: { x: x + 1, y },
      down: { x, y: y - 1 },
      up: { x, y: y + 1 },
    };

    return { ...moves[dir], dir };
  };

export const getWrappedPos = (pos: Position, board: Board) => {
  if (isOnBoard(pos, board)) {
    return pos;
  }

  return {
    x: pos.x < 0 ? board.width - 1 : 0,
    y: pos.y < 0 ? board.height - 1 : 0,
  };
};

export const isInArray = curry((pos: Position, arr: Position[]) =>
  arr.some(({ x, y }) => x == pos.x && y == pos.y)
);

export const isOnBoard = curry(
  ({ x, y }: Position, { width, height }: Board) =>
    x >= 0 && x < width && y >= 0 && y < height
);
