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
import {atom} from 'recoil';

const OEM = atom({
	key: 'oem',
	default: {},
});

/**
 * 获取OEM配置信息
 * @param {any} config
 * @param {any} deploy
 * @param {any} key
 * @returns {any}
 */

export const oemData = async () => {
	const res = await fetch('/json/OEM.json');
	return await res.clone().json();
};

export const getOemValue = ({config, key, value}: any) => {
	if (config && config[key]) return config[key];
	return value;
};

export default OEM;