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

export const isOnBoard = curry(
  ({ x, y }: Position, { width, height }: Board) =>
    x >= 0 && x < width && y >= 0 && y < height
);

export const isInArray = curry((pos: Position, arr: Position[]) =>
  arr.some(({ x, y }) => x == pos.x && y == pos.y)
);

export const getWrappedPos = (pos: Position, { width, height }: Board) => ({
  x: pos.x < 0 ? width - 1 : pos.x >= width ? 0 : pos.x,
  y: pos.y < 0 ? height - 1 : pos.y >= height ? 0 : pos.y,
});
