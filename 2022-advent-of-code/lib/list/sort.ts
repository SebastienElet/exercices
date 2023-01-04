type SortFunction = (a: unknown, b: unknown) => number;
// type Sort = <T>(fn: SortFunction) =: (list: readonly T[]) => T[];
// type Sort = <T>(fn: (a: T, b: T) => number): (list: readonly T[]) => T[];
// export const sort =
//   (fn: SortFunction) =>
//   <T extends readonly unknown[]>(input: T): T => {
//     return ([...input] as T).sort(fn);
//   };
export const sort =
  <T>(fn: (a: T, b: T) => number) =>
  (input: readonly T[]): readonly T[] => {
    return [...input].sort(fn);
  };
