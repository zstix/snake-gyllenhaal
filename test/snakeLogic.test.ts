import { GameState, Direction, Position } from '../types';

type Element = "space" | "head" | "body";

interface TestCase {
  name: string;
  board: Element[][];
  always: Direction[];
  never: Direction[];
}

const MOCK_GAME = {
  id: "mock-game",
  timeout: 0,
  ruleset: {
    name: "default",
    version: "1",
  },
};

const MOCK_SNAKE = {
  id: 'mock-snake',
  name: 'mock-snake',
  health: 20,
  latency: 'mock-latency',
}

const _ = "space";
const h = "head";
const b = "body";

const getMockYou = (board: Element[][]): {head: Position, body: Position[]} => {
  return board.reduce((rowAcc, row, i) => {
    return row.reduce((colAcc, element, x) => {
      const pos = { x, y: board.length - i - 1 };

      switch (element) {
        case h:
          return {...colAcc, head: pos };
        case b:
          return {...colAcc, body: [...colAcc.body, pos]};
        default:
          return colAcc;
      }
    }, rowAcc);
  }, { head: null, body: [] });
};

const getMockBoardState = (board: Element[][]): GameState => {
  const height = board.length;
  const width = board[0].length;

  // TODO: implement other snakes
  const { head, body } = getMockYou(board);
  const you = {
    ...MOCK_SNAKE,
    head,
    body,
    length: body.length + 1
  };

  const mockBoard = {
    width,
    height,
    food: [], // TODO: implement food
    snakes: [you],
  }

  return {
    game: MOCK_GAME,
    board: mockBoard,
    turn: 1,
    you
  };
};

const runTests = test.each([
  {
    name: "avoid left wall",
    board: [
      [_, _],
      [h, b],
      [_, _],
    ],
    always: ["up", "down"],
    never: ["left", "right"]
  }
]);

runTests("test: $name", ({ board, always, never }: TestCase) => {
  const state = getMockBoardState(board);
  expect(state.you.head).toEqual({x : 0, y: 1});
});