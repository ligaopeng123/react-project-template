/**********************************************************************
 *
 * @模块名称: Menus
 *
 * @模块用途: Menus  todo 暂时不能使用 因为对象都被设置不可改变 请使用useMenus
 *
 * @date: 2021/8/2 18:42
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import { atom, selector } from 'recoil';
import { isMobile } from "@gaopeng123/utils";
import { RouteItemProps } from "@layouts/BasicLayout/typing";

const MenusType = atom({
    key: 'currentMenusType',
    default: isMobile() ? 'mobile' : 'pc'
});

/**
 * PC端路由
 */
export const PCMenus = atom<Array<RouteItemProps>>({
    key: 'currentPCMenus',
    // @ts-ignore
    // default: getMenuData(),
    default: [],
});

/**
 * PC端路由
 */
export const MobileHelperRouter = atom<null | RouteItemProps>({
    key: 'currentHelperMenus',
    default: null,
});

/**
 * 移动端路由
 */
export const MobileMenus = atom<Array<RouteItemProps>>({
    key: 'currentMobileMenus',
    // @ts-ignore
    // default: getMenuData(),
    default: [],
});

type CurrentMenusState = Array<RouteItemProps>
export const CurrentMenus = selector<CurrentMenusState>({
    key: 'filteredCurrentMenus',
    get: ({get}) => {
        const type = get(MenusType);
        return type === 'pc' ? get(PCMenus) : get(MobileMenus);
    },
    set: ({set, get}, newValue) => {
        // 拦截输入 将用户信息写入到Storage
        const type = get(MenusType);
        set(type === 'pc' ? PCMenus : MobileMenus, newValue);
    },
});
