/**
 * @函数名称：ScreenLayout
 * @作用：大屏路由配置 后续可能扩展布局
 * @date 2021/1/10
 */

import React, {useEffect, useState} from 'react';
import {RouteWithModuleRoutes} from "@gaopeng123/hoc";
import {withRouter} from "react-router-dom";
import {menuData} from "@store/Menus";
import {getFirstPath} from "@httpClient/Global";

const ScreenLayout: React.FC<any> = (props: any) => {
	const [router, setRouter] = useState([]);
	useEffect(() => {
		menuData.then(([menus]: Array<any>) => {
			setRouter(menus);
		});
	}, []);
	useEffect(() => {
		if (router.length) {
			props.history.push({
				pathname: getFirstPath(router)
			})
		}
	}, [router]);
	return (
		<RouteWithModuleRoutes routers={router}/>
	)
};

export default withRouter(ScreenLayout);
