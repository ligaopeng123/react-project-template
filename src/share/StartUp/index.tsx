/**
 * 全局参数保存
 * @param state
 * @param action
 * @returns {any}
 * @constructor
 */
import {createStore} from 'redux'
import HttpClient from '../HttpClient';
import setStateByConstant from '../HigherOrderComponent/stateByConstant';
import GLOBALCONFIG, {getMenus, getUSERlocalStorage, setUSERlocalStorage} from '../HttpClient/GLOBALCONFIG';


interface GlobalStates {
    menus?: any[],
    user?: any,
    OEM?: any,
    routers?: any[],
    store: any
}


export function GlobalState(state: any, action: any) {
    switch (action.type) {
        // 登录状态和退出登录状态 用户相关信息保存
        case GLOBALCONFIG.USER:
            setUSERlocalStorage(action.value);
            return setStateByConstant(action.type, action.value, state);
        case GLOBALCONFIG.MENUS:
            return setStateByConstant(action.type, action.value, state);
        case GLOBALCONFIG.OEM:
            return setStateByConstant(action.type, action.value, state);
        default:
            return state
    }
}

/**
 * 获取全局参数
 * @param {string} type
 * @param state
 * @returns {any}
 */
export const getGlobalState = (type: string, state: any) => {
    if (type) return state[type];
    return state;
};

/**
 * 获取OEM定制相关信息
 * @returns {Promise<any>}
 */
export async function getOemConfig() {
    return new Promise((resolve, reject) => {
        Promise.all([
            HttpClient.get({
                url: '/json/menus.json'
            }),
            HttpClient.get({
                url: '/json/OEM.json'
            })
        ]).then((values: any) => {
            resolve({
                config: values?.values[0]?.data,
                deploy: values?.values[1]?.data,
            });
        })
    })
}

/**
 * 启动程序 获取数据
 * @returns {Promise<GlobalStates>}
 * @constructor
 */
const StartUp = async (): Promise<GlobalStates> => {
    const OEM = await getOemConfig();

    // 默认参数
    const defaultGlobal: any = {};
    // 菜单数据
    defaultGlobal[GLOBALCONFIG.MENUS] = {
        treeData: [],
        menus: [],
    };
    // 用户信息
    defaultGlobal[GLOBALCONFIG.USER] = getUSERlocalStorage();
    // OEM定制信息
    defaultGlobal[GLOBALCONFIG.OEM] = OEM || {
        config: {}, // 数据配置
        deploy: {} // 可配置的oem配置项
    };
    // 创建redux 将公共数据缓存起来
    const store = createStore(GlobalState, defaultGlobal);

    return {
        user: defaultGlobal[GLOBALCONFIG.USER],
        store
    }
};


export default StartUp;