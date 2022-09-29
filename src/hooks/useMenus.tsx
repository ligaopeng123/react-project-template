/**********************************************************************
 *
 * @模块名称: useMenus
 *
 * @模块用途: useMenus
 *
 * @创建人: pgli
 *
 * @date: 2022/9/28 11:20
 *
 **********************************************************************/
import React, { useState, useEffect } from 'react';
import { RouteItemProps } from "@layouts/BasicLayout/typing";
import { isMobile } from "@gaopeng123/utils";
import { loadLocalJson } from "@httpClient/Global";

/**
 * 获取json数据
 * todo 此处可重新指定服务端数据接口
 */
export const getMenuData = async () => {
    const [menus] = isMobile()
        ? await loadLocalJson('/json/menus.json')
        : await loadLocalJson('/json/menus.json');
    return menus;
};

/**
 * 获取json数据
 */
export const menuData = getMenuData();

const useMenus = () => {
    const [menus, setMenus] = useState<Array<RouteItemProps>>([]);
    // 重新赋值新的菜单
    const [changeMenus, setChangeMenus] = useState<Array<RouteItemProps>>([]);
    useEffect(() => {
        menuData.then((res) => {
            setMenus(res);
        });
    }, [changeMenus]);
    return [menus, setChangeMenus];
}

export default useMenus;
