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
import { <%= name %>StoreEnum } from "../model";
import <%= name %>From from "./<%= name %>Form";
import { Modal } from '@ymscloud/ui/lib/baseui';
import {add<%= name %>, edit<%= name %>} from "../servers";
import { warn } from '@ymscloud/ui';
import  '../styles.less';

const Title = {
	add : '新增',
	edit : '编辑'
}

const <%= name %>Modal = (props) => {
	const {state, dispatch} = props;
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [formData, setFormData] = useState('');
	const formRef = useRef(null);
	/**
	 * 刷新处理
	 */
	const refresh = () => {
		dispatch({
			type: <%= name %>StoreEnum.refresh,
			value: Date.now()
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
		formRef?.current?.values().then((data) => {
			console.log(data);
			const handle = (res)=> {
				warn(res?.message || '');
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
			<Modal destroyOnClose backdropClosable={false} title={title} okButtonProps={{loading: confirmLoading}} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<<%= name %>From ref={formRef} formData={formData}/>
			</Modal>
		</React.Fragment>
	);
};

export default <%= name %>Modal;
