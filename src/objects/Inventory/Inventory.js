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


        //React to hero picking up item
        events.on("HERO_PICKS_UP_ITEM", this, data => {
            //show something on screen
            const sprite = new Sprite({
                resource: resources.images.rod,
            });
            this.addChild(sprite);

        });
    }

}