import React from "react";
import {
    Route,
    Redirect,
    Link,
    Switch,
    withRouter
} from 'react-router-dom';
import AppUtil from '../Utils/AppUtil';

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export const RouteWithChildrenSubRoutes = (route: any)=>  {
    return <Route
        key={AppUtil.uuid()}
        path={route.path}
        exact={!!route.exact}
        render={props => {
            return (<route.component {...props} routes={route.routes} />)
        }}
    />
};

export const RouteWithSubRoutes = function (route: any) {
    if (route.children) {
        const children = route.children.map((item: any, index: number)=> {
            return RouteWithChildrenSubRoutes(item);
        });
        // const routes: any = [childrenSubRoutes(route), ...children];
        return children;
    } else {
        return RouteWithChildrenSubRoutes(route);
    }
};
/**
 * 配置内部路由
 * @param routes
 * @returns {any}
 * @constructor
 */
export const RouteWithModuleRoutes = (props: any)=> {
    const {routes} = props;
    return (
        <Switch>
            {
                routes && routes.map((route: any, key: number) => {
                    return <RouteWithSubRoutes key={`subroute-${key}`} {...route} />
                })
            }
        </Switch>
    )
};


export const RouteModuleWithRouter= withRouter(RouteWithModuleRoutes);