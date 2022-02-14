import { Board, Direction, Position } from './types';

class Point {
  x: number;
  y: number;

  constructor(pos: Position) {
    this.x = pos.x;
    this.y = pos.y;
  };

  static from(pos: Position) {
    return new Point(pos);
  };

  getAdjacent(dir: Direction) {
    const moves: Record<Direction, Position> = {
      left: { x: this.x - 1, y: this.y },
      right: { x: this.x + 1, y: this.y },
      down: { x: this.x, y: this.y - 1 },
      up: { x: this.x, y: this.y + 1 },
    };

    return new Point(moves[dir]);
  };

  getDistance(pos: Position) {
    return Math.sqrt(Math.pow(pos.x - this.x, 2) + Math.pow(pos.y - this.y, 2));
  }

  isInArray(arr: Position[]) {
    return arr.some(({ x, y }) => x == this.x && y == this.y);
  };

  isOnBoard(board: Board) {
    return this.x > 0 &&
      this.x < board.width - 1 &&
      this.y > 0 &&
      this.y < board.height - 1;
  }
};

export default Point;
