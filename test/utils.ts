import { Game, Board, GameState, Position, Battlesnake } from "../src/types";
import { BoardElement } from "./types";

interface MockSnake {
  head: Position;
  body: Position[];
}

interface MockSnakes {
  hero: MockSnake;
  x?: MockSnake;
  y?: MockSnake;
}

const MOCK_GAME: Game = {
  id: "mock-game",
  timeout: 0,
  ruleset: {
    name: "wrapped",
    version: "1",
  },
};

const addMockSnake = (
  snakes: MockSnakes,
  key: string,
  type: keyof MockSnake,
  pos: Position
): MockSnakes => {
  if (type === "head") {
    return snakes[key]
      ? { ...snakes, [key]: { ...snakes[key], head: pos } }
      : { ...snakes, [key]: { head: pos, body: [] } };
  }

  return snakes[key]
    ? {
        ...snakes,
        [key]: { ...snakes[key], body: [...(snakes[key]?.body || []), pos] },
      }
    : { ...snakes, [key]: { body: [pos] } };
};

const getMockSnakes = (board: BoardElement[][]): MockSnakes =>
  board.reduce(
    (rowAcc, row, i) => {
      return row.reduce((acc, element, x) => {
        const pos = { x, y: board.length - i - 1 };

        switch (element) {
          case "head":
            return { ...acc, hero: { ...acc.hero, head: pos } };
          case "body":
            return {
              ...acc,
              hero: { ...acc.hero, body: [...acc.hero.body, pos] },
            };
          case "snake-x-head":
            return addMockSnake(acc, "x", "head", pos);
          case "snake-x-body":
            return addMockSnake(acc, "x", "body", pos);
          case "snake-y-head":
            return addMockSnake(acc, "y", "head", pos);
          case "snake-y-body":
            return addMockSnake(acc, "y", "body", pos);
          default:
            return acc;
        }
      }, rowAcc);
    },
    { hero: { head: null, body: [] }, x: null, y: null }
  );

const getMockSnake = (snake: MockSnake, name = "you") =>
  ({
    id: `mock-snake-${name}`,
    name: `mock-snake-${name}`,
    health: 20,
    latency: "mock-latency",
    head: snake.head,
    body: [snake.head, ...snake.body],
    length: snake.body.length + 1,
  } as Battlesnake);

export const getMockBoardState = (board: BoardElement[][]): GameState => {
  const height = board.length;
  const width = board[0].length;

  const { hero, x, y } = getMockSnakes(board);

  const you = getMockSnake(hero);
  const snakes = [you];

  if (x) {
    snakes.push(getMockSnake(x, "x"));
  }

  if (y) {
    snakes.push(getMockSnake(y, "y"));
  }

  const mockBoard: Board = {
    width,
    height,
    food: [], // TODO: implement food
    snakes,
    hazards: [], // TODO: implement hazards
  };

  return {
    game: MOCK_GAME,
    board: mockBoard,
    turn: 1,
    you,
  };
};
