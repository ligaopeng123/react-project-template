/**
 *@模块名称：HttpClient
 *
 *@创建人：ligaoming
 *
 *@作用：http通信相关
 *
 *@date 2020/7/27
 *
 *@版权所有：
 */
import axios from 'axios';
import {isString} from 'util';
import setMockService from '@share/MockService';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {Apollo_Client, headers, toLogin} from './Apollo_Client';
import {getToken} from './GLOBALCONFIG';
import {REACT_APP_SERVICE} from '@share/process/env';


interface URL {
    url?: string,
    params?: any;
    intercept?: boolean;
    responseType?: string;
}

interface UPLOAD extends URL {
    type?: string
}

export default class HttpClient {
    constructor() {

    }

    static get token(): string {
        return getToken();
    }


    /**
     * headers 配置
     */
    private static get headers() {
        return headers();
    };

    /**
     * 创建连接
     * @type {ApolloClient<NormalizedCacheObject>}
     */
    private static get graphqlClient() {
        return Apollo_Client;
    }

    /**
     * 拦截器 处理掉冗余的信息
     */
    private static interceptorsState: any;
    private static isInterceptorsState: any;

    private static interceptors(intercept: boolean = true) {
        // 添加响应拦截器
        this.isInterceptorsState = intercept;
        if (!this.interceptorsState) {
            axios.interceptors.response.use((response: any) => {
                // 对响应数据做点什么
                return this.isInterceptorsState ? response.data : response;
            }, (error: any) => {
                // 对响应错误做点什么
                toLogin(error.response.data);
                return Promise.reject(error);
            })
        }
        this.interceptorsState = true;
    }

    /**
     * 创建Axios 对象 并构造拦截器
     * @param {any} url
     * @param {any} method
     * @param {any} params
     * @returns {Promise<AxiosResponse<any>>}
     */
    private static async creatAxios({
                                        url,
                                        method,
                                        params,
                                        intercept,
                                        responseType
                                    }: any) {
        // 检测当前的环境 是否是mock 如果
        // 是就使用mock数据 否则下发给后台
        // REACT_APP_SERVICE === 'mock'
        if (REACT_APP_SERVICE === 'mock') {
            return setMockService({
                url,
                method,
                params,
                intercept,
                responseType
            });
        } else {
            return this.creatAxiosAsync({
                url,
                method,
                params,
                intercept,
                responseType
            });
        }
    }

    /**
     * 创建跟后台交互的Axios
     * @param {any} url
     * @param {any} method
     * @param {any} params
     * @returns {Promise<any>}
     */
    public static async creatAxiosAsync({
                                            url,
                                            method,
                                            params,
                                            intercept,
                                            responseType
                                        }: any) {
        this.interceptors(intercept);
        const Axios: any = axios({
            baseURL: process.env.REACT_APP_HTTPBASEURL || '',
            headers: this.headers,
            method: method,
            url: url,
            timeout: 30000,
            data: params || {},
            responseType: responseType
        }).catch((res) => {

        });

        return Axios;
    }

    /**
     * 创建GraphQlQuery
     * @param {any} graphQl
     */
    private static creatGraphQlQuery({
                                         url = 'graphql',
                                         params
                                     }: any) {
        const me: any = this;
        if (!me[`${url}Client`]) {
            me[`${url}Client`] = new ApolloClient({
                uri: url,
                cache: new InMemoryCache(),
            });
        }
        /**
         * 如果不设置缓存策略 则默认去服务端获取 不使用缓存数据
         */
        if (!params.fetchPolicy) {
            params.fetchPolicy = 'network-only';
        }
        return me[`${url}Client`].query(params)
    }

    /**
     * Graphql query查询
     * @param {any} url
     * @param {any} params
     * @returns {any}
     */
    public static query({
                            url,
                            params,
                        }: any) {
        return this.creatGraphQlQuery({
            url,
            params
        })
    }

    private static creatGraphQlMutate({
                                          url = 'graphql',
                                          params
                                      }: any) {
        const me: any = this;
        if (!me[`${url}Client`]) {
            me[`${url}Client`] = new ApolloClient({
                uri: url,
                cache: new InMemoryCache(),
            });
        }
        return me[`${url}Client`].mutate(params)
    }

    /**
     * Graphql query查询
     * @param {any} url
     * @param {any} params
     * @returns {any}
     */
    public static mutate({
                             url,
                             params,
                         }: any) {
        return this.creatGraphQlMutate({
            url,
            params
        })
    }

    public static cetateFetch(opt: any) {
        const {url, params, method} = opt;
        return fetch(url, {
            method: method,
            body: params,
            headers: this.headers
        }).then((res) => {
            return res.json();
        });
    }

    /**
     * get函数
     * @param {any} url
     * @param {any} params
     * @returns {Promise<Response>}
     */
    public static get(url: URL | string, params = {}) {
        if (isString(url)) {
            const path: string = url;
            return this.cetateFetch({url: path, params, method: 'GET'})
        } else {
            const opt: URL = url;
            return this.creatAxios({
                url: opt.url,
                params: opt.params,
                method: 'GET',
                intercept: opt.intercept,
                responseType: opt.responseType
            });
        }
    };

    /**
     * post函数
     * @param {any} url
     * @param {any} params
     * @returns {Promise<Response>}
     */
    public static async post(url: string | URL, params = {}) {
        if (isString(url)) {
            const path: string = url;
            return this.cetateFetch({url: path, params, method: 'POST'})
        } else {
            const opt: URL = url;
            return this.creatAxios({
                url: opt.url,
                params: opt.params,
                method: 'POST',
                intercept: opt.intercept,
                responseType: opt.responseType
            });
        }
    }

    /**
     * 异步上传 大文件上传
     * @param {any} url
     * @param {any} params
     * @param {any} type
     * @returns {Promise<any>}
     */
    public static async upload({
                                   url,
                                   params,
                                   type
                               }: UPLOAD) {
        return new Promise((resolve, reject) => {
            if (type === 'async') {
                this.__uplaod({
                    url,
                    params,
                    type
                }).then((res: any) => {
                    resolve(res);
                });
            }
        });
    }

    /**
     * 递归实现异步上传
     * @param {string} url
     * @param {any} params
     * @returns {Promise<void>}
     * @private
     */
    public static async __uplaod({
                                     url,
                                     params,
                                     type
                                 }: UPLOAD) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const _params = Object.assign({}, params, {type});
                this.post({url, params: _params}).then((res: any) => {
                    if (res.status === 'finished') {
                        resolve(res);
                    } else {
                        return this.__uplaod({
                            url,
                            params,
                            type
                        })
                    }
                });
            }, 5000);
        });
    }
}