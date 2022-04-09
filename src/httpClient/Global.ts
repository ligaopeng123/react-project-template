import {asyncMemoized, pathJoin} from "@gaopeng123/utils";

enum Global {
    user = 'react-simple-template-user', // 用户信息
    oem = 'react-simple-template-oem', // 定制化信息
    theme = 'react-simple-template-theme', // 主题相关
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
 * 主题相关
 */
export const getCurrentThemeFromStorage = () => {
    return JSON.parse(localStorage.getItem(Global.theme) || '{}');
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
 * 主题定制
 * @param value
 */
export const setCurrentThemeToStorage = (value: any) => {
    localStorage.setItem(Global.theme, JSON.stringify(value));
};

const defaulOemtConfig = {
    loginLogo: '/logo.svg', // 登录页logo
    loginName: "<%= title %>", // 登录页title
    loginDesc: '项目描述信息', // 登录页描述
    menusLogo: `logo.svg`, // 菜单上logo
    menusName: `管理系统`, // 菜单上logo
    copyright: `2021 某某出品并提供技术支持`,
    links: [{
        key: 'cy-tech',
        title: '博客地址',
        href: 'https://blog.csdn.net/ligaoming_123',
        blankTarget: true,
    }, {
        key: 'pgli',
        title: 'git地址',
        href: 'https://github.com/ligaopeng123/react-customizescreen',
        blankTarget: true,
    }]
};

export const getCurrentOemToStorage = () => {
    const oem = localStorage.getItem(Global.oem);
    return oem ? JSON.parse(oem) : defaulOemtConfig;
}

export const setCurrentOemToStorage = (value: any) => {
    localStorage.setItem(Global.oem, JSON.stringify(Object.assign({}, defaulOemtConfig, value)))
}

export const getOemTitle = () => {
    return getCurrentOemToStorage().loginName;
}
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
