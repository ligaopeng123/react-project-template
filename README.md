### 技术栈

- React 17 
- less + scss
- ant + ant pro
- recoil

### 目录文件

#### public/json/menus.json: 定义路由模块相关

- RouteWithModuleRoutes 新增keepAlive 默认not

  auto： 默认缓存菜单级别 不缓存hideInMenu路由 

  force：强制缓存所有路由 

  not：不缓存

```json
{
    "id": 53,
    "name": "系统配置",
    "mName": "系统配置", // 移动端展示菜单名称 不填默认取name
    "path": "/system/config",
    "component": "/system/config", // pages/system/config均可 pages前不能加 '/' 
    "mComponent": "/system/config", // 移动端组件路径 不填默认取component
    "auth": null,
    "icon": "" // 菜单前图标 请放https://www.iconfont.cn/上 从iconfont上获取  
}
```

#### public/json/OEM.json: 定义OEM相关

```json
"data": {
    "loginName": "某某管理系统",
    "loginLogo": "./logo.svg",
    "loginDesc": "登录页产品描述",
    "menusLogo": "./logo.svg",
    "menusName": "某某管理系统",
    "copyright": "2022 某某有限公司",
    "links": [
        {
            "key": "ICP",
            "title": "京ICP备xxxx号-1",
            "href": "https://beian.miit.gov.cn/",
            "blankTarget": true
        },
        {
            "key": "gongan",
            "title": "京公网安备 xxxx号",
            "image": "./assets/gongan.png",
            "href": "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=xxxx",
            "blankTarget": true
        }
    ]
}
```

#### env文件

```shell
# 开发环境 根据该配置启动和编译不同版本
REACT_APP_ENV=dev
REACT_APP_SERVICE=mock
# 部署路径
REACT_APP_PUBLICPATH=''
# 终端设备  auto pc mobile
REACT_APP_TERMINAL=auto
```

#### src/pages

业务代码放在该目录下，路由规则会基于该目录匹配。

#### src/headersJS

在header中引入的外部js文件

#### src/httpClient/intercept

定义拦截器

#### src/defaultSettings

定义布局相关

### 静态资源

#### public

tsx中直接使用 /img/*.png；

#### src

会经过webpack编译处理。

```less
body {
    background-image: url("~@/assets/img/dashboard/demo.png");
}
```

### 部署

默认使用docker部署，如果使用static方式部署，需要修改REACT_APP_PUBLICPATH变量

