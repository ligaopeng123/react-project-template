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
const { addBeforeLoaders, loaderByName } = require("@craco/craco");
const CracoLessPlugin = require('./lib/craco-less.js');
const { getThemeVariables } = require('antd/dist/theme');
const path = require("path");
const webpack = require("webpack");
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const packageOjb = require("./package.json");
const AddExternalsPlugin = require("./lib/AddExternalsPlugin");
const SentryPlugin = require("@sentry/webpack-plugin");
const { formatTimestamp } = require("@gaopeng123/utils");
const CracoEsbuildPlugin = require('craco-esbuild');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 查看耗时
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

// 时间 用于发布小版本
const REACT_APP_VERSION_TIME = formatTimestamp(Date.now(), 'yyyy-MM-dd_HH:mm:ss');
const REACT_APP_VERSION_RELEASE = `${packageOjb.name}-${process.env.REACT_APP_ENV}-${packageOjb.version}-${REACT_APP_VERSION_TIME}`;

const plugins = [
    // 外链脚本
    new AddExternalsPlugin({
        scripts: [
            '/js/react.development.js',
            '/js/react-dom.development.js'
        ],
    }),
    new webpack.DefinePlugin({
        "process.env": {
            REACT_APP_NAME: `"${packageOjb.name}"`,
            REACT_APP_VERSION: `"${packageOjb.version}"`,
            REACT_APP_VERSION_RELEASE: `"${REACT_APP_VERSION_RELEASE}"`,
            REACT_APP_SENTRY: `"${process.env.REACT_APP_SENTRY}"`
        }
    }),
    // 解决process/browser报错
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
    // 编译进度
    new SimpleProgressWebpackPlugin(),
];

/**
 * 编译包分析
 */
if (process.env.bundleAnalyzerPlugin) {
    plugins.push(new BundleAnalyzerPlugin());
}
/**
 * REACT_APP_SENTRY配置是否发送到sentry
 */
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
            add: plugins,
            remove: []
        },
        configure: (config, {
            env,
            paths
        }) => {
            /**
             * 提高构建速度
             * @type {RegExp}
             */
             // ✅ 开启 lazyCompilation
            // config.experiments = {
            //     ...config.experiments,
            //     lazyCompilation: {
            //     entries: true,
            //     imports: true
            //     }
            // };
            // 忽略解析
            config.module.noParse = /jquery/; // lodash
            // 不用编译
            config.externals = {
                react: 'React',
                'react-dom': 'ReactDOM'
            }
            // 减小搜索文件类型
            // config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];
            // config.resolve.mainFields = ['module','browser', 'main'];
            addBeforeLoaders(config, loaderByName("style-loader"), {
                loader: 'cache-loader',
                options: {
                    cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/cache-loader'),
                },
            });
            addBeforeLoaders(config, loaderByName("style-loader"), {
                loader: "thread-loader",
                options: {
                    workers: 4,
                }
            });
            // 去掉打包生产map 文件
            if (process.env.REACT_APP_SENTRY !== 'false') {
                config.devtool = 'source-map'; // cheap-module-source-map source-map
            } else {
                config.devtool = 'cheap-module-source-map';
            }
            if (process.env.NODE_ENV === "production") {
            } else {
                // 允许访问外部的值 主要就是访问mock服务
                // config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
            }

            // 支持static部署
            if (process.env.REACT_APP_PUBLICPATH) {
                config.output.publicPath = process.env.REACT_APP_PUBLICPATH;
            }
            // return smp.wrap(config);
            return config;
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        sourceMap: false,
                        modifyVars: {
                            // ...getThemeVariables({
                            //     dark: false, // 开启暗黑模式
                            //     compact: false, // 开启紧凑模式
                            // }),
                            // 此处定义主题，也可直接在ant.less中定义
                            '@primary-color': '#1DA57A'
                        },
                        javascriptEnabled: true,
                    },
                },
                postcssLoaderOptions: {
                    sourceMap: false
                },
                cssLoaderOptions: {sourceMap: false, importLoaders: 1,}
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
    devServer: {
        client: {
            // progress: true, // 展示进度
            overlay: false, // 错误信息使用iframe覆盖
        },
    },
};
