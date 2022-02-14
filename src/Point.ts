import { Board, Direction, Position } from './types';

class Point {
  x: number;
  y: number;

  constructor({ x, y }: Position) {
    this.x = x;
    this.y = y;
  };

  static from(pos: Position) {
    return new Point(pos);
  };

  getAdjacent(dir: Direction) {
    const { x, y } = this;

    const moves: Record<Direction, Position> = {
      left: { x: x - 1, y },
      right: { x: x + 1, y },
      down: { x, y: y - 1 },
      up: { x, y: y + 1 },
    };

    return new Point(moves[dir]);
  };

  getDistance(pos: Position) {
    return Math.sqrt(Math.pow(pos.x - this.x, 2) + Math.pow(pos.y - this.y, 2));
  }

  isInArray(arr: Position[]) {
    return arr.some(({ x, y }) => x == this.x && y == this.y);
  };

  isOnBoard({ width, height }: Board) {
    return this.x > 0 &&
      this.x < width - 1 &&
      this.y > 0 &&
      this.y < height - 1;
  }
};

export default Point;
