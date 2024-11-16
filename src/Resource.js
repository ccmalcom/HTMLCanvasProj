// Purpose: Load all the images we need for the game for html canvas
class Resources {
    constructor() {
        //everything we need to load
        this.toLoad = {
            sky: "sprites/sky.png",
            ground: "sprites/ground.png",
            hero: "sprites/hero-sheet.png",
            shadow: "sprites/shadow.png",
            rod: "sprites/rod.png",
            spriteSheet: "sprites/spritesheet.png"
        }

        //bucket for loaded images
        this.images = {};

        //Load all the images
        Object.keys(this.toLoad).forEach((key) => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                img: img,
                isLoaded: false
            }
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        });
    }
}

export const resources = new Resources();