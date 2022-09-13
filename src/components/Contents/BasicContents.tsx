/**
 *  内容填充
 *  主要监听窗口变化 更改页面大小 保证不出现滚动条
 */
import React from 'react';
import { useResize } from '@gaopeng123/hooks';
import './styles.scss';
import { isMobileEnv } from "@httpClient/Global";

export default function BasicContents(props: any) {
    const {children, className} = props;
    const {availHeight} = useResize();
    const contentsHeight = availHeight - 96 - 40;
    return (
        <div className={`center-layout${isMobileEnv() ? '-mobile' : ''} ${className || ''}`}
             style={{height: contentsHeight}}>
            {children}
        </div>
    );
}
