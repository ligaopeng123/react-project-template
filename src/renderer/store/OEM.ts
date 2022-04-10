/**********************************************************************
 *
 * @模块名称: OEM
 *
 * @模块用途: OEM
 *
 * @date: 2021/7/23 9:55
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import {atom, selector} from 'recoil';
import {
    getCurrentOemToStorage,
    loadLocalJson,
    setCurrentOemToStorage,
} from "@httpClient/Global";

const OEMState = atom({
    key: 'oem',
    default: getCurrentOemToStorage(),
});

const OEM = selector({
    key: 'oem-state',
    get: ({get}) => {
        return get(OEMState);
    },
    set: ({set}, newValue) => {
        // 拦截输入 将用户信息写入到Storage
        setCurrentOemToStorage(newValue);
        set(OEMState, newValue);
    },
});

/**
 * 获取OEM配置信息
 */
export const oemData = loadLocalJson('/json/OEM.json');

export default OEM;
