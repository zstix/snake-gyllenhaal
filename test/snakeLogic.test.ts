import { unique, range } from "../src/utils";
import { getMockBoardState } from "./utils";
import { BoardElement } from "./types";
import { Direction } from "../src/types";
import { chooseMove } from "../src/snakeLogic";

interface TestCase {
  name: string;
  board: BoardElement[][];
  always: Direction[];
  never: Direction[];
}

// The number of tests for each scenario (to account for random).
const NUM_TESTS = 20;

const UP = "up";
const DOWN = "down";
const LEFT = "left";
const RIGHT = "right";

const _ = "space";
const h = "head";
const b = "body";
const X = "snake-x-head";
const x = "snake-x-body";
const Y = "snake-y-head";
const y = "snake-y-body";

/*
const wallTests = [
  {
    name: "avoid left wall and neck",
    board: [
      [_, _],
      [h, b],
      [_, _],
    ],
    always: [UP, DOWN],
    never: [LEFT, RIGHT],
  },
  {
    name: "avoid right wall and neck",
    board: [
      [_, _],
      [b, h],
      [_, _],
    ],
    always: [UP, DOWN],
    never: [LEFT, RIGHT],
  },
  {
    name: "avoid top wall and neck",
    board: [
      [_, h, _],
      [_, b, _],
      [_, _, _],
    ],
    always: [LEFT, RIGHT],
    never: [UP, DOWN],
  },
  {
    name: "avoid corners and neck",
    board: [
      [h, _],
      [b, _],
      [_, _],
    ],
    always: [RIGHT],
    never: [LEFT, UP, DOWN],
  },
  {
    name: "avoid 1 other snake and wall",
    board: [
      [_, _, _],
      [X, h, _],
      [x, b, _],
    ],
    always: [UP, RIGHT],
    never: [LEFT, DOWN],
  },
];
*/

const wrapTests = [
  {
    name: "wrap right to avoid self",
    board: [
      [b, b, b],
      [b, h, _],
      [b, b, b],
    ],
    always: [RIGHT],
    never: [LEFT, UP, DOWN],
  },
  {
    name: "wrap right to avoid other snake",
    board: [
      [_, x, X],
      [_, x, h],
      [_, x, b],
    ],
    always: [RIGHT],
    never: [LEFT, UP, DOWN],
  },
  {
    name: "wrap corner to avoid self",
    board: [
      [_, _, _],
      [b, b, b],
      [_, b, h],
      [_, b, _],
    ],
    always: [DOWN, RIGHT],
    never: [LEFT, UP],
  },
  // FIXME
  // {
  //   name: "avoid wrap to avoid other snake",
  //   board: [
  //     [X, _, _],
  //     [x, _, h],
  //     [x, _, _],
  //   ],
  //   always: [UP, LEFT],
  //   never: [RIGHT, DOWN],
  // },
];

const snakeTests = [
  {
    name: "avoid long self",
    board: [
      [b, b, b],
      [b, h, b],
      [b, _, b],
    ],
    always: [DOWN],
    never: [LEFT, UP, RIGHT],
  },
  {
    name: "avoid 2 other snakes",
    board: [
      [_, _, _],
      [X, h, Y],
      [x, b, y],
      [x, b, y],
    ],
    always: [UP],
    never: [LEFT, DOWN, RIGHT],
  },
  {
    name: "prefer, but don't avoid, tails",
    board: [
      [x, X, _, _],
      [x, h, b, b],
      [x, x, _, _],
    ],
    always: [DOWN],
    never: [LEFT, UP, RIGHT],
  },
];

const runTests = test.each([
  // ...wallTests,
  ...wrapTests,
  ...snakeTests,
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
