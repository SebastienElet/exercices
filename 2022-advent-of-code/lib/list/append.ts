export const append =
  <T>(element: T) =>
  (list: readonly T[]): readonly T[] =>
    [...list, element];
