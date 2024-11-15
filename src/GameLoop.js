export class GameLoop {
    constructor(update, render) {

        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60; // 60fps

        this.update = update;
        this.render = render;

        this.rafId = null;
        this.running = false;
    }

    mainLoop = (timeStamp) => {
        if (!this.running) {
            return;
        }

        let deltaTime = timeStamp - this.lastFrameTime;
        this.lastFrameTime = timeStamp;

        // accumulate time since last frame
        this.accumulatedTime += deltaTime;

        // update game logic as we accumulate time
        while (this.accumulatedTime >= this.timeStep) {
            // console.log('update');
            this.update(this.timeStep);
            this.accumulatedTime -= this.timeStep;
        }

        this.render();
        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.rafId = requestAnimationFrame(this.mainLoop);
        }
    }

    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.running = false;
    }
}