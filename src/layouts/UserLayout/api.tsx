import {gql} from '@apollo/client';
import {query} from '@httpClient/GraphqlClient';
import {post} from '@/httpClient';

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
	return post('/admin/login', {
		body: params
	});
}

const logInQuery = () => {
	return query('', {
		query: gql`
            query User {
                getUser {
                    username,
                    token
                }
            }`
	})
};