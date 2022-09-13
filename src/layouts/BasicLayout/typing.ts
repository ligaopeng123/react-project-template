/** ********************************************************************
 *
 * @模块名称: typing
 *
 * @模块用途: typing
 *
 * @date: 2022/9/13 15:38
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import { RouteProps } from "react-router-dom";

export type RouteCustomProps = {
    id: number;
    uuid?: string;
    icon: string;
    name: string;
    mComponents?: string;
    children?: Array<RouteItemProps>;
    [propsName: string]: any;
}

export type RouteItemProps = RouteProps & RouteCustomProps;
