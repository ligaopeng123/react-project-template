/**********************************************************************
 *
 * @模块名称: MobileRouter
 *
 * @模块用途: MobileRouter  移动端菜单管理
 *
 * @创建人: pgli
 *
 * @date: 2022年9月13日
 *
 **********************************************************************/
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { findSubtreeByOrder, findTreeOrder, queryParamsFromUrl, uuid } from "@gaopeng123/utils";
import { getMenuChildrenKey } from "@httpClient/Global";
import MobileBottomChildren from "@layouts/BasicLayout/Mobile/MobileBottomChildren";
import { RouteItemProps } from "@layouts/BasicLayout/typing";
import { MenuIcon } from "@layouts/BasicLayout/components/MenuIcon";

type MobileBottomProps = {
    router: any;
    pathname: string;
}

const getPathname = (pathname: string) => {
    return `/${pathname?.split('/')[1]}`
}
export default function MobileBottom(props: MobileBottomProps) {
    const {pathname, router} = props;
    const _navigate = useNavigate();
    const [value, setValue] = useState<string>(pathname);
    const ref = React.useRef<HTMLDivElement>(null);
    const [subRouter, setSubRouter] = useState<RouteItemProps>();

    useEffect(() => {
        (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    }, [value]);

    useEffect(() => {
        if (pathname && router?.length) {
            // @ts-ignore
            const {__path} = queryParamsFromUrl(location.href);
            const treeOpts = {childrenKey: getMenuChildrenKey(router)};
            const __pathname = __path ? __path : pathname;
            const orders = findTreeOrder(router, (item) => {
                return item.path === __pathname;
            }, treeOpts);
            const currentOrders = orders?.length > 1 ? orders.slice(0, 1) : orders;
            const currentNode: any = findSubtreeByOrder(router, currentOrders, treeOpts);
            if (__path) {
                setSubRouter({...currentNode, uuid: uuid()});
                setValue(__path);
            } else {
                setValue(currentNode?.path);
                setSubRouter(undefined);
            }
        }
    }, [router, pathname]);

    const onChange = (newValue: string) => {
        if (newValue && router?.length) {
            const treeOpts = {childrenKey: getMenuChildrenKey(router)};
            const orders = findTreeOrder(router, (item) => {
                return item.path === newValue;
            }, treeOpts);
            const currentNode: any = findSubtreeByOrder(router, orders, treeOpts);
            if (!currentNode?.children) {
                setSubRouter(undefined)
                setValue(getPathname(newValue));
                _navigate(newValue);
            } else {
                if (currentNode?.components || currentNode?.mComponent) {
                    _navigate(currentNode.path);
                } else {
                    // 销毁一个空页面
                    _navigate(`/mobile-sub-menus?__path=${currentNode.path}`);
                    setSubRouter({...currentNode, uuid: uuid()});
                    setValue(currentNode.path);
                }
            }
        }
    }

    return (
        <>
            <MobileBottomChildren router={subRouter}/>
            <Box sx={{pb: 9}} ref={ref} style={{position: 'relative', zIndex: 1, height: 75}}>
                <Paper id={`mobileBottom`}
                       sx={{
                           position: 'fixed',
                           bottom: 0, left: 0, right: 0,
                           borderBlockColor: 'transparent',
                           boxShadow: '1px 1px 1px transparent',
                       }}
                       elevation={3}>
                    <BottomNavigation
                        style={{borderTop: '1px solid #E4E5E8', marginBottom: 20}}
                        showLabels
                        value={value}
                        onChange={(event, newValue: string) => {
                            onChange(newValue);
                        }}
                    >
                        {
                            router?.filter((item: any) => item.hideInMenu !== true)?.map((item: any) => {
                                return <BottomNavigationAction
                                    key={item.path}
                                    label={item.mName || item.name}
                                    value={item.path}
                                    icon={<MenuIcon icon={item.icon}/>}
                                />
                            })
                        }
                    </BottomNavigation>
                </Paper>
            </Box>
        </>
    );
}
