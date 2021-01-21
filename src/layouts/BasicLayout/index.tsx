/**
 * 布局管理
 */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    Switch,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
import ProLayout, {
    MenuDataItem,
    BasicLayoutProps as ProLayoutProps,
    Settings,
    DefaultFooter,
} from '@ant-design/pro-layout'
import {RouteWithSubRoutes} from '@share/HigherOrderComponent/routeWithSubRoutes';
import proSettings from "@/defaultSettings" ;
import * as Icon from '@ant-design/icons';
import './styles.scss'
import BackUp from './BackTop';
import RightLayout from '../RightLayout/index';
import HttpClient from '@share/HttpClient/index';
import GLOBALCONFIG, {getFirstPath, getIsibleMenus, getMenus, getOemValueByKey} from '@share/HttpClient/GLOBALCONFIG';
import {getRouters} from '@router/routers';


const createIcon = (icon: string) => {
    const _icon = (Icon as any)[icon];
    return _icon ? React.createElement(_icon, {
        style: {fontSize: '16px'}
    }) : null;
}


const BasicLayout = (props: any) => {
    /**
     * 设置menus的数据
     */
    const [menusData, setMenusData] = useState<any[]>([]);
    /**
     * 设置路由数据
     */
    const [routers, setRouters] = useState<any[]>([]);
    /**
     * 设置重定向数据 默认的加载页面
     */
    const [path, setPath] = useState<string>('');
    /**
     * 历史路由
     */
    const pathname = props.history.location.pathname;
    /**
     *
     * @type {unknown}
     */
    const store = useSelector((stores: any) => {
        return stores[GLOBALCONFIG.OEM]
    });

    useEffect(() => {
        /**
         * 菜单信息
         */
        HttpClient.get({
            url: '/menus.json'
        }).then((res: any) => {
            if (res) {
                // 将服务端表格数据获取到 并转成树状数据
                const menusInfo: any = getMenus(res.data);
                // 将可见的菜单渲染出来
                setMenusData((getIsibleMenus(menusInfo) || []).map((item: any) => {
                    item.icon = createIcon(item.icon as string);
                    return item;
                }));
                // 设置路由
                setRouters(getRouters(null).routers);
                // 保证选中样式加上 此处延迟赋值
                setTimeout(() => {
                    // 如果未输入路由 则使用第一个路由地址 如果输入路由 则使用路由地址
                    setPath(pathname === '/' ? getFirstPath(menusInfo) : pathname);
                })
            }
        });
    }, []);
    // title 后期需要冲掉 默认的产品名称 后期去库里去获取
    // logo={`/logo192.png`}
    return (
        <React.Fragment>
            <ProLayout {...proSettings}
                       logo={
                           getOemValueByKey({
                               key: 'menusLogo',
                               value: `logo.svg`,
                               ...store
                           })
                       }
                       title={
                           getOemValueByKey({
                               key: 'menusName',
                               value: `可视化产品`,
                               ...store
                           })
                       }
                       route={{routes: menusData, path: "/"}}
                       menuItemRender={(menuItemProps: any, defaultDom) => {
                           // 渲染菜单项
                           const path: string = menuItemProps.path;
                           const icon: any = menuItemProps.icon;
                           return (<React.Fragment>{icon}<Link
                               to={path}>{menuItemProps.name}</Link></React.Fragment>);
                       }}
                       breadcrumbRender={(routes) => {
                           // 面包屑
                           return routes;
                       }}
                       itemRender={(route: any, params: any, routes: any, paths: Array<string>) => {
                           return null;
                       }}
                       onPageChange={(location) => {
                           // 頁面跳轉是觸法
                       }}
                       menuDataRender={(menuList: any) => {
                           // menuData 的 render 方法，用来自定义 menuData
                           return menuList
                       }}
                       onMenuHeaderClick={(menu) => {
                           //      {/*menu 菜单的头部点击事件*/}
                       }}
                       rightContentRender={() => (<RightLayout/>)}
            >
                <Switch>
                    {routers.map((route: any, i: number) => {
                        return (
                            <RouteWithSubRoutes key={`root-route-${i}`} {...route} />
                        )
                    })}
                </Switch>
            </ProLayout>
            {
                <Redirect to={path}/>
            }
            <BackUp/>
        </React.Fragment>
    );
}


export default withRouter(BasicLayout)