
//helpers for grid movement
export const gridCells = n => {
    return n * 16;
}

export const isSpaceFree = (walls, x, y) => {
    //check if the space is free
    const str = `${x},${y}`;
    const isWallPresent = walls.has(str);
    return !isWallPresent;
}

export const getGridDetails = (grid) => {
    const gridArray = Array.from(grid);
    let minX = gridArray[0].split(',')[0]; // first value of first cell
    let maxX = gridArray[gridArray.length - 1].split(',')[0]; // first value of last cell
    //must map through second value of cells to get min and max y
    const yArray = gridArray.map(cell => cell.split(',')[1]);
    let minY = Math.min(...yArray);
    let maxY = Math.max(...yArray);
    let gridWidth = maxX - minX;
    let gridHeight = maxY - minY;

    return { minX, maxX, minY, maxY, gridWidth, gridHeight };
}

//TODO: combine buildGrid and buildMap functions
// grid used to set map, put tiles on map, and add items to tiles
// map also keeps track of items on tiles

//method to build valid map grid
export const buildGrid = (width, height, cutouts) => {
    console.log('building grid');
    console.log('inputs:', width, height, cutouts);
    //0,0 does not exist
    //1,1 in our rendered grid is 3,2 in the actual grid
    //13,5 in our rendered grid is 15,6 in the actual grid
    //x starts at 3, y starts at 2
    //translate to grid cells

    //set translated grid based on width and height
    const grid = new Set();
    const gridWidth = width + 3;
    const gridHeight = height + 2;
    for (let x = 3; x < gridWidth; x++) {
        for (let y = 2; y < gridHeight; y++) {
            const str = `${gridCells(x)},${gridCells(y)}`;
            grid.add(str);
        }
    }
    console.log('initial grid created:', grid);

    //remove cutouts 
    //cutouts: [{start:[1,1], end:[4,1]},{start:[13,1]} ]
    //translate x+2, y+1
    if (cutouts) {
        cutouts.forEach(cutout => {
            const start = cutout.start;
            const end = cutout.end ?? cutout.start;
            console.log('cutout:', start, end);
            for (let x = start[0] + 2; x <= end[0] + 2; x++) {
                for (let y = start[1] + 1; y <= end[1] + 1; y++) {
                    const str = `${gridCells(x)},${gridCells(y)}`;
                    grid.delete(str);
                }
            }
        });
    }
    //todo: build map based on grid + 1 extra bottom row (inaccessible)
    //need to modify groupMapping to handle cutouts (two top left, two top right, etc)
    //...

    //todo: add items to grid/map (trees, rocks, etc) (on top of the ground)
    //? create Ground class that has sprite and type (topLeftGround, topRightGround, etc)
    //? create Item class that has sprite and type (tree, rock, etc)
    //? different items may interact with hero differently (rock can be pushed, tree can be chopped, etc)

    console.log(grid);
    return grid;
}

