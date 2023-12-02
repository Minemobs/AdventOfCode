import { getContent, isNotBlank } from "../utils";

const test = false;
const content = await getContent(test).then(it => it.split("\n").filter(isNotBlank));

type ColoredBox = { red: number, green: number, blue: number };

function parse(line: string) {
    return line.split(": ")[1]!.split("; ").map(it => it.split(", ").map(l => l.split(" ") as [string, keyof ColoredBox]));
}

// First part
console.log("First Part");

function firstPart() {
  let sum = 0;
  for(let id = 0; id < content.length; id++) {
    const items = parse(content[id]!);
    if(items.find(isOverflowing) === undefined) sum += id + 1;
  }
  console.log(sum);
}


function isOverflowing(box: [string, keyof ColoredBox][]) {
  const LIMITS : ColoredBox = { red: 12, green: 13, blue: 14 };
  for(const list of box) {
    if(LIMITS[list[1]] < Number(list[0])) return true;
  }
  return false;
}

firstPart();

// Second Part
console.log("Second Part");

function secondPart() {
  let sum = 0;
  for(let id = 0; id < content.length; id++) {
    const items = parse(content[id]!);
    const minColors = { red: 0, green: 0, blue: 0 };
    for(const sublist of items) {
      sublist.forEach(item => minColors[item[1]] = Math.max(Number(item[0]), minColors[item[1]]));
    }
    const { red, green, blue } = minColors;
    sum += red * green * blue;
  }
  console.log(sum);
}
secondPart();
