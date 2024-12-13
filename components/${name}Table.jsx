/** ********************************************************************
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
import React, { useState,useEffect, useRef } from 'react';
import { <%= name %>List, del<%= name %> } from "../servers";
import { <%= name %>StoreEnum } from "../model";
import { Button, Space, Input, Modal } from '@tinper/next-ui';
import { DataTable } from 'ynf-tinper-next-pro';
import { RefreshButton, warn } from '@ymscloud/ui';
import '../styles.less';

const <%= name %>Table = (props) => {
	const {state, dispatch} = props;
	/**
	 * 表格res
	 */
	const tableRef = useRef();

	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	/**
	 * 新增
	 */
	const add = () => {
		dispatch({
			type: <%= name %>StoreEnum.add,
			value: {}
		});
	};
	/**
	 * 删除逻辑处理
	 */
	const del = (row) => {
        del<%= name %>(row).then((res)=> {
            tableRef.current?.reload();
        });
	};

	/* 批量删除
		* @returns {*}
	*/
	const delList = () => {
		if (!selectedRowKeys?.length) {
			return warn(
				'请选择要删除的链接池',
			);
		}
		Modal.confirm({
			title: '确认要删除吗',
			onOk: () => {
			},
		});
	};
	/**
	 * 编辑
	 */
	const edit = (row) => {
		dispatch({
			type: <%= name %>StoreEnum.edit,
			// 避免编辑不触发
			value: Object.assign({_: Date.now()}, row)
		});
	};

	const onSearch = () => {

	};

	const reload = () => {
		tableRef.current?.reload();
	};
	/**
	 * 刷新控制
	 */
	useEffect(() => {
		if (state[<%= name %>StoreEnum.refresh]) {
			reload();
		}
	}, [state[<%= name %>StoreEnum.refresh]]);


	function operationClick(record, { key }, e, index) {
	const actions = {
		del: ()=> {
			Modal.confirm({
				title: '确认要删除吗',
				onOk: () => {
					del(record);
				},
			});
		},
		edit: ()=> {
			edit(record);
		},
		distribute: () => {
		},
		share: () => {
		}
	}
	actions[key] && actions[key]();
	}

	function onChangeSelected(selectedRowKeys, selectedRows) {
		setSelectedRowKeys(selectedRowKeys);
	}

	const columns = [
		{
			title: '排序',
			dataIndex: 'index',
			valueType: 'index',
			width: 48,
		},
		{
			title: '应用名称',
			dataIndex: 'name',
			render: (_) => <a>{_}</a>,
		},
		{
			title: '创建者',
			dataIndex: 'creator',
		},
		{
			title: '状态',
			dataIndex: 'status',
		},
		{
			title: '创建时间',
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
		}
	];

	return (
		<DataTable
			ref={tableRef}
			params={Object.assign({ searchValue: searchValue })}
			providerPackage="ynf-tinper-next-pro" providerEntry="DataTable"
			showModeSwitch={false}
			request={async ({ page, params }, sort) => {
				// 表单搜索项会从 params 传入，传递给后端接口。
				const data = await <%= name %>List(params);
				return {
					data,
					success: true,
				}
			}}
			renderToolBar={() => {
				return <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
					<Space>
						<Input placeholder={'请输入名称/编码'} style={{ width: '200px', boxSizing: 'border-box' }}
							   allowClear
							   trim
							   onSearch={onSearch}
							   onBlur={onSearch}
							   type="search" />
					</Space>
					<Space>
						<Button onClick={add} type="primary">新增</Button>
						<Button onClick={delList}>批量删除</Button>
						<RefreshButton onClick={reload}></RefreshButton>
					</Space>
				</div>;
			}}
			rowKey="key"
			columns={columns}
			showRowNum
			borderd
			operationType="button"
			fillSpace={true}
			operationItems={[{ key: 'edit', text: '编辑' },
				{ key: 'plan', text: '规划' },
				{ key: 'link', text: '测试连接' },
				{ key: 'user', text: '租户映射' },
				{ key: 'users', text: '租户组映射' },
				{ key: 'del', text: '删除' }]}
			operationClick={operationClick}
			pagination={true}
			itemType={'horizontal'}
			rowSelection={{
				type: 'checkbox', selectedRowKeys, onChange: onChangeSelected,
			}}
			rowActiveKeysMode={'single'}
			operationTypeProps={{
				maxCount: 8,
			}}
		/>
	);
};
export default <%= name %>Table;
