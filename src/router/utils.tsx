// 背景色 折叠面板背景色
import {REACT_APP_DEVICE_TYPE} from '../share/process/env';

export const CollapseBackground = {
    background: 'rgba(0,0,0,0)'
};

/**
 * card body
 * @type {{padding: number}}
 */
export const cardBodyStyle = {
    padding: 0
};


/**
 * 资产类型
 */
export const DEVICE_TYPE = REACT_APP_DEVICE_TYPE;

/**
 *  获取资产的字符串类型
 * @constructor
 */
export const GET_DEVICE_TYPE = (KEY: string = '') => {
    return getValueType(DEVICE_TYPE, KEY);
};

/**
 * 资产选择项
 * @returns {Array}
 * @constructor
 */
export const DEVICE_Option = () => {
    const Options = [];
    const _DEVICE_TEXT: any = DEVICE_TYPE;
    for (let key in _DEVICE_TEXT) {
        Options.push({
            name: _DEVICE_TEXT[key],
            value: key
        })
    }
    return Options;
};
/**
 * 获取类型的Options
 * @param TYPEObi
 * @returns {Array}
 */
export const getTypeOption = (TYPEObi: any)=> {
    const Options = [];
    const _DEVICE_TEXT: any = TYPEObi;
    for (let key in _DEVICE_TEXT) {
        Options.push({
            name: _DEVICE_TEXT[key],
            value: key
        })
    }
    return Options;
}
/**
 * 获取ValueEnum
 * @param TYPEObi
 * @returns {any}
 */
export const getValueEnum = (TYPEObi: any) => {
    const valueEnum: any = {};
    const _DEVICE_TEXT: any = TYPEObi;
    for (let key in _DEVICE_TEXT) {
        valueEnum[key] = {
            text: _DEVICE_TEXT[key]
        }
    }
    return valueEnum;
};
/**
 * 获取类型
 * @param TYPEObi
 * @param {string} KEY
 * @returns {any}
 */
export const getValueType = (TYPEObi: any, KEY: string = '') => {
    const _TEXT: any = TYPEObi;
    const _TYPE: any = {};
    for (let key in _TEXT) {
        if (_TEXT[key] === KEY) {
            return key;
        }
        _TYPE[key] = key;
    }
    return _TYPE;
};

/**
 * 获取表格映射
 * @returns {any}
 * @constructor
 */
export const DEVICE_TYPE_valueEnum = () => {
    return getValueEnum(DEVICE_TYPE);
}

/**
 * 在线状态
 * @type {{}}
 */
export enum ONLINE_STATUS {
    online = '在线',
    offline = '离线'
}


const ONLINE_status: any = {
    online: 'Processing',
    offline: 'Default'
};
/**
 * 在线状态映射
 * @returns {any}
 * @constructor
 */
export const ONLINE_STATUS_valueEnum = () => {
    const valueEnum: any = {};
    const _ONLINE_STATUS: any = ONLINE_STATUS;
    for (let key in _ONLINE_STATUS) {
        valueEnum[key] = {
            text: _ONLINE_STATUS[key],
            status: ONLINE_status[key] // Processing
        }
    }
    return valueEnum;
}


/**
 * 在线状态选择项
 * @returns {Array}
 * @constructor
 */
export const ONLINE_STATUS_Option = () => {
    const Options = [];
    const _ONLINE_STATUS: any = ONLINE_STATUS;
    for (let key in _ONLINE_STATUS) {
        Options.push({
            name: _ONLINE_STATUS[key],
            value: key
        })
    }
    return Options;
};

