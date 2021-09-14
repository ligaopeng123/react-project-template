/**********************************************************************
 *
 * @模块名称: MyTableModal
 *
 * @模块用途: MyTableModal  模态框配置
 *
 * @创建人: pgli
 *
 * @date: 2021-08-26 16:20:21
 *
 **********************************************************************/

import React, {useEffect, useRef, useState} from 'react';
import {FormForTableRef, ModalForTableProps, StoreEnum} from "../typing";
import MyTableFrom from "./MyTableForm";
import {Modal} from 'antd';
import {uuid} from "@gaopeng123/utils";

enum Title {
	add = '新增',
	edit = '编辑'
}

const MyTableModal: React.FC<ModalForTableProps> = (props) => {
	const {state, dispatch} = props;
	const [isModalVisible, setIsModalVisible] = useState(false);
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
		if (state[StoreEnum.add]) {
			setTitle(Title.add);
			setFormData(state[StoreEnum.add]);
			setIsModalVisible(true);
		}
	}, [state[StoreEnum.add]]);
	
	useEffect(() => {
		if (state[StoreEnum.edit]) {
			setTitle(Title.edit);
			setFormData(state[StoreEnum.edit]);
			setIsModalVisible(true);
		}
	}, [state[StoreEnum.edit]]);
	
	const handleOk = () => {
		formRef?.current?.values().then((data: any) => {
			console.log(data);
			// 新增处理
			if (title === Title.add) {
			
			} else {
			
			}
			setIsModalVisible(false);
			refresh();
		});
	};
	
	const handleCancel = () => {
		setIsModalVisible(false);
	};
	
	return (
		<React.Fragment>
			<Modal destroyOnClose title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<MyTableFrom ref={formRef} formData={formData}/>
			</Modal>
		</React.Fragment>
	);
};

export default MyTableModal;
