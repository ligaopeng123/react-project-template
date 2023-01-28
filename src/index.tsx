import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil'
import App from './App';
import HeadersJS from './headersJS';
import { DynamicLoadScript } from "@gaopeng123/hoc";
import reportWebVitals from "./serviceWorker";
import { initTheme } from "@layouts/HeaderTheme/ThemeColor";
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from "antd";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import './styles/index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

/**
 * 注入sentry监听
 */
if (process.env.REACT_APP_SENTRY_DSN && process.env.REACT_APP_SENTRY?.trim() !== 'false') {
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        // environment 上报的环境 建议 按照 测试、生产区分
        environment: process.env.REACT_APP_ENV,
        integrations: [new BrowserTracing()],
        release: `${process.env.REACT_APP_VERSION_RELEASE}`,
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}

/**
 * 加载静态资源文件
 * @constructor
 */
function LoadScript(onLoad: any) {
    root.render(
        <React.StrictMode>
            <DynamicLoadScript url={HeadersJS} onLoad={onLoad}/>
        </React.StrictMode>
    )
}

async function LoadApp() {
    root.render(
        <React.StrictMode>
            <RecoilRoot>
                <ConfigProvider locale={zhCN}>
                    <App/>
                </ConfigProvider>
            </RecoilRoot>
        </React.StrictMode>
    )
}

/**
 * 启动前处理
 * 将外部依赖 加载到header上
 * @returns {Promise<void>}
 */
async function startUp() {
    LoadScript(async () => {
        initTheme();
        LoadApp();
    });
}

startUp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
