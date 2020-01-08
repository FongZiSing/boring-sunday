const PI = Math.PI;
const PI2 = Math.PI * 2;
const PI7_8 = Math.PI * 7 / 8;
const PI15_32 = Math.PI * 15 / 32;
const PI_16 = Math.PI / 16;

class Shape {
  constructor() { this.Set = []; }
  push(func) { this.Set.push(func); }
  random() { return this.Set[Math.floor(Math.random() * this.Set.length)]; }
};



function circle(θ) {
  return 1;
}

function cardioid(θ) {
  return 1 + Math.sin(θ);
}

const rose = [];
function roseCurve(θ, n = 3) {
  rose[n] || (rose[n] = {});
  rose[n][θ] || (rose[n][θ] = Math.sin(n * θ));
  return rose[n][θ];
};

const butterfly = {};
function butterflyCurve(θ) {
  butterfly[θ] || (butterfly[θ] = Math.exp(Math.cos(θ)) - 2 * Math.cos(4 * θ) + Math.pow(Math.sin(θ / 12), 5));
  return butterfly[θ];
}

const lemn = {};
function lemniscate(θ) {
  lemn[θ] || (lemn[θ] = Math.sqrt(Math.cos(2 * θ)));
  return lemn[θ];
}

const myShapeSet = new Shape();
myShapeSet.push({ func: circle, scope: [0, PI2] });
myShapeSet.push({ func: cardioid, scope: [0, PI2] });
myShapeSet.push({ func: function (θ) { return roseCurve(θ, 3); }, scope: [0, PI] });
myShapeSet.push({ func: function (θ) { return roseCurve(θ, 2); }, scope: [0, PI2] });
myShapeSet.push({ func: function (θ) { return roseCurve(θ, 5); }, scope: [0, PI] });
myShapeSet.push({ func: function (θ) { return roseCurve(θ, 1.5); }, scope: [0, 2 * PI2] });
myShapeSet.push({ func: lemniscate, scope: [0, PI2] });
myShapeSet.push({ func: butterflyCurve, scope: [0, PI2] });



class Shard {
  constructor(context, size, lightness, color, angle, speed, shape, frame) {
    this.ctx = context;
    this.maxSize = size;
    this.maxLightness = lightness;
    this.color = color;
    this.angle = angle;
    this.shape = shape;
    this.speed = speed;
    this.frame = frame;
    this.speedX = speed * shape(angle) * Math.cos(angle);
    this.speedY = speed * shape(angle) * Math.sin(angle);
  }

  __linear(src, dst, coeff) {
    return src + (dst - src) * coeff;
  }

  __update() {
    this.index++;
    if (this.index >= this.frame) {
      this.feedback && this.feedback('finish');
    } else {
      const coeff = this.index / this.frame;
      const param1 = coeff * coeff;
      const param2 = Math.sin(this.__linear(0, PI7_8, coeff));
      this.x += this.__linear(this.speedX, 0, param1);
      this.y += this.__linear(this.speedY, 0, param1);
      this.lightness = Math.floor(this.__linear(0, this.maxLightness, param2));
      this.size = Math.floor(this.__linear(0, this.maxSize, param2));
    }
  }

  bomb(x, y) {
    this.feedback && this.feedback('exploding');
    this.x = x;
    this.y = y;
    this.lightness = 0;
    this.size = 0;
    this.index = 0;
  }

  render() {
    this.ctx.fillStyle = `hsl(${this.color}, 100%, ${this.lightness}%)`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, PI2);
    this.ctx.fill();
    this.__update();
  }
}



class Rocket {
  constructor(context, range, altitude, shardNum) {
    this.ctx = context;
    this.range = range;
    this.altitude = altitude;
    this.shardNum = shardNum;
    this.restart();

    this.shards = [];
    const maxSize = 2.5;
    const maxLightness = 40;
    const speed = 2;
    const { func, scope } = myShapeSet.random();
    const frame = 50;
    for (let i = 0; i < this.shardNum; ++i) {
      const angle = scope[0] + scope[1] * i / this.shardNum;
      this.shards.push(new Shard(this.ctx, maxSize, maxLightness, this.color, angle, speed, func, frame));
    }
    this.shards[this.shards.length - 1].feedback = this.__guard.bind(this);
  }


  restart() {
    const speed = 10 + Math.random() * 6;
    const angle = PI15_32 + Math.random() * PI_16;
    this.xSpeed = Math.cos(angle) * speed;
    this.ySpeed = -Math.sin(angle) * speed;
    this.color = Math.floor(Math.random() * 360);
    this.size = 2;
    this.x = this.range[0] + Math.floor(Math.random() * (this.range[1] - this.range[0]));
    this.y = this.altitude;
    this.state = 'waiting';
  }

  __guard(state) {
    this.state = state;
  }

  __update() {
    if (this.ySpeed < 0) {
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.ySpeed += 0.15;
      this.size -= 0.01;
    }
    else if (this.state == 'finish')
      this.restart();
    else if (this.state == 'waiting')
      this.shards.forEach(shard => shard.bomb(this.x, this.y));
  }

  render = () => {
    if (this.state == 'exploding') {
      this.shards.forEach(Shard => Shard.render());
    }
    else {
      this.ctx.fillStyle = `hsl(${this.color}, 100%, 40%)`;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, PI2);
      this.ctx.fill();
    }
    this.__update();
  }
}

export default class Scene {
  constructor(canvas) {
    this.cvs = canvas;
    this.ctx = this.cvs.getContext('2d');
    const range = [this.cvs.width / 2, this.cvs.width / 2];
    const altitude = this.cvs.height;
    const rocketNum = 12;
    const shardNum = 50;
    this.firework = [];
    for (let i = 0; i < rocketNum; ++i) {
      this.firework.push(new Rocket(this.ctx, range, altitude, shardNum));
    }
  }

  render() {
    this.ctx.fillStyle = "rgba(0, 0, 0, .4)";
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    this.firework.forEach(rocket => rocket.render());
  }

  run() {
    if (this.ctx) {
      this.timer = setInterval(this.render.bind(this), 10);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }
};
