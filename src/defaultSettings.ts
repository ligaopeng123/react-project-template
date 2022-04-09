import {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {getOemTitle} from "@httpClient/Global";


export default {
	"navTheme": "dark", // 风格 realDark
	"primaryColor": 'daybreak',
	"layout": "mix", // 'side' | 'top' | 'mix';
	"contentWidth": "Fixed", // Fixed Fluid
	"fixedHeader": true,
	"fixSiderbar": true,
	"menu": {
		"locale": true,
		"loading": false
	},
	"title": getOemTitle(),
	"pwa": false,
	"iconfontUrl": "",
	"splitMenus": false
} as LayoutSettings & {
    pwa: boolean;
};
