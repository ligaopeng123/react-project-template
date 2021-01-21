import {Settings as LayoutSettings} from '@ant-design/pro-layout';

export default {
    "navTheme": "realDark", // 风格
    "primaryColor": "#1890ff", // 主题色
    "layout": "side", // 'side' | 'top' | 'mix';
    "contentWidth": "Fixed",
    "fixedHeader": true,
    "fixSiderbar": true,
    "menu": {
        "locale": true
    },
    "title": "可视化产品",
    "pwa": false,
    "iconfontUrl": "",
    "splitMenus": false
} as LayoutSettings & {
    pwa: boolean;
};

