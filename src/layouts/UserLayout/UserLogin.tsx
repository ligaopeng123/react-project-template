/**
 *  用户登录模块
 */
import React from 'react';
import useOEM from "@/hooks/useOEM";
import {RcLoginModule, AfterSubmit} from "@gaopeng123/rc-login-module";
import {message} from "antd";
import {useRecoilState} from "recoil";
import CurrentUser from "@store/CurrentUser";
import './styles.less';
import {useNavigate} from "react-router-dom";

const UserLogin: React.FC<any> = (props: any) => {
    /**
     * oem数据消费
     */
    const loginLogo = useOEM('loginLogo');
    const loginName = useOEM('loginName');
    const loginDesc = useOEM('loginDesc');
    /**
     * 处理跳转
     */
    const navigate = useNavigate();

    /**
     * 菜单的第一项 默认为初始页面
     */
    const onFinish = () => {
        // 登录后将用户信息缓存到全局变量里面
        // 登录 菜单管理模块 处理第一次跳转的重定向问题
        setTimeout(() => {
            navigate('/');
        }, 10);
    };
    /**
     * 保存用户登录信息
     */
    const [currentUser, setCurrentUser] = useRecoilState(CurrentUser);
    /**
     * 遇到错误信息更新验证码
     */
    const changeCaptcha = () => {
        const loginModule = document.querySelector('login-module');
        // @ts-ignore
        if (loginModule && loginModule.captchaImg) {
            // setParams(null);
            // setCaptcha(null);
            // @ts-ignore
            loginModule.captchaImg.click();
        }
    }
    /**
     *
     * @param submitData
     */
    const afterSubmit = (submitData: AfterSubmit) => {
        const {response, data, token} = submitData?.detail;
        if (response.status === 200) {
            // 此处token可能在submitData?.detail上 也可能在response上，看业务接口实现
            setCurrentUser({name: data?.username, token: token});
            onFinish();
        } else {
            message.error(response?.message)
        }
        changeCaptcha();
    };

    /**
     * TODO submit 此段代码可删除 提交时处理 原则上用于登录调试
     * @param data
     */
    const submit = (data: any) => {
        setCurrentUser({name: data?.detail?.data?.username});
        onFinish();
    };

    return (
        <RcLoginModule
            onAfterSubmit={afterSubmit}
            onSubmit={submit}
            onCaptchaClick={() => {
            }}
            onSubmitError={(data) => {
            }}
            url="/login"
            method="POST"
            user="username"
            password="password"
            id="form"
            publicKey="***"
            mainStyle={``}
            bodyStyle="right: 200px;"
            title={loginName}>
        </RcLoginModule>
    );
};

export default UserLogin;
