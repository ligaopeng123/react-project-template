### 技术栈

- React 17 
- less + scss
- ant + ant pro
- recoil

### 目录文件

public/json/menus.json: 定义路由模块相关

```typescript
{
                "id": 53,
                "name": "系统配置",
                "path": "/system/config",
                "component": "/system/config", // pages/system/config均可 pages前不能加 '/' 
                "auth": null
            }
```

public/json/OEM.json: 定义OEM相关

src/pages：业务代码放在该目录下，路由规则会基于该目录匹配。

src/headersJS：在header中引入的外部js文件

src/httpClient/intercept：定义拦截器

src/defaultSettings：定义布局相关

### 细节

#### 静态资源

##### public：tsx中直接使用 /img/*.png；在样式中需要放到src目录下进行编译。

```less
body {
    background-image: url("~@/assets/img/dashboard/demo.png");
}
```

#### 部署

默认使用docker部署，如果使用static方式部署，需要修改REACT_APP_PUBLICPATH变量