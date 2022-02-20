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
import { prop, shuffle, first, last, prefer } from "./utils";

const MOVES: Direction[] = ["left", "right", "up", "down"];

const snakesEqual = (a: Battlesnake, b: Battlesnake) => equals(a.head, b.head);

const avoidSnakes = (snakes: Battlesnake[]) => (next: NextPosition) =>
  !snakes
    .map(prop("body"))
    .map((body) => body.slice(0, -1)) // ignore tails
    .some(isInArray(next));

const avoidBigSnakeHeads =
  (snakes: Battlesnake[], board: Board, you: Battlesnake) =>
  (next: NextPosition) =>
    !snakes
      .filter((snake) => !snakesEqual(snake, you))
      .filter((snake) => snake.length >= you.length)
      .map(prop("head"))
      .map((head) => getAllAdjacent(head).map(getWrappedPos(board)))
      .some(isInArray(next));

const preferNotBigSnakeNextMoves =
  (snakes: Battlesnake[], board: Board, you: Battlesnake) =>
  (a: NextPosition, b: NextPosition) => {
    const avoid = avoidBigSnakeHeads(snakes, board, you);
    return prefer(avoid(a), avoid(b));
  };

const preferNotHazard =
  (hazards: Position[]) => (a: NextPosition, b: NextPosition) =>
    prefer(isInArray(b, hazards), isInArray(a, hazards));

const preferNotTails =
  (snakes: Battlesnake[], you: Battlesnake) =>
  (a: NextPosition, b: NextPosition) => {
    const tails = snakes
      .filter((snake) => !snakesEqual(snake, you))
      .map(prop("body"))
      .map(last);
    switch (true) {
      case isInArray(a, tails):
        return 1;
      case isInArray(a, tails):
        return -1;
      default:
        return 0;
    }
  };

export const chooseMove = (state: GameState, debug = false): Direction => {
  const { board, you } = state;
  const { snakes, hazards } = board;
  const { head } = you;

  // NOTE: more important preference goes lower in the list

  const possibleMoves = shuffle(MOVES)
    .map(getAdjacent(head))
    .map(getWrappedPos(board))
    .filter(avoidSnakes(snakes))
    .sort(preferNotHazard(hazards))
    .sort(preferNotTails(snakes, you))
    .sort(preferNotBigSnakeNextMoves(snakes, board, you))
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
