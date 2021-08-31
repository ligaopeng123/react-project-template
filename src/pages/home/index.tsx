import React, {useReducer} from 'react';
import {reducer, init, State} from "./Store";
import ScreenContents from "@components/Contents/ScreenContents";
import ScreenTitle from "@components/ScreenTitle";
import ScreenMenus from '@/components/ScreenMenus';
import {Props} from "./typing";
import styles from './styles.module.less';

const menus = [{
	id: 'dashboard',
	name: 'Dashboard',
	path: '/home/screen/dashboard',
	component: 'pages/home/Dashboard'
}, {
	id: 'dashboard2',
	name: 'Dashboard2',
	path: '/home/screen/table',
	component: 'pages/home/Dashboard2'
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
