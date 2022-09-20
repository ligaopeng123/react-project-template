/**********************************************************************
 *
 * @模块名称: PcRouter
 *
 * @模块用途: PcRouter
 *
 * @创建人: pgli
 *
 * @date: 2022/9/13 9:17
 *
 **********************************************************************/
import React, { useState } from 'react';
import ProLayout, { ProBreadcrumb } from "@ant-design/pro-layout";
import proSettings from "@/defaultSettings";
import { MenuDataItem } from "@ant-design/pro-layout/lib/typings";
import { Link } from "react-router-dom";
import RightLayout from "@layouts/RightLayout";
import TopTabs from "@layouts/BasicLayout/TopTabs";
import { RouteWithModuleRoutes } from "@gaopeng123/hoc";
import BackUp from "@layouts/BasicLayout/BackTop";
import { MenuIcon } from "@layouts/BasicLayout/components/MenuIcon";
import './styles.less';

type PcRouterProps = {
    pathname: string;
    menusLogo: string;
    menusName: string;
    router: any[]
    setPathname: (props: any) => void;
    onRouteChange: (props: any) => void;
};
const PcRouter: React.FC<PcRouterProps> = (props) => {
    const {pathname, menusLogo, menusName, router, setPathname, onRouteChange} = props;
    /**
     * todo 请确认是否需要keep-alive功能 会有一定的性能问题
     */
    const [uninstallKeepAliveKeys, setUninstallKeepAliveKeys] = useState<Array<string>>([]);
    const onRemove = (key: string) => {
        setUninstallKeepAliveKeys([key]);
    }
    return (
        <React.Fragment>
            <ProLayout
                {...proSettings}
                location={{pathname}}
                logo={menusLogo}
                title={menusName}
                route={{routes: router, path: "/"}}
                postMenuData={(menuData: any) => {
                    return menuData;
                }}
                // menu={{request: loadMenus, defaultOpenAll: true}}
                menuItemRender={({path, icon, name}: MenuDataItem, defaultDom: any) => {
                    // 渲染菜单项
                    return (<div className={`layoutMenuItem`} onClick={() => {
                        setPathname(path as string);
                    }}>
                        <Link to={path as string}>
                            <MenuIcon icon={icon}/>
                            <span className={`ant-pro-menu-item-title`}>{name}</span>
                        </Link>
                    </div>);
                }}
                subMenuItemRender={({path, icon, name}: MenuDataItem) => {
                    // 定义有子级菜单的菜单
                    return <>
                        <MenuIcon icon={icon}/>
                        <span className={`ant-pro-menu-item-title`}>{name}</span>
                    </>
                }}
                // 面包屑
                breadcrumbRender={(routes: any) => [...routes]}
                // 自定义面包屑
                // itemRender={(route: any, params: any, routes: any, paths: Array<string>) => {
                //     return null;
                // }}
                onPageChange={(location: any) => {
                    // 頁面跳轉是觸法
                    setPathname(location.pathname);
                }}
                menuDataRender={(menuList: any) => {
                    // menuData 的 render 方法，用来自定义 menuData
                    return menuList
                }}
                onMenuHeaderClick={(menu: any) => {
                    //      {/*menu 菜单的头部点击事件*/}
                }}
                rightContentRender={() => (<RightLayout/>)}
                headerContentRender={
                    // 菜单放置到顶部 去掉面包屑
                    proSettings.layout === 'top'
                        ? null
                        : () => {
                            /*头信息*/
                            return (<ProBreadcrumb/>)
                        }}
            >
                <TopTabs onRemove={onRemove} pathname={pathname} routers={router}/>
                <RouteWithModuleRoutes
                    keepAlive={`auto`}
                    routers={router}
                    uninstallKeepAliveKeys={uninstallKeepAliveKeys}
                    onRouteChange={onRouteChange}/>
            </ProLayout>
            <BackUp/>
        </React.Fragment>
    )
};

export default PcRouter;
