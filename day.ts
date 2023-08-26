import { readdir, mkdir, writeFile } from "fs";

function getLatestDay(callback: (folderPath: `./day-${number | '0'}${number}`) => void, addOne: boolean = false) {
    readdir('./', (err, files) => {
        if(err !== null) throw new Error("An error occured while reading files");
        const num = files.filter(file => file.startsWith("day-")).map(file => file.split("-")[1]!).map(Number).sort((a, b) => a - b).at(-1)! + (addOne ? 1 : 0);
        callback(`./day-${num < 10 ? '0' : ''}${num}` as './day-00');
    });
}

function addDay() {
    getLatestDay(folderPath => {
        mkdir(folderPath, () => {});
        Bun.write(folderPath + "/index.ts", "import { getContent } from \"../utils\";\n\nconst test = true;\nconst content = getContent(test);\n\nconsole.log(\"Hi\");");
        Bun.write(folderPath + "/input-full.txt", "");
        Bun.write(folderPath + "/input-test.txt", "");
    }, true);
}

function run() {
    getLatestDay(folderPath => Bun.spawnSync(["bun", "run", folderPath.concat("/index.ts")]));
}

while(true) {
    const str = (prompt("Do you want to create a new day or run the lastest exercice ?\n[N or R]") ?? '').toUpperCase();
    if(str !== 'N' && str !== 'R') continue;
    if(str === 'N') addDay();
    else run();
    break;
}