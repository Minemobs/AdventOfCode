import { getContent } from "../utils";

const test = true;
const content = await getContent(test);

function firstPart() {
    let sum = 0;
    const lines = content.split("\n").map(str => str.split(new RegExp("[,-]")).map(Number));
    for(const line of lines) {
        if((line[0]! <= line[2]! && line[1]! >= line[3]!) || (line[2]! <= line[0]! && line[3]! >= line[1]!)) sum++;
    }
    return sum;
}

//952 too high
//6xx too low
//777 too low
//It looks bad but Idk how to make it better
function secondPart() {
    let sum = 0;
    const lines = content.split("\n").map(str => str.split(new RegExp("[,-]")).map(Number));
    for(const line of lines) {
        const firstPair = [line[0]!, line[1]!] as const;
        const secondPair = [line[2]!, line[3]!] as const;
        if(firstPair.find(n => secondPair.indexOf(n) !== -1) !== undefined) {
            sum++;
            continue;
        }
        if(
            (firstPair[0] <= secondPair[0] && firstPair[1] >= secondPair[1]) ||
            (firstPair[0] >= secondPair[0] && firstPair[1] <= secondPair[1]) ||
            (firstPair[1] - secondPair[0] > 0 && firstPair[1] < secondPair[1]) ||
            (secondPair[0] < firstPair[0] && secondPair[1] > firstPair[0])
        ) sum++;
    }
    return sum;
}

console.log(secondPart());