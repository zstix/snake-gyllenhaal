import {
  Board,
  Direction,
  Position,
  GameState,
  Battlesnake,
  NextPosition,
} from "./types";
import { getAdjacent, getWrappedPos, isInArray, getAllAdjacent } from "./point";
import { prop, shuffle, first } from "./utils";

const MOVES: Direction[] = ["left", "right", "up", "down"];

const avoidSnakes = (snakes: Battlesnake[]) => (next: NextPosition) =>
  !snakes.map(prop("body")).some(isInArray(next));

// FIXME: get this working
// [].some(() => true) == [].some(() => false)
const avoidBigSnakeHeads =
  (snakes: Battlesnake[], board: Board, you: Battlesnake) =>
  (next: NextPosition) =>
    !snakes
      .filter((snake) => snake != you)
      .filter((snake) => snake.length >= you.length)
      .map(prop("body"))
      .map(first)
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
    // .filter(avoidBigSnakeHeads(snakes, board, you)) // TODO: uncomment
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
