const {getOptions} = require("loader-utils");

/**
 * 将$转换为@
 * @param source
 * @return {*}
 */
const replace$2 = (source) => {
    return source.replace(/\$/ig, '@');
}
// 导出一个函数 被webpack调用的时候会传递一个source
module.exports = function (source) {
    // 获取配置
    const options = getOptions(this);
    // 函数需要转换成字符串形式 被eval调用
    return `
        export default (options)=> {
            ${replace$2.toString()}
            return replace$2(${source});
        }
    `
};
