export const take =
  (a: number) =>
  <T extends readonly unknown[]>(input: T) =>
    [...input].slice(0, a);
