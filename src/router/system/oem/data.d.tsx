import {TableListItem, TableListParams} from '../../data.d';

export interface OemTableListItem extends TableListItem {
    id?: number;
    name?: string;
    key?: string;
    value?: any;
    value_type?: string,
}
// 不需要参数
export interface OemTableListParams extends TableListParams {

}
