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

import {
	getWindowSize,
	removeTip,
} from './AppUtilHelper';
import BaseColorHelper from './base-color-helper';
import {ColorConversionHelper} from './color-conversion.helper';
import {isArray, isEmptyObject, isObject, isString, isUndefined} from "@gaopeng123/utils";

export default class AppUtil {
	/**
	 * 判断浏览器类型 出自ext.js
	 * @param regex
	 */
	private static check = function (regex: any) {
		return regex.test(navigator.userAgent.toLowerCase());
	};
	public static readonly isStrict = document.compatMode === 'CSS1Compat';
	private static version = function (is: any, regex: any) {
		let m;
		return is && (m = regex.exec(navigator.userAgent.toLowerCase()))
			? parseFloat(m[1])
			: 0;
	};
	
	public static get docMode() {
		const dom: any = document;
		return dom['documentMode'];
	}
	
	public static get isOpera() {
		return this.check(/opera/);
	}
	
	public static get isOpera10_5() {
		return this.isOpera && this.check(/version\/10\.5/);
	};
	
	public static get isChrome() {
		return this.check(/\bchrome\b/) && !this.check(/edge/);
	};
	
	public static get isWebKit() {
		return this.check(/webkit/);
	}
	
	public static get isSafari() {
		return !this.isChrome && this.check(/safari/);
	}
	
	public static get isSafari2() {
		return this.isSafari && this.check(/applewebkit\/4/);
	}; // unique to Safari 2
	public static get isSafari3() {
		return this.isSafari && this.check(/version\/3/);
	}
	
	public static get isSafari4() {
		return this.isSafari && this.check(/version\/4/);
	}
	
	public static get isSafari5_0() {
		return this.isSafari && this.check(/version\/5\.0/);
	}
	
	public static get isSafari5() {
		return this.isSafari && this.check(/version\/5/);
	}
	
	public static get isIE() {
		const ActiveXObject: any = 'ActiveXObject';
		return (!this.isOpera && (this.check(/msie/) || this.check(/edge/))) ||
			(!!window[ActiveXObject] || ActiveXObject in window);
	}
	
	public static get isIE6() {
		return this.isIE && this.check(/msie 6/);
	}
	
	public static get isIE7() {
		return this.isIE &&
			((this.check(/msie 7/) &&
				this.docMode !== 8 &&
				this.docMode !== 9 &&
				this.docMode !== 10) ||
				this.docMode === 7);
	}
	
	public static get isIE8() {
		return this.isIE &&
			((this.check(/msie 8/) &&
				this.docMode !== 7 &&
				this.docMode !== 9 &&
				this.docMode !== 10) ||
				this.docMode === 8);
	}
	
	public static get isIE9() {
		return this.isIE &&
			((this.check(/msie 9/) &&
				this.docMode !== 7 &&
				this.docMode !== 8 &&
				this.docMode !== 10) ||
				this.docMode === 9);
	}
	
	public static get isIE10() {
		return this.isIE &&
			((this.check(/msie 10/) &&
				this.docMode !== 7 &&
				this.docMode !== 8 &&
				this.docMode !== 9) ||
				this.docMode === 10);
	}
	
	public static get isIE11() {
		return this.isIE && this.check(/trident/);
	}
	
	public static get isEdge() {
		return this.isIE && this.check(/edge/);
	}
	
	public static get isGecko() {
		return !this.isWebKit && this.check(/gecko/);
	}
	
	public static get isGecko3() {
		return this.isGecko && this.check(/rv:1\.9/);
	}
	
	public static get isGecko4() {
		return this.isGecko && this.check(/rv:2\.0/);
	}
	
	public static get isGecko5() {
		return this.isGecko && this.check(/rv:5\./);
	}
	
	public static get isGecko10() {
		return this.isGecko && this.check(/rv:10\./);
	}
	
