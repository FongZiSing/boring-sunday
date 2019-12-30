import digitalRain from './scenes/digitalRain.js';

const canvas = document.getElementById('background');
canvas.width = Math.max(window.innerWidth, window.screen.width);
canvas.height = Math.max(window.innerHeight, window.screen.availHeight);

const rain = new digitalRain(canvas, 16, "Agency FB", [255, 255, 255], "#820014");
rain.onload();

const btn = document.getElementById("play");
const goon = btn.firstElementChild;
const halt = btn.lastElementChild;
goon.state = false;
halt.state = true;
btn.addEventListener('click', () => {
    (goon.state ^= true) ? (goon.style.display = 'block', rain.unload()) : (goon.style.display = 'none');
    (halt.state ^= true) ? (halt.style.display = 'block', rain.onload()) : (halt.style.display = 'none');
});