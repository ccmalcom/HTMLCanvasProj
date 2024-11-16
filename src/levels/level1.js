import { buildGrid } from "../helpers/grid";


const trees = [
    { start: [2, 2] },
    { start: [12, 1] },
    { start: [11, 3] }
]
const rocks = [
    { start: [10, 5] },
    { start: [11, 5] },
    { start: [12, 5] }
]
const water = [
    { start: [5, 4], end: [8, 4] }
]
const squares = [
    { start: [2, 3], end: [3, 3] },
    { start: [2, 4], end: [3, 4] },
    { start: [6, 2], end: [7, 2] }
]

const levelWidth = 13;
const levelHeight = 5;
const cutouts = [
    { start: [1, 1], end: [4, 1] },
    { start: [13, 1] },
    ...trees,
    ...rocks,
    ...water,
    ...squares
];

export const grid = buildGrid(levelWidth, levelHeight, cutouts);