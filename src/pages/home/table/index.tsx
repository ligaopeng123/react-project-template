/**********************************************************************
 *
 * @模块名称: Table
 *
 * @模块用途: Table
 *
 * @创建人: pgli
 *
 * @date: 2022-03-16 08:03:42
 *
 **********************************************************************/
import React, {useReducer} from 'react';
import TableTable from "./components/TableTable";
import TableModal from "./components/TableModal";
import {reducer, init, State} from "./Store";

const TestTable: React.FC<any> = () => {
	const [state, dispatch] = useReducer(reducer, State, init);
	return (
		<React.Fragment>
			<TableTable state={state} dispatch={dispatch}/>
			<TableModal state={state} dispatch={dispatch}/>
		</React.Fragment>
	)
};

export default TestTable;
