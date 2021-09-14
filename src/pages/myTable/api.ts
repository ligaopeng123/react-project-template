/**********************************************************************
 *
 * @模块名称: api
 *
 * @模块用途: api 定义
 *
 * @创建人: pgli
 *
 * @date: 2021-08-26 16:20:21
 *
 **********************************************************************/
import {get, post, put, del} from "@httpClient/index";
import {valueEnum, TableListItem} from "./typing";

export const list = async () => {
	const tableListDataSource: TableListItem[] = [];
	
	const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
	
	for (let i = 0; i < 5; i += 1) {
		tableListDataSource.push({
			key: i,
			name: 'AppName',
			containers: Math.floor(Math.random() * 20),
			creator: creators[Math.floor(Math.random() * creators.length)],
			// @ts-ignore
			status: valueEnum[Math.floor(Math.random() * 10) % 4],
			createdAt: Date.now() - Math.floor(Math.random() * 2000),
			money: Math.floor(Math.random() * 2000) * i,
			progress: Math.ceil(Math.random() * 100) + 1,
			memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
		});
	}
	return tableListDataSource;
};


