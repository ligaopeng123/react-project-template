/**
 *  内容填充
 *  主要监听窗口变化 更改页面大小 保证不出现滚动条
 */
import React, {useEffect, useState} from 'react';
import {
    Switch,
} from 'react-router-dom';
import {RouteWithSubRoutes} from '@share/HigherOrderComponent/routeWithSubRoutes';
import useResize from "@share/Hooks/useResize";
import './styles.scss';

export default function BasicContents(props: any) {
    const {children, className, routes} = props;
    const contentsHeight = useResize()  - 96;
    return (
        <React.Fragment>
            <Switch>
                {
                    routes && routes.map((route: any, key: number) => {
                        return <RouteWithSubRoutes key={`subroute-${key}`} {...route} />
                    })
                }
            </Switch>
            <div className={className === undefined ? `center-layout` : className} style={{height: contentsHeight}}>
                {children}
            </div>
        </React.Fragment>
    );
}