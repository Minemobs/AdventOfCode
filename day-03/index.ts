import { getContent, isNotBlank } from "../utils";

const test = false;
const content = await getContent(test);

function firstPart() {
    const regex = /mul\((?<n1>\d+),(?<n2>\d+)\)/gm;
    const matches = content.matchAll(regex);
    let sum = 0;
    for(const match of matches) {
        const groups = match.groups;
        if(groups === undefined) {
            throw new Error("Idk what happened");
        }
        sum += (Number(groups["n1"]) * Number(groups["n2"]));
    }
    console.log("Sum:", sum);
}

function secondPart() {
    const regex = /mul\((?<n1>\d+),(?<n2>\d+)\)|(?<toggleFunction>do(?<not>n't)?\(\))/gm;
    const matches = content.matchAll(regex);
    let toggleMultiplication = true;
    let sum = 0;
    for(const match of matches) {
        const groups = match.groups;
        if(groups === undefined) {
            throw new Error("Idk what happened");
        }
        if(groups["toggleFunction"] !== undefined) {
            if(groups["not"] !== undefined) toggleMultiplication = false;
            else toggleMultiplication = true;
            continue;
        }
        if(toggleMultiplication) sum += (Number(groups["n1"]) * Number(groups["n2"]));
    }
    console.log("Sum:", sum);
}

//firstPart();
secondPart();