import { Board, Direction, Position, GameState, Battlesnake } from "./types";
import { randomItem, getDistance } from "./utils";

const MOVES: Direction[] = ["left", "right", "up", "down"];

const getNextMove = ({ x, y }: Position, dir: Direction): Position => {
  const moves: Record<Direction, Position> = {
    left: { x: x - 1, y },
    right: { x: x + 1, y },
    down: { x, y: y - 1 },
    up: { x, y: y + 1 },
  };

  return moves[dir];
};

const bodyContainsPos = (body: Position[], pos: Position): boolean =>
  body.some((segment) => segment.x == pos.x && segment.y == pos.y);

const notWalls =
  (board: Board, pos: Position) =>
  (dir: Direction): boolean => {
    const { width, height } = board;
    const { x, y } = pos;

    const moves: Record<Direction, boolean> = {
      left: x > 0,
      right: x < width - 1,
      down: y > 0,
      up: y < height - 1,
    };

    return moves[dir];
  };

const notSnakeBodies =
  (snakes: Battlesnake[], pos: Position) =>
  (dir: Direction): boolean =>
    snakes.reduce(
      (okay, { body }) => okay && !bodyContainsPos(body, getNextMove(pos, dir)),
      true
    );

const getClosestFood = (food: Position[], head: Position): Position =>
  food.sort((a, b) => getDistance(a, head) - getDistance(b, head))[0];

export const chooseMove = (state: GameState, debug = false): Direction => {
  const { board, you } = state;
  const { head } = you;
  const { snakes } = board;

  let possibleMoves = MOVES;

  if (state.game.ruleset.name !== 'wrapped') {
    possibleMoves = possibleMoves.filter(notWalls(board, head));
  }

  possibleMoves = possibleMoves.filter(notSnakeBodies(snakes, head));

  const chosenMove = randomItem(possibleMoves);

  if (debug) {
    console.log(
      `${state.game.id} MOVE ${state.turn}: ${chosenMove} (out of ${possibleMoves})`
    );
  }

  return chosenMove;
};
