/**********************************************************************
 *
 * @模块名称: Apollo_Client
 *
 * @模块用途: Apollo_Client Graphql链接
 *
 * @date: 2021/7/26 8:46
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import {ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {memoized} from "@gaopeng123/utils";
import toLogin from "@httpClient/toLogin";
import intercept from "@httpClient/intercept";
import {GraphqlClientEvents} from "@httpClient/typing";

/**
 * 创建连接
 * @type {HttpLink}
 */
const httpLink = new HttpLink({
	uri: '/graphql',
	// responseTransformer: async response => response.then(({data}) => data)
});

/**
 * ApolloClient的监听
 * @type {ApolloLink}
 */
const logoutLink = onError(({networkError}: any) => {
	//statusCode 状态 result返回信息
	const {statusCode, result} = networkError;
	// 返回登录页· 处理
	toLogin();
});

/**
 * 动态赋值headers 用于权限验证
 * @type {ApolloLink}
 */
const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	// @ts-ignore
	operation.setContext(intercept.request('', {}) as any);
	return forward(operation);
});

const graphqlClient: any = (url: string) => {
	return new ApolloClient({
		uri: url,
		cache: new InMemoryCache(),
		link: logoutLink.concat(concat(authMiddleware, httpLink)), // concat(authMiddleware, httpLink)
	});
};

const memoizedGraphqlClient = memoized(graphqlClient);


export const query = (url: string, params: any) => {
	const [client] = memoizedGraphqlClient(url);
	/**
	 * 如果不设置缓存策略 则默认去服务端获取 不使用缓存数据
	 */
	if (params && !params.fetchPolicy) params.fetchPolicy = 'network-only';
	return client.query(params);
};

export const mutate = (url: string, params: any) => {
	const [client] = memoizedGraphqlClient(url);
	/**
	 * 如果不设置缓存策略 则默认去服务端获取 不使用缓存数据
	 */
	if (params && !params.fetchPolicy) params.fetchPolicy = 'network-only';
	return client.mutate(params)
};

export default {
	query,
	mutate
} as GraphqlClientEvents;
