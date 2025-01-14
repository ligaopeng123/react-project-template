/**********************************************************************
 *
 * @模块名称: HttpClient
 *
 * @模块用途: HttpClient
 *
 * @date: 2021/7/26 8:25
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import intercept from "@httpClient/intercept";
import {register} from '@gaopeng123/fetch';

export {get, post, del, put, patch} from "@gaopeng123/fetch";

export const unregisterFetch = register(intercept);
