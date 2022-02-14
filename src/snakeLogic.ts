import { Direction, Position, GameState, Battlesnake } from "./types";
import { getAdjacent, isInArray } from "./point";
import { prop, shuffle } from "./utils";

const MOVES: Direction[] = ["left", "right", "up", "down"];

interface NextPosition extends Position {
  dir: Direction;
}

const avoidSnakes = (snakes: Battlesnake[]) => (next: NextPosition) =>
  !snakes.map(prop("body")).some(isInArray(next));

const preferNotHazard =
  (hazards: Position[]) => (a: NextPosition, b: NextPosition) => {
    switch (true) {
      case isInArray(a)(hazards): // TODO: curry
        return 1;
      case isInArray(b)(hazards): // TODO: curry
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
    .filter(avoidSnakes(snakes))
    .sort(preferNotHazard(hazards));

  const chosenMove = possibleMoves[0].dir;

  if (debug) {
    console.log(
      `${state.game.id} MOVE ${state.turn}: ${chosenMove} (out of ${possibleMoves})`
    );
  }

  return chosenMove;
};
