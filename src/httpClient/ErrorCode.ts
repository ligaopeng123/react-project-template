/**********************************************************************
 *
 * @模块名称: ErrorCode
 *
 * @模块用途: ErrorCode
 *
 * @date: 2021/7/26 8:23
 *
 * @版权所有: pgli
 *
 **********************************************************************/
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
};
export default ErrorCode