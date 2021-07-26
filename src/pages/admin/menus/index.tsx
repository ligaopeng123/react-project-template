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


import React from 'react';
import {withRouter} from 'react-router-dom';
import BasicContents from '@components/Contents/BasicContents';

const RouterAdminMenus: React.FC<{}> = (props: any) => {
	return (
		<BasicContents>
			菜单表
		</BasicContents>
	)
};

export default withRouter(RouterAdminMenus)