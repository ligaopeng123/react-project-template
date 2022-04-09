/**********************************************************************
 *
 * @模块名称: Table Form
 *
 * @模块用途: Table Form  表单配置
 *
 * @创建人: pgli
 *
 * @date: 2022-03-16 08:03:42
 *
 **********************************************************************/

import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {
	Form,
	Input,
	Select,
	Cascader,
	InputNumber,
	TreeSelect,
	Switch,
} from 'antd';
import {FormForTableProps} from "../typing";
import {FormInstance} from 'antd/lib/form';


const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		number: '${label} is not a valid number!',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
};

const TableFrom: React.FC<FormForTableProps> = forwardRef((props, ref) => {
	const {formData} = props;
	const formRef = useRef<FormInstance>(null);

	useImperativeHandle(ref, () => ({
		values: async () => formRef.current?.validateFields()
	}));

	return (
		<React.Fragment>
			<Form
				ref={formRef}
				preserve={false}
				name="TableForm"
				labelCol={{span: 8}}
				wrapperCol={{span: 16}}
				initialValues={formData}
				validateMessages={validateMessages}
			>
				<Form.Item label="Input" name="Input" rules={[{required: true}]}>
					<Input/>
				</Form.Item>
				<Form.Item name="Select" label="Select">
					<Select>
						<Select.Option value="demo">Demo</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item name="TreeSelect" label="TreeSelect">
					<TreeSelect
						treeData={[
							{title: 'Light', value: 'light', children: [{title: 'Bamboo', value: 'bamboo'}]},
						]}
					/>
				</Form.Item>
				<Form.Item name="Cascader" label="Cascader">
					<Cascader
						options={[
							{
								value: 'zhejiang',
								label: 'Zhejiang',
								children: [
									{
										value: 'hangzhou',
										label: 'Hangzhou',
									},
								],
							},
						]}
					/>
				</Form.Item>
				<Form.Item name="InputNumber" label="InputNumber" rules={[{type: 'number', min: 0, max: 99}]}>
					<InputNumber/>
				</Form.Item>
				<Form.Item name="Switch" label="Switch">
					<Switch/>
				</Form.Item>
			</Form>
		</React.Fragment>
	);
});

export default TableFrom;
