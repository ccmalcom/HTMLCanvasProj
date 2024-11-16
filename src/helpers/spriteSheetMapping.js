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
};

export const groundMapping = () => {
    const topLeftGround = new Sprite({
        resource: resources.images.spriteSheet,
        frameSize: new Vector2(32, 32),
        hFrames: 4,
        vFrames: 5,
        frame: spriteSheetMapping.topLeftGround,
        // position: new Vector2(0, 0)
    });
    const topMiddleGround = new Sprite({
        resource: resources.images.spriteSheet,
        frameSize: new Vector2(32, 32),
        hFrames: 4,
        vFrames: 5,
        frame: spriteSheetMapping.topMiddleGround,
        // position: new Vector2(32, 0)
    });
    const topRightGround = new Sprite({
        resource: resources.images.spriteSheet,
        frameSize: new Vector2(32, 32),
        hFrames: 4,
        vFrames: 5,
        frame: spriteSheetMapping.topRightGround,
        // position: new Vector2(64, 0)
    });
    const middleLeftGround = new Sprite({
        resource: resources.images.spriteSheet,
        frameSize: new Vector2(32, 32),
        hFrames: 4,
        vFrames: 5,
        frame: spriteSheetMapping.middleLeftGround,
        // position: new Vector2(0, 32)
    });
    const middleCenterGround = new Sprite({
        resource: resources.images.spriteSheet,
        frameSize: new Vector2(32, 32),
        hFrames: 4,
        vFrames: 5,
        frame: spriteSheetMapping.middleCenterGround,
        // position: new Vector2(32, 32)
    });
    const middleRightGround = new Sprite({
        resource: resources.images.spriteSheet,
        frameSize: new Vector2(32, 32),
        hFrames: 4,
        vFrames: 5,
        frame: spriteSheetMapping.middleRightGround,
        // position: new Vector2(64, 32)
    });
    const bottomLeftGround = new Sprite({
        resource: resources.images.spriteSheet,
        frameSize: new Vector2(32, 32),
        hFrames: 4,
        vFrames: 5,
        frame: spriteSheetMapping.bottomLeftGround,
        // position: new Vector2(0, 64)
    });
    const bottomMiddleGround = new Sprite({
        resource: resources.images.spriteSheet,
        frameSize: new Vector2(32, 32),
        hFrames: 4,
        vFrames: 5,
        frame: spriteSheetMapping.bottomMiddleGround,
        // position: new Vector2(32, 64)
    });
    const bottomRightGround = new Sprite({
        resource: resources.images.spriteSheet,
        frameSize: new Vector2(32, 32),
        hFrames: 4,
        vFrames: 5,
        frame: spriteSheetMapping.bottomRightGround,
        // position: new Vector2(64, 64)
    });
    return [topLeftGround, topMiddleGround, topRightGround, middleLeftGround, middleCenterGround, middleRightGround, bottomLeftGround, bottomMiddleGround, bottomRightGround];
}