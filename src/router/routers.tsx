// 动态加载
import loadable from '@loadable/component';

// home页
const RouterHome = loadable(() => import('@pages/home'));

// 系统配置页
const SystemConfig = loadable(() => import('@pages/system/config'));
const OemConfig = loadable(() => import('@pages/system/oem'));

// 用户管理
const Organization = loadable(() => import('@pages/admin/organization'));
const AdminMenus = loadable(() => import('@pages/admin/menus'));
const RouterAdminUsers = loadable(() => import('@pages/admin/users'));

/**
 *  模块路由
 */
export const routers = [
	// 首页
	{
		path: '/home',
		name: '首页',
		component: RouterHome
	},
	// admin 用户管理模块
	{
		path: '/auth',
		name: '用户管理',
		children: [{
			path: '/auth/organization',
			name: '组织管理',
			exact: false,
			component: Organization
		}, {
			path: '/auth/menus', // RouterAdminUsers
			name: '菜单管理',
			exact: false,
			component: AdminMenus
		}, {
			path: '/auth/users', //
			name: '用户管理',
			exact: false,
			component: RouterAdminUsers
		}]
	},
	// 系统配置
	{
		path: '/system',
		children: [{
			path: '/system/config',
			name: '系统配置',
			exact: false,
			component: SystemConfig
		}, {
			path: '/system/oem', // RouterAdminUsers
			name: 'OEM配置',
			exact: false,
			component: OemConfig
		}]
	}
];
/**
 *  大屏路由
 */
export const screenRouters = [];

// react-loadable  异步加载
export function getRouters(menus: any = null) {
	return {
		routers,
		screenRouters,
		menus,
	};
}