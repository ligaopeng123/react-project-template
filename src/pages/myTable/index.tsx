/**********************************************************************
 *
 * @模块名称: MyTable
 *
 * @模块用途: MyTable
 *
 * @创建人: pgli
 *
 * @date: 2021-08-26 16:20:21
 *
 **********************************************************************/
import React, {useReducer} from 'react';
import MyTableTable from "./components/MyTableTable";
import MyTableModal from "./components/MyTableModal";
import {reducer, init, State} from "./Store";
import {Props} from "./typing";


const MyTable: React.FC<Props> = () => {
	const [state, dispatch] = useReducer(reducer, State, init);
	return (
		<React.Fragment>
			<MyTableTable state={state} dispatch={dispatch}/>
			<MyTableModal state={state} dispatch={dispatch}/>
		</React.Fragment>
	)
};

export default MyTable;
