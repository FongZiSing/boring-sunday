## A Simple Firework
&emsp;Boring


<br/>


### How to use

##### :one: create
```js
import fireWork from './fireWork/index.js';

const canvas = document.getElementById('myCanvasId');
const firework = new fireWork(canvas, {
  count: 30,
  background: 'black',
  interval: 20,
  launch: {
    x0: this.cvs.width / 5,
    x1: this.cvs.width * 4 / 5,
    y: this.cvs.height
  }
});
```
<br/>

##### :two: start

```js
firework.run();
```
<br/>

##### :three: suspend

```js
firework.stop();
```
<br/>

##### :arrows_counterclockwise: It supports restart

```js
// start
firework.run();

// suspend
firework.stop();

// restart
firework.run();
```


<br/>


### About Options

##### :closed_book: It must be an object
&emsp;Example
```js
{
  count: 30,
  background: 'black',
  interval: 20,
  launch: {
    x0: this.cvs.width / 5,
    x1: this.cvs.width * 4 / 5,
    y: this.cvs.height
  }
}
```
<br/>

##### :green_book: options table
option | type | default
------ | ---- | --------
count | *Number* | `30`
background | *String* | `black`
interval | *Number* | `20`
launch | *Number* |`launch.x0`: `this.cvs.width / 5`<br/>`launch.x1`: `this.cvs.width * 4 / 5`<br/>`launch.y`: `this.cvs.height`
