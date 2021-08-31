import { GameState, Position } from "../src/types";
import { BoardElement } from './types';

interface MockSnake {
  head: Position;
  body: Position[];
}

interface MockSnakes {
  hero: MockSnake;
  x?: MockSnake;
}

const MOCK_GAME = {
  id: "mock-game",
  timeout: 0,
  ruleset: {
    name: "default",
    version: "1",
  },
};

const getMockSnakes = (board: BoardElement[][]): MockSnakes =>
  board.reduce((rowAcc, row, i) => {
    return row.reduce((acc, element, x) => {
      const pos = { x, y: board.length - i - 1 };

      switch (element) {
        case 'head':
          return {...acc, hero: {...acc.hero, head: pos }};
        case 'body':
          return {...acc, hero: {...acc.hero, body: [...acc.hero.body, pos] }};
        case 'snake-x-head':
          return acc.x
            ? {...acc, x: {...acc.x, head: pos }}
            : {...acc, x: { head: pos, body: [] }}
        case 'snake-x-body':
          return acc.x
            ? {...acc, x: {...acc.x, body: [...(acc.x?.body || []), pos] }}
            : {...acc, x: { body: [pos] }};
        default:
          return acc;
      }
    }, rowAcc);
  }, { hero: { head: null, body: [] }, x: null });

const getMockSnake = (snake: MockSnake, name = "you") => ({
  id: `mock-snake-${name}`,
  name: `mock-snake-${name}`,
  health: 20,
  latency: 'mock-latency',
  head: snake.head,
  body: [snake.head, ...snake.body],
  length: snake.body.length + 1
});

export const getMockBoardState = (board: BoardElement[][]): GameState => {
  const height = board.length;
  const width = board[0].length;

  const { hero, x} = getMockSnakes(board);

  const you = getMockSnake(hero);
  const snakes = [you];

  if (x) {
    snakes.push(getMockSnake(x, "x"));
  }

  const mockBoard = {
    width,
    height,
    food: [], // TODO: implement food
    snakes,
  }

  return {
    game: MOCK_GAME,
    board: mockBoard,
    turn: 1,
    you
  };
};