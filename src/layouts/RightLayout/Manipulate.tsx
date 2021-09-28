/**********************************************************************
 *
 * @模块名称: manipulate
 *
 * @模块用途: manipulate
 *
 * @创建人: pgli
 *
 * @date: 2021/9/25 14:21
 *
 **********************************************************************/
// @ts-nocheck
import React, {useState, useEffect} from 'react';
import closeIcon from '../../assets/manipulate/close.svg';
import screenIcon from '../../assets/manipulate/screen.svg';
import minIcon from '../../assets/manipulate/min.svg';
import styles from './index.module.less';
// @ts-ignore
let ipcRenderer;
if (window?.require) {
	const electron = window?.require("electron");
	ipcRenderer = electron.ipcRenderer;
}

const Manipulate: React.FC<any> = (props: any) => {
	const min = () => {
		ipcRenderer?.send('window-min');
	};
	const screen = () => {
		ipcRenderer?.send('window-max');
	};
	const close = () => {
		ipcRenderer?.send('window-close');
	};
	return (
		<div className={styles.manipulate}>
			<img onClick={min} className={styles.icon} src={minIcon}/>
			<img onClick={screen} className={styles.icon} src={screenIcon}/>
			<img onClick={close} className={styles.icon} src={closeIcon}/>
		</div>
	)
};

export default Manipulate;
