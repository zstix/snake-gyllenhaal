import {
  Board,
  Direction,
  Position,
  GameState,
  Battlesnake,
  NextPosition,
} from "./types";
import {
  equals,
  getAdjacent,
  getWrappedPos,
  isInArray,
  getAllAdjacent,
} from "./point";
import { prop, shuffle, first } from "./utils";

const MOVES: Direction[] = ["left", "right", "up", "down"];

const snakesEqual = (a: Battlesnake, b: Battlesnake) => equals(a.head, b.head);

const avoidSnakes = (snakes: Battlesnake[]) => (next: NextPosition) =>
  !snakes.map(prop("body")).some(isInArray(next));

const avoidBigSnakeHeads =
  (snakes: Battlesnake[], board: Board, you: Battlesnake) =>
  (next: NextPosition) =>
    !snakes
      .filter((snake) => !snakesEqual(snake, you))
      .filter((snake) => snake.length >= you.length)
      .map(prop("head"))
      .map((head) => getAllAdjacent(head).map(getWrappedPos(board)))
      .some(isInArray(next));

const preferNotHazard =
  (hazards: Position[]) => (a: NextPosition, b: NextPosition) => {
    switch (true) {
      case isInArray(a, hazards):
        return 1;
      case isInArray(b, hazards):
        return -1;
      default:
        return 0;
    }
  };

export const chooseMove = (state: GameState, debug = false): Direction => {
  const { board, you } = state;
  const { snakes, hazards } = board;
  const { head } = you;

  const possibleMoves = shuffle(MOVES)
    .map(getAdjacent(head))
    .map(getWrappedPos(board))
    .filter(avoidSnakes(snakes))
    // NOTE: this should probably _prefer_ not avoid
    .filter(avoidBigSnakeHeads(snakes, board, you))
    .sort(preferNotHazard(hazards))
    .map(prop("dir"));

  const chosenMove = possibleMoves.length
    ? possibleMoves[0]
    : first(shuffle(MOVES));

  if (debug) {
    console.log(
      `${state.game.id} MOVE ${state.turn}: ${chosenMove} (out of [${possibleMoves}])`
    );
  }

  return chosenMove;
};
