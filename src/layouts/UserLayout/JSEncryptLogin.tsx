/**********************************************************************
 *
 * @模块名称: JSEncryptLogin
 *
 * @模块用途: JSEncryptLogin
 *
 * @创建人: pgli
 *
 * @date: 2022/5/7 16:23
 *
 **********************************************************************/
import React from 'react';
import {useNavigate} from "react-router-dom";
import {RCLoginJSEncrypt, RCLoginCaptchaProps} from "@gaopeng123/rc-login-jsencrypt";
import {get, post} from "@/httpClient";
import {useSetRecoilState} from "recoil";
import CurrentUser from "@store/CurrentUser";
import useOEM from "@hooks/useOEM";
import './styles.less';

type JSEncryptLoginProps = {};
const encryptPublicKey = '111';
const headers = {
    clientId: '222',
    secret: '333',

}
const JSEncryptLogin: React.FC<JSEncryptLoginProps> = (props) => {
    /**
     * oem数据消费
     */
    const loginLogo = useOEM('loginLogo');
    const loginName = useOEM('loginName');
    const loginDesc = useOEM('loginDesc');
    /**
     * 保存用户登录信息
     */
    const setCurrentUser = useSetRecoilState(CurrentUser);
    /**
     * 处理跳转
     */
    const navigate = useNavigate();
    return (
        <RCLoginJSEncrypt
            encryptPublicKey={encryptPublicKey}
            clientId={headers.clientId}
            secret={headers.secret}
            getCaptcha={async () => {
                return new Promise<RCLoginCaptchaProps>((resolve, reject) => {
                    get(`/v1/captcha`, {
                        params: {
                            width: 80,
                            height: 30
                        },
                        headers: headers
                    }).then((res: RCLoginCaptchaProps) => {

                    });
                    // TODO 放在then里面 将服务端数据返回 image imageId
                    resolve({} as any);
                })
            }}
            handleSubmit={({headers, body}: any) => {
                return new Promise((resolve, reject) => {
                    post(`/v1/shrLogin`, {
                        headers: headers,
                        body: body
                    }).then((res) => {
                    });
                    resolve(true);
                    setTimeout(() => {
                        setCurrentUser(Object.assign({name: body?.username}, body));
                        navigate('/');
                    }, 10);
                })
            }}
            mainStyle={{backgroundImage: 'url(./assets/background.jpg)'}}
            bodyStyle={{right: '200px;'}}
            keeplogged={true}
            title={loginName}
        />
    )
};

export default JSEncryptLogin;
