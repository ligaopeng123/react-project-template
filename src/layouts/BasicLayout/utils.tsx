/** ********************************************************************
 *
 * @模块名称: utils
 *
 * @模块用途: utils
 *
 * @date: 2022/9/13 9:19
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import React, { createElement } from "react";
import * as Icon from "@ant-design/icons";

/**
 * 创建icon图标
 * @param icon
 */
export const createIcon = (icon?: string): React.ReactNode | undefined => {
    const i = icon ? (Icon as any)[icon] : undefined;
    return i ? createElement(i, {
        style: {fontSize: '16px'}
    }) : i;
};
