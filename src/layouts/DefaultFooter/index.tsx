import React from 'react';
import { DefaultFooter, } from '@ant-design/pro-layout';
import useOEM from "@/hooks/useOEM";
import './styles.less';

const BasicFooter = (props: any) => {
    const copyright = useOEM('copyright');
    const links = useOEM('links');
    return (
        copyright || links ? <DefaultFooter
            copyright={copyright}
            links={links?.map((item: any) => {
                return {
                    ...item,
                    title: item.image ?
                        <span>
							<img style={{paddingRight: 4, width: 16, height: 14}}
                                 src={item.image}/>{item.title}
						</span>
                        : item.title
                }
            })}
        /> : null
    )
};

export default BasicFooter;
