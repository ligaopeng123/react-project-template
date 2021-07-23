import HttpClient from '../../../share/HttpClient';
import {gql} from '@apollo/client';
import AppUtil from '../../../share/Utils/AppUtil';
import {OemTableListItem} from './data.d';
import {MutateResponse} from '../../../router/data.d';


export function getOemConfig() {
    return new Promise((resolve, reject) => {
        HttpClient.get({
            url: '/json/OEM.json'
        }).then(({code, data}: any) => {
            resolve(data);
        })
    });
}

/**
 * @param {TableListParams} params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function queryOems(): Promise<any> {
    return new Promise((resolve, reject) => {
        HttpClient.query({
            // query layout 具名查询语句 可省略 建议加上
            params: {
                query: gql`
                    query OemList {
                        data:getOemList{
                            data {
                                id,
                                name,
                                key,
                                value,
                                value_type
                            },
                            code,
                            total,
                            message
                        }
                    }`
            }
        }).then((res: any) => {
            resolve(AppUtil.getGraphQlTableData(res))
        });
    });
}


export async function createOem(params: OemTableListItem | any): Promise<MutateResponse> {
    return new Promise((resolve, reject) => {
        HttpClient.mutate({
            // query layout 具名查询语句 可省略 建议加上
            params: {
                mutation: gql`
                    mutation CreateOem($oem: OemCreateInput!) {
                        data:createOem(oem:$oem) {
                            code,
                            message
                        }
                    }`,
                variables: {
                    oem: params
                }
            }
        }).then((res: any) => {
            resolve(AppUtil.getGraphQlTableData(res))
        });
    });
}


export async function editOems(params: OemTableListItem | any): Promise<MutateResponse> {
    return new Promise((resolve, reject) => {
        HttpClient.mutate({
            // query layout 具名查询语句 可省略 建议加上
            params: {
                mutation: gql`
                    mutation UpdateOem($oem: OemUpdateInput!) {
                        data:updateOem(oem:$oem) {
                            code,
                            message
                        }
                    }`,
                variables: {
                    oem: params
                }
            }
        }).then((res: any) => {
            resolve(AppUtil.getGraphQlTableData(res))
        });
    });
}


export async function delOem(params: OemTableListItem | any): Promise<MutateResponse> {
    return new Promise((resolve, reject) => {
        HttpClient.mutate({
            // query layout 具名查询语句 可省略 建议加上
            params: {
                mutation: gql`
                    mutation DeleteOem($ID: ID!) {
                        data:deleteOem(ID:$ID) {
                            code,
                            message
                        }
                    }`,
                variables: {
                    ID: params.id
                }
            }
        }).then((res: any) => {
            resolve(AppUtil.getGraphQlTableData(res))
        });
    });
}

