import {asyncMemoized, pathJoin} from "@gaopeng123/utils";

enum Global {
	user = '<%= name %>-user',
	oem = '<%= name %>-oem' // 定制化信息
}

/**
 * 获取token信息
 * @returns {any}
 */
export const getToken = () => {
    const userInfo: any = getCurrentUserFromStorage();
    return userInfo.token || null;
};

/**
 * 获取用户保存信息
 * @returns {any}
 */
export const getCurrentUserFromStorage = () => {
    return JSON.parse(localStorage.getItem(Global.user) || '{}');
};

/**
 * 获取第一个路由
 * @param menuInfo
 */
export const getFirstPath = (menuInfo: any) => {
    const child = getIsibleMenus(menuInfo);
    return child ? getPathByRecursion(child) : '';
};
/**
 * 兼容处理
 * @param child
 */
const getChildren = (child: any) => {
    return child.children || child.routers;
}
const getPathByRecursion: any = (child: any) => {
    if (child[0] && getChildren(child[0])?.length) {
        return getPathByRecursion(getChildren(child[0]));
    }
    return child[0] ? child[0].path : '';
};
/**
 * 获取可视菜单
 * @param menuInfo
 */
export const getIsibleMenus = (menus: any = []) => {
    return menus || [];
};

/**
 * 设置用户信息
 * @param value
 */
export const setCurrentUserToStorage = (value: any) => {
    localStorage.setItem(Global.user, JSON.stringify(value));
};
/**
 * 获取本地json数据
 * @param path
 */
export const loadLocalJson = asyncMemoized(async (path: string) => {
    const res = await fetch(pathJoin(process.env.REACT_APP_PUBLICPATH || '', path));
    const json = await res.clone().json();
    return json;
});


export default Global;
