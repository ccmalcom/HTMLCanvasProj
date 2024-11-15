import { Vector2 } from "./Vector2.js";

export class GameObject {
    constructor({ position }) {
        this.position = position ?? new Vector2(0, 0);
        this.children = [];
    }

    stepEntry(delta, root) {
        //call updates on all children first
        this.children.forEach(child => {
            child.stepEntry(delta, root);
        });

        //call the step function on the object
        this.step(delta, root);
    }


    //called once per frame
    step(_delta) {

    }

    draw(ctx, x, y) {
        //draw where the object is
        const drawPosX = this.position.x + x;
        const drawPosY = this.position.y + y;

        //render images
        this.drawImage(ctx, drawPosX, drawPosY);

        //pass draw call to children
        //children are drawn on top of the parent
        this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));


    }

    drawImage(ctx, drawPosX, drawPosY) {

    }

    addChild(gameObject) {
        this.children.push(gameObject);
    }

    removeChild(gameObject) {
        this.children = this.children.filter(child => child !== gameObject);
    }
}