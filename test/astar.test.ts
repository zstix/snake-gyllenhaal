import findPath from '../src/astar';

const map = [
        //    | start     | end
        //    v           v
  /* 2 */ [0, 0, 0, 1, 1, 0, 0],
  /* 1 */ [0, 0, 0, 0, 1, 1, 0],
  /* 0 */ [0, 0, 0, 0, 0, 0, 0],
        // 0  1  2  3  4  5  6
];

const path = [
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 6, y: 1 },
  { x: 6, y: 2 },
  { x: 5, y: 2 },
];

test('finds the right path', () => {
  const start = { x: 1, y: 2 };
  const end = { x: 5, y: 2 };
  expect(findPath(start, end, map)).toEqual(path);
});
