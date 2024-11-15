export class Animations {
    // patterns = obj
    constructor(patterns) {
        this.patterns = patterns;
        this.activeKey = Object.keys(this.patterns)[0];
    }

    get frame() {
        return this.patterns[this.activeKey].frame;
    }

    play(key, startAtTime = 0) {
        //check if already playing
        if (this.activeKey === key) {
            return;
        }
        //Switch
        this.activeKey = key;
        this.patterns[this.activeKey].currentTime = startAtTime;
    }

    step(delta) {
        this.patterns[this.activeKey].step(delta);
    }
}