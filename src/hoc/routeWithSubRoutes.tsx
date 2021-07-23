import React, {useEffect, useState} from "react";
import {
	Route,
	Redirect,
	Link,
	Switch,
	withRouter
} from 'react-router-dom';
import AppUtil from '@share/Utils/AppUtil';
import {memoized} from "@gaopeng123/utils";
import loadable from '@loadable/component';

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export const RouteWithChildrenSubRoutes = (route: any) => {
	return <Route
		key={AppUtil.uuid()}
		path={route.path}
		exact={!!route.exact}
		component={loadable(() => import(`../${route.component}`))}
	/>
};

export const RouteWithSubRoutes = function (props: any) {
	const {router} = props;
	if (router.children) {
		const children = router.children.map((item: any, index: number) => {
			return RouteWithChildrenSubRoutes(item);
		});
		return children;
	} else {
		return RouteWithChildrenSubRoutes(router);
	}
};
/**
 * 递归匹配路由
 * @param routers
 * @param pathname
 */
const routeByPathname = (pathname: string, routers: Array<any>) => {
	if (routers) {
		for (let route of routers) {
			const {path, children} = route;
			if (path === pathname) {
				return route;
			} else {
				const state: any = routeByPathname(pathname, children);
				if (state) return state;
			}
		}
	}
};


const cacheRouter = memoized(routeByPathname as any);

/**
 * 配置内部路由
 * @param routes
 * @returns {any}
 * @constructor
 */
export const RouteWithModuleRoutes = (props: any) => {
	const [router, setRouter] = useState();
	const {pathname, routers} = props;
	useEffect(() => {
		if (pathname && props.pathname !== '/') {
			setRouter(cacheRouter(pathname, routers)[0]);
		}
	}, [pathname, routers]);
	
	return (
		<React.Suspense fallback={<div>loading...</div>}>
			{
				// router ? <RouteWithChildrenSubRoutes {...router}/> : null
				router ? <RouteWithChildrenSubRoutes {...router}/> : null
			}
		</React.Suspense>
	)
};

export default RouteWithModuleRoutes;