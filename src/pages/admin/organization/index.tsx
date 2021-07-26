/**
 *@模块名称：Organization
 *
 *@创建人：ligaoming
 *
 *@作用：组织结构
 *
 *@date 2020/9/14
 *
 */

import React from 'react';
import {withRouter} from 'react-router-dom';
import BasicContents from '@components/Contents/BasicContents';
import './styles.scss';


const Organization = (props: any) => {
	return (
		<BasicContents>
			组织表
		</BasicContents>
	)
}


export default withRouter(Organization);
