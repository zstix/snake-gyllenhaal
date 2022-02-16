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

// This is not necessary for wrapped mode
// const avoidWalls = (board: Board) => (next: NextPosition) =>
//   isOnBoard(next, board);

const avoidSnakes = (snakes: Battlesnake[]) => (next: NextPosition) =>
  !snakes.map(prop("body")).some(isInArray(next));

const avoidWrappedSnakes =
  (snakes: Battlesnake[], board: Board) => (next: NextPosition) =>
    !snakes.map(prop("body")).some(isInArray(getWrappedPos(next, board)));

// FIXME: this is not working correctly
const avoidBigSnakeHeads =
  (snakes: Battlesnake[], board: Board, you: Battlesnake) =>
  (next: NextPosition) =>
    snakes
      .filter((snake) => snake.length >= you.length)
      .map(prop("body"))
      .map(first)
      .map(getAllAdjacent)
      .some((head) => !isInArray(getWrappedPos(next, board), head));

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

  // TODO: always get wrapped moves and then treat functions normally
  const possibleMoves = shuffle(MOVES)
    .map(getAdjacent(head))
    .filter(avoidSnakes(snakes))
    .filter(avoidWrappedSnakes(snakes, board))
    // TODO: get working
    // .filter(avoidBigSnakeHeads(snakes, board, you))
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
