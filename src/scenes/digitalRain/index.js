const drop = [];
export default class digitalRain {
  constructor(canvas, options) {
    this.cvs = canvas;
    this.ctx = canvas.getContext('2d');
    this.__init(options);
  }

  __init(options) {
    this.options = JSON.parse('{ "font": { "family": "Agency FB", "color": "#06EB00", "size": 16 }, "background": "rgba(0, 0, 0, .15)", "interval": 50 }');
    options && Object.prototype.toString.call(options) === '[object Object]' && (this.options = Object.assign(this.options, options));
    this.columns = Math.ceil(this.cvs.width / this.options.font.size);
    for (let i = 0; i < this.columns; ++i) {
      drop[i] = Math.floor(Math.random() * 20);
    }
  }

  __ready() {
    this.ctx.font = `${this.options.font.size}px ${this.options.font.family}`;
  }

  __background_render() {
    this.ctx.fillStyle = this.options.background;
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
  }

  __content_render() {
    this.ctx.fillStyle = this.options.font.color;
    for (let i = 0; i < this.columns; i++) {
      const figure = Math.floor(Math.random() * 10);
      this.ctx.fillText(figure, i * this.options.font.size, drop[i] * this.options.font.size);
      if (drop[i] * this.options.font.size > this.cvs.height || Math.random() > .95)
        drop[i] = 0;
      else
        drop[i]++;
    }
  }

  render = () => {
    this.__background_render();
    this.__content_render();
  }

  run = () => {
    if (this.ctx && !this.timer) {
      this.__ready();
      this.timer = setInterval(this.render, this.options.interval);
    }
  }

  stop = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }
};