import { take } from "./take";

export const first = <T extends readonly unknown[]>(input: T) =>
  take(1)(input)[0];
