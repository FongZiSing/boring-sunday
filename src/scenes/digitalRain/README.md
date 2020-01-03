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
  background: {
    color: [255, 255, 255]
  },
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
    background: {
        color: [0, 0, 0],
        fn: () => { "to be continue..." }
    },
    interval: 50
}
```
<br/>

##### :green_book: options table
option | type | includes
------ | ---- | --------
font | Object | `font.family`: default **Agency FB**<br/>`font.color`: default <font color='#06EB00'>#820014</font><br/>`font.size`: default **16px**
background | Object | `background.color`: <font color='red'>R</font><font color='green'>G</font><font color='blue'>B</font>, defalut **[0, 0, 0]**<br/>`background.fn`: custom background drawing function, maybe supported next time.
interval | Number | default **50**
