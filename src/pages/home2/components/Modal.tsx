/**********************************************************************
 *
 * @模块名称: Modal
 *
 * @模块用途: Modal
 *
 * @date: 2021/8/4 10:19
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, {useEffect, useRef, useState} from 'react';
import {FormForTableRef, ModalForTableProps, StoreEnum} from "../typing";
import FormForTable from "./Form";
import {Modal} from 'antd';
import {uuid} from "@gaopeng123/utils";

const ModalForTable: React.FC<ModalForTableProps> = (props) => {
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
			setTitle(`新建`);
			setFormData(state[StoreEnum.add]);
			setIsModalVisible(true);
		}
	}, [state[StoreEnum.add]]);
	
	useEffect(() => {
		if (state[StoreEnum.edit]) {
			setTitle(`编辑`);
			setFormData(state[StoreEnum.edit]);
			setIsModalVisible(true);
		}
	}, [state[StoreEnum.edit]]);
	
	const handleOk = () => {
		formRef?.current?.values().then((data: any) => {
			console.log(data);
			setIsModalVisible(false);
			refresh();
		});
	};
	
	const handleCancel = () => {
		setIsModalVisible(false);
	};
	
	return (
		<React.Fragment>
			<Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<FormForTable ref={formRef} formData={formData}/>
			</Modal>
		</React.Fragment>
	);
};

export default ModalForTable;
