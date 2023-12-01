import { getContent, isDigit, isNotBlank } from "../utils";

const test = process.env["TEST"] === undefined ? false : true;
const content = await getContent(test).then(it => it.split("\n").filter(isNotBlank));

let sum = 0;

for(const line of content) {
  let num = 0;
  for(let i = 0; i < line.length; i++) {
    const char = line.charCodeAt(i);
    if(!isDigit(char)) continue;
    num = (char - '0'.charCodeAt()) * 10;
    break;
  }
  for(let i = line.length - 1; i >= 0; i--) {
    const char = line.charCodeAt(i);
    if(!isDigit(char)) continue;
    num += char - '0'.charCodeAt();
    break;
  }
  sum += num;
}
console.log("Sum:", sum);
