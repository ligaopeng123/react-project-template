/**********************************************************************
 *
 * @模块名称: DemoComponent
 *
 * @模块用途: DemoComponent
 *
 * @创建人:
 *
 * @date: 2022/5/31 19:53
 *
 **********************************************************************/
import React, { FC } from 'react';
import styles from './styles.module.less';

export type DemoComponentProps = {};

const DemoComponent: FC<DemoComponentProps> = (props) => {
    return (
        <div className={styles.demo}>
            DemoComponentProps
        </div>
    )
};

export default DemoComponent;
