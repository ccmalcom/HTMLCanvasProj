import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { events } from "../../Events";

export class Inventory extends GameObject {
    constructor() {
        super({
            position: new Vector2(0, 1)
        });
        this.nextId = 0;
        this.items = [

        ]

        //React to hero picking up item
        events.on("HERO_PICKS_UP_ITEM", this, data => {
            this.nextId++;
            this.items.push({
                id: this.nextId,
                image: resources.images.rod
            })
            console.log('rod added to inventory');
            this.renderInventory();
        });

        //draw initial state on boot
        this.renderInventory();
    }

    renderInventory() {
        //first clear stale items
        this.children.forEach(child => {
            child.destroy();
        });

        //render new items
        this.items.forEach((item, index) => {
            const sprite = new Sprite({
                resource: item.image,
                position: new Vector2(12 * index, 0),
            });
            this.addChild(sprite);
        });
    }

    removeFromInventory(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.renderInventory();
    }

}