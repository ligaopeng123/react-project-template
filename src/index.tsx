import React from 'react';
import ReactDOM from 'react-dom';
import {RecoilRoot} from 'recoil'
import App from './App';
import HeadersJS from './headersJS';
import {DynamicLoadScript} from "@gaopeng123/hoc";
import reportWebVitals from "./serviceWorker";
import {initTheme} from "@layouts/HeaderTheme/ThemeColor";
import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider} from "antd";
import './styles/index.scss';

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
                <ConfigProvider locale={zhCN}>
                    <App/>
                </ConfigProvider>
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
        // initTheme();
        LoadApp();
    });
}

startUp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
