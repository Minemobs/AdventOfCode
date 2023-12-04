import { getContent, isNotBlank } from "../utils";

const test = false;
const content = await getContent(test).then(it => it.split("\n").filter(isNotBlank));

function firstPart() {
  let sum = 0;
  for(const line of content) {
    const game = line.substring(line.indexOf(":") + 2);
    const [ winningNumbers, numbers ] = game.split(" | ").map(it => it.split(" ").filter(isNotBlank).map(n => Number(n.replaceAll("\\s+", "")))) as [number[], number[]];
    let score = 0;
    for(const num of numbers) {
      if(winningNumbers.indexOf(num) !== -1) {
        if(score === 0) score++;
        else score *= 2;
      }
    }
    sum += score;
  }
  console.log(`Sum: ${sum}`);
}
firstPart();
