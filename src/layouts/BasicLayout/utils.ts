/** ********************************************************************
 *
 * @模块名称: utils
 *
 * @模块用途: utils
 *
 * @date: 2022/4/19 14:50
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import {MenuDataItem} from "@ant-design/pro-layout/lib/typings";
import {getFirstPath} from "@httpClient/Global";
import {isEmptyObject} from "@gaopeng123/utils";

/**
 * 重定向到第一页
 */
export const redirect = (navigate: any, pathname: string, menuData: MenuDataItem, currentUser: any) => {
    /**
     * 检查是否登录过
     */
    const notLogged = isEmptyObject(currentUser);
    if (notLogged) {
        navigate('/login');
    }
    if (pathname === '/') {
        setTimeout(() => {
            const firstPath = getFirstPath(menuData) as string;
            navigate(firstPath);
        });
    }
};
