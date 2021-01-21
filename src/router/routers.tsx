// 动态加载
import loadable from '@loadable/component';

// home页
const RouterHome = loadable(() => import('@router/home'));

// 系统配置页
const SystemConfig = loadable(() => import('@router/system/config'));
const OemConfig = loadable(() => import('@router/system/oem'));

// 用户管理
const Organization = loadable(() => import('@admin/organization'));
const AdminMenus = loadable(() => import('@admin/menus'));
const RouterAdminUsers = loadable(() => import('@admin/users'));
/**
 *  模块路由
 */
const routers = [
    // 首页
    {
        path: '/home',
        component: RouterHome
    },
    // admin 用户管理模块
    {
        path: '/auth',
        children: [{
            path: '/auth/organization',
            exact: false,
            component: Organization
        }, {
            path: '/auth/menus', // RouterAdminUsers
            exact: false,
            component: AdminMenus
        }, {
            path: '/auth/users', //
            exact: false,
            component: RouterAdminUsers
        }]
    },
    // 系统配置
    {
        path: '/system',
        children: [{
            path: '/system/config',
            exact: false,
            component: SystemConfig
        }, {
            path: '/system/oem', // RouterAdminUsers
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