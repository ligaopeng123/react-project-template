/** ********************************************************************
 *
 * @模块名称: ThemeColor
 *
 * @模块用途: ThemeColor
 *
 * @date: 2022/3/16 11:26
 *
 * @版权所有: pgli
 *
 ********************************************************************* */

import {getCurrentThemeFromStorage} from "@httpClient/Global";

export type ThemeType = 'realDark' | 'light'
/**
 * 新增配色
 */
// @ts-ignore
const THEME_COLOR: any = {
    light: {
        '--ant-header-color': '#000000', // 表格头部颜色
        '--ant-layout-header-color': '#020C18', // 头部颜色
        '--ant-text-color': '#000000', // 文本颜色
        '--ant-modal-color': '#FFFFFF', // drawer modal 外部颜色
        '--ant-component-background-color': '#FFFFFF', // 组件背景颜色
        '--ant-body-background-color': '#F4F7FA', // body颜色
        '--ant-table-hover-color': '#F4F7FA', // 表格hover颜色
        '--ant-hover-color': '#F4F7FA', // hove颜色
        '--ant-selected-color': '#3370FF', // 选中颜色
        '--ant-border-color': '#E4E5E8', // 边框颜色
        '--ant-layout-menu-color': '#000000', // 菜单颜色
    },
    realDark: {
        '--ant-header-color': '#28DAFF', // 表格头部颜色
        '--ant-layout-header-color': '#001529', // 头部颜色
        '--ant-text-color': '#fff', // 文本颜色
        '--ant-modal-color': '#2C3650', // drawer modal 外部颜色
        '--ant-component-background-color': '#001529', // 组件背景颜色
        '--ant-body-background-color': '#020C18', // body 颜色
        '--ant-table-hover-color': '#031B33', // 表格hover颜色
        '--ant-hover-color': '#3C455D', // hove颜色
        '--ant-selected-color': '#3370FF', // 选中颜色
        '--ant-border-color': '#50586E', // 边框颜色
        '--ant-layout-menu-color': '#8094AC', // 边框颜色
    }
}
/**
 * 设置主题
 * @param theme
 */
export const setTheme = (theme: 'realDark' | 'light') => {
    const THEME = THEME_COLOR[theme];
    for (let key in THEME) {
        const name = `--darkreader-bg${key}`;
        const olaValue = document.documentElement.style.getPropertyValue(name);
        const newValue = THEME[key];
        if (olaValue !== newValue) {
            document.documentElement.style.setProperty(`${key}`, newValue);
            document.documentElement.style.setProperty(`--darkreader-bg${key}`, newValue);
        }
    }
}

export const getTheme = () => {
    return getCurrentThemeFromStorage();
}

export const getThemeType = (): ThemeType => {
    return getTheme()?.type;
}

export const initTheme = () => {
    setTheme(getThemeType());
}
