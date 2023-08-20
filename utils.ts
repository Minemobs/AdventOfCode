import { resolve } from "path";

export async function getContent (test: boolean = true) {
    const file = Bun.file(resolve(Bun.main.substring(0, Bun.main.lastIndexOf('/')), `input-${test ? 'test' : 'full'}.txt`));
    const str = await file.text();
    return str;
}