import { resolve } from "path";

export async function getContent(test: boolean = true): Promise<string> {
  const file = Bun.file(
    resolve(
      Bun.main.substring(0, Bun.main.lastIndexOf("/")),
      `input-${test ? "test" : "full"}.txt`
    )
  );
  const str = await file.text();
  return str.replace("/\r/g", "");
}

export function charToString(c: char) {
  return String.fromCharCode(c);
}

export function isEmpty(arr: string | Array<any>) {
  return arr.length === 0;
}

export function isBlank(str: string) {
  return isEmpty(str) || str.trim().length === 0;
}

export function reverseString(str: string) {
  return str.split("").reverse().join("");
}

export function assertArrayEquals<T extends number | string>(x: Array<T>, y: Array<T>) {
  if(x.length !== y.length) return false;
  for(let i = 0; i < x.length; i++) {
    if(x[i] !== y[i]) return false;
  }
  return true;
}

export function log(str: string | number | undefined) {
  console.log(`{${str}}`);
}

export async function awaitWithError<T>(promise: Promise<T>) {
  try {
    return {
      data: await promise,
      err: undefined
    } as const;
  } catch(err: unknown) {
    return {
      data: undefined,
      err
    } as const;
  }
}