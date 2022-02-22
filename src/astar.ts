import { Position } from './types';

// https://medium.com/@nicholas.w.swift/easy-a-star-pathfinding-7e6689c7f7b2

// TODO: implement
// TODO: decision function
// TODO: types
// TODO: functional
const astar = (a: Position, b: Position, map: any[]): Position[] => {
  const start = { ...a, g: 0, h: 0, f: 0 };
  const end = { ...b, g: 0, h: 0, f: 0 };

  let open = [];
  let closed = [];

  open.push(start);

  while (open.length > 0) {
    // find the current node
  }
};

export default astar;
