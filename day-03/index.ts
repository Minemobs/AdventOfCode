import { getContent } from "../utils";

const test = false;
const content = await getContent(test).then(str => str.split("\n"));

function firstPart() {
  let sum = 0;
  for(const line of content) {
    const firstCompartment = line.substring(0, line.length / 2);
    const secondCompartment = line.substring(line.length / 2);
    const ch = [...secondCompartment].find(c => firstCompartment.indexOf(c) !== -1)?.charCodeAt();
    if(ch === undefined) throw new Error("Couldn't find repeated letter");
    sum += toPriority(ch);
  }
  console.log(sum);
}

function secondPart() {
  let sum = 0;
  for(let i = 0; i < content.length; i += 3) {
    const [firstCompartment, secondCompartment, thirdCompartment] = [content[i]!, content[i + 1]!, content[i + 2]!];
    const ch = [...secondCompartment].find(c => firstCompartment.indexOf(c) !== -1 && thirdCompartment.indexOf(c) !== -1)?.charCodeAt();
    if(ch === undefined) throw new Error("Couldn't find repeated letter");
    sum += toPriority(ch);
  }
  return sum;
}

function toPriority(c: char) {
  if(c <= 90) return c - 65 + 27;
  return c - 97 + 1;
}

console.log(secondPart());