var createProxyMiddleware = require('http-proxy-middleware').createProxyMiddleware;
module.exports = function (app) {
    app.use(createProxyMiddleware('/custom', {
        target: 'http://47.95.205.101:88',
        changeOrigin: true,
        ws: true,
        secure: false
    }));
    app.use(createProxyMiddleware('/graphql', {
        target: 'http://47.95.205.101:88',
        changeOrigin: true,
        ws: true,
        secure: false
    }));
    app.use(createProxyMiddleware('/upload', {
        target: 'http://47.95.205.101:88',
        changeOrigin: true,
        ws: true,
        secure: false
    }));
    app.use(createProxyMiddleware('/download', {
        target: 'http://47.95.205.101:88',
        changeOrigin: true,
        ws: true,
        secure: false
    }));
    // 用户登录配置
    app.use(createProxyMiddleware('/admin', {
        target: 'http://47.95.205.101:88',
        changeOrigin: true,
        secure: false,
        ws: true
    }));
    // 拓扑配置环境
    app.use(createProxyMiddleware('/nx_api', {
        target: 'http://47.95.205.101:80',
        changeOrigin: true,
        secure: false,
        ws: true
    }));
    /**
     * socket 数据发送接口
     */
    app.use(createProxyMiddleware('/receive/event', {
        target: 'http://47.95.205.101:88',
        changeOrigin: true,
        secure: false,
        ws: true
    }));
    /**
     * socket 测试
     */
    app.use(createProxyMiddleware('/socket', {
        target: 'ws://127.0.0.1:7001',
        changeOrigin: true,
        secure: false,
        ws: true
    }));
};
