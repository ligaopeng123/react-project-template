/**********************************************************************
 *
 * @模块名称: demo-function.test
 *
 * @模块用途: demo-function.test
 *
 * @date: 2021/8/13 16:14
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import { demoFunction } from "../src";

describe('demo-function', () => {
    it('works', () => {
        expect(demoFunction()).toEqual(2);
    });
});
