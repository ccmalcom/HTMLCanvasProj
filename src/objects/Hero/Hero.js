import { GameObject } from "../../GameObject";

export class Hero extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        })
    }

}