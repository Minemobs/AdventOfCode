import { resolve } from "path";

export async function getContent (test: boolean = true) : Promise<string> {
    const file = Bun.file(resolve(Bun.main.substring(0, Bun.main.lastIndexOf('/')), `input-${test ? 'test' : 'full'}.txt`));
    const str = await file.text();
    return str;
}

export const isEmpty = (arr: string | Array<any>) => arr.length === 0;

export const isBlank = (str: string) => isEmpty(str) || str.trim().length === 0;