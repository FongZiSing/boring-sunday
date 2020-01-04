## A Simple Digital Rain
&emsp;Boring


<br/>


### How to use

##### :one: create
```js
import digitalRain from './digitalRain/index.js';

const canvas = document.getElementById('myCanvasId');
const rain = new digitalRain(canvas, {
  font: {
    family: 'Agency FB',
    color: '#820014',
    size: 16
  },
  background: 'rgba(255, 255, 255, .15)',
  interval: 50
});
```
<br/>

##### :two: start

```js
rain.run();
```
<br/>

##### :three: suspend

```js
rain.stop();
```
<br/>

##### :arrows_counterclockwise: It supports restart

```js
// start
rain.run();

// suspend
rain.stop();

// restart
rain.run();
```


<br/>


### About Options

##### :closed_book: It must be an object
&emsp;Example
```js
{
  font: {
    family: "Agency FB",
    color: "#06EB00",
    size: 16
  },
  background: 'rgba(0, 0, 0, .15)',
  interval: 50
}
```
<br/>

##### :green_book: options table
option | type | default
------ | ---- | --------
font | *Object* | `font.family`: `Agency FB`<br/>`font.color`: `#06EB00`<br/>`font.size`: `16px`
background | *String* | `rgba(0, 0, 0, .15)`
interval | *Number* | `50`
