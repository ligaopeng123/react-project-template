/**
 * 间隔精灵
 * @param ctx
 * @param x
 * @param y
 * @param c
 * @constructor
 */
import {rand} from './Utils';

const Shape: any = function (ctx: any, x: any, y: any, c: any) {
    this.ctx = ctx;
    this.init(x, y, c);
}

Shape.prototype.init = function (x: any, y: any, c: any) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.r = rand(1, 2);
    this.l = rand(0, 100);
    this.sl = this.l;
    this.ga = Math.random();
    this.v = {
        x: rand(-1, 1) * Math.random(),
        y: 0
    };
};

Shape.prototype.draw = function () {
    let ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = this.ga;
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'hsl(' + this.c + ', 80%, 60%)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
};

Shape.prototype.updateParams = function (X: number, Y: number) {
    let ratio = this.l / this.sl * 1.1;
    this.r *= ratio;
    this.x += this.v.x;
    this.v.y = Y / 2 - this.y;
    this.y += this.v.y / 30;
    this.l -= 1;
    if (this.l < 0) {
        this.c += 10;
        this.init(rand(0, X), Y / 2 * Math.random(), this.c);
    }
};

Shape.prototype.render = function (ctx: any, i: any, X: number, Y: number) {
    this.updateParams(X, Y);
    this.draw();
    ctx.translate(0, Y);
    ctx.scale(1, -1);
    this.draw();
};

export const drawShape = (opt: any) => {
    let {amount, X, Y, ctx} = opt;
    const startColor = rand(0, 360);
    let shapes: any = [];
    for (let i = 0; i < amount; i++) {
        let s = new Shape(ctx, rand(0, X), Y / 2 * Math.random(), startColor);
        shapes.push(s);
    }

    function render() {
        ctx.globalCompositeOperation = "darken";
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, X, Y);
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        for (let i = 0; i < shapes.length; i++) {
            shapes[i].render(ctx, i, X, Y);
        }
        requestAnimationFrame(render);
    }

    function onResize(opt: any) {
        X = opt.X;
        Y = opt.Y;
    }

    render();
    // 动画执行函数
    return {
        onResize,
        onClear: () => {
            shapes.forEach((item: any) => {
                item = null;
            });
            shapes = null;
        }
    }
}