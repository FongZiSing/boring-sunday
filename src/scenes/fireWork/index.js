const PI2 = Math.PI * 2;
class Shard {
  constructor(context, x, y, len, hue, order) {
    this.ctx = context;
    this.len = len;
    this.angle = PI2 * order;
    this.xSpeed = Math.cos(this.angle);
    this.ySpeed = Math.sin(this.angle);
    this.__prepare(x, y, hue);
  }

  __prepare(x, y, hue) {
    this.x = x + Math.cos(this.angle) * this.len;
    this.y = y + Math.sin(this.angle) * this.len;
    this.size = 4;
    this.half = 2;
    this.hue = hue;
    this.ready = true;
  }

  __update() {
    if (this.ready) {
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      if (this.size > .2) {
        this.size = this.size - .2;
        this.half = this.half - .1;
      } else
        this.ready = false;
      return true;
    }
  }

  render = () => {
    if (this.__update()) {
      this.ctx.fillStyle = `hsl(${this.hue}, 80%, 60%)`;
      this.ctx.beginPath();
      this.ctx.fillRect(this.x - this.half, this.y - this.half, this.size, this.size);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
}

class Rocket {
  constructor(context, x0, x1, y) {
    this.ctx = context;
    this.orignal = { x0, x1, y, θ: Math.PI * 15 / 32, dθ: Math.PI / 16 };
    this.explode = false;
    this.shardNum = 20 + Math.floor(Math.random() * 10);
    this.shards = [];
    this.__prepare();
  }

  __prepare() {
    this.x = this.orignal.x0 + Math.floor(Math.random() * (this.orignal.x1 - this.orignal.x0));
    this.y = this.orignal.y;
    this.size = 2;
    this.hue = Math.floor(Math.random() * 360);
    this.angle = this.orignal.θ + Math.random() * this.orignal.dθ;
    this.speed = 10 + Math.random() * 6;
    this.xSpeed = Math.cos(this.angle) * this.speed;
    this.ySpeed = -Math.sin(this.angle) * this.speed;
  }

  __explode() {
    const sphere = 20 + 30 * Math.random();
    for (let i = 0; i < this.shardNum; ++i) {
      this.shards.push(new Shard(this.ctx, this.x, this.y, sphere, this.hue, i / this.shardNum));
    }
  }

  __explode_again() {
    this.shards.forEach(shard => shard.__prepare(this.x, this.y, this.hue));
  }

  __update() {
    if (this.ySpeed < 0) {
      this.x = this.x + this.xSpeed;
      this.y = this.y + this.ySpeed;
      this.ySpeed += 0.15;
      this.size -= 0.01;
    } else {
      this.shards.length ? this.__explode_again() : this.__explode();
      this.explode = true;
    }
  }

  render = () => {
    this.ctx.save();
    if (this.explode) {
      this.shards.forEach(shard => (shard.render(), !shard.ready && (this.explode = false, this.__prepare())));
    } else {
      this.__update();
      this.ctx.fillStyle = `hsl(${this.hue}, 100%, 40%)`;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, PI2);
      this.ctx.closePath();
      this.ctx.fill();
    }
    this.ctx.restore();
  }
}

export default class fireWork {
  constructor(canvas, options) {
    this.cvs = canvas;
    this.ctx = this.cvs.getContext('2d');
    this.__init(options);
  }

  __init(options) {
    this.options = JSON.parse('{ "count": 30, "background": "black", "interval": 20 }');
    this.options.launch = { x0: this.cvs.width / 5, x1: this.cvs.width * 4 / 5, y: this.cvs.height };
    options && Object.prototype.toString.call(options) === '[object Object]' && (this.options = Object.assign(this.options, options));
    this.firework = [];
    for (let i = 0; i < this.options.count; ++i) {
      this.firework.push(new Rocket(this.ctx, this.options.launch.x0, this.options.launch.x1, this.options.launch.y));
    }
  }

  render = () => {
    this.ctx.fillStyle = this.options.background;
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    this.firework.forEach(rocket => rocket.render());
  }

  run() {
    if (this.ctx) {
      this.timer = setInterval(this.render, this.options.interval);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }
};