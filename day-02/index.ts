import { getContent, isEmpty } from "../utils";

const choice = {
  rock: ['A', 'X'],
  paper: ['B', 'Y'],
  sissors: ['C', 'Z']
} as const;

type Choice = typeof choice[keyof typeof choice][number];
type PlayerChoice = Exclude<Choice, "X" | "Y" | "Z">;
type EncryptedChoice = Exclude<Choice, "A" | "B" | "C">;

function choiceToPoint(playerChoice: PlayerChoice) {
  if(playerChoice === choice.rock[0]) return 1;
  else if(playerChoice === choice.paper[0]) return 2;
  else return 3;
}

function rpsVerifyUsingChoices(playerChoice: PlayerChoice, encriptedChoice: EncryptedChoice) : number {
  const yourChoice = String.fromCharCode(encriptedChoice.charCodeAt(0) - 23) as PlayerChoice
  let points = choiceToPoint(yourChoice);
  //Verfication
  if(playerChoice === yourChoice) return points + 3;
  if(at(choices.indexOf(playerChoice) + 1) === yourChoice) return points + 6;
  return points;
}

const choices = ["A", "B", "C"] as const;
const at = (i: number) : PlayerChoice => choices[(i % choices.length + choices.length) % choices.length]!;
function twoStarsRPSVerify(playerChoice: PlayerChoice, encriptedChoice: EncryptedChoice): number {
  if(encriptedChoice === 'Y') return choiceToPoint(playerChoice) + 3;
  else if(encriptedChoice === 'Z') return choiceToPoint(at(choices.indexOf(playerChoice) + 1)) + 6;
  else return choiceToPoint(at(choices.indexOf(playerChoice) - 1));
}

function rpsVerify(line: string, twoStars : boolean = false) : number {
  const choices = line.split(" ") as [PlayerChoice, EncryptedChoice];
  return twoStars ? twoStarsRPSVerify(choices[0], choices[1]) : rpsVerifyUsingChoices(choices[0], choices[1]);
}

const test = false;

const text = await getContent(test);
const lines = text.split("\n");
let score = 0;

for(let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if(line === undefined || isEmpty(line)) continue;
  score += rpsVerify(line, false);
}
  
console.log(`Your score is: ${score}`);