	public static get isFF3_0() {
		return this.isGecko3 && this.check(/rv:1\.9\.0/);
	}
	
	public static get isFF3_5() {
		return this.isGecko3 && this.check(/rv:1\.9\.1/);
	}
	
	public static get isFF3_6() {
		return this.isGecko3 && this.check(/rv:1\.9\.2/);
	}
	
	public static get isWindows() {
		return this.check(/windows|win32/);
	}
	
	public static get isMac() {
		return this.check(/macintosh|mac os x/);
	}
	
	public static get isLinux() {
		return this.check(/linux/);
	}
	
	public static readonly scrollbarSize = null;
	
	public static get chromeVersion() {
		return this.version(true, /\bchrome\/(\d+\.\d+)/);
	}
	
	public static get firefoxVersion() {
		return this.version(true, /\bfirefox\/(\d+\.\d+)/);
	}
	
	public static get ieVersion() {
		return this.version(this.isIE, /msie (\d+\.\d+)/);
	}
	
	public static get operaVersion() {
		return this.version(this.isOpera, /version\/(\d+\.\d+)/);
	}
	
	public static get safariVersion() {
		return this.version(this.isSafari, /version\/(\d+\.\d+)/);
	}
	
	public static get webKitVersion() {
		return this.version(this.isWebKit, /webkit\/(\d+\.\d+)/);
	}
	
	public readonly isSecure = /^https/i.test(window.location.protocol);
	
	public static get isFirefox() {
		return this.firefoxVersion ? true : false;
	}
	
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
	 * @param key 模块传入key值，获取相当应的颜色，方便统一管理
	 * @returns {any}
	 */
	private static colorCache: any;
	
	public static getColor(key = 'color', defalut = false) {
		let color: any;
		// 利用缓存 只执行一次
		if (this.colorCache) {
			color = this.colorCache;
		} else {
			color = {
				text: 'rgba(255, 255, 255, 1)', // 文本色
				color: BaseColorHelper.getColor(),
				background: '#14212A', // 背景色
			};
			// 漏洞类型  相关颜色配置 事件类型 视觉类型 告警类型 对比类型
			color = this.apply(color, this.gradientColor);
			this.colorCache = color;
		}
		return color[key] || (defalut ? '#8fd7ff' : undefined);
	}
	
	public static sequence = 0;
	
	public static getSequenceColor() {
		let color: any;
		// 利用缓存 只执行一次
		if (this.colorCache) {
			color = this.colorCache;
		} else {
			color = {
				text: 'rgba(255, 255, 255, 1)', // 文本色
				color: BaseColorHelper.getColor(),
				background: '#14212A', // 背景色
			};
			// 漏洞类型  相关颜色配置 事件类型 视觉类型 告警类型 对比类型
			color = this.apply(color, this.gradientColor);
			this.colorCache = color;
		}
		if (this.sequence >= color.color.length) {
			this.sequence = 0;
		}
		return color.color[this.sequence++];
	}
	
	
	/**
	 * 渐变色管理
	 * @returns {{#E21352: string; #990099: string; #fbf264: string; #00E0E6: string; #00DC85: string}}
	 */
	public static get gradientColor() {
		const gradientColor = BaseColorHelper.gradientColor();
		return gradientColor
	}
	
	/**
	 * 将rgb颜色转换成16进制颜色
	 * @param that
	 * @returns {any}
	 */
	public static colorToHex = ColorConversionHelper.colorToHex;
	
	/**
	 * 将16进制转换成rgb颜色
	 * @param col
	 * @returns {string}
	 */
	public static colorToRgb = ColorConversionHelper.colorToRgb;
	
	/**
	 * 添加透明度
	 * @param {string} color
	 * @param {number} opacity
	 */
	public static addOpacity = ColorConversionHelper.addOpacity;
	
	/**
	 * RGBA 转16进制颜色
	 * @param color
	 * @returns {string}
	 */
	public static RGBATOHEX = ColorConversionHelper.RGBATOHEX;
	
