/**********************************************************************
 *
 * @模块名称: index
 *
 * @模块用途: index
 *
 * @创建人: pgli
 *
 * @date: 2022/9/13 14:34
 *
 **********************************************************************/
import React from 'react';
import BasicContents from "@components/Contents/BasicContents";

type HomeMobileProps = {
};
const HomeMobile: React.FC<HomeMobileProps> = (props) => {
    return (
        <BasicContents>移动端首页</BasicContents>
    )
};

export default HomeMobile;
