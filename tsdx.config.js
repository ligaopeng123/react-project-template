// rollup配置
module.exports = function (config, options) {
    // 去掉sourcemap
    config.output.sourcemap = false;
    return config;
};
