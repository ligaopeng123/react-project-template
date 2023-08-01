/**********************************************************************
 *
 * @模块名称: typing
 *
 * @模块用途: <%= name %> 类型系统
 *
 * @创建人: <%= username %>
 *
 * @date: <%= time %>
 *
 **********************************************************************/

/**
 * store类型系统定义
 */
export enum <%= name %>StoreEnum {
	add = 'add',
	del = 'del',
	edit = 'edit',
	refresh = 'refresh',
}

export type Action = {
	value: any;
	type: <%= name %>StoreEnum
}

/**
 * StoreProps参数
 */
export type Fn = (...args: any) => any;
export type Props = {
	state: any;
	dispatch: Fn;
	[propName: string]: any;
}


export type <%= name %>TableProps = Props & {};
export type ModalForTableProps = Props & {};

export type FormForTableRef = {
	values: () => Promise<any>;
	[propName: string]: any;
}

export type FormForTableProps = {
	formData: any;
	ref?: any
};

export const valueEnum = {
	0: 'close',
	1: 'running',
	2: 'online',
	3: 'error',
};
export type <%= name %>Base = {
	id?: number;
	key: number;
	name: string;
	containers: number;
	creator: string;
	status: string;
	createdAt: number;
	progress: number;
	money: number;
	memo: string;
	[propName: string]: any;
}

export type Add<%= name %>Props = {
	[propName: string]: any;
} & <%= name %>Base;

export type Edit<%= name %>Props = {
	[propName: string]: any;
} & <%= name %>Base;

export type <%= name %>TableListItem = {
} & <%= name %>Base;
