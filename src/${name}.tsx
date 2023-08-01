/**********************************************************************
 *
 * @模块名称: <%= name %>
 *
 * @模块用途: <%= name %>
 *
 * @创建人: <%= username %>
 *
 * @date: <%= time %>
 *
 **********************************************************************/
import React, { FC } from 'react';
import styles from './styles.module.less';

export type <%= name %>Props = {};

const <%= name %>: FC<<%= name %>Props> = (props) => {
    return (
        <div className={styles.demo}>
            <%= name %>
        </div>
    )
};

export default <%= name %>;
