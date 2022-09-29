/**
 * 布局管理 移动端和PC端入口
 */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useOEM from "@/hooks/useOEM";
import { MenuDataItem } from "@ant-design/pro-layout/lib/typings";
import { getFirstPath, isMobileEnv } from "@httpClient/Global";
import { useRecoilValue } from 'recoil';
import CurrentUser from '@store/CurrentUser';
import { isEmptyObject } from "@gaopeng123/utils";
import PcRouter from "@layouts/BasicLayout/Pc/PcRouter";
import MobileRouter from "@layouts/BasicLayout/Mobile";
import useMenus from "@hooks/useMenus";

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
    const [menuData] = useMenus();
    useEffect(() => {
        if (menuData?.length) {
            setRouter(menuData as Array<any>);
            redirect(menuData);
        }
    }, [menuData]);

    /**
     * 路由切换是的变化
     * @param route
     */
    const onRouteChange = (route: any) => {
        route?.path && setPathname(route.path)
    }

    return (
        <>
            {
                isMobileEnv()
                    ? <MobileRouter
                        pathname={pathname}
                        menusLogo={menusLogo}
                        menusName={menusName}
                        router={router}
                        setPathname={setPathname}
                        onRouteChange={onRouteChange}
                    />
                    : <PcRouter
                        pathname={pathname}
                        menusLogo={menusLogo}
                        menusName={menusName}
                        router={router}
                        setPathname={setPathname}
                        onRouteChange={onRouteChange}
                    />
            }
        </>
    )
};

export default BasicLayout;
