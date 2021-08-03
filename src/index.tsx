import React from 'react';
import ReactDOM from 'react-dom';
import {RecoilRoot} from 'recoil'
import App from './App';
import * as serviceWorker from './serviceWorker';
import HeadersJS from './headersJS';
import {DynamicLoadScript} from "@gaopeng123/hoc";
import './index.scss';

/**
 * 加载静态资源文件
 * @constructor
 */
function LoadScript(onLoad: any) {
	ReactDOM.render(
		<React.StrictMode>
			<DynamicLoadScript url={HeadersJS} onLoad={onLoad}/>
		</React.StrictMode>,
		document.getElementById('root')
	)
}

async function LoadApp() {
	ReactDOM.render(
		<React.StrictMode>
			<RecoilRoot>
				<App/>
			</RecoilRoot>
		</React.StrictMode>,
		document.getElementById('root')
	)
}

/**
 * 启动前处理
 * 将外部依赖 加载到header上
 * @returns {Promise<void>}
 */
async function startUp() {
	LoadScript(async () => {
		LoadApp();
	});
}

startUp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
