import {ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat} from '@apollo/client';
import {createBrowserHistory} from 'history';
import {onError} from '@apollo/client/link/error';
import {getToken} from './GLOBALCONFIG';
import Message from '../Message/index';

/**
 * 路由外跳转 使用该对象
 */
export const BrowserHistory = createBrowserHistory();

/**
 * ApolloClient的监听
 * @type {ApolloLink}
 */
const logoutLink = onError(({networkError}: any) => {
    //statusCode 状态 result返回信息
    const {statusCode, result} = networkError;
    // 返回登录页·
    toLogin(result);
});

/**
 * 错误信息处理  此处暂时不用
 * @param code
 * @constructor
 */
const ErrorCode = (code: any) => {
    let message = ``;
    switch (code) {
        case 400:
            message = '请求错误';
            break;

        case 401:
            message = '未授权，请登录';
            break;

        case 403:
            message = '拒绝访问';
            break;

        case 404:
            message = `请求地址出错`;
            break;

        case 408:
            message = '请求超时';
            break;

        case 500:
            message = '服务器内部错误';
            break;

        case 501:
            message = '服务未实现';
            break;

        case 502:
            message = '网关错误';
            break;

        case 503:
            message = '服务不可用';
            break;

        case 504:
            message = '网关超时';
            break;

        case 505:
            message = 'HTTP版本不受支持';
            break;

        default:
    }
}

// 返回登录页面
export const toLogin = (result: any) => {
    // 弹出信息
    let {errors} = result;
    if (errors) {
        Message(errors[0]);
    } else {
        Message(result);
    }
    // BrowserHistory.createHref({pathname: '/login'});
    BrowserHistory.replace({pathname: '/login'});
    // BrowserHistory.push({pathname: '/login'})
    // window.location.href = '/login';
};

/**
 * header信息
 * @returns
 */
export const headers = () => {
    return {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${getToken()}`, // Bearer
    }
};

// responseTransformer: async response => response.json().then(({data}) => data)
/**
 * 创建连接
 * @type {HttpLink}
 */
const httpLink = new HttpLink({
    uri: '/graphql',
    // responseTransformer: async response => response.then(({data}) => data)
});

/**
 * 动态赋值headers 用于权限验证
 * @type {ApolloLink}
 */
const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
        headers: headers()
    });
    return forward(operation);
});

/**
 * 返回连接
 * @type {ApolloClient<NormalizedCacheObject>}
 */
export const Apollo_Client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
    // {
//     resultCaching: false, // 数据是否缓存本地
//     // addTypename: false, // 去掉__typename字段
// }
    link: logoutLink.concat(concat(authMiddleware, httpLink)), // concat(authMiddleware, httpLink)
});