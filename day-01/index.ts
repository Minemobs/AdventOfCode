import { getContent, isEmpty } from "../utils";

const testingMode = false;
const lines = await getContent(testingMode).then(str => str.split("\n"));

function part2() {
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
}

function part1() {
    let [sum, prevSum] = [0, 0];
    for(const line of lines) {
        if(isEmpty(line)) {
            if(sum > prevSum) prevSum = sum;
            sum = 0;
            continue;
        }
        sum += Number.parseInt(line);
    }
    return Math.max(prevSum, sum);
}

console.log(part1())