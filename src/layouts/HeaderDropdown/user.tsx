import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Avatar, Menu, Spin, Drawer} from 'antd';
import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import HeaderDropdown from './index';
import {getGlobalState} from '@share/StartUp/index';
import styles from '../RightLayout/index.module.less';
import GLOBALCONFIG from '@share/HttpClient/GLOBALCONFIG';

const UserDropdown: React.FC<{}> = (props: any) => {
    const user = getGlobalState(GLOBALCONFIG.USER, useSelector((state: any) => {
        return state;
    }));

    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);

    const currentUser = {
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        name: user ?.username
}

    const menu: any = null;

    const onMenuClick = (event: any) => {
        const {key} = event;

        if (key === 'logout') {
            dispatch({
                type: GLOBALCONFIG.USER,
                value: {}
            });
            dispatch({
                type: GLOBALCONFIG.MENUS,
                value: {}
            });

            props.history.replace({
                pathname: '/login',
            });
            return;
        }

        if (key === 'center') {
            setVisible(true);
        }
    };

    const menuHeaderDropdown = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            {user ?.username && (
                <Menu.Item key="center">
                <UserOutlined/>
                个人中心
                </Menu.Item>
                )}
            {menu && (
                <Menu.Item key="settings">
                    <SettingOutlined/>
                    个人设置
                </Menu.Item>
            )}
            {menu && <Menu.Divider/>}

            <Menu.Item key="logout">
                <LogoutOutlined/>
                退出登录
            </Menu.Item>
        </Menu>
    );

    return currentUser && currentUser.name ? (
        <HeaderDropdown overlay={menuHeaderDropdown}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar"/>
              <span className={`${styles.name} anticon`}>{currentUser.name}</span>
                <Drawer
                    zIndex={10000}
                    width={500}
                    title="个人中心"
                    placement="right"
                    closable={false}
                    onClose={() => {
                        setVisible(false);
                    }}
                    visible={visible}
                >
               {/*<UserFormComponent disabled={true} modalData={{name: user.username, organization: '沙河集团'}}/>*/}
            </Drawer>
            </span>
        </HeaderDropdown>
    ) : (
        <span className={`${styles.action} ${styles.account}`}>
        <Spin
            size="small"
            style={{
                marginLeft: 8,
                marginRight: 8,
            }}
        />
      </span>
    );
};

export default withRouter(UserDropdown);
