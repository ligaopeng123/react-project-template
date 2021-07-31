/**
 *  用户登录模块
 */
import React, {useEffect, useRef} from 'react';
import {withRouter} from 'react-router-dom';
import useOEM from "@/hooks/useOEM";
import '@gaopeng123/login-module';
import {AfterSubmit, SubmitError} from '@gaopeng123/login-module';
import {message} from "antd";
import {useRecoilState} from "recoil";
import CurrentUser from "@store/CurrentUser";
import './styles.less';

const UserLayout: React.FC<any> = (props: any) => {
	/**
	 * form表单订阅
	 */
	const form = useRef<any>(null);
	/**
	 * oem数据消费
	 */
	const loginLogo = useOEM('loginLogo');
	const loginName = useOEM('loginName');
	const loginDesc = useOEM('loginDesc');
	
	/**
	 * 菜单的第一项 默认为初始页面
	 */
	const onFinish = () => {
		// 登录后将用户信息缓存到全局变量里面
		// 登录 菜单管理模块 处理第一次跳转的重定向问题
		setTimeout(() => {
			props.history.push({
				pathname: `/`,
			});
		}, 10);
	};
	/**
	 * 保存用户登录信息
	 */
	const [currentUser, setCurrentUser] = useRecoilState(CurrentUser);
	
	useEffect(() => {
		const afterSubmit = (submitData: AfterSubmit) => {
			const {response, data, token} = submitData?.detail;
			if (response.status === 200) {
				setCurrentUser({name: data?.username});
				onFinish();
			} else {
				message.error(response?.message)
			}
		};
		/**
		 * TODO submit 此段代码可删除 提交时处理 原则上用于登录调试
		 * @param data
		 */
		const submitError = (data: SubmitError) => {
			setCurrentUser({name: data?.detail?.data?.username});
			onFinish();
		};
		form.current.addEventListener('submitError', submitError);
		form.current.addEventListener('afterSubmit', afterSubmit);
		return () => {
			form?.current?.removeEventListener('submitError', submitError);
			form?.current?.removeEventListener('afterSubmit', afterSubmit);
		}
	}, []);
	
	return (
		<React.Fragment>
			<login-module
				ref={form}
				url="http://***"
				method="POST"
				user="username"
				password="password"
				id="form"
				publickey="***"
				main-style={``}
				body-style="right: 200px;"
				title={loginName}>
			</login-module>
		</React.Fragment>
	);
};

export default withRouter(UserLayout);