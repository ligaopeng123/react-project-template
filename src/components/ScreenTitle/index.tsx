/**********************************************************************
 *
 * @模块名称: index
 *
 * @模块用途: index
 *
 * @date: 2021/8/26 17:02
 *
 * @版权所有: pgli
 *
 **********************************************************************/

import React from 'react';
import {Decoration8, Decoration5, Decoration1} from '@jiaminghi/data-view-react';
// import ScreenTab from "@router/screen/components/ScreenTab";
import {Text1} from "@gaopeng123/screen";
import {useClock} from "@gaopeng123/hooks";
import styles from './styles.module.less';

const tabsColor = ['#1B7FF0', 'rgba(10, 183, 239, .5)'];

const ScreenTitle: React.FC<any> = (props: any) => {
	const {title} = props;
	const {ymd, hms, week} = useClock();
	return (
		<React.Fragment>
			<div className={styles.topHeader}>
				<Decoration8 className={styles.headerLeftDecoration} color={tabsColor}/>
				<Decoration5 className={styles.headerCenterDecoration} color={tabsColor}/>
				<Decoration8 className={styles.headerRightDecoration} reverse={true} color={tabsColor}/>
				<div className={styles.centerTitle}><Text1 duration={0.6} delay={0}>{title}</Text1></div>
				<span className={styles.clock}>{`${ymd} ${hms} ${week}`}</span>
			</div>
			
		</React.Fragment>
	)
};

export default ScreenTitle;
