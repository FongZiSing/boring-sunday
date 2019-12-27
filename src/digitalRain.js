export default class digitalRain {
    constructor(canvasId, fontSize, fontFamily, backgroundColor, digitalColor) {
        this.canvasId = canvasId;
        this.cvs = document.getElementById(canvasId);
        this.width = window.screen.width;
        this.height = window.screen.height;

        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.backgroundColor = backgroundColor;
        this.digitalColor = digitalColor;

        this.columns = Math.ceil(this.width / fontSize);
        this.drop = [];

        for (let i = 0; i < this.columns; ++i) {
            this.drop[i] = Math.floor(Math.random() * 18);
        }
    }

    onload() {
        if (this.cvs.getContext) {
            this.cvs.width = this.width;
            this.cvs.height = this.height;
            this.ctx = this.cvs.getContext('2d');
            window.onload = this.__onload.bind(this);
        }
    }

    __onload() {
        let timer = setInterval(this.render.bind(this), 50);
    }

    render() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "#820014";
        this.ctx.font = this.fontSize + "px " + this.fontFamily;
        for (let i = 0; i < this.columns; i++) {
            let figure = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'][Math.floor(Math.random() * 12)];

            /*绘制数字(核心部分)*/
            this.ctx.fillText(figure, i * this.fontSize, this.drop[i] * this.fontSize);
            if (this.drop[i] * this.fontSize > this.height || Math.random() > 0.95) {
                this.drop[i] = 0;
            }
            this.drop[i]++;
        }
    }
};