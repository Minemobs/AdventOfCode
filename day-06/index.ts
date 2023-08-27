import { getContent } from "../utils";

const test = false;
const content = await getContent(test);

function firstPart() {
    const cursorSize = 4
    for(let i = 0; i < content.length; i++) {
        const str = content.substring(i, i + cursorSize);
        let foundDup = false;
        for(let j = 0; j < cursorSize - 1; j++) {
            const lastIndex = str.lastIndexOf(str.charAt(j));
            if(lastIndex === j) continue;
            i += j;
            foundDup = true;
            break;
        }
        if(!foundDup) {
            console.log(str, i + cursorSize);
            break;
        }
    }
}

firstPart();