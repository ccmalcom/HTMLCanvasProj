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