import HttpClient from '@share/HttpClient/index';
import {gql} from '@apollo/client';

export interface UserLoginParams {
    username: string,
    password: string,
}

export interface UserInfo {
    token?: string, // token信心 鉴权使用
    username?: string, // 姓名
    menus?: any[], // 菜单信息
    message?: string,
    code?: number
}


export function login(params: UserLoginParams): Promise<UserInfo> {
    return HttpClient.post({
        url: '/admin/login',
        params: params
    });
}

const logInQuery = () => {
    return HttpClient.query({
        // query layout 具名查询语句 可省略 建议加上
        params: {
            query: gql`
            query User {
                getUser {
                    username,
                    token
                }
            }`
        }
    })
};