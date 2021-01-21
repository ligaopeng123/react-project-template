/**
 * 高阶函数 动态加载静态资源
 */
import React, {useEffect, useState} from 'react';
import * as Script from 'react-load-script';
import AppUtil from '@share/Utils/AppUtil';

/**
 * 加载状态
 * @type {{}}
 */
const loadedBase: any = {};
const DynamicLoadScript: React.FC<any> = (props: any) => {
    const {onLoad, onCreate, onError, url} = props;
    const Url = AppUtil.isString(url) ? [url] : url;
    /**
     * 设置加载状态
     */
    let _loaded: any = {};
    Url.map((item: string) => {
        _loaded[item] = false;
    });

    const [loaded, setLoaded] = useState<any>(_loaded);
    /**
     * 根据加载此处 等加载完成后 执行onLoad
     */
    useEffect(() => {
        for (let i = 0; i < Url.length; i++) {
            if (!loadedBase[Url[i]]) {
                return () => {
                }
            }
        }
        if (onLoad) {
            onLoad();
        }

    }, [loaded]);

    const _onLoad = (_url: string) => {
        Object.assign(loadedBase, {[_url]: true})
        setLoaded({[_url]: true});
    };

    return (
        <React.Fragment>
            {
                Url.map((_url: string, index: number) => {
                    return <Script
                        key={`Dynamic-LoadScript-${index}`}
                        url={_url}
                        onCreate={onCreate}
                        onError={onError}
                        onLoad={(e: any) => {
                            _onLoad(_url);
                        }}
                    />
                })
            }
        </React.Fragment>
    )

};

export default DynamicLoadScript;
