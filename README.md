## 介绍

Electron16+

react react-dom 17+

react-router v6

electron-builder 打包

webpack5+  编译

## Install

```bash
git clone --depth 1 --branch react-electron-template https://github.com/ligaopeng123/react-project-template.git your-project-name
or
rtc create your-project-name

cd your-project-name
npm install
```

[^注意]: 如果需要添加新的依赖包，请确认该包的使用环境，如果是node-gyp之类的原生模块，或者ffpmeg之类的第三方程序，请在release目录下得app环境安装依赖，electron-builder会将这些依赖打到程序包里。

## 开发环境

无需编译的静态资源 统一放到根目录下得assets下

.eslintrc 配置eslint

```bash
npm start 
```

## build

```bash
npm run package
```
