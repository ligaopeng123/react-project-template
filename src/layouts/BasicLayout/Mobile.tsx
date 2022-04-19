/**********************************************************************
 *
 * @模块名称: Mobile
 *
 * @模块用途: Mobile
 *
 * @创建人: pgli
 *
 * @date: 2022/4/19 14:48
 *
 **********************************************************************/
import React, {useState, useEffect} from 'react';
import {menuData} from "@store/Menus";
import {RouteWithModuleRoutes} from "@gaopeng123/hoc";
import {redirect} from "@layouts/BasicLayout/utils";
import CurrentUser from '@store/CurrentUser';
import {useLocation, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";

type MobileProps = {};
const Mobile: React.FC<MobileProps> = (props) => {
    /**
     * 设置重定向数据 默认的加载页面
     */
    const navigate = useNavigate();
    const location = useLocation();
    const [pathname, setPathname] = useState<string>(location.pathname);

    /**
     * 用户数据
     */
    const currentUser = useRecoilValue(CurrentUser);
    /**
     * 路由管理
     */
    const [router, setRouter] = useState<Array<any>>([]);

    const onRouteChange = () => {

    }

    useEffect(() => {
        menuData.then((res: Array<any>) => {
            const menuData = res[0];
            setRouter(menuData as Array<any>);
            redirect(navigate, pathname, menuData, currentUser);
        });
    }, [menuData]);
    return (
        <RouteWithModuleRoutes routers={router} onRouteChange={onRouteChange}/>
    )
};

export default Mobile;
