// 主目录结构
import React, {useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    HashRouter,
    Routes,
    Router,
    Route,
} from 'react-router-dom';
import {BrowserHistory} from "@httpClient/toLogin";
import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';
import OEM, {oemData} from "@store/OEM";
import {unregisterFetch} from "@/httpClient";
import './styles/ant.less';

const App: React.FC<any> = (props) => {
    /**
     * oem信息
     */
    const setOem = useSetRecoilState(OEM);

    useEffect(() => {
        oemData.then((res: any) => {
            setOem(res[0]?.data);
        });
        // 卸载拦截器
        return unregisterFetch;
    }, []);
    // 从上到下匹配

    return (
        <HashRouter>
            {/*@ts-ignore*/}
            <Routes history={BrowserHistory}>
                {/*登录页*/}
                <Route path="/login" element={<UserLayout/>}/>
                {/*404*/}
                <Route path="/404" element={<div>404</div>}/>
                {/*业务业务*/}
                <Route path="*" element={<BasicLayout/>}/>
            </Routes>
        </HashRouter>
    );
};

export default App;

