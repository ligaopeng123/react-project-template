/**
 *@模块名称：MockServic
 *
 *@创建人：ligaoming
 *
 *@作用：setMockService  mock服务模拟
 *
 *@date 2020/9/8
 *
 *@版权所有：
 */
// 导出配置的mock数据
import * as MOCKDATA from '@mocks/index';
import HttpClient from '../HttpClient';
// 语法检查 临时转换
const MOCKDATACACHE: any = MOCKDATA;
// 将数据拿出来
const mockData = Object.keys(MOCKDATA as any).map((key: any) => {
    return MOCKDATACACHE[key];
});

/**
 * 模拟mock
 * @param {any} url
 * @param {any} method
 * @param {any} params
 * @returns {Promise<any>}
 */
export default async function setMockService({
                                                 url,
                                                 method,
                                                 params,
                                                 intercept,
                                                 responseType
                                             }: any) {
    return new Promise((resolve, reject) => {
        // 查找设置的mock值 如果找到 就使用mock数据 找不到就尝试后台获取
        let mock: any;
        for (let i = 0; i < mockData.length; i++) {
            const item = mockData[i];
            if (item[url]) {
                mock = item[url];
                break;
            }
        }
        if (mock) {
            setTimeout(() => {
                resolve(mock);
            }, 300);// 模拟300ms
        } else {
            // 去后台获取
            return HttpClient.creatAxiosAsync({
                url,
                method,
                params,
                intercept,
                responseType
            }).then((res: any) => {
                resolve(res);
            });
        }
    })
}