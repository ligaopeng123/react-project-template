/**********************************************************************
 *
 * @模块名称: api
 *
 * @模块用途: api 定义
 *
 * @创建人: <%= username %>
 *
 * @date: <%= time %>
 *
 **********************************************************************/
import {get, post, put, del} from "@httpClient/index";
import {valueEnum, TableListItem, Add<%= name %>Props, Edit<%= name %>Props} from "./typing";

export const <%= name %>List = async (params: any) => {
	const tableListDataSource: TableListItem[] = [];
	
	const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
	
	for (let i = 0; i < 5; i += 1) {
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
			memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
		});
	}
	return tableListDataSource;
};

/**
 * 新增接口
 */
export const add<%= name %> = async (params: Add<%= name %>Props)=> {
	return await post('./json/OEM.json', {body: params});
};

/**
 * 编辑接口
 */
export const edit<%= name %> = async (params: Edit<%= name %>Props)=> {
	return await post('./json/OEM.json', {body: params});
};

/**
 * 删除接口
 */
export const del<%= name %> = async (row: TableListItem)=> {
	return await del('./json/OEM.json', {body: {id: row?.id}});
};
