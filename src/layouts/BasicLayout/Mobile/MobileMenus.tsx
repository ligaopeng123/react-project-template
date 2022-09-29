/**********************************************************************
 *
 * @模块名称: MobileMenus
 *
 * @模块用途: MobileMenus  移动端菜单入口页面
 *
 * @创建人: pgli
 *
 * @date: 2022/9/28 10:35
 *
 **********************************************************************/
import React from 'react';
import { useLocation } from "react-router-dom";
import MobileBottom from "@layouts/BasicLayout/Mobile/MobileBottom";
import useMenus from "@hooks/useMenus";


type MobileMenusProps = {};
const MobileMenus: React.FC<MobileMenusProps> = (props) => {
    /**
     * 设置重定向数据 默认的加载页面
     */
    const location = useLocation();
    const [router] = useMenus();
    return (
        <>
            <MobileBottom router={router} pathname={location.pathname}/>
        </>

    )
};

export default MobileMenus;
