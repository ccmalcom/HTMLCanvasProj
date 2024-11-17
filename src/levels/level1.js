import { Map } from "../objects/Map/Map";
import { resources } from "../Resource";

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
    treeBottom: 16,
    treeTop: 12,
    bush: 17,
    rock: 18,
    house: 19
};
const levelWidth = 13;
const levelHeight = 5;
const mapItems = {
    treeBottom: [
        { start: [11, 3] }
    ],
    treeTop: [
        { start: [11, 2] }
    ],
    bush: [
        { start: [2, 2] },
        { start: [12, 1] },
    ],
    rock: [
        { start: [10, 5] },
        { start: [11, 5] },
        { start: [12, 5] }
    ],
    water: [
        { start: [5, 4], end: [8, 4] }
    ],
    block: [
        { start: [2, 3], end: [3, 3] },
        { start: [2, 4], end: [3, 4] },
        { start: [6, 2], end: [7, 2] }
    ],
    house: [
        { start: [12, 3] }
    ]
}
const cutouts = [
    { start: [1, 1], end: [4, 1] },
    { start: [13, 1] }
];
export const level1 = new Map(levelWidth, levelHeight, mapItems, cutouts, resources.images.spriteSheet, spriteSheetMapping);

