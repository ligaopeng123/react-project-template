/**
 * @函数名称：ScreenLayout
 * @作用：大屏路由配置 后续可能扩展布局
 * @date 2021/1/10
 */

import React, {useEffect, useState} from 'react';
import {RouteWithModuleRoutes} from "@gaopeng123/hoc";
import {menuData} from "@store/Menus";

const ScreenLayout: React.FC<any> = (props: any) => {
	const [screenRouters, setScreenRouters] = useState<Array<any>>([]);
	useEffect(() => {
		menuData.then(([menus]) => {
			setScreenRouters(menus);
		});
	}, []);
	return (
		<RouteWithModuleRoutes routers={screenRouters}/>
	)
};

export default ScreenLayout;
