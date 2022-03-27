/**
 * 布局管理
 */
import React, {useState, createElement, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import ProLayout, {ProBreadcrumb} from '@ant-design/pro-layout';
import proSettings from "@/defaultSettings" ;
import * as Icon from '@ant-design/icons';
import BackUp from './BackTop';
import RightLayout from '../RightLayout/index';
import useOEM from "@/hooks/useOEM";
import {RouteWithModuleRoutes} from '@gaopeng123/hoc';
import {MenuDataItem} from "@ant-design/pro-layout/lib/typings";
import {menuData} from "@store/Menus";
import {getFirstPath} from "@httpClient/Global";
import TopTabs from "@/layouts/BasicLayout/TopTabs";
import {useRecoilValue} from 'recoil';
import CurrentUser from '@store/CurrentUser';
import {isEmptyObject} from "@gaopeng123/utils";
import './styles.less';

/**
 * 创建icon图标
 * @param icon
 */
const createIcon = (icon?: string): React.ReactNode | undefined => {
    const i = icon ? (Icon as any)[icon] : undefined;
    return i ? createElement(i, {
        style: {fontSize: '16px'}
    }) : i;
};

const BasicLayout = (props: any) => {
    /**
     * 路由数据
     */
    const navigate = useNavigate();
    /**
     * 设置重定向数据 默认的加载页面
     */
    const location = useLocation();
    const [pathname, setPathname] = useState<string>(location.pathname);
    /**
     * 路由管理
     */
    const [router, setRouter] = useState<Array<any>>([]);
    /**
     * OEM数据
     */
    const menusLogo = useOEM('menusLogo');
    /**
     * 项目名称
     */
    const menusName = useOEM('menusName');
    /**
     * 用户数据
     */
    const currentUser = useRecoilValue(CurrentUser);
    /**
     * 检查是否登录过
     */
    const notLogged = isEmptyObject(currentUser);
    /**
     * 重定向到第一页
     */
    const redirect = (menuData: MenuDataItem) => {
        if (notLogged) {
            navigate('/login');
        }
        if (pathname === '/') {
            setTimeout(() => {
                const firstPath = getFirstPath(menuData) as string;
                setPathname(firstPath);
                navigate(firstPath);
            });
        }
    };

    /**
     * 加载数据
     */
    useEffect(() => {
        menuData.then((res: Array<any>) => {
            const menuData = res[0];
            setRouter(menuData as Array<any>);
            redirect(menuData);
        });
    }, [menuData]);

    /**
     * 路由切换是的变化
     * @param route
     */
    const onRouteChange = (route: any) => {
        route?.path && setPathname(route.path)
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
                menuItemRender={({path, icon, name}: MenuDataItem, defaultDom) => {
                    // 渲染菜单项
                    return (<div className={`layoutMenuItem`} onClick={() => {
                        setPathname(path as string);
                    }}>
                        <Link to={path as string}>
                            {createIcon(icon as string)}
                            <span className={`ant-pro-menu-item-title`}>{name}</span>
                        </Link>
                    </div>);
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
                headerContentRender={() => {
                    /*头信息*/
                    return (<ProBreadcrumb/>)
                }}
            >
                <TopTabs pathname={pathname} routers={router}/>
                <RouteWithModuleRoutes routers={router} onRouteChange={onRouteChange}/>
            </ProLayout>
            <BackUp/>
        </React.Fragment>
    );
};
export default BasicLayout;
