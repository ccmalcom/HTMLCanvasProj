import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { events } from "../../Events";


export class Rod extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });
        const sprite = new Sprite({
            resource: resources.images.rod,
            position: new Vector2(0, -5),
        });
        this.addChild(sprite);

        events.on("HERO_POSITION", this, pos => {
            //detect overlap
            const roundedHeroX = Math.round(pos.x);
            const roundedHeroY = Math.round(pos.y);

            if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
                //overlap
                console.log('hero has found the rod');
                this.onCollideWithHero();
            }
        });
    }

    onCollideWithHero() {
        //remove the rod
        this.destroy();
        //emit event
        events.emit("HERO_PICKS_UP_ITEM", {
            image: resources.images.rod,
            position: this.position
        });
    }

}