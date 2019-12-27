import { digitalRain } from './digitalRain.js';

const rain = new digitalRain('digitalRain', 16, "Agency FB", "rgba(255, 255, 255, 0.15)", "#820014");
rain.onload();