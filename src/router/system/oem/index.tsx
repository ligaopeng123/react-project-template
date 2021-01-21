/**
 *@模块名称：OemConfig
 *
 *@创建人：ligaoming
 *
 *@作用：OEM配置
 *
 *@date 2020/9/9
 *
 *@版权所有：
 */

import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import BasicContents from '@components/Contents/BasicContents';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {Card, Divider, Input, Button} from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import {OemTableListItem} from './data.d';
import {createOem, delOem, editOems, queryOems} from './api';
import OemCreateForm, {VALUETYLE} from './components/createForm';
import Message from '@share/Message/index';
import GLOBALCONFIG from '@share/HttpClient/GLOBALCONFIG';
import {getOemConfig} from '@share/StartUp/index';


enum MODALTITLE {
    create = '新增',
    eidt = '编辑'
}

const ModalData: OemTableListItem = {
    name: '',
    key: '',
    value: '',
    value_type: VALUETYLE.INPUT // 定义数据类型
};


const OemConfig: React.FC<{}> = (props: any) => {
    // 表格Ref
    const actionRef: any = useRef<ActionType>();
    // 控制模态框
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    // 模态框数据
    const [modalData, setModalData] = useState({});
    // 模态框的title
    const [modalTitle, setModalTitle] = useState<string>(MODALTITLE.create);
    // const [OEMCONFIG, setOEMCONFIG] = useState<any>({});
    // 热更新处理
    const dispatch = useDispatch();
    // OEM可配置项
    const OEMCONFIG = useSelector((store: any) => {
        return store[GLOBALCONFIG.OEM].deploy
    });

    // useEffect(() => {
    //     getOemConfig().then((res: any) => {
    //         setOEMCONFIG(res);
    //     })
    // }, []);
    // 列
    const columns: ProColumns<OemTableListItem>[] = [
        {
            title: '配置名称',
            dataIndex: 'name'
        },
        {
            title: 'key字段',
            dataIndex: 'key',
            hideInSearch: true,
        },
        {
            title: 'value字段',
            dataIndex: 'value',
            hideInSearch: true,
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <React.Fragment>
                    <a onClick={() => {
                        setModalTitle(MODALTITLE.eidt);
                        setModalData(record);
                        handleModalVisible(true)
                    }}>
                        编辑
                    </a>
                    <Divider type="vertical"/>
                    <a onClick={() => {
                        delOem(record).then((res: any) => {
                            Message(res);
                            if (actionRef) {
                                actionRef.current.reload();
                            }
                        });
                    }}>删除</a>
                </React.Fragment>
            ),
        },
    ];

    return (
        <React.Fragment>
            <BasicContents>
                <ProTable<OemTableListItem>
                    style={{height: '100%'}}
                    headerTitle="OEM配置列表"
                    actionRef={actionRef}
                    rowKey="oem-table"
                    pagination={false}
                    search={false}
                    toolBarRender={() => [
                    <Button type="primary" onClick={() => {
                        // 恢复默认值
                        setModalData(ModalData);
                        // 将污染的ModalData修改下
                        setModalTitle(MODALTITLE.create);
                        // 打开模态框
                        handleModalVisible(true);
                    }}>
                        <PlusOutlined/> 新建
                    </Button>
                ]}
                    request={(params: any, sorter: any, filter: any) => queryOems()}
                    columns={columns}
                    rowSelection={false}
                    />
            </BasicContents>
            <OemCreateForm
                title={modalTitle}
                modalData={modalData}
                onCancel={() => handleModalVisible(false)}
                OEMCONFIG={OEMCONFIG}
                onOk={(data: any) => {
                    const oem = modalTitle === MODALTITLE.create
                        ? createOem(data)
                        : editOems(data);

                    oem.then((res) => {
                        // 弹出信息
                        Message(res);
                        handleModalVisible(false);
                        // 表格刷新
                        if (actionRef) {
                            actionRef.current.reload();
                        }
                        getOemConfig().then(oem => {
                            dispatch({
                                type: GLOBALCONFIG.OEM,
                                value: oem
                            })
                        })
                    })
                }}
                modalVisible={createModalVisible}/>
        </React.Fragment>)
}

export default OemConfig;


