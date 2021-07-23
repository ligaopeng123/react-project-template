/**
 * @函数名称：ScreenLayout
 * @作用：大屏路由配置 后续可能扩展布局
 * @date 2021/1/10
 */

import React from 'react';
import {Switch} from 'react-router-dom';
import {getRouters} from "@router/routers";
import {RouteWithSubRoutes} from "@/hoc/routeWithSubRoutes";

const ScreenLayout: React.FC<any> = (props: any) => {
    const {screenRouters} = getRouters();
    return (
        <Switch>
            {screenRouters.map((route: any, i: number) => {
                return (
                    <RouteWithSubRoutes key={`root-route-${i}`} {...route} />
                )
            })}
        </Switch>
    )
};

export default ScreenLayout;
