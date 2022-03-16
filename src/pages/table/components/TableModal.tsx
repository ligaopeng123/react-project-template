/**********************************************************************
 *
 * @模块名称: TableModal
 *
 * @模块用途: TableModal  模态框配置
 *
 * @创建人: pgli
 *
 * @date: 2022-03-16 08:03:42
 *
 **********************************************************************/

import React, {useEffect, useRef, useState} from 'react';
import {FormForTableRef, ModalForTableProps, StoreEnum} from "../typing";
import TableFrom from "./TableForm";
import {message,Modal} from 'antd';
import {uuid} from "@gaopeng123/utils";
import {addTable, editTable} from "../api";
import styles from '../styles.module.less';

enum Title {
	add = '新增',
	edit = '编辑'
}

const TableModal: React.FC<ModalForTableProps> = (props) => {
	const {state, dispatch} = props;
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const [formData, setFormData] = useState<string>('');
	const formRef = useRef<FormForTableRef | any>(null);
	/**
	 * 刷新处理
	 */
	const refresh = () => {
		dispatch({
			type: StoreEnum.refresh,
			value: uuid()
		});
	};
	
	useEffect(() => {
		setConfirmLoading(false);
		if (state[StoreEnum.add]) {
			setTitle(Title.add);
			setFormData(state[StoreEnum.add]);
			setIsModalVisible(true);
		}
	}, [state[StoreEnum.add]]);
	
	useEffect(() => {
		setConfirmLoading(false);
		if (state[StoreEnum.edit]) {
			setTitle(Title.edit);
			setFormData(state[StoreEnum.edit]);
			setIsModalVisible(true);
		}
	}, [state[StoreEnum.edit]]);
	
	const handleOk = () => {
		setConfirmLoading(true);
		formRef?.current?.values().then((data: any) => {
			console.log(data);
			const handle = (res?: any)=> {
                message.info(res?.message || '');
				setIsModalVisible(false);
				refresh();
			}
			// 新增处理
			if (title === Title.add) {
				// 新增回调处理
				addTable(data).then((res)=> {
					handle(res);
				});

			} else {
				// 编辑回调处理
				editTable(Object.assign({}, data, {id: state[StoreEnum.edit]?.id})).then((res)=> {
					handle(res);
				});
			}
		}).catch(()=> {
			// 遇到错误 处理loading状态
			setConfirmLoading(false);
		});
	};
	
	const handleCancel = () => {
	    setConfirmLoading(false);
		setIsModalVisible(false);
	};
	
	return (
		<React.Fragment>
			<Modal destroyOnClose title={title} confirmLoading={confirmLoading} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<TableFrom ref={formRef} formData={formData}/>
			</Modal>
		</React.Fragment>
	);
};

export default TableModal;
