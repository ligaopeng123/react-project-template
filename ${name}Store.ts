/**********************************************************************
 *
 * @模块名称: Store
 *
 * @模块用途: <%= name %> Store 状态管理
 *
 * @创建人: <%= username %>
 *
 * @date: <%= time %>
 *
 **********************************************************************/
import {Action, <%= name %>StoreEnum} from "./<%= name %>Typing";

export const State = {};

export const init = (state: any) => {
	return state
};

export const reducer = (state: any, action: Action) => {
	switch (action.type) {
		case <%= name %>StoreEnum.add:
			return Object.assign({}, state, {[<%= name %>StoreEnum.add]: action.value});
		case <%= name %>StoreEnum.edit:
			return Object.assign({}, state, {[<%= name %>StoreEnum.edit]: action.value});
		case <%= name %>StoreEnum.del:
			return Object.assign({}, state, {[<%= name %>StoreEnum.del]: action.value});
		case <%= name %>StoreEnum.refresh:
			return Object.assign({}, state, {[<%= name %>StoreEnum.refresh]: action.value});
		default:
			return state;
	}
};

