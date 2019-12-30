export default class digitalRain {
    constructor(canvasElem, fontSize, fontFamily, backgroundColor, digitalColor) {
        this.cvs = canvasElem;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.backgroundColor = backgroundColor;
        this.backgroundColorString = 'rgba(' + backgroundColor.join(', ') + ', 0.15)';
        this.digitalColor = digitalColor;

        this.columns = Math.ceil(this.cvs.width / fontSize);
        this.drop = [];

        for (let i = 0; i < this.columns; ++i) {
            this.drop[i] = Math.floor(Math.random() * 18);
        }
    }

    onload() {
        if (this.cvs.getContext) {
            this.ctx = this.cvs.getContext('2d');
            window.onload ? (window.onload = this.__onload.bind(this)) : this.__onload();
        }
    }

    __onload() {
        this.timer = setInterval(this.render.bind(this), 50);
    }

    unload() {
        this.timer && this.__unload();
    }

    __unload() {
        clearInterval(this.timer);
        let endingColor = 'rgba(' + this.backgroundColor.join(', ') + ', ';
        for (let i = 1; i <= 20; ++i) {
            setTimeout(() => {
                this.backgroundRender(endingColor + (0.15 + (0.85 * i / 20)) + ')');
                this.contentRender();
            }, (50 + i) * i);
        }
        for (let i = 0; i <= 20; ++i) {
            setTimeout(() => {
                this.backgroundRender(endingColor + (0.15 + (0.85 * i / 20)) + ')');
            }, (50 + i) * i);
        }
        this.timer = 0;

    }

    backgroundRender(color) {
        this.ctx.fillStyle = color || this.backgroundColorString;
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    }

    contentRender() {
        this.ctx.fillStyle = this.digitalColor;
        this.ctx.font = this.fontSize + "px " + this.fontFamily;
        for (let i = 0; i < this.columns; i++) {
            let figure = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'][Math.floor(Math.random() * 12)];
            this.ctx.fillText(figure, i * this.fontSize, this.drop[i] * this.fontSize);
            if (this.drop[i] * this.fontSize > this.cvs.height || Math.random() > 0.95) {
                this.drop[i] = 0;
            }
            this.drop[i]++;
        }
    }

    render() {
        this.backgroundRender();
        this.contentRender();
    }
};