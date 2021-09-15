/**
 *@模块名称：TabChangeService
 *
 *@创建人：ligaoming
 *
 *@作用：基础方法封装
 *
 *@date 2018/5/16
 *
 */
import {isArray, isEmptyObject, isObject, isString, isUndefined} from "@gaopeng123/utils";

export default class AppUtil {
	
	/**
	 * 全属性copy
	 * @param targetConfig
	 * @param sourceConfig
	 */
	public static depthAssign<T extends {}>(targetConfig: T, sourceConfig: T, sourceConfig2: any = undefined, level = 5): void {
		if (sourceConfig2) {
			this.depthAssign(targetConfig, sourceConfig2);
		}
		if (targetConfig && sourceConfig && isObject(sourceConfig)) {
			// 默认5层递归 如果层次过多 请传递层次次数
			this.copyObjectProperties(targetConfig, sourceConfig, level);
		} else {
			Object.assign(targetConfig || {}, sourceConfig || {});
		}
	};
	
	/**
	 * 属性copy 用于绝对的深层次copy
	 * @param targetConfig
	 * @param sourceConfig
	 */
	public static copyObjectProperties(targetConfig: any, sourceConfig: any, index: number): void {
		index -= 1;
		if (index < 0) return;
		if (isObject(sourceConfig)) {
			for (let key in sourceConfig) {
				if (isObject(sourceConfig[key])) {
					targetConfig[key] = isUndefined(targetConfig[key]) ? {} : targetConfig[key];
					this.copyObjectProperties(targetConfig[key], sourceConfig[key], index);
				} else {
					targetConfig[key] = isUndefined(sourceConfig[key]) ? targetConfig[key] : sourceConfig[key];
				}
			}
		} else {
			targetConfig = isUndefined(sourceConfig) ? targetConfig : sourceConfig;
		}
	}
	
	/**
	 * 对象和string互转方法
	 */
	public static objToStr(val: any, direction = true) {
		if (direction && isObject(val)) {
			return JSON.stringify(val);
		} else if (!direction &&
			(val === '{}' || (isString(val) && ((val.startsWith('{') && val.endsWith('}')) || (val.startsWith('[') && val.endsWith(']')))))) {
			return (new Function('return ' + val))();
		} else {
			return val;
		}
	}
	
	/**
	 * 根据指定key将 对象数组 转换成对象
	 * @param arr, key
	 * @returns {object}
	 */
	public static arrayToObject(arr: any[], key?: any) {
		if (!arr)
			throw new Error(`arrayToObject must provide array param!`);
		if (!isArray(arr))
			throw new Error(`arrayToObject provided arr param must be array type!`);
		
		if (!key)
			key = 'key';
		
		if (!isString(key))
			throw new Error(`arrayToObject provided key param must be string type!`);
		
		let acptObj: any = {};
		arr.forEach(item => {
			acptObj[item[key]] = item;
		});
		return acptObj;
	}
	
	/**
	 * 对象转换成对象数组
	 * @param obj
	 * @returns {Array}
	 */
	public static objectToArray(obj: any) {
		if (!obj)
			throw new Error(`objectToArray must provide object param!`);
		if (!isObject(obj))
			throw new Error(`objectToArray provided obj param must be object type!`);
		
		let acptArr = [];
		for (const item in obj) {
			acptArr.push(obj[item]);
		}
		return acptArr;
	}
	
	/**
	 *  检查对象是否有某个属性
	 * @param obj  要检查的对象
	 * @param {string} attr  对象上的属性 且支持多个层级的探测
	 * @returns {boolean}
	 */
	public static checkObjHasSingleAttr(obj: any, attr: string) {
		if (isUndefined(obj[attr]) || obj[attr] === null) {
			return false;
		}
		return true;
	}
	
	/**
	 *  检查对象是否有某个属性
	 * @param obj  要检查的对象
	 * @param {string} attr  对象上的属性 且支持多个层级的探测
	 * @returns {boolean}
	 */
	public static checkObjHasAttr(obj: any, attr: string) {
		if (!obj || isEmptyObject(obj)) return false;
		const attrs = attr.split('.');
		const len = attrs.length;
		let storey = obj;
		for (let i = 0; i < len; i++) {
			if (!this.checkObjHasSingleAttr(storey, attrs[i])) {
				return false;
			}
			storey = obj[attrs[i]];
		}
		return true;
	}
}
