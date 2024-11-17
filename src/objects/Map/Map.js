//spriteSheet is 5 high, 4 wide, 32x32 cell size

import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resource.js";
import { Sprite } from "../../sprite.js";
import { Vector2 } from "../../Vector2.js";
import { buildGrid, getGridDetails, gridCells } from "../../helpers/grid.js";
// import { cutouts } from "../../levels/level1.js";

export class Map extends GameObject {
    constructor(width, height, mapItems, cutouts, resource, resourceMapping) {
        super({});
        this.width = width ?? 13;
        this.height = height + 1 ?? 5;
        this.mapItems = mapItems ?? {};
        this.cutouts = cutouts ?? [];
        this.resource = resource ?? resources.images.spriteSheet;
        this.resourceMapping = resourceMapping ?? {};

        console.log('playablearea:', this.width, this.height - 1);
        this.playableArea = buildGrid(this.width, this.height - 1, this.cutouts);
        this.mapArea = buildGrid(this.width, this.height, this.cutouts);
        this.gridDetails = { ...getGridDetails(this.mapArea) };
        this.buildMap();
    }

    buildMap() {
        console.log('building map');
        //bottom of map is inaccessible, so need to add 1 row to the bottom (y=16+maxy) (x=minx-maxx)
        //create sprite for each map cell 
        for (const cell of this.mapArea) {
            //value is cell location (array)
            //key is frame number from spritesheet
            const [x, y] = cell.split(',').map(Number);
            const frame = this.groundMapping(x, y);
            const mapCell = new Sprite({
                resource: this.resource,
                frameSize: new Vector2(16, 16),
                frame,
                position: new Vector2(x, y),
                hFrames: 4,
                vFrames: 5
            });
            this.addChild(mapCell);
            console.log('cell added');
        }
        if (this.mapItems) {
            this.addItems();
        }
        console.log('map built');
    }

    calculateCornerCells() {
        //if grid has cutouts, will have extra corners and/or two top centers
        //need to determine which corners are missing
        //if cutout start y = minY, then top corners are missing
        //if cutout start x = minX, then left corners are missing
        //if cutout end y = maxY, then bottom corners are missing
        //if cutout end x = maxX, then right corners are missing

    }

    groundMapping(x, y) {

        const { minX, maxX, minY, maxY } = this.gridDetails;
        //todo: use cutouts to determine if grid has extra corners
        //top row
        if (y <= minY) {
            if (x == minX) {
                return this.resourceMapping.topLeftGround;
            } else if (x == maxX) {
                return this.resourceMapping.topRightGround;
            } else {
                return this.resourceMapping.topMiddleGround;
            }
        }
        //middle row
        else if (y > minY && y < maxY) {
            if (x == minX) {
                return this.resourceMapping.middleLeftGround;
            } else if (x == maxX) {
                return this.resourceMapping.middleRightGround;
            } else {
                return this.resourceMapping.middleCenterGround;
            }
        }
        //bottom row
        else {
            if (x == minX) {
                return this.resourceMapping.bottomLeftGround;
            } else if (x == maxX) {
                return this.resourceMapping.bottomRightGround;
            } else {
                return this.resourceMapping.bottomMiddleGround;
            }
        }
    }

    addItems() {
        //add items to map
        //trees, rocks, water, squares
        //this.mapItems = { trees: [{}], rocks: [{}], water: [{}], squares: [{}] }
        console.log('adding items to map');
        for (const type in this.mapItems) {
            const items = this.mapItems[type];
            items.forEach(item => {
                const frame = this.resourceMapping[type];
                const start = item.start;
                const end = item.end ?? item.start;
                for (let x = start[0] + 2; x <= end[0] + 2; x++) {
                    for (let y = start[1] + 1; y <= end[1] + 1; y++) {
                        const str = `${gridCells(x)},${gridCells(y)}`;
                        const posX = gridCells(x);
                        const posY = gridCells(y);
                        const itemCell = new Sprite({
                            resource: this.resource,
                            frameSize: new Vector2(16, 16),
                            frame,
                            position: new Vector2(posX, posY),
                            hFrames: 4,
                            vFrames: 5
                        });
                        //add item to map
                        this.addChild(itemCell);
                        //remove item from playable area
                        //todo: change this logic as some items may be interactable
                        //i.e. rod, currently is own class, probably would follow this
                        if (type !== 'treeTop') {
                            this.playableArea.delete(str);
                        }
                    }
                }
            });
        }
    }


}