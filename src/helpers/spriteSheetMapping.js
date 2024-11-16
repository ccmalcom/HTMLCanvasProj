//spriteSheet is 5 high, 4 wide, 32x32 cell size
//ground is cell 1-3(top), 5-7(middle), 9-11(bottom)
//different ground is cell 4
//water is cell 8
//block is cell 12
//tree is cell 13,17
//bush is cell 18
//rock is cell 19
//house is cell 20
import { Sprite } from "../sprite.js";
import { resources } from "../Resource.js";
import { Vector2 } from "../Vector2.js";



const spriteSheetMapping = {
    topLeftGround: 0,
    topMiddleGround: 1,
    topRightGround: 2,
    altMiddleGround: 3,
    middleLeftGround: 4,
    middleCenterGround: 5,
    middleRightGround: 6,
    water: 7,
    bottomLeftGround: 8,
    bottomMiddleGround: 9,
    bottomRightGround: 10,
    block: 11,
    treeBottom: 12,
    treeTop: 16,
    bush: 17,
    rock: 18,
    house: 19
};

export const groundMapping = (x, y) => {
    //input: `48,48`
    //based on key, return  appropriate sprite frame (topLeftGround, topMiddleGround, etc)
    //topLeftGround is lowest x&y value
    //topMiddleGround is middle x, lowest y value
    //topRightGround is highest x, lowest y value
    //middleLeftGround is lowest x, middle y value
    //middleCenterGround is middle x, middle y value
    //middleRightGround is highest x, middle y value
    //bottomLeftGround is lowest x, highest y value
    //bottomMiddleGround is middle x, highest y value
    //bottomRightGround is highest x, highest y value
    // minX: 48
    // maxX: 240
    // minY: 32
    // maxY: 96

    //top row
    if (y <= 48) {
        if (x === 48) {
            return spriteSheetMapping.topLeftGround;
        } else if (x === 240) {
            return spriteSheetMapping.topRightGround;
        } else {
            return spriteSheetMapping.topMiddleGround;
        }
    }
    //middle row
    else if (y > 48 && y < 96) {
        if (x === 48) {
            return spriteSheetMapping.middleLeftGround;
        } else if (x === 240) {
            return spriteSheetMapping.middleRightGround;
        } else {
            return spriteSheetMapping.middleCenterGround;
        }
    }
    //bottom row
    else {
        if (x === 48) {
            return spriteSheetMapping.bottomLeftGround;
        } else if (x === 240) {
            return spriteSheetMapping.bottomRightGround;
        } else {
            return spriteSheetMapping.bottomMiddleGround;
        }
    }
}