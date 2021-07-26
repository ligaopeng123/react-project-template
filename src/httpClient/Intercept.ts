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
import {Option} from "@httpClient/typing";

const Intercept: any = {
	request: function (url: string, config: Option) {
		// Modify the url or config here
		return [url, config];
	},
	
	requestError: function (error: Error) {
		return Promise.reject(error);
	},
	
	response: function (response: Response) {
		// Modify the reponse object
		return response;
	},
	
	responseError: function (error: Error) {
		// Handle an fetch error
		console.log(error)
		return Promise.reject(error);
	}
};

export default Intercept;