import React, {useReducer} from 'react';
import Table from "./components/Table";
import ModalForTable from "./components/Modal";
import {reducer, init, State} from "./Store";
import {Props} from "./typing";


const RouterHome: React.FC<Props> = () => {
	const [state, dispatch] = useReducer(reducer, State, init);
	return (
		<React.Fragment>
			<Table state={state} dispatch={dispatch}/>
			<ModalForTable state={state} dispatch={dispatch}/>
		</React.Fragment>
	)
};

export default RouterHome;
