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
export const getIsibleMenus = (menus: any = []) => {
	return menus || [];
}

/**
 * 设置用户信息
 * @param value
 */
export const setUSERlocalStorage = (value: any) => {
	localStorage.setItem(GLOBALCONFIG.USERlocalStorage, JSON.stringify(value));
};


export default GLOBALCONFIG;