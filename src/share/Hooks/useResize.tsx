/**
 *@模块名称：useResize
 *
 *@创建人：ligaoming
 *
 *@作用：自定义hooks 获取窗口变化信息
 *
 *@date 2021/1/10
 *
 *@版权所有：
 */
import React, {useEffect, useState, useRef} from 'react';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

const useResize = () => {
    const height = window.innerHeight;
    const [contentsHeight, setContentsHeight] = useState(height);
    useEffect(() => {
        const wResize = fromEvent(window, 'resize')
            .pipe(debounceTime(300))
            .subscribe((event: any) => {
                if (window.innerHeight > 500) {
                    setContentsHeight(window.innerHeight);
                }
            });
        return () => {
            wResize.unsubscribe();
        };
    }, []);
    return contentsHeight
}

export default useResize;
