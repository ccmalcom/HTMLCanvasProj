import { Vector2 } from './Vector2.js';
import { GameObject } from './GameObject.js';

export class Sprite extends GameObject {
    constructor({
        resource, //image we want to draw
        frameSize, //size of the frame in the sprite sheet
        hFrames, //number of horizontal frames
        vFrames, //number of vertical frames
        frame, //frame we want to show
        scale, // how large to draw
        position, // where to draw
        animations
    }) {
        super({});
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16, 16);
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0, 0);
        this.animations = animations ?? null;
        this.buildFrameMap();
    }

    buildFrameMap() {
        let frameCount = 0;
        for (let v = 0; v < this.vFrames; v++) {
            for (let h = 0; h < this.hFrames; h++) {
                this.frameMap.set(
                    frameCount,
                    new Vector2(h * this.frameSize.x, v * this.frameSize.y)
                );
                frameCount++;
            }
        }
    }

    step(delta) {
        if (!this.animations) {
            return;
        }
        this.animations.step(delta);
        this.frame = this.animations.frame;
    }

    drawImage(ctx, x, y) {
        if (!this.resource.isLoaded) {
            return;
        }
        let frameCoordX, frameCoordY = 0;
        const frame = this.frameMap.get(this.frame);
        if (frame) {
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;

        ctx.drawImage(
            this.resource.img, //image we want to draw
            frameCoordX, //x position of the frame
            frameCoordY, //y position of the frame
            frameSizeX, // how much to crop from sprite sheet
            frameSizeY,
            x, // where to draw on the canvas
            y,
            frameSizeX * this.scale, // how large 
            frameSizeY * this.scale
        )
    }
}