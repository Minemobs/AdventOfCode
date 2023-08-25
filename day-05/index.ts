import { getContent, reverseString } from "../utils";

const test = false;
const content = await getContent(test);

type Instructions = {
    moveAmount: number,
    from: number,
    to: number
}

function parseInstructions(line: string) : Instructions {
    const arr = line.split(" ").filter(l => [...l].find(c => c < '0' || c > '9') === undefined).map(Number) as [number, number, number];
    return {
        moveAmount: arr[0],
        from: arr[1] - 1,
        to: arr[2] - 1
    };
}

function createStack(input: string[], numberOfColumn: number) : string[][] {
    const array = Array<Array<string>>(numberOfColumn);
    for(let i = 0; i < numberOfColumn; i++) array[i] = [];
    for(const line of input) {
        let index = 0;
        for(let i = 1; index < numberOfColumn; i += 4) {
            if(line.charAt(i) === " ") {
                index++;
                continue;
            }
            array[index++]!.unshift(line.charAt(i));
        }
    }
    return array;
}

function moveStack(array: string[][], instructionLines: string[], reverse = false) {
    for(const instruction of instructionLines.map(parseInstructions)) {
        const tempArray = [];
        for(let i = 0; i < instruction.moveAmount; i++) {
            const element = array[instruction.from]!;
            if(reverse) {
                tempArray.push(element.pop());
                continue;
            }
            else array[instruction.to]!.push(element.pop()!);
        }
        for(const el of tempArray.reverse()) {
            array[instruction.to]!.push(el!);
        }
    }
    return array;
}

function quizz(lines: string[], instructionLines: string[], reverse = false) : string {
    const numberOfColumn = Number(lines.at(-1)!.trim().at(-1)!);
    const str = moveStack(createStack(lines.slice(0, lines.length - 1), numberOfColumn), instructionLines, reverse)
        .map(arr => arr.at(-1)).join("");
    return str;
}

const [firstPart, secondPart] = content.split("\n\n") as [string, string];
console.log(quizz(firstPart.split("\n"), secondPart.split("\n")));
console.log(quizz(firstPart.split("\n"), secondPart.split("\n"), true));