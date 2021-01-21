/**
 *  用户登录模块
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {Form, Input, Button, message as Message} from 'antd';
import ComponentsMeteor from '@components/Background/Meteor'
import './styles.less';
import {login, UserInfo, UserLoginParams} from './api';
import GLOBALCONFIG, {getOemValueByKey} from '@share/HttpClient/GLOBALCONFIG';
import BasicFooter from '../DefaultFooter/index';

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const tailLayout = {
    wrapperCol: {offset: 5, span: 19},
};

const UserLayout: React.FC<any> = (props: any) => {
    const store = useSelector((stores: any) => {
        return stores[GLOBALCONFIG.OEM]
    });

    const dispatch = useDispatch();
    // 菜单的第一项 默认为初始页面
    const onFinish = (value: UserLoginParams) => {
        // 登录后将用户信息缓存到全局变量里面
        login(value).then((res: UserInfo) => {
            const {code, message, token} = res;
            if (code === 0) {
                Message.success(message);
                // 发送用户信息
                dispatch({
                    type: GLOBALCONFIG.USER, value: {
                        username: res.username,
                        token: token,
                    }
                });
                // 登录 菜单管理模块 处理第一次跳转的重定向问题
                props.history.push({
                    pathname: `/`,
                })
            } else {
                Message.error(message);
            }
        });
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
                                 src={
                                     getOemValueByKey({
                                         key: 'loginLogo',
                                         value: '/logo.svg',
                                         ...store
                                     })}/>
                            <span className={`title`}>{
                                getOemValueByKey({
                                    key: 'loginName',
                                    value: '可视化配置',
                                    ...store
                                })}</span>
                        </div>
                        <div className={`desc`}>{
                            getOemValueByKey({
                                key: 'loginDesc',
                                value: '基于数据动态配置可视化需求',
                                ...store
                            })}</div>
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

                        {/*<Form.Item {...tailLayout} name="remember" valuePropName="checked">*/}
                        {/*<Checkbox>保持登录</Checkbox>*/}
                        {/*</Form.Item>*/}

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <BasicFooter OEM={store}/>
            </ComponentsMeteor>
        </HelmetProvider>
    );
};

export default withRouter(UserLayout)