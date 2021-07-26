/**
 *@模块名称：useClock
 *
 *@创建人：ligaoming
 *
 *@作用：自定义hooks 获取时间格式
 *
 *@date 2021/1/10
 *
 *@版权所有：
 */
import React, {useEffect, useState} from 'react';
import AppUtil from "@share/Utils/AppUtil";

const useClock = (props: any) => {
	const [clock, setClock] = useState<string>('');
	/**
	 * 给用户时钟信息
	 */
	useEffect(() => {
		const getClock = () => {
			return setTimeout(() => {
				setClock(AppUtil.timestampToTime(Date.now(), props?.type));
				getClock();
			}, 1000);
		}
		const time = getClock();
		return () => {
			clearTimeout(time);
		}
	}, []);
	return clock
};

export default useClock;
