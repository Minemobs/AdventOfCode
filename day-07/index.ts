import { getContent } from "../utils";

const test = true;
const content = await getContent(test).then(s => s.trim().split("\n").slice(1).join("\n"));

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

function parseLS(args: string[], cwd: Folder) {
}

function parseCD(args: string[], cwd: Folder) {
    
}

function parseCommand(lines: string, cwd: Folder) {
    const args = lines[0]!.substring(2).split(" ");
    const commandName = args[0]! as "ls" | "cd";
    if(commandName === "ls") {
        parseLS(args.slice(1), cwd)
    } else {
        parseCD(args.slice(1), cwd)
    }
}

function mkdir(parent: Folder | undefined, files: Array<Folder | File>, name: string) : Folder {
    const folder : Folder = {
        name,
        files,
        path: parent === undefined ? name : `${parent.path === '/' ? '' : parent.path}/${name}`,
        parent,
    }
    if(parent !== undefined) parent.files.push(folder);
    return folder;
}

const root = mkdir(undefined, [], '/');
let cwd = root;

function mkdirUsingCWD(name: string, files?: Array<Folder | File>) : Folder {
    return mkdir(cwd, files ?? [], name);
}

function touchUsingCWD(name: string, size: number) : File {
    const file : File = {
        name,
        size,
        parent: cwd,
    }
    cwd.files.push(file);
    return file;
}

function prettyPrint(root: Folder, indent = 0) {
    console.log(" ".repeat(indent), "-", root.name, "(folder)");
    indent += 2;
    root.files.forEach(element => {
        if("size" in element) {
            console.log(" ".repeat(indent), "-", element.name, `(file, size=${element.size})`);
        } else prettyPrint(element, indent);
    });
}

cwd = mkdirUsingCWD("home");
cwd = mkdirUsingCWD("minemobs").parent!;
cwd = mkdirUsingCWD()

function findSmallestFolder() {

}

prettyPrint(root);