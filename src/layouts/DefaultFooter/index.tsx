import React from 'react';
import ProLayout, {
    DefaultFooter,
} from '@ant-design/pro-layout';
import './styles.less';
import {getOemValueByKey} from '@share/HttpClient/GLOBALCONFIG';


const BasicFooter = (props: any) => {
    const {OEM} = props;

    // copyright
    // links
    return (
        <DefaultFooter
            copyright={getOemValueByKey({
                key: 'copyright',
                value: `${new Date().getFullYear()} 长扬科技大数据团队出品并提供技术支持`,
                ...OEM
            })}
            links={getOemValueByKey(
                {
                    key: 'links',
                    value: [
                        {
                            key: 'cy-tech',
                            title: '长扬科技官网',
                            href: 'https://www.cy-tech.net/',
                            blankTarget: true,
                        },
                        {
                            key: 'pgli',
                            title: 'git地址',
                            href: 'https://github.com/ligaopeng123/react-customizescreen',
                            blankTarget: true,
                        }
                    ],
                    ...OEM
                }
            )}
        />
    )
};

export default BasicFooter;