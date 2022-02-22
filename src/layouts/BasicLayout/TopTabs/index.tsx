/**********************************************************************
 *
 * @模块名称: TopTabs
 *
 * @模块用途: TopTabs
 *
 * @创建人: pgli
 *
 * @date: 2022/2/15 9:48
 *
 **********************************************************************/
import React, {useState, useEffect} from 'react';
import {message, Tabs} from "antd";
import {findSubtreeByOrder, findTreeOrder} from "@gaopeng123/utils";
import './index.less';
import {useNavigate} from "react-router-dom";

const {TabPane} = Tabs;

type TopTabsProps = {
    routers: any;
    pathname: string;
};
const TopTabs: React.FC<TopTabsProps> = (props) => {
    const {pathname, routers} = props;
    const [tags, setTags] = useState<any[]>([]);
    const [activeKey, setActiveKey] = useState<string>('');
    const navigate = useNavigate();
    /**
     * 系统处理
     * @param activeKey
     */
    const onChangeHandler = (activeKey: string) => {
        navigate(activeKey);
    }
    /**
     * 关闭处理
     */
    const onEditHandler = (_activeKey: any, action: any) => {
        if (tags.length <= 1) {
            message.warn(`不可全部关闭！`)
        } else {
            const newTags: any = [];
            let previousIndex = 0;
            tags.forEach((tag, index) => {
                if (tag.key !== _activeKey) {
                    newTags.push(tag);
                } else {
                    previousIndex = index;
                }
            });
            setTags(newTags);
            if (_activeKey === activeKey) {
                const currentKey = newTags[previousIndex - 1].key;
                setActiveKey(currentKey);
                onChangeHandler(currentKey);
            }
        }
    }

    useEffect(() => {
        if (pathname && pathname !== '/' && routers.length) {
            if (!tags.find((item) => item.key === pathname)) {
                const treeOpts = {childrenKey: 'routes'};
                const orders = findTreeOrder(routers, (item) => {
                    return item.path === pathname;
                }, treeOpts);
                const currentNode = findSubtreeByOrder(routers, orders, treeOpts);
                setTags([...tags, {
                    title: currentNode.name,
                    key: currentNode.path,
                    closable: true
                }]);
            }
            setActiveKey(pathname);
        }
    }, [pathname, routers]);

    useEffect(() => {
        const basicLayoutContent: any = document.querySelector('.ant-pro-basicLayout-content');
        if (basicLayoutContent) {
            basicLayoutContent.style.margin = '0px';
        }
    }, [])
    return (
        <React.Fragment>
            <div className='top-tabs'>
                <Tabs hideAdd
                      type="editable-card"
                      onChange={onChangeHandler}
                      onEdit={onEditHandler}
                      activeKey={activeKey}
                >
                    {tags.map((pane: any) => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}></TabPane>
                    ))}
                </Tabs>
            </div>
        </React.Fragment>
    )
};

export default TopTabs;
