/**********************************************************************
 *
 * @模块名称: HttpClient
 *
 * @模块用途: HttpClient
 *
 * @date: 2021/7/26 8:25
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import {Fetch} from "@httpClient/typing";
import fetchIntercept from "fetch-intercept";
import Intercept from "@httpClient/Intercept";
// 拦截器
const unregister = fetchIntercept.register(Intercept);

const cetateFetch: Fetch = (url, option) => {
	return fetch(url, Object.assign({
		headers: {
			'content-type': 'application/json',
			// 此处或者拦截器中可添加业务token
		},
	}, option)).then((res: Response) => {
		return res.clone().json();
	}).catch((error: Error) => {
		console.error(`${url}请求出错，`, error)
	});
};

export const get: Fetch = (url, option) => {
	return cetateFetch(url, Object.assign({method: 'GET'}, option));
};

export const post: Fetch = (url, option) => {
	return cetateFetch(url, Object.assign({method: 'POST'}, option));
};

export const put: Fetch = (url, option) => {
	return cetateFetch(url, Object.assign({method: 'PUT'}, option));
};

export const del: Fetch = (url, option) => {
	return cetateFetch(url, Object.assign({method: 'DELETE'}, option));
};

/**
 * 卸载fetch拦截器
 */
export const unregisterFetch = () => {
	unregister();
};

export default {
	get,
	post,
	put,
	del,
	unregister,
	unregisterFetch
};