	/**
	 * @param rgba_color rgba(0,0,0,0.1)
	 * @returns {string}
	 * @constructor
	 */
	public static RGBA2RGB = ColorConversionHelper.RGBA2RGB;
	
	/**
	 * 给对象排序
	 * @param {Object} obj
	 * @returns {Object}
	 */
	public static sortObjByVal(obj: object) {
		const keys = Object.keys(obj);
		const vals = Object['values'](obj);
		return obj;
	}
	
	
	/**
	 * 判断是否支持排序，主要是判断浏览器差异的
	 * @type {boolean}
	 */
	private static readonly supportsSort = (function () {
		const a = [1, 2, 3, 4, 5].sort(function () {
			return 0;
		});
		return a[0] === 1 && a[1] === 2 && a[2] === 3 && a[3] === 4 && a[4] === 5;
	})();
	
	/**
	 * Sorts the elements of an Array.
	 * By default, this method sorts the elements alphabetically and ascending.
	 *
	 * @param {Array} array The array to sort.
	 * @param {Function} sortFn (optional) The comparison function.
	 * @param {Mixed} sortFn.a An item to compare.
	 * @param {Mixed} sortFn.b Another item to compare.
	 * @return {Array} The sorted array.
	 */
	public static sort(_array: any[], _sortFn: any) {
		return this.supportsSort
			? function (array, sortFn) {
				if (sortFn) {
					return array.sort(sortFn);
				} else {
					return array.sort();
				}
			}(_array, _sortFn)
			: function (array, sortFn) {
				const length = array.length;
				let i = 0,
					comparison,
					j,
					min,
					tmp;
				
				for (; i < length; i++) {
					min = i;
					for (j = i + 1; j < length; j++) {
						if (sortFn) {
							comparison = sortFn(array[j], array[min]);
							if (comparison < 0) {
								min = j;
							}
						} else if (array[j] < array[min]) {
							min = j;
						}
					}
					if (min !== i) {
						tmp = array[i];
						array[i] = array[min];
						array[min] = tmp;
					}
				}
				
				return array;
			}(_array, _sortFn);
	}
	
	
	/**
	 *  清理所有的tip信息
	 */
	public static removeTip = removeTip;
	
	/**
	 *
	 * @returns {{width: number; 浏览器宽度
	 * height: number; 浏览器高度
	 * availWidth: any;  可视化宽度
	 * availHeight: any}} 可视化高度
	 */
	public static getWindowSize = getWindowSize;
	
	/**
	 * 获取数组的最大值
	 * @param {Array<number>} arr  数组类型 且元素为number
	 * @returns {any}
	 */
	public static getMax(arr: Array<number>) {
		return Math.max.apply(null, arr);
	}
	
	/**
	 * 数组求和
	 * @param {Array<any>} arr
	 * @param {string} key  对象形式传入key值
	 * @returns {any}
	 */
	public static getSum(arr: Array<any>, key = '') {
		// if (!key) {
		//   return eval(arr.join('+'));
		// }
		let sum = 0;
		key ? arr.forEach(function (val, idx, arr) {
			sum += val[key];
		}, 0) : arr.forEach(function (val, idx, arr) {
			sum += val;
		}, 0);
		return sum;
	}
	
	/**
	 * 获取最小值
	 * @param {Array<number>} arr 数组类型 且元素为number
	 * @returns {any}
	 */
	public static getMin(arr: Array<number>) {
		return Math.min.apply(null, arr);
	}
	
	
	/**
	 * 根据最大值 统一阈值划分 0-60 60-80 80-90 90-100 4个层次 其他量级 依次规则进行划分
	 * @param maxVal
	 * @returns {{firstThreshold: number; secondThreshold: number; thirdThreshold: number}}
	 */
	public static getLevelThresholdByMaxValue(maxVal: number) {
		const firstThreshold = Math.ceil(maxVal / 100 * 90);
		const secondThreshold = Math.ceil(maxVal / 100 * 80);
		const thirdThreshold = Math.ceil(maxVal / 100 * 60);
		return {
			firstThreshold,
			secondThreshold,
			thirdThreshold,
		}
	}
	
