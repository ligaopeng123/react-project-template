/**********************************************************************
 *
 * @模块名称: api
 *
 * @模块用途: api 定义
 *
 * @创建人: pgli
 *
 * @date: 2022-03-16 08:03:42
 *
 **********************************************************************/
import {get, post, put, del} from "@httpClient/index";
import {valueEnum, TableListItem, AddTableProps, EditTableProps} from "./typing";

export const TableList = async (params: any) => {
	const tableListDataSource: TableListItem[] = [];

	const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

	for (let i = 0; i < 15; i += 1) {
		tableListDataSource.push({
			// @ts-ignore
			key: i,
			// @ts-ignore
			name: 'AppName',
			// @ts-ignore
			containers: Math.floor(Math.random() * 20),
			// @ts-ignore
			creator: creators[Math.floor(Math.random() * creators.length)],
			// @ts-ignore
			status: valueEnum[Math.floor(Math.random() * 10) % 4],
			// @ts-ignore
			createdAt: Date.now() - Math.floor(Math.random() * 2000),
			// @ts-ignore
			money: Math.floor(Math.random() * 2000) * i,
			// @ts-ignore
			progress: Math.ceil(Math.random() * 100) + 1,
			// @ts-ignore
			memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示要留下尾巴' : '简短备注文案',
		});
	}
	return tableListDataSource;
};

/**
 * 新增接口
 */
export const addTable = async (params: AddTableProps)=> {
	return await post('./json/OEM.json', {body: params});
};

/**
 * 编辑接口
 */
export const editTable = async (params: EditTableProps)=> {
	return await post('./json/OEM.json', {body: params});
};

/**
 * 删除接口
 */
export const delTable = async (row: TableListItem)=> {
	return await del('./json/OEM.json', {body: {id: row?.id}});
};
