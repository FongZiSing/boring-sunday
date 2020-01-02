import digitalRain from './scenes/digitalRain.js';
import fireWork from './scenes/fireWorks.js';
import scenesPool from './scenes/scenesPool.js'

const canvas = document.getElementById('background');
canvas.width = Math.max(window.innerWidth, window.screen.width);
canvas.height = Math.max(window.innerHeight, window.screen.availHeight);

const scenes = new scenesPool();
scenes.register('digitalRain', new digitalRain(canvas, 16, "Agency FB", [255, 255, 255], "#820014"));
scenes.register('fireWork', new fireWork(canvas));
scenes.play();


const btnPrev = document.getElementById("button__prev");
btnPrev.addEventListener('click', () => scenes.prev());

const btnNext = document.getElementById("button__next");
btnNext.addEventListener('click', () => scenes.next());

const btnPlay = document.getElementById("button__play");
const goon = btnPlay.firstElementChild;
const halt = btnPlay.lastElementChild;
goon.state = false;
halt.state = true;
btnPlay.addEventListener('click', () => {
  (goon.state ^= true) ? (goon.style.display = 'block', scenes.stop()) : (goon.style.display = 'none');
  (halt.state ^= true) ? (halt.style.display = 'block', scenes.play()) : (halt.style.display = 'none');
});


