const inverseDirection = (direction: string) => {
  if (direction === "E") return "W";
  if (direction === "W") return "E";
  if (direction === "N") return "S";
  if (direction === "S") return "N";
  return "E";
};
export const getManathanDistance = (input: string, x = 0, y = 0): number => {
  let facing = "E";
  const instructions = input
    .trim()
    .split("\n")
    .forEach((instruction) => {
      let direction = instruction.slice(0, 1);
      const value = instruction.slice(1);
      console.log(direction, value);
      if (direction === "F") {
        direction = inverseDirection(facing);
      }

      switch (direction) {
        case "N":
          y += Number(value);
          break;
        case "S":
          y -= Number(value);
          break;
        case "E":
          x += Number(value);
          break;
        case "W":
          x -= Number(value);
          break;
      }
      facing = direction;
    });
  console.log(x, y);
  return Math.abs(y) + Math.abs(x);
};
