/**********************************************************************
 *
 * @模块名称: Intercept
 *
 * @模块用途: Intercept 拦截器
 *
 * @date: 2021/7/26 8:26
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import {FetchInterceptorResponse, Intercept, Options} from "@gaopeng123/fetch";
import {getToken} from "@httpClient/Global";
import toLogin from "@httpClient/toLogin";
import {message} from "antd";

let messageId: any = null;
const showMessage = (msg: string) => {
	clearTimeout(messageId);
	messageId = setTimeout(() => {
		message.destroy();
		message.warn(msg);
	}, 200);
};

const intercept: Intercept = {
	request: function (url: string, config: Options) {
		// Modify the url or config here
		console.log('request', config);
		if (config?.headers) {
			// 此处定义token 获取其他
			config.headers.token = getToken();
		}
		return [url, config];
	},
	
	requestError: function (error: Error) {
		console.log('requestError');
		return Promise.reject(error);
	},
	
	response: async (response: FetchInterceptorResponse): Promise<any> => {
		// Modify the reponse object
		// 此处返回
		if (response.request.options.responseType) {
			// 此处拿到返回值信息 服务端权限异常 有可能放到业务接口中处理状态
			const res = await response.clone()[response.request.options.responseType]();
			// showMessage(res?.msg);
			// 鉴权失败后退出登录
			// if (res) toLogin();
		}
		return new Promise((resolve, reject) => {
			resolve(response);
		});
	},
	
	responseError: function (error: Error) {
		// Handle an fetch error
		console.log('responseError');
		return Promise.reject(error);
	}
};

export default intercept;
