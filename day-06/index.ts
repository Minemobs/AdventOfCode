import { getContent } from "../utils";

const test = false;
const content = await getContent(test).then(it => it.split("\n").map(it => it.split("")));

const enum Direction {
  LEFT = -2,
  RIGHT = 2,
  UP = -1,
  DOWN = 1,
};

function findCharacter() {
  for(let y = 0; y < content.length; y++) {
    for(let x = 0; x < content[y].length; x++) {
      if(content[y][x] === "^") return { x, y };
    }
  }
  return { x: -1, y: -1 };
}


function formattedArray() {
  const initPos = findCharacter();
  const copy = structuredClone(content);
  copy[initPos.y][initPos.x] = ".";
  prevPositions.forEach(({x, y}) => copy[y][x] = '\x1b[31m' + '@' + '\x1b[0m');
  copy[position.y][position.x] = '\x1b[33m' + "<^ v>"[direction + 2] + '\x1b[0m';
  return (copy.map(it => it.join("")).join("\n"));
}

const prevPositions: typeof position[] = [];
let direction: Direction = Direction.UP;
const position = findCharacter();
console.log(position);

function incrementPosition() {
  if((direction & 1) === 0) return { x: position.x + direction / 2, y: position.y };
  else return { x: position.x, y: position.y + direction };
  // return { x: position.x + Math.floor(direction / 2), y: position.y + (direction % 2) };
}

function willCollideNextMove() {
  const { x, y } = incrementPosition();
  return (content[y] ?? [])[x] === "#";
}

async function move() {
  console.clear();
  const willCollide = willCollideNextMove();
  console.log("Will collide ?", willCollide);
  if(willCollide) {
    switch(direction) {
      case Direction.UP: direction = Direction.RIGHT; break;
      case Direction.LEFT: direction = Direction.UP; break;
      case Direction.RIGHT: direction = Direction.DOWN; break;
      case Direction.DOWN: direction = Direction.LEFT; break;
    }
  }
  console.log(formattedArray(), "\n");
  await Bun.sleep(10);
  const nextPos = incrementPosition();
  console.log();
  if((content[nextPos.y] ?? [])[nextPos.x] === undefined) return;
  prevPositions.push({x: position.x, y: position.y});
  position.x = nextPos.x;
  position.y = nextPos.y;
  await move();
}

await move();
console.log(prevPositions.filter((obj1, i, arr) => 
  arr.findIndex(obj2 => (obj2.x === obj1.x) && (obj2.y === obj1.y)) === i
).length + 1);
