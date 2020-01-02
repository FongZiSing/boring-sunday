export default class scenesPool {
    constructor() {
        this.scenes = [];
        this.current = -1;
        this.running = false;
    }

    find(key) {
        const scene = this.scenes.filter(v => v.key == key);
        return !! scene;
    }

    play() {
        !this.running && this.scenes[this.current] && this.scenes[this.current].scene.onload();
        this.running = true;
    }

    stop() {
        this.scenes[this.current] && this.scenes[this.current].scene.unload();
        this.running = false;
    }

    register(key, scene) {
        this.scenes.push({ key, scene });
        if(this.current === -1)  this.current = 0;
    }

    next() {
        this.scenes[this.current].scene.unload();
        this.current = (this.current + 1) % this.scenes.length;
        this.scenes[this.current].scene.onload();
        this.running = true;
    }

    prev() {
        this.scenes[this.current].scene.unload();
        this.current = (this.scenes.length + this.current - 1) % this.scenes.length;
        this.scenes[this.current].scene.onload();
        this.running = true;
    }
}