// 主目录结构
import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {
	// BrowserRouter as Router, // 不再使用BrowserRouter  因为要在外部进行路由跳转 此处直接使用Router
	Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';
import OEM, {oemData} from "@store/OEM";
import {BrowserHistory} from "@httpClient/toLogin";
import {unregisterFetch} from "@/httpClient";
import CurrentUser from "@store/CurrentUser";
import {isEmptyObject} from "@gaopeng123/utils";
import './styles/ant.less';

const App: React.FC<any> = (props) => {
	const [oem, setOem] = useRecoilState(OEM);
	const currentUser = useRecoilValue(CurrentUser);
	/**
	 * 检查是否登录过
	 */
	const notLogged = isEmptyObject(currentUser);
	
	useEffect(() => {
		oemData.then((res: any) => {
			setOem(res[0]?.data);
		});
		// 卸载拦截器
		return unregisterFetch;
	}, []);
	// 从上到下匹配
	return (
		<Router history={BrowserHistory}>
			<Switch>
				{/*登录页*/}
				<Route exact path="/login">
					<UserLayout/>
				</Route>
				<Route exact path="/404">
					404
				</Route>
				{/*业务业务*/}
				<Route exact path="*">
					<BasicLayout/>
					{
						notLogged ? <Redirect to={'/login'}/> : null
					}
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
