/**
 *@模块名称：RouterAdminUsers
 *
 *@创建人：ligaoming
 *
 *@作用：用戶管理用戶模塊  用户表
 *
 *@date 2020/9/5
 *
 *@版权所有：
 */

import React, {useState, useRef} from 'react';
import {withRouter} from 'react-router-dom';
import BasicContents from '../../../components/Contents/BasicContents';


const RouterAdminUsers: React.FC<{}> = (props: any) => {
    return (
        <React.Fragment>
            <BasicContents>
              用户表
            </BasicContents>
        </React.Fragment>
    )
}


export default withRouter(RouterAdminUsers);


