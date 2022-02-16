import { Board, Direction, Position, NextPosition } from "./types";
import { curry } from "./utils";

export const equals = curry(
  (a: Position, b: Position) => a.x == b.x && a.y == b.y
);

export const getAdjacent =
  ({ x, y }: Position) =>
  (dir: Direction): NextPosition => {
    const moves = {
      left: { x: x - 1, y },
      right: { x: x + 1, y },
      down: { x, y: y - 1 },
      up: { x, y: y + 1 },
    };

    return { ...moves[dir], dir };
  };

export const getAllAdjacent = (pos: Position) => [
  getAdjacent(pos)("up"),
  getAdjacent(pos)("down"),
  getAdjacent(pos)("left"),
  getAdjacent(pos)("right"),
];

export const isOnBoard = curry(
  ({ x, y }: Position, { width, height }: Board) =>
    x >= 0 && x < width && y >= 0 && y < height
);

export const isInArray = curry((pos: Position, arr: Position[]) =>
  arr.some(equals(pos))
);

export const getWrappedPos = (pos: Position, { width, height }: Board) => ({
  x: pos.x < 0 ? width - 1 : pos.x >= width ? 0 : pos.x,
  y: pos.y < 0 ? height - 1 : pos.y >= height ? 0 : pos.y,
});
