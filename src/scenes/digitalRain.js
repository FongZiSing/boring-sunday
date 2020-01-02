export default class digitalRain {
  constructor(canvasElem, fontSize, fontFamily, backgroundColor, digitalColor) {
    this.cvs = canvasElem;
    this.ctx = canvasElem.getContext && this.cvs.getContext('2d');
    this.interval = 45;
    this.font = {
      original: { size: fontSize, family: fontFamily, color: digitalColor },
      default: `${fontSize}px ${fontFamily}`
    }
    this.bgcolor = {
      original: backgroundColor,
      feature: `rgba(${backgroundColor.join(',')},`,
      default: `rgba(${backgroundColor.join(',')}, .15)`
    };

    this.columns = Math.ceil(this.cvs.width / fontSize);
    this.drop = [];
    for (let i = 0; i < this.columns; ++i) {
      this.drop[i] = Math.floor(Math.random() * 20);
    }
  }

  onload() {
    if (this.ctx) {
      this.timer = setInterval(this.render.bind(this), this.interval);
    }
  }

  unload(smooth) {
    if (!this.timer) return;
    clearInterval(this.timer);
    if (smooth) {
      for (let i = 1; i <= 20; ++i) {
        setTimeout(() => {
          this.contentRender();
          this.backgroundRender(this.bgcolor.feature + (.15 + (.85 * i / 20.0)) + ')');
        }, (this.interval + 10) * i);
      }
    }

    this.timer = undefined;
  }

  backgroundRender(color) {
    this.ctx.fillStyle = color || this.bgcolor.default;
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
  }

  contentRender() {
    this.ctx.fillStyle = this.font.original.color;
    this.ctx.font = this.font.default;
    for (let i = 0; i < this.columns; i++) {
      let figure = Math.floor(Math.random() * 10);
      this.ctx.fillText(figure, i * this.font.original.size, this.drop[i] * this.font.original.size);
      if (this.drop[i] * this.font.original.size > this.cvs.height || Math.random() > 0.95) {
        this.drop[i] = 0;
      }
      this.drop[i]++;
    }
  }

  render() {
    this.backgroundRender();
    this.contentRender();
  }
};