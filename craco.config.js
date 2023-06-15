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
const webpack = require("webpack");
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const packageOjb = require("./package.json");
const SentryPlugin = require("@sentry/webpack-plugin");
const {formatTimestamp} = require("@gaopeng123/utils");
const CracoEsbuildPlugin = require('craco-esbuild');

// 时间 用于发布小版本
const REACT_APP_VERSION_TIME = formatTimestamp(Date.now(), 'yyyy-MM-dd_HH:mm:ss');
const REACT_APP_VERSION_RELEASE = `${packageOjb.name}-${process.env.REACT_APP_ENV}-${packageOjb.version}-${REACT_APP_VERSION_TIME}`;

const plugins = [
    new webpack.DefinePlugin({
        "process.env": {
            REACT_APP_NAME: `"${packageOjb.name}"`,
            REACT_APP_VERSION: `"${packageOjb.version}"`,
            REACT_APP_VERSION_RELEASE: `"${REACT_APP_VERSION_RELEASE}"`,
            REACT_APP_SENTRY: `"${process.env.REACT_APP_SENTRY}"`
        }
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
];

if (process.env.REACT_APP_SENTRY?.trim() !== 'false') {
    plugins.push(new SentryPlugin({
        org: 'ub-sentry', // 组织名称
        project: `${packageOjb.name}-${process.env.REACT_APP_ENV}`, // 项目名称
        authToken: "authToken", // 在私有平台上copy出来
        release: REACT_APP_VERSION_RELEASE,
        cleanArtifacts: true, // 删除以前的版本
        url: 'url', // 配置指到我们的自建服务器地址
        ignore: ['node_modules'],
        urlPrefix: '~/static/',
        include: './build/static'   //正则，匹配哪些文件上传
    }))
}

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
        plugins: {
            add: plugins
        },
        configure: (config, {
            env,
            paths
        }) => {
            // 去掉打包生产map 文件
            if (process.env.REACT_APP_SENTRY !== 'false') {
                config.devtool = 'source-map';
            }
            if (process.env.NODE_ENV === "production") {
            } else {
                // 允许访问外部的值 主要就是访问mock服务
                // config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
            }
            // 支持static部署
            if (process.env.REACT_APP_PUBLICPATH) {
                // config.output.publicPath = process.env.REACT_APP_PUBLICPATH;
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
        },
        {
            plugin: CracoEsbuildPlugin,
            options: {
                // includePaths: ['/external/dir/with/components'], // Optional. If you want to include components which are not in src folder
                esbuildLoaderOptions: {
                    // Optional. Defaults to auto-detect loader.
                    loader: 'tsx', // Set the value to 'tsx' if you use typescript
                    target: 'es2015',
                },
                esbuildMinimizerOptions: {
                    // Optional. Defaults to:
                    target: 'es2015',
                    css: true, // if true, OptimizeCssAssetsWebpackPlugin will also be replaced by esbuild.
                },
                skipEsbuildJest: false, // Optional. Set to true if you want to use babel for jest tests,
                esbuildJestOptions: {
                    loaders: {
                        '.ts': 'ts',
                        '.tsx': 'tsx',
                    },
                },
            },
        }
    ],
};
