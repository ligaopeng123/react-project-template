/**
 *  内容填充
 *  主要监听窗口变化 更改页面大小 保证不出现滚动条
 */
import React, {useEffect, useState} from 'react';
import './styles.scss';
import BasicContents from './BasicContents';

export default function AvailableContents(props: any) {
    const {children} = props;
    return (
        <BasicContents children={children} className={`layout`}></BasicContents>
    );
}