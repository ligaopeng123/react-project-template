import React from 'react';
import { Button, Card, Col, Row, Statistic } from "antd";
import TestTable from "./table";
import { DemoTree } from './TestTree'
import { toThousands } from "@gaopeng123/utils";
import BasicContents from "@components/Contents/BasicContents";

const {Countdown} = Statistic;

const StatisticCard = (props: any) => {
    return (
        <Card bordered={false} bodyStyle={{padding: 0}}>
            {props.children}
        </Card>
    )
}
const RouterHome = () => {
    return (
        <BasicContents>
            <Card title="活动实时交易情况" bordered={false}>
                <Row>
                    <Col md={6} sm={12} xs={24}>
                        <StatisticCard>
                            <Statistic
                                title="今日交易总额"
                                suffix="元"
                                value={toThousands(124543233)}
                            />
                        </StatisticCard>
                    </Col>
                    <Col md={6} sm={12} xs={24}>
                        <StatisticCard>
                            <Statistic title="销售目标完成率" value="92%"/>
                        </StatisticCard>
                    </Col>
                    <Col md={6} sm={12} xs={24}>
                        <StatisticCard>
                            <Countdown title="活动剩余时间" value={Date.now()} format="HH:mm:ss:SSS"/>
                        </StatisticCard>
                    </Col>
                    <Col md={6} sm={12} xs={24}>
                        <StatisticCard>
                            <Statistic title="每秒交易总额" suffix="元" value={toThousands(234)}/>
                        </StatisticCard>
                    </Col>
                </Row>
            </Card>
            <TestTable />
        </BasicContents>
    )
}

export default RouterHome;
