/**********************************************************************
 *
 * @模块名称: <%= name %>Modal
 *
 * @模块用途: <%= name %>Modal  模态框配置
 *
 * @创建人: <%= username %>
 *
 * @date: <%= time %>
 *
 **********************************************************************/

import React, {useEffect, useRef, useState} from 'react';
import {FormForTableRef, ModalForTableProps, <%= name %>StoreEnum} from "../<%= name %>Typing";
import <%= name %>From from "./<%= name %>Form";
import {message,Modal} from 'antd';
import {uuid} from "@gaopeng123/utils";
import {add<%= name %>, edit<%= name %>} from "../api";
import styles from '../styles.module.less';

enum Title {
	add = '新增',
	edit = '编辑'
}

const <%= name %>Modal: React.FC<ModalForTableProps> = (props) => {
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
			type: <%= name %>StoreEnum.refresh,
			value: uuid()
		});
	};

	useEffect(() => {
		setConfirmLoading(false);
		if (state[<%= name %>StoreEnum.add]) {
			setTitle(Title.add);
			setFormData(state[<%= name %>StoreEnum.add]);
			setIsModalVisible(true);
		}
	}, [state[<%= name %>StoreEnum.add]]);

	useEffect(() => {
		setConfirmLoading(false);
		if (state[<%= name %>StoreEnum.edit]) {
			setTitle(Title.edit);
			setFormData(state[<%= name %>StoreEnum.edit]);
			setIsModalVisible(true);
		}
	}, [state[<%= name %>StoreEnum.edit]]);

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
				add<%= name %>(data).then((res)=> {
					handle(res);
				}).catch(()=> {
					// 遇到错误 处理loading状态
					setConfirmLoading(false);
				});
			} else {
				// 编辑回调处理
				edit<%= name %>(Object.assign({}, data, {id: state[<%= name %>StoreEnum.edit]?.id})).then((res)=> {
					handle(res);
				}).catch(()=> {
					// 遇到错误 处理loading状态
					setConfirmLoading(false);
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
				<<%= name %>From ref={formRef} formData={formData}/>
			</Modal>
		</React.Fragment>
	);
};

export default <%= name %>Modal;
