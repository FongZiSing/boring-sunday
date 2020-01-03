class Shard {
    constructor(canvasCtx, x, y, len, hue, order) {
      this.ctx = canvasCtx;
      this.constant = {
        blastSpeed: 1,
        PI2: Math.PI * 2
      }
      this.orignalX = x;
      this.orignalY = y;
      this.len = len;
      this.state = false;
  
      this.x = x;
      this.y = y;
      this.color = hue;
      this.size = 4;
      this.hue = hue;
      this.angle = this.constant.PI2 * order;
      this.x += Math.cos(this.angle) * len;
      this.y += Math.sin(this.angle) * len;
      this.xSpeed = Math.cos(this.angle) * this.constant.blastSpeed;
      this.ySpeed = Math.sin(this.angle) * this.constant.blastSpeed;
    }
  
    update() {
      if (this.state) return;
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.ySpeed += 0.01;
      if(this.size >= .1) this.size -= 0.2;
      else this.state = true;
    }
  
    isEnd() {
      return this.state;
    }
  
  
    render() {
      if (this.state) return;
      const size = this.size / 2;
      this.ctx.fillStyle = `hsl(${this.hue}, 80%, 60%)`;

      this.ctx.beginPath();
      this.ctx.fillRect(this.x - size, this.y - size, this.size, this.size);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
  
  class Rocket {
    constructor(canvasCtx, rangeX, y) {
      this.ctx = canvasCtx;
      this.constant = {
        speed: 10 + Math.random() * 6,
        PI2: Math.PI * 2,
        PI15_32: Math.PI * 15 / 32,
        PI_16: Math.PI / 16
      }
      this.orignal = { rangeX, y };
      this.init(rangeX, y);
    }
  
    init(rangeX, y) {
      this.x = rangeX[0] + Math.floor(Math.random() * (rangeX[1] - rangeX[0]));
      this.y = y;
      this.hue = Math.floor(Math.random() * 360);
      this.size = 2;
      this.angle = this.constant.PI15_32 + Math.random() * this.constant.PI_16;
      this.xSpeed = Math.cos(this.angle) * (this.constant.speed);
      this.ySpeed = -Math.sin(this.angle) * this.constant.speed;
  
      this.shardCount = 25 + Math.floor(Math.random() * 5);
      this.shards ? (this.shards.length = 0) : (this.shards = []);
    }
  
    update() {
      if (this.ySpeed < 0) {
        this.x = this.x + this.xSpeed;
        this.y = this.y + this.ySpeed;
        this.ySpeed += 0.15;
        this.size -= 0.01;
      } else {
        !this.shards.length && this.explode();
        if(this.shards[0].isEnd()) this.init(this.orignal.rangeX, this.orignal.y);
      }
    }
  
    render() {
      this.ctx.save();
      if (!this.shards.length) {
        this.ctx.fillStyle = `hsl(${this.hue}, 100%, 40%)`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this.constant.PI2);
        this.ctx.closePath();
        this.ctx.fill();
      } else {
        this.shards.forEach(obj => {
          obj.update();
          obj.render();
        });
      }
      this.ctx.restore();
    }
  
    explode() {
      const range = 20 + 40 * Math.random();
      const outter = this.shardCount;
    //   const inner = Math.floor(this.shardCount * .5);
      for (let i = 0; i < outter; ++i) {
        this.shards.push(new Shard(this.ctx, this.x, this.y, range, this.hue, i / outter));
      }
    //   for(let i = 0; i < inner; ++i) {
    //     this.shards.push(new Shard(this.ctx, this.x, this.y, range-20-10*Math.random(), this.hue, i / inner))
    //   }
    }
  }
  
  
  
  
  export default class fireWork {
    constructor(canvasElem) {
      this.cvs = canvasElem;
      this.ctx = canvasElem.getContext && this.cvs.getContext('2d');
      this.interval = 20;
  
      this.firework = [];
      this.fireworkNum = 45;
      for (let i = 0; i < this.fireworkNum; ++i) {
        this.firework.push(new Rocket(this.ctx, [this.cvs.width / 5, this.cvs.width * 4 / 5], this.cvs.height));
      }
      this.ctx.fillStyle = 'rgb(0, 0, 0)';
      this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    }
  
    run() {
      if (this.ctx) {
        this.timer = setInterval(this.render.bind(this), this.interval);
      }
    }
  
    stop() {
      if (!this.timer) return;
      clearInterval(this.timer);
    }
  
    render() {
      this.ctx.fillStyle = 'rgb(0,0,0)';
      this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
      this.firework.forEach(obj => {
        obj.update();
        obj.render();
      });
    }
  };