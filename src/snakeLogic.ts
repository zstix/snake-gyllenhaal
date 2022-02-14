import { Direction, Position, GameState, Battlesnake } from "./types";
import Point from './Point';
import { shuffle } from "./utils";

const MOVES: Direction[] = ["left", "right", "up", "down"];

// Not applicable for wrapped games
// const avoidWalls = (board: Board, pos: Position) => (dir: Direction) =>
//   Point.from(pos).getAdjacent(dir).isOnBoard(board);

const avoidSnakeBodies = (snakes: Battlesnake[], pos: Position) => (dir: Direction) =>
  !snakes.some(({ body }) => Point.from(pos).getAdjacent(dir).isInArray(body));

const preferNotHazard = (hazards: Position[], head: Position) => (a: Direction, b: Direction) => {
  switch(true) {
    case Point.from(head).getAdjacent(a).isInArray(hazards):
      return 1;
    case Point.from(head).getAdjacent(b).isInArray(hazards):
      return -1;
    default:
      return 0;
  }
}

export const chooseMove = (state: GameState, debug = false): Direction => {
  const { board, you } = state;
  const { head } = you;

  const possibleMoves = shuffle(MOVES)
    .filter(avoidSnakeBodies(board.snakes, head))
    .sort(preferNotHazard(board.hazards, head));

  const chosenMove = possibleMoves[0];

  if (debug) {
    console.log(
      `${state.game.id} MOVE ${state.turn}: ${chosenMove} (out of ${possibleMoves})`
    );
  }

  return chosenMove;
};
