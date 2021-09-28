/**
 *@模块名称：meteor
 *
 *@创建人：ligaoming
 *
 *@作用：meteor 流星雨背景
 *
 *@date 2020/9/34
 *
 *@版权所有：
 */
import React, {useEffect, useRef} from 'react';
import './styles.scss';
import {drawShape} from './Shape';
import drawStarry from './Starry';
import useResize from "@hooks/useResize";

export interface MeteorProps {
    type?: 'starry' | 'shape';
    img?: string;
    children: React.ReactNode;

    [propsName: string]: any;
}

const Meteor = (props: MeteorProps) => {
    const {children, type, img} = props;
    const cavansRef = useRef<HTMLCanvasElement>(null);

    const getSize = () => {
        return {
            X: document.body.clientWidth,
            Y: window.innerHeight
        }
    }

    const setSize = (canvas: any) => {
        const {X, Y} = getSize();
        canvas.width = X; // window.innerWidth;  包含滚动条
        canvas.height = Y;
        canvas.style.height = `${Y}px`;
        canvas.style.width = `${X}px`;
    }
    /**
     * 开始绘制
     * @param {any} destroyType
     * @returns {any}
     */
    const begin = () => {
        const canvas: any = cavansRef.current;
        if (!canvas || !canvas.getContext) {
            return false;
        }
        setSize(canvas);
        const ctx = canvas.getContext('2d');
        const {X, Y} = getSize();

        let imgDom: any;
        if (img) {
            imgDom = document.createElement("img");
            imgDom.src = img;
        }
        const opts = {
            drawHandle: () => {
                if (imgDom && ctx) ctx.drawImage(imgDom, 0, 0, document.body.clientWidth, window.innerHeight);
            },
            ctx,
            w: X,
            h: Y,
            X,
            Y,
            amount: 100 // 数量
        };
        // drawStarry drawShape
        return type !== 'shape' ? drawStarry(opts) : drawShape(opts)
    };
    const contentHeight = useResize();
    useEffect(() => {
        let {
            onResize,
            onClear
        }: any = begin();

        setSize(cavansRef.current);
        onResize();

        return () => {
            onClear();
        };
    }, [contentHeight]);

    return (
        <React.Fragment>
            <div className="meteor">
                <canvas ref={cavansRef} id="canvas" className="canvas">Canvas not supported.</canvas>
                {children}
            </div>
        </React.Fragment>
    )
}
export default Meteor;
