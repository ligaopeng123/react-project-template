/**********************************************************************
 *
 * @模块名称: HeaderTheme
 *
 * @模块用途: HeaderTheme  主题替换
 *
 * @创建人: pgli
 *
 * @date: 2022/3/15 18:57
 *
 **********************************************************************/
import {FontColorsOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import {Dropdown, Menu} from "antd";
import {getThemeType, setTheme, ThemeType} from './ThemeColor';
import {useRecoilState} from "recoil";
import CurrentTheme from "@store/CurrentTheme";
import {SettingDrawer} from "@ant-design/pro-layout";
import proSettings from "../../defaultSettings";

type HeaderThemeProps = {};

const HeaderTheme: React.FC<HeaderThemeProps> = (props) => {
    const [currentTheme, setThemeValue] = useRecoilState(CurrentTheme);
    const [themeType, setThemeType] = useState<ThemeType>(getThemeType() || 'realDark');
    const onClick = (e: any) => {
        setThemeType(e.key);
    }
    /**
     * 监听themeType的变化
     */
    useEffect(() => {
        if (getThemeType() !== themeType) {
            setThemeValue({
                type: themeType,
                config: {
                    navTheme: themeType
                }
            });
            setTheme(themeType);
        }
    }, [themeType]);

    const menu = (
        <Menu onClick={onClick} selectedKeys={[themeType]}>
            <Menu.Item key="light" style={{width: 60}}>默认</Menu.Item>
            <Menu.Item key="realDark" style={{width: 60}}>暗黑</Menu.Item>
        </Menu>
    );

    // @ts-ignore
    const defaultSettings = Object.assign({}, proSettings, currentTheme?.config || {});
    return (
        <React.Fragment>
            <Dropdown overlay={menu} trigger={['click', 'hover']}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 12}}>
                    <FontColorsOutlined onClick={e => e.preventDefault()}/>
                </div>
            </Dropdown>
            <SettingDrawer settings={defaultSettings} onSettingChange={() => {
            }}/>
        </React.Fragment>
    )
};

export default HeaderTheme;
