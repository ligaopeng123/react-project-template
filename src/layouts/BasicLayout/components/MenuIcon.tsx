/** ********************************************************************
 *
 * @模块名称: MenuIcon
 *
 * @模块用途: MenuIcon 菜单图标
 *
 * @date: 2022/9/13 9:19
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import React from "react";
import IconFont from "@components/IconFont";

/**
 * 创建icon图标
 * @param icon
 */
export const MenuIcon = ({icon}: { icon: string | any }) => {
    return (
        <>
            {
                icon ? <IconFont style={{fontSize: 22}} type={icon}/> : null
            }
        </>
    )
};
