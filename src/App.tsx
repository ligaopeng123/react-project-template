// 主目录结构
import React, { useEffect } from 'react';
import { useSetRecoilState } from "recoil";
import {
    Routes,
    Route,
} from 'react-router-dom';
import { BrowserHistory } from "@httpClient/toLogin";
import BasicLayout from '@layouts/BasicLayout';
import UserLayout from '@layouts/UserLayout';
import OEM, { oemData } from "@store/OEM";
import { unregisterFetch } from "@httpClient/index";
import { HistoryRouter } from "@gaopeng123/hoc";
import BasicFooter from "@layouts/DefaultFooter";
import MobileMenus from "@layouts/BasicLayout/Mobile/MobileMenus";
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
        <HistoryRouter history={BrowserHistory}>
            <Routes>
                {/*登录页*/}
                <Route path="/login" element={<><UserLayout/><BasicFooter/></>}/>
                {/*MobileBottomChildren*/}
                <Route path="/mobile-sub-menus" element={<><MobileMenus/></>}/>
                {/*404*/}
                <Route path="/404" element={<div>404</div>}/>
                {/*业务业务*/}
                <Route path="*" element={<BasicLayout/>}/>
            </Routes>
        </HistoryRouter>
    );
};

export default App;
