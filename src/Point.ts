import { Board, Direction, Position } from "./types";

export const getAdjacent =
  ({ x, y }: Position) =>
  (dir: Direction): Position & { dir: Direction } => {
    const moves: Record<Direction, Position> = {
      left: { x: x - 1, y },
      right: { x: x + 1, y },
      down: { x, y: y - 1 },
      up: { x, y: y + 1 },
    };

    return { ...moves[dir], dir };
  };

// TODO: curry
export const isInArray = (pos: Position) => (arr: Position[]) =>
  arr.some(({ x, y }) => x == pos.x && y == pos.y);

export const isOnBoard =
  ({ x, y }: Position) =>
  ({ width, height }: Board) =>
    x > 0 && x < width - 1 && y > 0 && y < height - 1;
