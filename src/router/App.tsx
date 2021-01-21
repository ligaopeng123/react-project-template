// 主目录结构
import React, {useState, useEffect} from 'react';
import {
    // BrowserRouter as Router, // 不再使用BrowserRouter  因为要在外部进行路由跳转 此处直接使用Router
    Router,
    Switch,
    Route,
} from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout/index';
import UserLayout from '../layouts/UserLayout/index';
import {BrowserHistory} from '@share/HttpClient/Apollo_Client';
import '../styles/ant.less';


const App: React.FC<any> = (props: any) => {
    // 从上到下匹配
    return (
        <Router history={BrowserHistory}>
            <Switch>
                {/*登录页*/}
                <Route exact path="/login">
                    <UserLayout/>
                </Route>
                <Route exact path="/404">
                    404
                </Route>
                {/*业务业务*/}
                <Route exact path="*">
                    <BasicLayout/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;


