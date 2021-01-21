/**
 * @函数名称：setStateByConstant
 * @param  constant 代表常量的名称  value赋值  state copy到state上
 * @作用：
 * @return：obj
 * @date 2020/7/14
 */

export default function setStateByConstant(constant: string, value: any, state: any = {}): any {
    const t: any = {};
    t[constant] = value;
    // 顺序不能变 后续要覆盖前面的
    return {
        ...state,
        ...t
    }
}

/**
 * 根据key 或者props的值
 * @param {string} constant
 * @param props
 * @returns {any}
 */
export function getStateByConstant(constant: string, props: any): any {
    return props[constant]
}

