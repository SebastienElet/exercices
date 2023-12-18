export const isCloseTo =
  (a: number, digits: number = 0.01) =>
  (b: number) => {
    const min = a - digits;
    const max = a + digits;

    return b >= min && b <= max;
  };
