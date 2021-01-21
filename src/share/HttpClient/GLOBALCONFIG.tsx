import {getTreeFromFlatData} from 'react-sortable-tree';

enum GLOBALCONFIG {
    USER = 'user', // 保存用戶信息字段
    USERlocalStorage = 'customize-user',
    MENUS = 'menus', // 菜單信息
    OEM = 'OEM' // 定制化信息
}

/**
 * 获取token信息
 * @returns {any}
 */
export const getToken = () => {
    const userInfo: any = getUSERlocalStorage();
    return userInfo.token || null;
}

/**
 * 获取用户保存信息
 * @returns {any}
 */
export const getUSERlocalStorage = () => {
    return JSON.parse(localStorage.getItem(GLOBALCONFIG.USERlocalStorage) || '{}');
}
/**
 *
 *  获取menus的数据
 *  treeData 是树装数据
 *  menus 是list表格数据
 */
export const getMenus = (menus: any[]) => {
    const treeData = getTreeFromFlatData({
        flatData: menus.map((node: any) => ({
            ...node,
            title: node.name,
            expanded: true
        })),
        getKey: (node: any) => node[`menu_code`], // resolve a node's key
        getParentKey: (node: any) => node.parent_id, // resolve a node's parent's key
        rootKey: null as any, // The value of the parent key when there is no parent (i.e., at root level)
    });
    return {
        treeData,
        menus
    }
}
/**
 * 获取第一个路由
 * @param menuInfo
 */
export const getFirstPath = (menuInfo: any) => {
    const child = getIsibleMenus(menuInfo);
    return child ? getPathByRecursion(child) : '';
}

const getPathByRecursion: any = (child: any) => {
    if (child[0] && child[0].children && child[0].children.length) {
        return getPathByRecursion(child[0].children);
    }
    return child[0] ? child[0].path : '';
}
/**
 * 获取可视菜单
 * @param menuInfo
 */
export const getIsibleMenus = (menuInfo: any) => {
    const {treeData} = menuInfo;
    return treeData && treeData[0] ? treeData[0].children : [];
}

/**
 * 设置用户信息
 * @param value
 */
export const setUSERlocalStorage = (value: any) => {
    localStorage.setItem(GLOBALCONFIG.USERlocalStorage, JSON.stringify(value));
};

/**
 * 获取OEM配置信息
 * @param {any} config
 * @param {any} deploy
 * @param {any} key
 * @returns {any}
 */
export const getOemValueByKey = ({config, deploy, key, value}: any) => {
    if (config && config[key]) return config[key];
    // if (deploy) {
    //     for (let item in deploy) {
    //         if (key === deploy[item]) return item;
    //     }
    // }
    return value;
};

export default GLOBALCONFIG;