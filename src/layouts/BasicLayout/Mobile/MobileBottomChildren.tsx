/**********************************************************************
 *
 * @模块名称: MobileBottomChildren
 *
 * @模块用途: MobileBottomChildren 多级菜单
 *
 * @创建人: pgli
 *
 * @date: 2022/9/13 11:47
 *
 **********************************************************************/
import React from 'react';
import { Box, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";
import { RouteItemProps } from "@layouts/BasicLayout/typing";
import { MenuIcon } from "@layouts/BasicLayout/components/MenuIcon";

type MobileBottomChildrenProps = {
    router?: RouteItemProps;
    style?: any;
};

const MobileBottomChildren: React.FC<MobileBottomChildrenProps> = (props) => {
    const {router, style} = props;
    const _navigate = useNavigate();
    const onClick = (route: RouteItemProps) => {
        _navigate(route.path as string);
    }
    return (
        <>
            {
                router
                    ? <Paper sx={{width: '100%', borderBottom: 0, boxShadow: 'none', ...(style || {})}}>
                        <MenuList>
                            {
                                router?.children?.filter((item) => item.hideInMenu !== true)?.map((item: RouteItemProps) => {
                                    const hasSubChildren = item?.children?.length;
                                    return <Box key={item.path}>
                                        <MenuItem onClick={() => !hasSubChildren && onClick(item)}>
                                            <ListItemIcon>
                                                <MenuIcon icon={item?.icon}/>
                                            </ListItemIcon>
                                            <ListItemText>{item?.name}</ListItemText>
                                            {
                                                hasSubChildren
                                                    ? null
                                                    : <Typography variant="body2" color="text.secondary">
                                                        <ArrowForwardIosIcon/>
                                                    </Typography>
                                            }

                                        </MenuItem>
                                        <Divider light={true}/>
                                        {
                                            hasSubChildren
                                                ? <MobileBottomChildren router={item} style={{paddingLeft: 4}}/>
                                                : null
                                        }
                                    </Box>
                                })
                            }
                        </MenuList>
                    </Paper>
                    : null
            }
        </>
    )
};

export default MobileBottomChildren;