	/**
	 * 获取dom的真实样式  处理基于订阅者模式下样式变动场景
	 * 当满足条件时返回true即可
	 * 例：this.util.getOffetWidthAfterViewInit(()=>{
        const W = dom.querySelector('ul').offsetWidth;
        if (W <= 300) {
          return true;
        } else {
          document.getElementsByTagName('app-sidebar')[0]['style'].width = W + 30 + 'px';
          return false;
        }
      });
	 * @param callback
	 */
	public static getOffetWidthAfterViewInit = function (callback: any) {
		setTimeout(() => {
			if (callback && this['isFunction'](callback)) {
				// status来判断计时器是否开启 当不满足条件时返回true即可 接着轮询
				const status = callback();
				if (status) {
					this['getOffetWidthAfterViewInit'](callback);
				}
			}
		}, 200);
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
	 * 对象转换成字符串
	 * @param val
	 * @returns {string | any | any}
	 */
	public static stringify(val: any) {
		return this.objToStr(val, true);
	}
	
	/**
	 * 字符串转换成对象
	 * @param val
	 * @returns {string | any | any}
	 */
	public static strToObj(val: string) {
		return this.objToStr(val, false);
	}
	
	/**
	 * 字符串转换成对象
	 * @param val
	 * @returns {string | any | any}
	 */
	public static parse(val: string) {
		return this.strToObj(val);
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
	 * 对象转换成二维
	 * @param obj
	 * @returns {Array}
	 */
	public static objectToTwoDimensionalArray(obj: any) {
		if (!obj)
			throw new Error(`objectToArray must provide object param!`);
		if (!isObject(obj))
			throw new Error(`objectToArray provided obj param must be object type!`);
		
		let acptArr = [];
		for (const item in obj) {
			acptArr.push([item, obj[item]]);
		}
		return acptArr;
	}
	
	/**
	 * 处理数字单位化读法
	 * @param number
	 * @returns {String}
	 */
	public static numToReadability(numb: number) {
		let num: string | number = numb;
		if (num >= 10000) {
			num = Math.round(num / 1000) / 10 + 'W';
		} else if (num >= 1000) {
			num = Math.round(num / 100) / 10 + 'K';
		}
		return num;
	}
	
	/**
	 *  复制文本
	 * @param span 文本标签
	 */
	public static inputCache: any;
	
	public static copySpanText(span: any) {
		const text = span.innerText;
		if (!this.inputCache) {
			this.inputCache = document.createElement('input');
		}
		this.inputCache.setAttribute('value', text);
		// document.getElementsByTagName('body')[0].appendChild(input);
		this.inputCache.select();
		if (document.execCommand('copy')) {
			console.log('复制成功')
		}
		// input.remove();
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
	
	/**
	 * 获取proTable表格数据
	 * @param data
	 * @returns {any}
	 */
	public static getGraphQlTableData(data: any): any {
		if (isUndefined(data)) {
			return data;
		}
		if (data.__typename) {
			return data;
		}
		return this.getGraphQlTableData(data.data);
	}
	
	/**
	 * 处理参数
	 * @param params
	 * @returns {any}
	 */
	public static setGraphQlParams(params: any): any {
		return params;
	}
	
	/**
	 * 递归查找符合预期的dom结构
	 * @param dom
	 * @param fn
	 * @returns {any}
	 */
	public static getParentDomToExpected(dom: any, fn: any): any {
		if (fn(dom)) {
			return dom;
		}
		return this.getParentDomToExpected(dom.parentNode || dom.parentElement, fn);
	}
}
