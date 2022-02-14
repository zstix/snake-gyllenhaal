export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];

export const range = (start: number, end?: number): number[] => {
  if (!end) {
    end = start;
    start = 0;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => i);
};

export const randomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const shuffle = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const pipe = <T extends any[], R>(
  fn1: (...args: T) => R,
  ...fns: Array<(a: R) => R>
) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
    (value) => value
  );

  return (...args: T) => piped(fn1(...args));
};

export const prop =
  <T, K extends keyof T>(key: K) =>
  (obj: T) =>
    obj[key];
