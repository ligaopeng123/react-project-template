/**
 *  用户登录模块
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {Form, Input, Button} from 'antd';
import ComponentsMeteor from '@components/Background/Meteor'
import {UserLoginParams} from './api';
import BasicFooter from '../DefaultFooter/index';
import useOEM from "@/hooks/useOEM";
import './styles.less';

const layout = {
	labelCol: {span: 5},
	wrapperCol: {span: 19},
};
const tailLayout = {
	wrapperCol: {offset: 5, span: 19},
};

const UserLayout: React.FC<any> = (props: any) => {
	/**
	 * oem数据消费
	 */
	const loginLogo = useOEM('loginLogo');
	const loginName = useOEM('loginName');
	const loginDesc = useOEM('loginDesc');
	// 菜单的第一项 默认为初始页面
	const onFinish = (value: UserLoginParams) => {
		// 登录后将用户信息缓存到全局变量里面
		// 登录 菜单管理模块 处理第一次跳转的重定向问题
		props.history.push({
			pathname: `/`,
		})
	};
	
	const onFinishFailed = (errorInfo: any) => {
	
	};
	const title = `登录`;
	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
				<meta name="description" content={title}/>
			</Helmet>
			<ComponentsMeteor>
				<div className={`content`}>
					<div className={`top`}>
						<div className={`header`}>
							<img alt="logo" className={`logo`}
							     src={loginLogo}/>
							<span className={`title`}>{loginName}</span>
						</div>
						<div className={`desc`}>{loginDesc}</div>
					</div>
					<Form
						{...layout}
						name="basic"
						initialValues={{remember: true}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Form.Item
							label="用户名"
							name="username"
							rules={[{required: true, message: '请输入用户名!'}]}
						>
							<Input/>
						</Form.Item>
						
						<Form.Item
							label="密码"
							name="password"
							rules={[{required: true, message: '请输入用户密码!'}]}
						>
							<Input.Password/>
						</Form.Item>
						
						<Form.Item {...tailLayout}>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
						</Form.Item>
					</Form>
				</div>
				<BasicFooter/>
			</ComponentsMeteor>
		</HelmetProvider>
	);
};

export default withRouter(UserLayout)