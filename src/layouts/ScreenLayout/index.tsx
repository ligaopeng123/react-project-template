/**
 * @函数名称：ScreenLayout
 * @作用：大屏路由配置 后续可能扩展布局
 * @date 2021/1/10
 */

import React from 'react';
import { RouteWithModuleRoutes } from "@gaopeng123/hoc";
import useMenus from "@hooks/useMenus";

const ScreenLayout: React.FC<any> = (props: any) => {
    const [screenRouters] = useMenus();
    return (
        <RouteWithModuleRoutes routers={screenRouters as any[]}/>
    )
};

export default ScreenLayout;
