import { Map } from "../objects/Map/Map";

const levelWidth = 13;
const levelHeight = 5;
const mapItems = {
    trees: [
        { start: [2, 2] },
        { start: [12, 1] },
        { start: [11, 3] }
    ],
    rocks: [
        { start: [10, 5] },
        { start: [11, 5] },
        { start: [12, 5] }
    ],
    water: [
        { start: [5, 4], end: [8, 4] }
    ],
    squares: [
        { start: [2, 3], end: [3, 3] },
        { start: [2, 4], end: [3, 4] },
        { start: [6, 2], end: [7, 2] }
    ]
}
const cutouts = [
    { start: [1, 1], end: [4, 1] },
    { start: [13, 1] }
];
export const level1 = new Map(levelWidth, levelHeight, mapItems, cutouts);

