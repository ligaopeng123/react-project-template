/**
 *  内容填充
 *  主要监听窗口变化 更改页面大小 保证不出现滚动条
 */
import React from 'react';
import {FullScreenContainer} from '@jiaminghi/data-view-react';
import Meteor from "@components/Background/Meteor";
import './styles.scss';

export default function ScreenContents(props: any) {
	const {children} = props;
	return (
		<Meteor type={`starry`}>
			<FullScreenContainer className={`background`}>
				<div style={{height: '100%'}}>
					{children}
				</div>
			</FullScreenContainer>
		</Meteor>
	);
}
