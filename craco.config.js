/**********************************************************************
 *
 * @模块名称: craco.config
 *
 * @模块用途: craco.config
 *
 * @date: 2022/2/21 14:34
 *
 * @版权所有: pgli
 *
 **********************************************************************/
const CracoLessPlugin = require('craco-less');
const {getThemeVariables} = require('antd/dist/theme');
const path = require("path");
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets/*"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@hoc": path.resolve(__dirname, "./src/hoc"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@layouts": path.resolve(__dirname, "./src/layouts"),
            "@httpClient": path.resolve(__dirname, "./src/httpClient"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@share": path.resolve(__dirname, "./src/share"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@mocks": path.resolve(__dirname, "../mocks"),
        },
        configure: (config, {env, paths}) => {
            // 去掉打包生产map 文件
            if (process.env.NODE_ENV === "production") {
                config.devtool = false;
                // const rules = config.module.rules;
                // const imgRules = {
                //     test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                //     loader: 'file-loader'
                // }
                // if (rules[1].oneOf) {
                //     config.module.rules[1].oneOf.push(imgRules);
                // } else {
                //     config.module.rules[2].oneOf.push(imgRules);
                // }
            } else {
                // 允许访问外部的值 主要就是访问mock服务
                // config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
            }
            // 支持static部署
            if (process.env.REACT_APP_PUBLICPATH) {
                config.output.publicPath = process.env.REACT_APP_PUBLICPATH;
            }
            return config
        }
    },
    module: {
        // 处理scss和less互相使用
        rules: [
            {
                test: /\.scss$/,
                issuer: /\.less$/,
                use: {
                    loader: "./sassVarsToLess.js" // Change path if necessary
                }
            }
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            ...getThemeVariables({
                                dark: false, // 开启暗黑模式
                                compact: false, // 开启紧凑模式
                            }),
                            // 此处定义主题，也可直接在ant.less中定义
                            // '@primary-color': '#1DA57A'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        }
    ],
};
