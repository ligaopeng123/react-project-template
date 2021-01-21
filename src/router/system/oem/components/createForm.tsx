/**
 *@模块名称：UsersCreateForm
 *
 *@创建人：ligaoming
 *
 *@作用：新建 编辑
 *
 *@date 2020/9/6
 *
 *@版权所有：长杨科技
 */

import React, {useState, useRef} from 'react';
import {Modal, Radio, Input, Form, Upload, Button, Select} from 'antd';
import {PlusOutlined, MinusOutlined, UploadOutlined, InboxOutlined} from '@ant-design/icons';
import ComponentsJsonInput from '@components/Json/Input';
import AppUtil from '@share/Utils/AppUtil';

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

export enum VALUETYLE {
    INPUT = 'Input',
    UPLOAD = 'Upload',
    JSON = 'json'
}

const FancyButton = React.forwardRef((props: any, ref: any) => (
    <Button ref={ref} type="primary" htmlType="submit">
        {props.children}
    </Button>
));

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const OemForm = (props: any) => {

    const {bthRef, onOk, modalData} = props;
    // 可配置的oem定制项目
    const OEMCONFIG: any = props.OEMCONFIG;
    // 控制form
    const [form] = Form.useForm();
    // 类型控制
    const [valueType, setValueType] = useState(modalData.value_type || VALUETYLE.INPUT);
    // 控制上传类似
    const [fileList, setFileList] = useState<any[]>([]);
    // 获取类型
    const getValueTypeDom = (valueType: string, props: any) => {
        const {value} = props.modalData;
        switch (valueType) {
            case VALUETYLE.INPUT :
                return (
                    <Form.Item name={`value`} label="Value" rules={[{required: true, message: '请输入Value值！'}]}>
                        <Input/>
                    </Form.Item>
                );
            case VALUETYLE.JSON :
                return (
                    <Form.Item name={`value`} label="Value" rules={[{required: true, message: '请输入Value值！'}]}>
                        <ComponentsJsonInput placeholder={(modalData.value && modalData.value_type === VALUETYLE.JSON) ? JSON.parse(modalData.value) : {}}/>
                    </Form.Item>
                );
            default :
                return (
                    <Form.Item
                        name={`value`}
                        label="Value"
                        rules={[{required: true, message: '请上传图片！'}]}
                        extra=""
                    >
                        <Upload
                            action="/upload"
                            listType="picture"
                            onChange={(value: any) => {
                                if (value.file && value.file.response && value.file.response.path) {
                                    form.setFieldsValue({value: value.file.response.path});
                                    setFileList(value.fileList)
                                }
                            }}
                        >
                            {
                                fileList && fileList.length ? null : (<Button icon={<UploadOutlined/>}>上传</Button>)
                            }

                        </Upload>
                        <span style={{
                            position: 'absolute',
                            top: '5px',
                            left: '75px'
                        }}>
                            {value}
                        </span>
                    </Form.Item>
                )
        }
    };

    const {Option} = Select;

    return (
        <Form {...layout}
              form={form}
              onFinish={(data: any) => {
                  // 处理data数据 在onChange中使用form.setFieldsValue不生效
                  if (data.value_type === VALUETYLE.JSON) data.value = JSON.stringify(data.value.jsObject);
                  // 将id添加上 基于id编辑
                  if (!AppUtil.isUndefined(modalData.id)) data.id = modalData.id;
                  onOk(data);
              }}
              initialValues={modalData}>
            <Form.Item name={`name`} label="名称" rules={[{required: true, message: '请输入名称！'}]}>
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={(value: any) => {
                        // 规避检测
                        const key: any = OEMCONFIG[value];
                        form.setFieldsValue({key: key});
                    }}
                    filterOption={(input: any, option: any) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        OEMCONFIG && Object.keys(OEMCONFIG).map((item, index) => {
                            return <Option key={`oem-form-${index}`} value={item}>{item}</Option>
                        })
                    }

                </Select>
            </Form.Item>
            <Form.Item name={`key`} label="Key" rules={[{required: true, message: '请输入Key值！'}]}>
                <Input disabled={true}/>
            </Form.Item>
            <Form.Item label="Value类型" name={`value_type`}
                       rules={[{required: true, message: '请选择value类型！'}]}>
                <Radio.Group onChange={(e: any) => {
                    setValueType(e.target.value);
                    form.setFieldsValue({value_type: e.target.value});
                }}>
                    <Radio value={VALUETYLE.INPUT}>输入框</Radio>
                    <Radio value={VALUETYLE.UPLOAD}>图片</Radio>
                    <Radio value={VALUETYLE.JSON}>JSON</Radio>
                </Radio.Group>
            </Form.Item>

            {
                getValueTypeDom(valueType, props)
            }

            {/*隐藏不显示 主要用于触发验证*/}
            <Form.Item hidden={true} wrapperCol={{span: 12, offset: 6}}>
                <FancyButton ref={bthRef} onClick={onOk}>
                    确定
                </FancyButton>;
            </Form.Item>
        </Form>
    )
}


const OemCreateForm = (props: any) => {

    const {modalVisible, title, onCancel, onOk, modalData, OEMCONFIG} = props;

    // 使用bthRef primary类型模拟检验
    const bthRef: any = React.createRef();

    return (
        <Modal
            destroyOnClose={true}
            title={title}
            visible={modalVisible}
            onCancel={() => {
                onCancel();
            }}
            cancelText={`取消`}
            okText={`确定`}
            onOk={() => {
                // 调用bthRef click方法触发校验
                bthRef.current.click();
            }}
        >
            <OemForm OEMCONFIG={OEMCONFIG} bthRef={bthRef} onOk={onOk} modalData={modalData}/>
        </Modal>
    )
}

export default OemCreateForm;


