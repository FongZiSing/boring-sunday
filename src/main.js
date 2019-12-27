import digitalRain from './digitalRain.js';

const rain = new digitalRain('background', 16, "Agency FB", [255, 255, 255], "#820014");
rain.onload();

let btn = document.getElementById("button-start");
btn.addEventListener('click', () => rain.unload());