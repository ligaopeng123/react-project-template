/**********************************************************************
 *
 * @模块名称: <%= name %>Table
 *
 * @模块用途: <%= name %>Table  表格配置
 *
 * @创建人: <%= username %>
 *
 * @date: <%= time %>
 *
 **********************************************************************/

import React, {useEffect, useRef} from 'react';
import {Button, Tooltip, Input, Popconfirm} from 'antd';
import {AppstoreAddOutlined, EllipsisOutlined, QuestionCircleOutlined, SearchOutlined} from '@ant-design/icons';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {StoreEnum, TableListItem, TableProps} from "../typing";
import {list} from "../api";
import styles from '../styles.module.less';

const <%= name %>Table: React.FC<TableProps> = (props) => {
	const {state, dispatch} = props;
	/**
	 * 表格res
	 */
	const ref = useRef<ActionType>();
	/**
	 * 新增
	 */
	const add = () => {
		dispatch({
			type: StoreEnum.add,
			value: {}
		});
	};
	/**
	 * 删除
	 */
	const del = (row: any) => {
		dispatch({
			type: StoreEnum.del,
			value: row
		});
	};
	/**
	 * 编辑
	 */
	const edit = (row: any) => {
		dispatch({
			type: StoreEnum.edit,
			value: row
		});
	};
	/**
	 * 刷新控制
	 */
	useEffect(() => {
		if (state[StoreEnum.refresh]) {
			// @ts-ignore
			ref.current.reload();
		}
	}, [state[StoreEnum.refresh]]);
	
	const columns: ProColumns<TableListItem>[] = [
		{
			title: '排序',
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 48,
		},
		{
			title: '应用名称',
			dataIndex: 'name',
			render: (_) => <a>{_}</a>,
			// 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
			filterDropdown: () => (
				<div style={{padding: 8}}>
					<Input style={{width: 188, marginBottom: 8, display: 'block'}}/>
				</div>
			),
			filterIcon: (filtered) => (
				<SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
			),
		},
		{
			title: '创建者',
			dataIndex: 'creator',
			valueEnum: {
				all: {text: '全部'},
				付小小: {text: '付小小'},
				曲丽丽: {text: '曲丽丽'},
				林东东: {text: '林东东'},
				陈帅帅: {text: '陈帅帅'},
				兼某某: {text: '兼某某'},
			},
		},
		{
			title: '状态',
			dataIndex: 'status',
			initialValue: 'all',
			filters: true,
			onFilter: true,
			valueEnum: {
				all: {text: '全部', status: 'Default'},
				close: {text: '关闭', status: 'Default'},
				running: {text: '运行中', status: 'Processing'},
				online: {text: '已上线', status: 'Success'},
				error: {text: '异常', status: 'Error'},
			},
		},
		{
			title: (
				<>
					创建时间
					<Tooltip placement="top" title="这是一段描述">
						<QuestionCircleOutlined style={{marginLeft: 4}}/>
					</Tooltip>
				</>
			),
			width: 140,
			key: 'since',
			dataIndex: 'createdAt',
			valueType: 'date',
			sorter: (a, b) => a.createdAt - b.createdAt,
		},
		{
			title: '备注',
			dataIndex: 'memo',
			ellipsis: true,
			copyable: true,
		},
		{
			title: '操作',
			width: 180,
			key: 'option',
			valueType: 'option',
			className: styles.editColumn,
			render: (text, record, index) => [
				<Button type="link" size={`small`} onClick={() => edit(record)}>
					编辑
				</Button>,
				<Popconfirm
					title="请确认是否删除！"
					onConfirm={() => del(record)}
					okText="确认"
					cancelText="取消"
				>
					<Button danger type="text" size={`small`}>
						删除
					</Button>
				</Popconfirm>
			],
		},
	];
	
	return (
		<ProTable<TableListItem>
			actionRef={ref}
			columns={columns}
			request={async (params, sorter, filter) => {
				// 表单搜索项会从 params 传入，传递给后端接口。
				console.log(params, sorter, filter);
				const data = await list();
				return {
					data,
					success: true,
				};
			}}
			rowKey="key"
			pagination={{
				showQuickJumper: true,
			}}
			search={{
				layout: 'horizontal',
				span: 6,
				defaultCollapsed: false,
			}}
			dateFormatter="string"
			toolbar={{
				title: '我是表格',
				tooltip: '',
			}}
			toolBarRender={() => [
				<Button type="primary" key="primary" onClick={add}>
					<AppstoreAddOutlined/>新建
				</Button>
			]}
		/>
	);
};
export default <%= name %>Table;
