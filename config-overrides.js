const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackModuleRule,
    addWebpackAlias,
    addBabelPlugins,
} = require("customize-cra");
const { getThemeVariables } = require('antd/dist/theme');
const path = require("path");
const AntdScssThemePlugin = require("antd-scss-theme-plugin");
// 后去去掉map文件
// process.env.GENERATE_SOURCEMAP = false

module.exports = override(
    // 默认路径设置
    addWebpackAlias({
        "@": path.resolve(__dirname, "./src"),
        "@img": path.resolve(__dirname, "./public/*"),
        "@assets": path.resolve(__dirname, "./public/assets/*"),
        "@share": path.resolve(__dirname, "./src/share"),
        "@router": path.resolve(__dirname, "./src/router"),
        "@admin": path.resolve(__dirname, "./src/router/admin"),
        "@mocks": path.resolve(__dirname, "./src/mocks"),
        "@static": path.resolve(__dirname, "./src/static"),
        "@containers": path.resolve(__dirname, "./src/containers"),
        "@components": path.resolve(__dirname, "./src/components"),
    }),
    // 处理antd样式问题
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        // style: true // //或者css, true代表运用less
    }),
    //不做打包处理配置，如直接以cdn引入的
    // addWebpackExternals({
    //     echarts: "window.echarts",
    //     // highcharts:"window.highcharts"
    // }),
    // new AntdScssThemePlugin("./src/styles/theme.scss")
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            localIdentName: '[local]--[hash:base64:5]',
            modifyVars: getThemeVariables({
                dark: false, // 开启暗黑模式
                compact: false, // 开启紧凑模式
            }),
        }
    }),
    // 处理scss和less互相使用
    // This rule will only be used for converting our sass-variables to less-variables
    addWebpackModuleRule({
            test: /\.scss$/,
            issuer: /\.less$/,
            use: {
                loader: "./sassVarsToLess.js" // Change path if necessary
            }
        }
    ),
    (config)=>{ //暴露webpack的配置
        // 去掉打包生产map 文件
        // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
        if(process.env.NODE_ENV==="production") config.devtool=false;
        return config
    }
);


// const _addLessLoader = (loaderOptions = {}) => config => {
//     const mode = process.env.NODE_ENV === "development" ? "dev" : "prod";
//
//     // Need these for production mode, which are copied from react-scripts
//     const publicPath = require("react-scripts/config/paths").servedPath;
//     const shouldUseRelativeAssetPaths = publicPath === "./";
//     const shouldUseSourceMap = mode === "prod" && process.env.GENERATE_SOURCEMAP !== "false";
//     const lessRegex = /\.less$/;
//     const lessModuleRegex = /\.module\.less$/;
//     const localIdentName = loaderOptions.localIdentName || "[path][name]__[local]--[hash:base64:5]";
//
//     const getLessLoader = cssOptions => {
//         return [
//             mode === "dev"
//                 ? require.resolve("style-loader")
//                 : {
//                     loader: require("mini-css-extract-plugin").loader,
//                     options: Object.assign({}, shouldUseRelativeAssetPaths ? {publicPath: "../../"} : undefined)
//                 },
//             {
//                 loader: require.resolve("css-loader"),
//                 options: cssOptions
//             },
//             {
//                 loader: require.resolve("postcss-loader"),
//                 options: {
//                     ident: "postcss",
//                     plugins: () => [
//                         require("postcss-flexbugs-fixes"),
//                         require("postcss-preset-env")({
//                             autoprefixer: {
//                                 flexbox: "no-2009"
//                             },
//                             stage: 3
//                         })
//                     ],
//                     sourceMap: shouldUseSourceMap
//                 }
//             },
//             {
//                 loader: "sass-loader",
//                 options: {
//                     sourceMap: process.env.NODE_ENV !== "production"
//                 }
//             },
//             AntdScssThemePlugin.themify({
//                 loader: "less-loader",
//                 options: {
//                     javascriptEnabled: true,
//                     sourceMap: process.env.NODE_ENV !== "production"
//                 }
//             })
//         ];
//     };
//
//     const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
//
//     // Insert less-loader as the penultimate item of loaders (before file-loader)
//     loaders.splice(
//         loaders.length - 1,
//         0,
//         {
//             test: lessRegex,
//             exclude: lessModuleRegex,
//             use: getLessLoader({
//                 importLoaders: 2
//             }),
//             sideEffects: mode === "prod"
//         },
//         {
//             test: lessModuleRegex,
//             use: getLessLoader({
//                 importLoaders: 2,
//                 modules: true,
//                 localIdentName: localIdentName
//             })
//         }
//     );
//
//     return config;
// };