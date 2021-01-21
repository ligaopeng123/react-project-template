/**
 *@模块名称：ComponentsJsonInput
 *
 *@创建人：ligaoming
 *
 *@作用：json输入框
 *
 *@date 2020/7/3
 *
 *@版权所有：
 */

import React, {useState, useEffect} from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import AppUtil from '@share/Utils/AppUtil';

export const JSONInputColors = {
    default: "#fff",
    background: "#141414"
};

type ComponentsJsonInputProps = {
    placeholder?: any, // panel的样式 主要处理背景类型
    id?: string, // panel的样式 主要处理背景类型
    onChange?: any;
    height?: string | number; // 高度
}

const ComponentsJsonInput = (props: ComponentsJsonInputProps) => {
    const {id, placeholder, onChange, height} = props;
    const [ID, setID] = useState(id || AppUtil.uuid());

    const [Placeholder, setPlaceholder] = useState(placeholder
        ? (AppUtil.isString(placeholder) ? JSON.parse(placeholder) : placeholder)
        : {});

    useEffect(() => {
        if (placeholder) {
            setPlaceholder(AppUtil.isString(placeholder) ? JSON.parse(placeholder) : placeholder);
        }
    }, [placeholder]);

    return (
        <React.Fragment>
            <JSONInput
                id={ID}
                placeholder={Placeholder}
                locale={locale}
                height={height || 100}
                width="100%"
                waitAfterKeyPress={3000}
                onKeyPressUpdate={false}
                modifyErrorText={`格式错误,请检查修改！`}
                theme="light_mitsuketa_tribute"
                colors={JSONInputColors}
                onChange={(e: any) => {
                    setPlaceholder(e.jsObject);
                    if (onChange) onChange(e);
                }}
            />
        </React.Fragment>
    )
}

export default ComponentsJsonInput;
