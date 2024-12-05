import { getContent, isNotBlank } from "../utils";

const test = false;
const content = await getContent(test).then(it => it.split("\n").filter(isNotBlank).map(it => it.split(" ").map(Number)));

function isABSafe(diff: number, prevVariation: boolean = diff < 0) {
  if(diff === 0) return false;
  if(Math.abs(diff) > 3) return false;
  if((diff < 0) !== prevVariation) {
    return false;
  }
  return true;
}

function isSafe(currentLine: number[]) {
  let prevDiff = currentLine[0] - currentLine[1];
  if(!isABSafe(prevDiff)) return false;
  let i = 1;
  for(; i < currentLine.length - 1; i++) {
    const diff = currentLine[i] - currentLine[i + 1];
    if(!isABSafe(diff, prevDiff < 0)) return false;
    prevDiff = diff;
  }
  return true;
}

function firstPart() {
  let safeReports = 0;
  for(let lineNumber = 0; lineNumber < content.length; lineNumber++) {
    safeReports += Number(isSafe(content[lineNumber]));
  }
  console.log("Safe reports:", safeReports);
}

function secondPart() {
  const safeReports = content.filter(it => it.some((_, index) => isSafe(it.toSpliced(index, 1))));
  console.log(`Safe reports ${safeReports.length}x:`);
}

//firstPart();
secondPart();