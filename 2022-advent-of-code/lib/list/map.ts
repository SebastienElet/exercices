export const map =
  <T extends (_: any) => any>(fn: T) =>
  <V extends readonly unknown[]>(value: V): readonly ReturnType<T>[] =>
    value.map(fn);
