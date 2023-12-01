import { getContent, isDigit, isNotBlank } from "../utils";

const test = process.env["TEST"] === undefined ? false : true;
const content = await getContent(test).then(it => it.split("\n").filter(it => !it.startsWith("//")).filter(isNotBlank));

function part1() {
  console.log("Running part 1");
  let sum = 0;

  for (const line of content) {
    let num = 0;
    for (let i = 0; i < line.length; i++) {
      const char = line.charCodeAt(i);
      if (!isDigit(char)) continue;
      num = (char - '0'.charCodeAt()) * 10;
      break;
    }
    for (let i = line.length - 1; i >= 0; i--) {
      const char = line.charCodeAt(i);
      if (!isDigit(char)) continue;
      num += char - '0'.charCodeAt();
      break;
    }
    sum += num;
  }
  console.log("Sum:", sum);
}

function part2() {
  console.log("Running part 2");
  let sum = 0;
  const spelledDigits = {
    one: 1, two: 2, three: 3,
    four: 4, five: 5, six: 6,
    seven: 7, eight: 8, nine: 9
  };
  for (const line of content) {
    let firstIndex: [number, number] = [-1, 0];
    for (let i = 0; i < line.length; i++) {
      if (!isDigit(line.charCodeAt(i))) continue;
      firstIndex = [i, line.charCodeAt(i) - '0'.charCodeAt(0)];
      break;
    }
    for (const key of Object.keys(spelledDigits)) {
      const indexOf = line.indexOf(key);
      if (indexOf === -1) continue;
      if (indexOf < firstIndex[0] || firstIndex[0] == -1) firstIndex = [indexOf, spelledDigits[key as keyof typeof spelledDigits]];
    }
    //Last
    let lastIndex: [number, number] = [-1, 0];
    for (let i = line.length - 1; i >= 0; i--) {
      if (!isDigit(line.charCodeAt(i))) continue;
      lastIndex = [i, line.charCodeAt(i) - '0'.charCodeAt(0)];
      break;
    }
    for (const key of Object.keys(spelledDigits)) {
      const indexOf = line.lastIndexOf(key);
      if (indexOf === -1) continue;
      if (indexOf > lastIndex[0] || lastIndex[0] === -1) {
        lastIndex = [indexOf, spelledDigits[key as keyof typeof spelledDigits]];
      }
    }
    sum += firstIndex[1] * 10 + lastIndex[1];
  }
  console.log("Sum:", sum);
}

part1();
part2();
