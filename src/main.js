import digitalRain from './scenes/digitalRain/index.js';
import fireWork from './scenes/fireWork/index.js';
import lifeGame from './scenes/lifeGame/index.js';
import scenesPool from './scenes/scenesPool.js';


const canvas = document.getElementById('background');
canvas.width = Math.max(window.innerWidth, window.screen.width);
canvas.height = Math.max(window.innerHeight, window.screen.availHeight);

const scenes = new scenesPool();
scenes.register('lifeGame', new lifeGame(canvas));
scenes.register('fireWork', new fireWork(canvas));
scenes.register('digitalRain', new digitalRain(canvas));
scenes.play();


const btnPlay = document.getElementById("button__play");
const goon = btnPlay.firstElementChild;
const halt = btnPlay.lastElementChild;
goon.state = false;
halt.state = true;
btnPlay.addEventListener('click', () => {
  (goon.state ^= true) ? (goon.style.display = 'block', scenes.stop()) : (goon.style.display = 'none');
  (halt.state ^= true) ? (halt.style.display = 'block', scenes.play()) : (halt.style.display = 'none');
});

const btnPrev = document.getElementById("button__prev");
btnPrev.addEventListener('click', () => {
  scenes.prev();
  if (goon.state && !halt.state) {
    goon.state ^= true;
    halt.state ^= true;
    goon.style.display = 'none';
    halt.style.display = 'block';
  }
});

const btnNext = document.getElementById("button__next");
btnNext.addEventListener('click', () => {
  scenes.next();
  if (goon.state && !halt.state) {
    goon.state ^= true;
    halt.state ^= true;
    goon.style.display = 'none';
    halt.style.display = 'block';
  }
});
