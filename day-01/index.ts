import { getContent, isNotBlank } from "../utils";

const test = false;
const content = await getContent(test).then(it => it.split("\n").filter(isNotBlank));
let arr: number[][] = [[],[]];
content.map(it => it.split("   ").map(it => Number(it)) as [number, number]).forEach(it => {
  arr[0].push(it[0]);
  arr[1].push(it[1]);
});

function firstPart() {
  arr = arr.map(it => it.toSorted((a, b) => a - b));
  const sum = arr[0].map((it, i) => Math.abs(it - arr[1][i])).reduce((prev, curr) => prev + curr, 0);
  console.log("Sum", sum)
}

function secondPart() {
  const nbrOfOccurence: Map<number, number> = new Map();
  let sum = 0;
  for(const n of arr[0]) sum = n * (nbrOfOccurence.get(n) ?? arr[1].filter(it => it === n).length);
  console.log("Sum:", sum);
}

if(process.env["PART"] === "1") firstPart();
else secondPart();
