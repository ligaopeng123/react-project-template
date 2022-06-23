import {asyncMemoized, isArray, pathJoin} from "@gaopeng123/utils";

enum Global {
	user = '<%= name %>-user', // 用户信息
	oem = '<%= name %>-oem', // 定制化信息
	theme = '<%= name %>-theme', // 主题相关
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
    const child = getVisibleMenus(menuInfo);
    const childrenKey = getMenuChildrenKey(child);
    return child ? getFirstPathByMenus(child, childrenKey) : '';
};
/**
 * 获取当前菜单的key 兼容ProLayout 修改源数据  children routers routes
 * @param menuData
 */
export const getMenuChildrenKey = (menuData: any[]) => {
    for (const menuDatum of menuData) {
        if (isArray(menuDatum.children)) {
            return 'children';
        }
        if (isArray(menuDatum.routers)) {
            return 'routers';
        }
        if (isArray(menuDatum.routes)) {
            return 'routes';
        }
    }
    return 'children';
}
/**
 * 获取第一个菜单路径
 * @param child
 * @param childrenKey
 */
const getFirstPathByMenus: any = (child: any, childrenKey: string) => {
    if (child[0] && child[0][childrenKey]?.length) {
        return getFirstPathByMenus(child[0][childrenKey]);
    }
    return child[0] ? child[0].path : '';
};
/**
 * 获取可视菜单
 * @param menuInfo
 */
export const getVisibleMenus = (menus: any = []) => {
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

const defaultOemConfig = {
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
    return oem ? JSON.parse(oem) : defaultOemConfig;
}

export const setCurrentOemToStorage = (value: any) => {
    localStorage.setItem(Global.oem, JSON.stringify(Object.assign({}, defaultOemConfig, value)))
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
