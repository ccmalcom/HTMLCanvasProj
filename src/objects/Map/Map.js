//spriteSheet is 5 high, 4 wide, 32x32 cell size

import { GameObject } from "../../GameObject.js";
import { groundMapping } from "../../helpers/spriteSheetMapping.js";
import { resources } from "../../Resource.js";
import { Sprite } from "../../sprite.js";
import { Vector2 } from "../../Vector2.js";

const spriteSheetMapping = {
    topLeftGround: 1,
    topMiddleGround: 2,
    topRightGround: 3,
    altMiddleGround: 4,
    middleLeftGround: 5,
    middleCenterGround: 6,
    middleRightGround: 7,
    water: 8,
    bottomLeftGround: 9,
    bottomMiddleGround: 10,
    bottomRightGround: 11,
    block: 12,
    treeBottom: 13,
    treeTop: 17,
    bush: 18,
    rock: 19,
    house: 20
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
        this.grid = grid;
        this.gridSize = 16;
        this.buildMap();
    }

    buildMap() {


    }

}