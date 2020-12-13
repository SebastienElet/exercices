const trim = (input: string) => input.trim();
const length = <T>(input: T[]) => input.length;
const readFile = (fileName: string) =>
  require("fs").readFileSync(fileName).toString();
type Operation = "acc" | "jmp" | "nop";
type Argument = Number;
type Accumulator = Number;
type Exec = Number;
type ProgramLine = [Operation, Argument, Accumulator, Number];
const parseProgramLine = (line: string) => {
  const {
    groups: { operation, argument },
  } = /^(?<operation>\w+) (?<argument>[-+]\d+)/.exec(line) as any;
  return [operation, argument, 0, 0] as ProgramLine;
};
const parseProgram = (input: string) =>
  input.split("\n").map(trim).filter(Boolean).map(parseProgramLine);

const executeProgram = (program: ProgramLine[], executeLastLine = false) => {
  const programLength = length(program);
  let operationExecuted = 0;
  let programIndex = 0;
  let accumulator = 0;
  while (operationExecuted <= programLength) {
    const currentIndex = programIndex;
    const [operation, argument, acc, exec] = program[programIndex];
    switch (operation) {
      case "acc":
        accumulator += Number(argument);
        programIndex++;
        break;
      case "jmp":
        programIndex = Number(programIndex) + Number(argument);
        break;
      case "nop":
        programIndex++;
        break;
    }
    operationExecuted++;
    program[currentIndex] = [
      operation,
      argument,
      accumulator,
      operationExecuted,
    ];

    if (!program[programIndex]) {
      break;
    }
    if (program[programIndex] && program[programIndex][3]) {
      programIndex = currentIndex;
      break;
    }
  }

  if (executeLastLine) {
    if (programIndex === programLength) {
      return accumulator;
    }
    return -1;
  }
  return accumulator;
};
export const executeAndReturnAccumulatorValue = (input: string) => {
  const program = parseProgram(input);
  return executeProgram(program);
};

export const mutateTheProgramAndReturnAccumulatorValue = (input: string) => {
  const program = parseProgram(input);
  const programLength = length(program);
  let index = 0;
  let accumulator = -1;
  while (accumulator < 0 && index < programLength) {
    const mutatedProgram = parseProgram(input);
    if (mutatedProgram[index][0] === "jmp") {
      mutatedProgram[index][0] = "nop";
    } else if (mutatedProgram[index][0] === "nop") {
      mutatedProgram[index][0] = "jmp";
    }
    accumulator = executeProgram(mutatedProgram, true);
    index++;
  }

  return accumulator;
};

if (require.main === module) {
  const program = readFile("day8.txt");
  console.log(
    "What value is in the accumulator",
    executeAndReturnAccumulatorValue(program)
  );
  console.log(
    "What is the value of the accumulator after the program terminates?",
    mutateTheProgramAndReturnAccumulatorValue(program)
  );
}
