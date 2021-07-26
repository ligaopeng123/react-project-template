/**********************************************************************
 *
 * @模块名称: OEM
 *
 * @模块用途: OEM
 *
 * @创建人: ligaoming
 *
 * @date: 2021/7/23 11:06
 *
 * @版权所有: PGLI
 *
 **********************************************************************/
import React, {useState, useEffect} from 'react';
import {useRecoilValue} from "recoil";
import {isUndefined} from "@gaopeng123/utils";
import OEM from "@/store/OEM";

const defaultConfig = {
	loginLogo: '/logo.svg', // 登录页logo
	loginName: '可视化配置', // 登录页title
	loginDesc: '基于数据动态配置可视化需求', // 登录页描述
	menusLogo: `logo.svg`, // 菜单上logo
	menusName: `可视化产品`, // 菜单上logo
	copyright: `${new Date().getFullYear()} 某某出品并提供技术支持`,
	links: [{
		key: 'cy-tech',
		title: '博客地址',
		href: 'https://blog.csdn.net/ligaoming_123',
		blankTarget: true,
	}, {
		key: 'pgli',
		title: 'git地址',
		href: 'https://github.com/ligaopeng123/react-customizescreen',
		blankTarget: true,
	}]
};

const useOEM = (key: string) => {
	const [oem, setOem] = useState<any>('');
	const config = useRecoilValue(OEM);
	useEffect(() => {
		const allConfig: any = Object.assign({}, defaultConfig, config);
		!isUndefined(allConfig[key]) && setOem(allConfig[key]);
	}, [config]);
	return oem;
};

export default useOEM;