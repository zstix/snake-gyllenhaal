export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];

export const range = (start: number, end?: number): number[] => {
  if (!end) {
    end = start;
    start = 0;
  }

  return Array.from({ length: end - start + 1}, (_, i) => i);
}

export const randomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];