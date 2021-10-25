/**********************************************************************
 *
 * @模块名称: utils
 *
 * @模块用途: utils
 *
 * @date: 2021/10/25 17:21
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import {removeEmptyParams} from '@gaopeng123/utils';

/**
 * 处理表格参数
 * @param params
 * @param pageOptions
 */
export const dealWithParams = (params: any, pageOptions?: any) => {
	const {pageNumKey, pageSizeKey} = Object.assign({pageNumKey: 'pageNum', pageSizeKey: 'pageSize'}, pageOptions);
	const newParams = Object.assign({}, removeEmptyParams(params));
	newParams[pageNumKey] = newParams.current;
	newParams[pageSizeKey] = newParams.pageSize;
	// 删除冗余参数
	if (pageNumKey !== 'current') {
		delete newParams.current;
	}
	if (pageSizeKey !== 'pageSize') {
		delete newParams.pageSize;
	}
	return newParams;
};
