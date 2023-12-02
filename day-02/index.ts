import { getContent, isNotBlank } from "../utils";

const test = false;
const content = await getContent(test).then(it => it.split("\n").filter(isNotBlank));

// First part

type ColoredBox = { red: number, green: number, blue: number };

function firstPart() {
  let sum = 0;
  for(let id = 0; id < content.length; id++) {
    const items = parseFirstPart(content[id]!);
    if(items.find(isOverflowing) === undefined) sum += id + 1;
  }
  console.log(sum);
}

function parseFirstPart(line: string) {
    return line.split(": ")[1]!.split("; ").map(it => it.split(", ").map(l => l.split(" ") as [string, keyof ColoredBox]));
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
