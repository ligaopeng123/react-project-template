/** ********************************************************************
 *
 * @模块名称: <%= name %> Form
 *
 * @模块用途: <%= name %> Form  表单配置
 *
 * @创建人: <%= username %>
 *
 * @date: <%= time %>
 *
 **********************************************************************/
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import { DataForm } from 'ynf-tinper-next-pro';

const validateMessages = {
	required: '<%= escape %>label} is required!',
	types: {
		email: '<%= escape %>label} is not a valid email!',
		number: '<%= escape %>label} is not a valid number!',
	},
	number: {
		range: '<%= escape %>label} must be between <%= escape %>min} and <%= escape %>max}',
	},
};

const <%= name %>From = forwardRef((props, ref) => {
	const {formData} = props;
	const formRef = useRef(null);

	useImperativeHandle(ref, () => ({
		values: async () => formRef.current?.validateFields()
	}));

	return (
		<React.Fragment>
			<DataForm
				ref={formRef}
				preserve={false}
				name="<%= name %>Form"
				labelCol={{span: 8}}
				wrapperCol={{span: 16}}
				initialValues={formData}
				validateMessages={validateMessages}
			>
				<DataForm.Item label="Input" name="Input" rules={[{required: true}]} inputType="input" />
				<DataForm.Item name="Select" label="Select" inputType="select" options={[{label: 'Demo', value: 'demo'}]} />
				<DataForm.Item name="TreeSelect" label="TreeSelect" inputType="treeSelect" options={[
					{title: 'Light', value: 'light', children: [{title: 'Bamboo', value: 'bamboo'}]},
				]} />
				<DataForm.Item name="Cascader" label="Cascader" inputType="cascader" options={[
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
				]} />
				<DataForm.Item name="InputNumber" label="InputNumber" inputType="inputNumber" rules={[{type: 'number', min: 0, max: 99}]} />
				<DataForm.Item name="Switch" label="Switch" inputType="switch" />
			</DataForm>
		</React.Fragment>
	);
});

export default <%= name %>From;
