/**********************************************************************
 *
 * @模块名称: MobileRouter
 *
 * @模块用途: MobileRouter  移动端路由管理
 *
 * @创建人: pgli
 *
 * @date: 2022/9/13 10:13
 *
 **********************************************************************/
import React from 'react';
import ThemeApp from "@layouts/HeaderTheme/ThemeApp";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { Box } from "@mui/material";
import MobileBottom from "@layouts/BasicLayout/Mobile/MobileBottom";
import { RouteWithModuleRoutes } from "@gaopeng123/hoc";
import '@/styles/mui.less';

type MobileRouterProps = {
    pathname: string;
    menusLogo: string;
    menusName: string;
    router: any[]
    setPathname: (props: any) => void;
    onRouteChange: (props: any) => void;
};

const MobileRouter: React.FC<MobileRouterProps> = (props) => {
    return (
        <ThemeProvider theme={ThemeApp}>
            <SnackbarProvider>
                <Box component={'div'}>
                    <RouteWithModuleRoutes routers={props.router} onRouteChange={props.onRouteChange} loading={false}/>
                    <MobileBottom {...props}/>
                </Box>
                <CssBaseline/>
            </SnackbarProvider>
        </ThemeProvider>
    )
};

export default MobileRouter;
