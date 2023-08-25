import { getContent } from "../utils";

const test = false;
const content = await getContent(test);

type Instructions = {
    moveAmount: number,
    from: number,
    to: number
}

function parseInstructions(line: string) : Instructions {
    const arr : number[] = [];
    for(const num of line.split(" ")) {
        if([...num].find(c => c < '0' || c > '9') !== undefined) continue;
        arr.push(Number(num));
    }
    return {
        moveAmount: arr[0]!,
        from: arr[1]!,
        to: arr[2]!
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

function firstPartHandle(lines: string[], instructionLines: string[]) : string {
    const numberOfColumn = Number(lines.at(-1)!.trim().at(-1)!);
    const array = createStack(lines.slice(0, lines.length - 1), numberOfColumn);
    for(const instruction of instructionLines.map(parseInstructions)) {
        for(let i = 0; i < instruction.moveAmount; i++) {
            array[instruction.to - 1]!.push(array[instruction.from - 1]!.pop()!);
        }
    }
    return array.map(arr => arr.at(-1)).join("");
}

function firstQuizz() {
    const [firstPart, secondPart] = content.split("\n\n") as [string, string];
    const string = firstPartHandle(firstPart.split("\n"), secondPart.split("\n"));
    console.log(string);
}

firstQuizz()
console.log("Hello World".charCodeAt())