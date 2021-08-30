import { chooseMove } from '../snakeLogic';
import { unique, range } from '../utils';
import { GameState, Direction, Position } from '../types';

type Element = "space" | "head" | "body";

interface TestCase {
  name: string;
  board: Element[][];
  always: Direction[];
  never: Direction[];
}

// The number of tests for each scenario (to account for random).
const NUM_TESTS = 20;

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

const UP = "up";
const DOWN = "down";
const LEFT = "left";
const RIGHT = "right";

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
    name: "avoid left wall and neck",
    board: [
      [_, _],
      [h, b],
      [_, _],
    ],
    always: [UP, DOWN],
    never: [LEFT, RIGHT]
  },
  {
    name: "avoid corners and neck",
    board: [
      [h, _],
      [b, _],
      [_, _],
    ],
    always: [RIGHT],
    never: [LEFT, UP, DOWN]
  },
  {
    name: "avoid long self",
    board: [
      [b, b, b],
      [b, h, b],
      [_, _, _],
    ],
    always: [DOWN],
    never: [LEFT, UP, RIGHT]
  },
]);

runTests("test: $name", ({ board, always, never }: TestCase) => {
  const state = getMockBoardState(board);

  const moves = range(NUM_TESTS).reduce<Direction[]>((acc) => {
    return unique([...acc, chooseMove(state)]);
  }, []);

  for (const goodMove of always) {
    expect(moves).toContain(goodMove);
  }

  for (const badMove of never) {
    expect(moves).not.toContain(badMove);
  }
});