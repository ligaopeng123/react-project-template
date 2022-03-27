/**
 *  内容填充
 *  主要监听窗口变化 更改页面大小 保证不出现滚动条
 */
import React from 'react';
import useResize from "@/hooks/useResize";
import './styles.scss';

export default function BasicContents(props: any) {
	const {children, className} = props;
	const contentsHeight = useResize() - 96;
	return (
		<React.Fragment>
			<div className={className === undefined ? `center-layout` : className} style={{height: contentsHeight}}>
				{children}
			</div>
		</React.Fragment>
	);
}
