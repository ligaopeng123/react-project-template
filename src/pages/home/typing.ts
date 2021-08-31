/**********************************************************************
 *
 * @模块名称: typing
 *
 * @模块用途: typing
 *
 * @date: 2021/8/4 9:21
 *
 * @版权所有: pgli
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
	state?: any;
	dispatch?: Fn;
	[propName: string]: any;
}
