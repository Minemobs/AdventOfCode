import { getContent } from "../utils";

const test = false;
const content = await getContent(test).then(s => s.trim());

type File = {
    name: string,
    size: number,
    parent: Folder
}

type Folder = {
    path: string,
    name: string,
    files: Array<Folder | File>,
    parent: Folder | undefined
}

function mkdir(parent: Folder | undefined, name: string, files?: Array<Folder | File>) : Folder {
    const folder : Folder = {
        name,
        files: files ?? [],
        path: parent === undefined ? name : `${parent.path === '/' ? '' : parent.path}/${name}`,
        parent,
    }
    if(parent !== undefined) parent.files.push(folder);
    return folder;
}

const root = mkdir(undefined, '/');
let cwd = root;

function mkdirUsingCWD(name: string, files?: Array<Folder | File>) : Folder {
    return mkdir(cwd, name, files);
}

function touch(parent: Folder, name: string, size: number) {
    const file : File = {
        name,
        size,
        parent,
    }
    parent.files.push(file);
    return file;
}

function touchUsingCWD(name: string, size: number) : File {
    return touch(cwd, name, size);
}

function parseLS(result: string[]) {
    for(const line of result) {
        const [type, name] = line.split(" ") as ["dir" | `${number}`, string];
        if(type === "dir") mkdirUsingCWD(name);
        else touchUsingCWD(name, Number(type));
    }
}

function parseCommand(lines: string[], i: number) {
    const line = lines[i]!.substring(2);
    const [command, arg] = line.split(" ") as ["cd" | "ls", string | undefined];
    if(command === "cd") {
        cwd = arg === ".." ? cwd.parent! : cwd.files.find(obj => obj.name === arg) as Folder;
        return;
    }
    const result : string[] = [];
    for(let j = i + 1; j < lines.length; j++) {
        const line = lines[j]!;
        if(line.charAt(0) === "$") break;
        result.push(line);
    }
    parseLS(result);
}

const smallFolder = new Map<Folder, number>();

function returnFolderSize(currentFolder: Folder) : number {
    let sum = 0;
    for(const file of currentFolder.files) {
        sum += "files" in file ? returnFolderSize(file) : file.size;
    }
    if(sum < 100000) smallFolder.set(currentFolder, sum);
    return sum;
}

function firstPart() {
    const lines = content.trim().split("\n");
    for(let i = 1; i < lines.length; i++) {
        if(!lines[i]!.startsWith("$ ")) continue;
        parseCommand(lines, i);
    }
    returnFolderSize(root);
    let sum = 0;
    smallFolder.forEach(size => sum += size);
    console.log(sum);
}

function prettyPrint(root: Folder, indent = 0) {
    console.log(" ".repeat(indent), "-", root.name, "(folder)");
    indent += 2;
    for(const element of root.files) {
        if("files" in element) prettyPrint(element, indent)
        else console.log(" ".repeat(indent), "-", element.name, `(file, size=${element.size})`);
    }
}

firstPart();
//prettyPrint(root);