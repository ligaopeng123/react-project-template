/**********************************************************************
 *
 * @模块名称: typing
 *
 * @模块用途: typing
 *
 * @date: 2021/7/26 10:00
 *
 * @版权所有: pgli
 *
 **********************************************************************/
type OptionBase = {
	body?: any,
	[propName: string]: any;
}
export type Option = OptionBase & {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
}

export type Fetch = (url: string, option?: OptionBase) => any;

export type GraphqlOption = {
	fetchPolicy?: string;
	[propName: string]: any;
}

export type ClientEvents = () => Promise<any>;

export  type GraphqlClientEvents = {
	query: ClientEvents;
	mutate: ClientEvents;
}