export default class scenesPool {
  constructor() {
    this.scenes = [];
    this.current = -1;
    this.running = false;
  }

  find(key) {
    const scene = this.scenes.filter(v => v.key == key);
    return !!scene;
  }

  play() {
    !this.running && this.scenes[this.current] && this.scenes[this.current].scene.run();
    this.running = true;
  }

  stop() {
    this.scenes[this.current] && this.scenes[this.current].scene.stop();
    this.running = false;
  }

  register(key, scene) {
    // console.log(scene);
    this.scenes.push({ key, scene });
    if (this.current === -1) this.current = 0;
  }

  next() {
    this.scenes[this.current].scene.stop();
    this.current = (this.current + 1) % this.scenes.length;
    this.scenes[this.current].scene.run();
    this.running = true;
  }

  prev() {
    this.scenes[this.current].scene.stop();
    this.current = (this.scenes.length + this.current - 1) % this.scenes.length;
    this.scenes[this.current].scene.run();
    this.running = true;
  }
}