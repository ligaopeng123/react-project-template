/**********************************************************************
 *
 * @模块名称: Store
 *
 * @模块用途: MyTable Store 状态管理
 *
 * @创建人: pgli
 *
 * @date: 2021-08-26 16:20:21
 *
 **********************************************************************/
import {Action, StoreEnum} from "./typing";

export const State = {};

export const init = (state: any) => {
	return state
};

export const reducer = (state: any, action: Action) => {
	switch (action.type) {
		case StoreEnum.add:
			return Object.assign({}, state, {[StoreEnum.add]: action.value});
		case StoreEnum.edit:
			return Object.assign({}, state, {[StoreEnum.edit]: action.value});
		case StoreEnum.del:
			return Object.assign({}, state, {[StoreEnum.del]: action.value});
		case StoreEnum.refresh:
			return Object.assign({}, state, {[StoreEnum.refresh]: action.value});
	}
};

