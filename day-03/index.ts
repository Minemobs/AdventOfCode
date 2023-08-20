import { getContent } from "../utils";

const test = false;
const content = await getContent(test).then(str => str
  .replace("/\r/g", "")
  .trim()
  .split("\n"));

function firstPart() {
  let sum = 0;
  for(const line of content) {
    const firstCompartment = line.substring(0, line.length / 2);
    const secondCompartment = line.substring(line.length / 2);
    const char = [...secondCompartment].find(c => firstCompartment.indexOf(c) !== -1);
    if(char === undefined) throw new Error("Couldn't find repeated letter");
    sum += toPriority(char);
  }
  console.log(sum);
}

function secondPart() {
  let sum = 0;
  for(let i = 0; i < content.length; i += 3) {
    const firstCompartment = content[i]!;
    const secondCompartment = content[i + 1]!;
    const thirdCompartment = content[i + 2]!;
    const char = [...secondCompartment].find(c => firstCompartment.indexOf(c) !== -1 && thirdCompartment.indexOf(c) !== -1);
    if(char === undefined) throw new Error("Couldn't find repeated letter");
    sum += toPriority(char);
  }
  console.log(sum);
}

function toPriority(char: string) {
  if(char.charCodeAt(0) <= 90) return char.charCodeAt(0) - 65 + 27;
  return char.charCodeAt(0) - 97 + 1;
}

//firstPart();
secondPart();
