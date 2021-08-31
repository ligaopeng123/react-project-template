/**********************************************************************
 *
 * @模块名称: ScreenMenus
 *
 * @模块用途: ScreenMenus
 *
 * @创建人: pgli
 *
 * @date: 2021/8/27 15:02
 *
 **********************************************************************/
import React, {useEffect, useRef} from 'react';
import {BorderBox2, Decoration5, Decoration1} from '@jiaminghi/data-view-react';
import {withRouter} from 'react-router-dom';
import RouteWithModuleSubRoutes from "@components/RouteWithModuleSubRoutes";
import styles from './styles.module.less';

export type Menu = {
	id: string | number,
	name: string;
	path: string;
	component: string
}

/**
 * 默认宽度为100 后续有需要再调整
 */
const tabStyle = {
	width: 100
};

const ScreenMenus: React.FC<any> = (props: any) => {
	/**
	 * 传递过来的tabs数据
	 */
	const {menus, history} = props;
	
	// console.log(history.location.pathname)
	
	/**
	 * 绑定ref
	 */
	const tabsRef: any = useRef<HTMLDivElement>(null);
	/**
	 * 获取node集合
	 */
	const getNodeByClassName = () => {
		return tabsRef.current.querySelectorAll(`.border-box-content`);
	};
	/**
	 * 代理添加点击事件
	 * @param e
	 */
	const onClick = (e: any) => {
		const nodeList = getNodeByClassName();
		let selected;
		for (let i = 0; i < menus.length; i++) {
			const item = menus[i];
			/**
			 * 将选中样式清洗掉
			 */
			nodeList[i].classList.remove(`content-selected`);
			/**
			 * 代理确定选中范围
			 */
			if (item.name === e.target.innerText) {
				nodeList[i].classList.add(`content-selected`);
				selected = item;
			}
		}
		
		selected?.path && props.history.push({
			pathname: selected?.path,
		});
	};
	/**
	 * 初始化 给第一个添加选中样式
	 */
	useEffect(() => {
		const nodeList = getNodeByClassName();
		for (let item of nodeList) {
			item.classList.remove(`content-selected`);
			const router = item.querySelector('span').getAttribute('router-name');
			if (history.location.pathname.includes(router)) {
				item.classList.add(`content-selected`);
				return;
			}
		}
		nodeList[0].classList.add(`content-selected`);
	}, []);
	
	return (
		<React.Fragment>
			<div className={styles.headerMenus} onClick={onClick} ref={tabsRef}>
				{
					menus.map((item: Menu) => {
						return <BorderBox2 key={item.id} style={tabStyle}>
							<span router-name={item.path}>{item.name}</span>
						</BorderBox2>
					})
				}
			</div>
			<div className={`content-body`}>
				<RouteWithModuleSubRoutes routers={menus}/>
			</div>
		</React.Fragment>
	)
};

export default withRouter(ScreenMenus);
