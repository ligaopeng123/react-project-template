/**
 * 箭头效果
 * @param canvas
 * @returns {boolean}
 * @constructor
 */
const Starry: any = function ({ctx, X, Y, w, h, amount}: any) {
    this.ctx = ctx;
    this.w = w;
    this.h = h;
    this.counts = amount;
    this.maxSize = 1;
    this.halfWidth = w / 2;
    this.halfHeight = h / 2;
    this.arr = [];
};
/**
 * 添加数据
 * @param ctx
 * @param coor
 */
Starry.prototype.add = function (coor: any) {
    const ctx = this.ctx;
    const grd: any = this.ctx.createRadialGradient(coor.x, coor.y, coor.size / 2, coor.x, coor.y, coor.size);
    grd.addColorStop(0, 'white');
    grd.addColorStop(1, coor.color);
    ctx.fillStyle = grd;
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.globalCompositeOperation = 'lighter';
    ctx.beginPath();
    ctx.arc(coor.x, coor.y, coor.size, 0, Math.PI * 2, true);
    ctx.transform(1, 0, 0, 1, 0, coor.z);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

/**
 * 初始化
 */
Starry.prototype.init = function (drawHandle: any) {
    this.run();
    this.render();
    this.animate(drawHandle);
};

Starry.prototype.run = function () {
    let nums = 0;
    const w = this.w;
    const h = this.h;
    while (nums < this.counts) {
        const coor = {
            x: Math.ceil(Math.random() * w),
            y: Math.ceil(Math.random() * h),
            posx: Math.random() * w - this.halfWidth,
            posy: Math.random() * h - this.halfHeight,
            fl: 100,
            speed: Math.random() * 2,
            posz: Math.random() * 250,
            r: Math.ceil(Math.random() * this.maxSize),
            color: 'rgba(' + Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255) + ',' + Math.random() + ')'
        };
        this.arr.push(coor);
        nums++;
    }
};

Starry.prototype.clear = function () {
    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;
    ctx.globalCompositeOperation = 'darken';
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
};

Starry.prototype.render = function (drawHandle: any) {
    this.clear();
    if (drawHandle) drawHandle();
    for (const item of this.arr) {
        this.draw(item);
    }
}
Starry.prototype.animate = function (drawHandle: any) {
    this.render(drawHandle);
    requestAnimationFrame(() => {
        this.animate(drawHandle);
    });
};

Starry.prototype.draw = function (item: any) {
    if (item.posz > -item.fl) {
        const scale = item.fl / (item.fl + item.posz);
        item.x = (this.halfWidth + item.posx * scale);
        item.y = (this.halfHeight + item.posy * scale);
        item.size = item.r * scale;
        item.posz -= item.speed;
    } else {
        item.posz = Math.random() * 250;
    }
    this.add(item);
};

const drawStarry = (opt: any) => {
    let starry: any = new Starry(opt);
    starry.init(opt.drawHandle);
    return {
        onResize: () => {

        },
        onClear: () => {
            starry = null;
        }
    }
};

export default drawStarry;