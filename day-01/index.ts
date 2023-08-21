import { getContent, isEmpty } from "../utils";

const test = false;
const lines = await getContent(test).then(str => str.split("\n"));
let calories : number[] = []
let temp : number[] = []

for(const line of lines) {
    if(!isEmpty(line)) {
        temp.push(Number.parseInt(line));
        continue;
    }
    let j = 0;
    for(let k of temp) j += k;
    calories.push(j);
    temp = [];
}

calories = calories.sort((a, b) => a - b)
console.log(`First: ${calories[0]}\nLast: ${calories.at(-1)}`);
console.log(`Top 3 : ${calories.at(-1)! + calories.at(-2)! + calories.at(-3)!}`);