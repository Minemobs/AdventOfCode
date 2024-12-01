import { readdir, mkdir } from "fs/promises";
import { awaitWithError } from "./utils";

async function getLatestDay(addOne: boolean = false) {
    const files = await awaitWithError(readdir('./'));
    if(files.data === undefined) throw new Error("Couldn't get all files in the directory.");
    const num = files.data.filter(file => file.startsWith("day-")).map(file => file.split("-")[1]!).map(Number).map(n => Number.isNaN(n) ? 1 : n).sort((a, b) => a - b).at(-1)! + (addOne ? 1 : 0);
    return `day-${num < 10 ? '0' : num}${num}`;
}

async function addDay() {
    await getLatestDay(true).then(async (folderPath) => {
        await mkdir(folderPath);
        Bun.write(folderPath + "/index.ts", "import { getContent, isNotBlank } from \"../utils\";\n\nconst test = true;\nconst content = await getContent(test).then(it => it.split(\"\\n\").filter(isNotBlank));\n\nconsole.log(\"Hi\");");
        Bun.write(folderPath + "/input-full.txt", "");
        Bun.write(folderPath + "/input-test.txt", "");
    });
}

async function run() {
    await getLatestDay().then(folderPath => Bun.spawn(["bun", "run", "index.ts"], { cwd: folderPath, stderr: "inherit", stdout: "inherit"}));
}

while(true) {
    const str = (prompt("Do you want to create a new day or run the lastest exercice ?\n[N or R]") ?? '').toUpperCase();
    if(str !== 'N' && str !== 'R') continue;
    if(str === 'N') await addDay();
    else await run();
    break;
}
