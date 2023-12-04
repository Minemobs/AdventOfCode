#!/bin/env bun

import { getContent, isDigit, isNotBlank } from "../utils";

const test = false;
const content = await getContent(test).then(it => it.split("\n").filter(isNotBlank));

function firstPart() {
  let sum = 0;
  for(let lineIndex = 0; lineIndex < content.length; lineIndex++) {
    const chars = [...content[lineIndex]!];
    let lastNum = "";
    let partNumber = false;
    for(let charIndex = 0; charIndex < chars.length + 1; charIndex++) {
      if(charIndex !== chars.length && isDigit(chars[charIndex]!.charCodeAt(0))) {
        if(!partNumber && firstPartCheckArround(lineIndex, charIndex)) partNumber = true;
        lastNum += chars[charIndex]!;
      } else if(lastNum.length !== 0) {
        if(partNumber) {
          partNumber = false;
          sum += Number(lastNum);
        } else {
          //debug(charIndex, lastNum, lineIndex);
        }
        lastNum = "";
      }
    }
  }
  console.log(sum);
}

function debug(charIndex: number, lastNum: string, lineIndex: number) {
  const [startIndex, endIndex] = [ charIndex - lastNum.length - 1, charIndex + 1 ];
  let buff = "";
  for(let i = startIndex; i < endIndex; i++) {
    if(content[lineIndex - 1] !== undefined) buff += (content[lineIndex - 1]!.charAt(i));
  }
  buff += "\n";
  for(let i = startIndex; i < endIndex; i++) {
    buff += (content[lineIndex]!.charAt(i));
  }
  buff += "\n";
  for(let i = startIndex; i < endIndex; i++) {
    if(content[lineIndex + 1] !== undefined) buff += (content[lineIndex + 1]!.charAt(i));
  }
  console.log(buff + (content[lineIndex + 1] === undefined ? "" : "\n") + "-".repeat(10));
}

function isSymbol(char: string | undefined) {
  if(char !== undefined && char.length > 1) throw new Error("Char is too long. char.length=" + char.length);
  return char !== undefined && char !== '' && !isDigit(char.charCodeAt(0)) && char !== '.';
}

function firstPartCheckArround(currentLineIndex: number, currentCharIndex: number) {
  if(isSymbol(content[currentLineIndex]?.charAt(currentCharIndex + 1)) || isSymbol(content[currentLineIndex]?.charAt(currentCharIndex - 1))) return true; // left and right
  if(isSymbol(content[currentLineIndex - 1]?.charAt(currentCharIndex)) || isSymbol(content[currentLineIndex + 1]?.charAt(currentCharIndex))) return true; // Up and Down
  if(isSymbol(content[currentLineIndex - 1]?.charAt(currentCharIndex + 1)) || isSymbol(content[currentLineIndex + 1]?.charAt(currentCharIndex + 1))) return true; // Up Left and Up Right
  if(isSymbol(content[currentLineIndex - 1]?.charAt(currentCharIndex - 1)) || isSymbol(content[currentLineIndex + 1]?.charAt(currentCharIndex - 1))) return true; // Down Left and Down Right
  return false;
}

firstPart();

function secondPart() {
  // Check each lines for '*'.
  // Check its surrounding lines
  // Check if there's only 2 surrounding digits (don't need to read the entire number)
  // If there's only 2, read the 2 numbers and multiply them
  // Then add the result to the sum
  // TODO: Tomorrow
}