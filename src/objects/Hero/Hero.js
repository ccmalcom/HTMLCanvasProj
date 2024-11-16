import { GameObject } from "../../GameObject.js";
import { Vector2 } from "../../Vector2.js";
import { DOWN, LEFT, RIGHT, UP } from "../../Input.js";
import { Sprite } from "../../sprite.js";
import { resources } from "../../Resource.js";
import { Animations } from "../../Animations.js";
import { FrameIndexPattern } from "../../FrameIndexPattern.js";
import { WALK_DOWN, WALK_UP, WALK_LEFT, WALK_RIGHT, STAND_DOWN, STAND_UP, STAND_LEFT, STAND_RIGHT, PICK_UP_DOWN } from "./HeroAnimations.js";
import { moveTowards } from "../../helpers/moveTowards.js";
import { events } from "../../Events.js";




export class Hero extends GameObject {
    constructor(x, y, grid) {
        super({
            position: new Vector2(x, y)
        })

        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -21),
        });
        this.addChild(shadow);

        this.body = new Sprite({
            resource: resources.images.hero,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -20),
            hFrames: 3,
            vFrames: 8,
            frame: 1,
            animations: new Animations({
                walkDown: new FrameIndexPattern(WALK_DOWN),
                walkUp: new FrameIndexPattern(WALK_UP),
                walkLeft: new FrameIndexPattern(WALK_LEFT),
                walkRight: new FrameIndexPattern(WALK_RIGHT),
                standDown: new FrameIndexPattern(STAND_DOWN),
                standUp: new FrameIndexPattern(STAND_UP),
                standLeft: new FrameIndexPattern(STAND_LEFT),
                standRight: new FrameIndexPattern(STAND_RIGHT),
                pickUpDown: new FrameIndexPattern(PICK_UP_DOWN)
            })
        });
        this.addChild(this.body);

        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
        this.itemPickupTime = 0;
        this.itemPickupShell = null;
        this.grid = grid;
        this.gridSize = 16;

        events.on("HERO_PICKS_UP_ITEM", this, data => {
            this.onPickupItem(data);
        })
    }

    step(delta, root) {

        if (this.itemPickupTime > 0) {
            this.workOnItemPickup(delta);
            return;
        }

        const distance = moveTowards(this, this.destinationPosition, 1);
        const hasArrived = distance <= 1;
        if (hasArrived) {
            this.tryMove(root);
        }
        this.tryEmitPosition();
    }

    tryEmitPosition() {
        // only emit if the hero has moved
        if (this.lastX === this.position.x && this.lastY === this.position.y) return;
        this.lastX = this.position.x;
        this.lastY = this.position.y;
        events.emit('HERO_POSITION', this.position);
    }

    tryMove(root) {
        const { input } = root;
        if (!input.direction) {
            switch (this.facingDirection) {
                case UP:
                    this.body.animations.play('standUp');
                    break;
                case DOWN:
                    this.body.animations.play('standDown');
                    break;
                case LEFT:
                    this.body.animations.play('standLeft');
                    break;
                case RIGHT:
                    this.body.animations.play('standRight');
                    break;
            }
            return;
        }

        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        switch (input.direction) {
            case UP:
                nextY -= this.gridSize;
                this.body.animations.play('walkUp');
                break;
            case DOWN:
                nextY += this.gridSize;
                this.body.animations.play('walkDown');
                break;
            case LEFT:
                nextX -= this.gridSize;
                this.body.animations.play('walkLeft');
                break;
            case RIGHT:
                nextX += this.gridSize;
                this.body.animations.play('walkRight');
                break;
        }
        this.facingDirection = input.direction ?? this.facingDirection;

        // Validate the move against the map grid
        const nextPositionKey = `${nextX},${nextY}`;
        if (this.grid.has(nextPositionKey)) {
            this.destinationPosition.x = nextX;
            this.destinationPosition.y = nextY;
        } else {
            console.log("Move blocked: not in grid");
        }

        // if (isSpaceFree(walls, nextX, nextY)) {
        //     this.destinationPosition.x = nextX;
        //     this.destinationPosition.y = nextY;
        // }

    }

    onPickupItem({ image, position }) {
        //ensure hero is close to the item
        this.destinationPosition = position.duplicate();

        //start the pickup animation
        this.itemPickupTime = 1000;

        //create a shell of the item
        this.itemPickupShell = new GameObject({})
        this.itemPickupShell.addChild(new Sprite({
            resource: image,
            position: new Vector2(0, -18)
        }))
        this.addChild(this.itemPickupShell);
    }

    // if hero has more actions, create state machine
    // i.e. this.state = 'idle', 'walking', 'pickingUp', 'dropping', 'attacking', 'defending'
    workOnItemPickup(delta) {
        this.itemPickupTime -= delta;
        this.body.animations.play('pickUpDown');

        if (this.itemPickupTime <= 0) {
            this.itemPickupShell.destroy();
        }
    }
}