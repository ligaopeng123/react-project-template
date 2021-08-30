import React, {useReducer} from 'react';
import {reducer, init, State} from "./Store";
import ScreenContents from "@components/Contents/ScreenContents";
import ScreenTitle from "@components/ScreenTitle";
import ScreenMenus from '@/components/ScreenMenus';
import {Props} from "./typing";
import styles from './styles.module.less';

const menus = [{
	title: '数据看板',
	router: '/screen/dashboard',
	component: <div>123</div>
}, {
	title: '问题管理',
	router: '/screen/problem',
	component: <div>456</div>
}];
const RouterHome: React.FC<Props> = () => {
	const [state, dispatch] = useReducer(reducer, State, init);
	return (
		<ScreenContents>
			<ScreenTitle title={`某某综合平台`}></ScreenTitle>
			<ScreenMenus menus={menus}/>
		</ScreenContents>
	)
};

export default RouterHome;
