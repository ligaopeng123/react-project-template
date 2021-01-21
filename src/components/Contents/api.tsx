import HttpClient from '@/share/HttpClient';
import {gql} from '@apollo/client';
import AppUtil from '@share/Utils/AppUtil';


/**
 *  name: string;
 desc?: string;
 organization: string;
 organization_id: string
 * @param {TableListParams} params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function queryScreen(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
        HttpClient.query({
            // query layout 具名查询语句 可省略 建议加上
            params: {
                query: gql`
                    query GetScreenList($params:TopologyParams) {
                        data:getScreen(params:$params) {
                            data {
                                id,
                                name,
                                image,
                                value,
                                info,
                            },
                            code,
                            message
                        }
                    }`,
                variables: {
                    params: params
                }
            }
        }).then((res: any) => {
            resolve(AppUtil.getGraphQlTableData(res))
        });
    });
}