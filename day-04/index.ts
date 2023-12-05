import { getContent, isNotBlank } from "../utils";

const test = false;
const content = await getContent(test).then(it => it.split("\n").filter(isNotBlank));

function parse(line: string) {
    const game = line.substring(line.indexOf(":") + 2);
    return game.split(" | ").map(it => it.split(" ").filter(isNotBlank).map(n => Number(n.replaceAll("\\s+", "")))) as [number[], number[]];
}

function calculateScore(parsedNumbers: [number[], number[]]) {
    let score = 0;
    parsedNumbers[1].filter(n => parsedNumbers[0].indexOf(n) !== -1).forEach(() => score = score === 0 ? score + 1 : score * 2);
    return score;
}

function firstPart() {
  let sum = 0;
  content.forEach(line => sum += calculateScore(parse(line)));
  console.log(`Sum: ${sum}`);
}
firstPart();

const cash: number[] = [];

function getAmountOfCardDuped(index: number) {
  let amount = 0;
  const [ winningNumbers, numbers ] = parse(content[index]!);
  const length = winningNumbers.filter(n => numbers.indexOf(n) !== -1).length;
  const lastDupedCard = index + length;
  if(cash[index] !== undefined) return cash[index]!;
  for(let i = index + 1; i < lastDupedCard + 1; i++) {
    amount += getAmountOfCardDuped(i);
  }
  cash[index] = amount + 1;
  return amount + 1;
}

function secondPart() {
  let sum = 0;
  for(let i = 0; i < content.length; i++) {
    sum += getAmountOfCardDuped(i);
  }
  console.log(`Sum: ${sum}`);
}
secondPart();
