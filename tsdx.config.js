const images = require('@rollup/plugin-image');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
// const url = require('rollup-plugin-url');
// const svgr = require('@svgr/rollup');
const cssUrl = require('postcss-url');

module.exports = function (config, options) {
    config.plugins = [
        images({include: ['**/*.png', '**/*.jpg', '**/*.svg']}),
        ...config.plugins,
        postcss({
            extensions: ['.less'],
            plugins: [
                // 解析url链接 加载静态资源
                autoprefixer(),
                // 优化css
                cssnano({
                    preset: 'default',
                }),
                cssUrl({
                    url: 'inline', // 转为base64
                })
            ],
            inject: true, // 是否主动注入css到js中(设置为true,则在引用组件的时候,就无需再单独引入css了)
            modules: false, // 使用css modules
            camelCase: true, // 支持驼峰
            extract: !!options.writeMeta, //
            css: true,
            less: true, // 是否使用less,
            sass: true, // 是否使用sass
        })
    ]
    config.output.sourcemap = false;
    return config
}
