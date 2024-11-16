//spriteSheet is 5 high, 4 wide, 32x32 cell size

import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resource.js";
import { Sprite } from "../../sprite.js";
import { Vector2 } from "../../Vector2.js";

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

const groundMapping = (x, y) => {
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
export class Map extends GameObject {
    constructor(grid) {
        //place appropriate sprites from spriteSheetMapping on the grid
        //grid:
        // Map([
        //     [
        //         "48,48",
        //         "middleLeft"
        //     ],
        //     [
        //         "48,64",
        //         "middleLeft"
        //     ],
        //     [
        //         "48,80",
        //         "middleLeft"
        //     ],
        //     [
        //         "48,96",
        //         "bottomLeft"
        //     ],
        //     [
        //         "64,96",
        //         "bottomMiddle"
        //     ],
        //     [
        //         "80,48",
        //         "middleCenter"
        //     ],
        //     [
        //         "80,96",
        //         "bottomMiddle"
        //     ],
        //     [
        //         "96,48",
        //         "middleCenter"
        //     ],
        //     [
        //         "96,64",
        //         "middleCenter"
        //     ],
        //     [
        //         "96,80",
        //         "middleCenter"
        //     ],
        //     [
        //         "96,96",
        //         "bottomMiddle"
        //     ],
        //     [
        //         "112,32",
        //         "topMiddle"
        //     ],
        //     [
        //         "112,48",
        //         "middleCenter"
        //     ],
        //     [
        //         "112,64",
        //         "middleCenter"
        //     ],
        //     [
        //         "112,96",
        //         "bottomMiddle"
        //     ],
        //     [
        //         "128,32",
        //         "topMiddle"
        //     ],
        //     [
        //         "128,64",
        //         "middleCenter"
        //     ],
        //     [
        //         "128,96",
        //         "bottomMiddle"
        //     ],
        //     [
        //         "144,32",
        //         "topMiddle"
        //     ],
        //     [
        //         "144,64",
        //         "middleCenter"
        //     ],
        //     [
        //         "144,96",
        //         "bottomMiddle"
        //     ],
        //     [
        //         "160,32",
        //         "topMiddle"
        //     ],
        //     [
        //         "160,48",
        //         "middleCenter"
        //     ],
        //     [
        //         "160,64",
        //         "middleCenter"
        //     ],
        //     [
        //         "160,96",
        //         "bottomMiddle"
        //     ],
        //     [
        //         "176,32",
        //         "topMiddle"
        //     ],
        //     [
        //         "176,48",
        //         "middleCenter"
        //     ],
        //     [
        //         "176,64",
        //         "middleCenter"
        //     ],
        //     [
        //         "176,80",
        //         "middleCenter"
        //     ],
        //     [
        //         "176,96",
        //         "bottomMiddle"
        //     ],
        //     [
        //         "192,32",
        //         "topMiddle"
        //     ],
        //     [
        //         "192,48",
        //         "middleCenter"
        //     ],
        //     [
        //         "192,64",
        //         "middleCenter"
        //     ],
        //     [
        //         "192,80",
        //         "middleCenter"
        //     ],
        //     [
        //         "208,32",
        //         "topMiddle"
        //     ],
        //     [
        //         "208,48",
        //         "middleCenter"
        //     ],
        //     [
        //         "208,80",
        //         "middleCenter"
        //     ],
        //     [
        //         "224,48",
        //         "middleCenter"
        //     ],
        //     [
        //         "224,64",
        //         "middleCenter"
        //     ],
        //     [
        //         "224,80",
        //         "middleCenter"
        //     ],
        //     [
        //         "240,48",
        //         "middleRight"
        //     ],
        //     [
        //         "240,64",
        //         "middleRight"
        //     ],
        //     [
        //         "240,80",
        //         "middleRight"
        //     ],
        //     [
        //         "240,96",
        //         "bottomRight"
        //     ]
        // ])
        super({});
        this.grid = grid ?? [];
        this.gridSize = 16;

    }

    buildMap() {
        console.log('building map');
        console.log('grid:', this.grid);
        //map is object, key is frame, value is cell location
        const spriteArray = [];
        //create sprite for each map cell 
        for (const cell of this.grid) {
            console.log('cell:', cell);
            //value is cell location (array)
            //key is frame number from spritesheet
            const [x, y] = cell.split(',').map(Number);
            const frame = groundMapping(x, y);
            console.log('frame:', frame);
            const sprite = new Sprite({
                resource: resources.images.spriteSheet,
                frameSize: new Vector2(16, 16),
                frame,
                position: new Vector2(x, y),
                hFrames: 4,
                vFrames: 5
            });
            // console.log('sprite:', sprite);
            spriteArray.push(sprite);
        }
        // console.log('spriteArray:', spriteArray);
        return spriteArray;
    }


}