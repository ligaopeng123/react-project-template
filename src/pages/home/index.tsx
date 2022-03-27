import React, {Fragment} from 'react';
import BasicContents from '@components/Contents/BasicContents';
import {Button, Card, Col, Row} from "antd";
import TestTable from "./table";
import {DemoTree} from './TestTree'

const RouterHome = () => {
    return (
        <div style={{padding: 24}}>
            <Row gutter={16}>
                <Card title={`测试`}>
                    <Row>
                        <Col>
                            <Button type={`primary`}>测试</Button>
                        </Col>
                        <Col>
                            <Button type={`default`}>测试</Button>
                        </Col>
                        <Col>
                            <Button type={`text`}>测试</Button>
                        </Col>
                        <Col>
                            <Button type={`primary`}>测试</Button>
                        </Col>
                        <Col>
                            <Button type={`dashed`}>测试</Button>
                        </Col>
                    </Row>
                </Card>
            </Row>
            <Row gutter={16}>
                <TestTable/>
            </Row>
            <Row gutter={16}>
                <DemoTree/>
            </Row>
        </div>
    )
}

export default RouterHome;