class lifeGame {
  constructor(context, row, col, size) {
    this.ctx = context;
    this.row = row;
    this.col = col;
    this.size = size;
    this.index = 0;
    this.buffer = [[], []];
    for (let i = 0; i < row; ++i) {
      this.buffer[0][i] = [];
      this.buffer[1][i] = [];
      for (let j = 0; j < col; ++j) this.buffer[0][i][j] = this.buffer[1][i][j] = 0;
    }
  }

  __surround(data, i, j) {
    let num = data[i - 1][j - 1] + data[i - 1][j] + data[i - 1][j + 1] + data[i][j - 1] + data[i][j + 1] + data[i + 1][j - 1] + data[i + 1][j] + data[i + 1][j + 1];
    return num;
  }

  __draw(i, j) {
    this.ctx.fillRect(j * this.size, i * this.size, this.size, this.size);
  }

  load(s) {
    const [offset, points] = s.split('#');
    const [dRow, dCol] = offset.split(':').map(v => parseInt(v));
    const pointSet = points.split(';').map(v => v.split(':'));
    for (let point of pointSet) {
      const row = parseInt(point[0]);
      point[1].split(',').forEach(v => {
        const col = parseInt(v);
        this.buffer[this.index][dRow + row][dCol + col] = 1;
      });
    }
  }

  update() {
    const src = this.buffer[this.index];
    let dst = this.buffer[this.index ^ 1];
    let neighbour;
    for (let i = 1; i < this.row - 1; ++i) {
      for (let j = 1; j < this.col - 1; ++j) {
        neighbour = this.__surround(src, i, j);
        if (neighbour == 2) dst[i][j] = src[i][j];
        else if (neighbour == 3) dst[i][j] = 1;
        else dst[i][j] = 0;
      }
    }
    this.index = this.index ^ 1;
  }

  render() {
    this.ctx.fillStyle = "grey";
    const dst = this.buffer[this.index];
    for (let i = 0; i < this.row; ++i)
      for (let j = 0; j < this.col; ++j)
        dst[i][j] && this.__draw(i, j);
    this.update();
  }
}


export default class Scene {
  constructor(canvas) {
    this.cvs = canvas;
    this.ctx = this.cvs.getContext('2d');
    this.lifegame = new lifeGame(this.ctx, this.cvs.height >> 2, this.cvs.width >> 2, 4);
    this.lifegame.load('2:2#0:24;1:22,24;2:12,13,20,21,34,35;3:11,15,20,21,34,35;4:0,1,10,16,20,21;5:0,1,10,14,16,17,22,24;6:10,16,24;7:11,15;8:12,13');
  }

  render() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    this.lifegame.render();
  }

  run() {
    if (this.ctx) {
      this.timer = setInterval(this.render.bind(this), 50);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }
}