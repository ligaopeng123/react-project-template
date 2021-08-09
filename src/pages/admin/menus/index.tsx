/**
 *@模块名称：RouterAdminMenus
 *
 *@创建人：ligaoming
 *
 *@作用：用戶管理菜單模塊
 *
 *@date 2020/9/5
 *
 *@版权所有：
 */


import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import BasicContents from '@components/Contents/BasicContents';
import {get, post} from "@/httpClient";

const RouterAdminMenus: React.FC<{}> = (props: any) => {
	useEffect(() => {
		post('/json/menus.json', {body: {a: 1}}).then((res: any) => {
			console.log(res);
		}).catch((e: Error) => {
			console.log(e)
		});
		get('/json/menus.json', {params: {a: 1}, responseType: 'blob'}).then((res: any) => {
			console.log(res);
		}).catch((e: Error) => {
			console.log(e)
		});
	}, []);
	return (
		<BasicContents>
			菜单表
		</BasicContents>
	)
};

export default withRouter(RouterAdminMenus)
