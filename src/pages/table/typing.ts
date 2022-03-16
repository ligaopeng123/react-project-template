/**********************************************************************
 *
 * @模块名称: typing
 *
 * @模块用途: Table 类型系统
 *
 * @创建人: pgli
 *
 * @date: 2022-03-16 08:03:42
 *
 **********************************************************************/

/**
 * store类型系统定义
 */
export enum StoreEnum {
	add = 'add',
	del = 'del',
	edit = 'edit',
	refresh = 'refresh',
}

export type Action = {
	value: any;
	type: StoreEnum
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


export type TableProps = Props & {};
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
export type TableBase = {
	[propName: string]: any;
}

export type AddTableProps = {
	[propName: string]: any;
} & TableBase;

export type EditTableProps = {
	[propName: string]: any;
} & TableBase;

export type TableListItem = {
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
};
