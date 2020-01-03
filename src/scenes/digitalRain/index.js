let backgroundColorBuf;
export default class digitalRain {
  constructor(canvas, options) {
    this.cvs = canvas;
    this.ctx = canvas.getContext && canvas.getContext('2d');
    this.__init(options);
  }

  __init(options) {
    this.options = JSON.parse('{ "font": { "family": "Agency FB", "color": "#06EB00", "size": 16 }, "background": { "color": [0, 0, 0] }, "interval": 50 }');
    Object.prototype.toString.call(options) === '[object Object]' && (this.options = Object.assign(this.options, options));
    backgroundColorBuf = `rgba(${this.options.background.color.join(', ')}, `;
    this.backgroundColor = backgroundColorBuf + '.15)';
    this.fontsize = this.options.font.size;
    this.columns = Math.ceil(this.cvs.width / this.options.font.size);
    this.drop = [];
    for (let i = 0; i < this.columns; ++i) {
      this.drop[i] = Math.floor(Math.random() * 20);
    }
  }

  __ready() {
    this.ctx.font = `${this.options.font.size}px ${this.options.font.family}`;
  }

  __background_render(color) {
    this.ctx.fillStyle = color || this.backgroundColor;
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
  }

  __content_render() {
    this.ctx.fillStyle = this.options.font.color;
    for (let i = 0; i < this.columns; i++) {
      const figure = Math.floor(Math.random() * 10);
      this.ctx.fillText(figure, i * this.fontsize, this.drop[i] * this.fontsize);
      if (this.drop[i] * this.fontsize > this.cvs.height || Math.random() > 0.95) {
        this.drop[i] = 0;
      }
      this.drop[i]++;
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
    if (!this.timer) return;
    clearInterval(this.timer);
    // if (smooth) {
    //   for (let i = 1; i <= 20; ++i) {
    //     setTimeout(() => {
    //       this.__content_render();
    //       this.__background_render(backgroundColorBuf + (.15 + (.85 * i / 20.0)) + ')');
    //     }, (this.options.interval + 10) * i);
    //   }
    // }
    this.timer = 0;
  }
};