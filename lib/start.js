const myArgs = process.argv.slice(2);
const _dotenv = require('dotenv');
_dotenv.config({
    // 去掉map文件
    REACT_APP_SENTRY: false,
    PORT: myArgs[0]
});