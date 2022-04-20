/**********************************************************************
 *
 * @模块名称: <%= name %>
 *
 * @模块用途: <%= name %>
 *
 * @创建人: <%= username %>
 *
 * @date: <%= time %>
 *
 **********************************************************************/
import React, {useReducer} from 'react';
import <%= name %>Table from "./components/<%= name %>Table";
import <%= name %>Modal from "./components/<%= name %>Modal";
import {reducer, init, State} from "./${name}Store";
import {Props} from "./${name}Typing";


const <%= name %>: React.FC<Props> = () => {
	const [state, dispatch] = useReducer(reducer, State, init);
	return (
		<React.Fragment>
			<<%= name %>Table state={state} dispatch={dispatch}/>
			<<%= name %>Modal state={state} dispatch={dispatch}/>
		</React.Fragment>
	)
};

export default <%= name %>;
