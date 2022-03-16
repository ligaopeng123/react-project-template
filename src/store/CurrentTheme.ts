/**********************************************************************
 *
 * @模块名称: User
 *
 * @模块用途: User 用户信息管理
 *
 * @date: 2021/7/31 15:43
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import {atom, selector} from 'recoil';
import {
    getCurrentThemeFromStorage,
    setCurrentThemeToStorage,
} from "@httpClient/Global";
import {ThemeType} from "@/layouts/HeaderTheme/ThemeColor";

const ThemeState: any = atom({
    key: 'currentTheme',
    default: getCurrentThemeFromStorage()
});

export type CurrentThemeType = {
    type: ThemeType; // 用户名称
    config?: any;
}

export type CurrentUserState = Array<CurrentThemeType | any>

const CurrentTheme = selector({
    key: 'filteredTodoListCurrentTheme',
    get: ({get}) => {
        return get(ThemeState);
    },
    set: ({set}, newValue) => {
        // 拦截输入 将用户信息写入到Storage
        setCurrentThemeToStorage(newValue);
        set(ThemeState, newValue);
    },
});
/**
 * 获取OEM配置信息
 */

export default CurrentTheme;
