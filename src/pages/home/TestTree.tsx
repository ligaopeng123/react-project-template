import {Component} from 'react';
import {TreeSelect} from 'antd';

const treeData = [
    {
        title: '盛景智能科技(嘉兴)有限公司',
        value: '0-0',
        children: [
            {
                title: '某某部门1',
                value: '0-0-1',
            },
            {
                title: '某某部门2',
                value: '0-0-2',
            },
        ],
    },
    {
        title: '三一机器人科技有限公司',
        value: '0-2',
        children: [
            {
                title: '某某部门1',
                value: '0-1-1',
            },
            {
                title: '某某部门2',
                value: '0-1-2',
            },
        ],
    },
    {
        title: '光伏项目部',
        value: '0-3',
        children: [
            {
                title: '某某部门1',
                value: '0-3-1',
            },
            {
                title: '某某部门2',
                value: '0-3-2',
            },
        ],
    },
];

export class DemoTree extends Component {
    state = {
        value: undefined,
    };

    onChange = (value: any) => {
        this.setState({value});
    };

    render() {
        return (
            <TreeSelect
                style={{width: '100%'}}
                value={this.state.value}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                treeData={treeData}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={this.onChange}
            />
        );
    }
}
