const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app: any) {
    app.use(
        createProxyMiddleware('/custom', {
            target: 'http://47.95.205.101:88', // 47.95.205.101:88  127.0.0.1:7001
            changeOrigin: true, // needed for virtual hosted sites  47.95.205.101:88
            ws: true, // proxy websockets
            secure: false, // 验证SSL证书。应用于https
            // pathRewrite: {
            //     '^/custom': ''
            // }
        })
    );
    app.use(
        createProxyMiddleware('/graphql', {
            target: 'http://47.95.205.101:88',
            changeOrigin: true, // needed for virtual hosted sites
            ws: true, // proxy websockets
            secure: false, // 验证SSL证书。应用于https
            // pathRewrite: {
            //     '^/custom': ''
            // }
        })
    );
    app.use(
        createProxyMiddleware('/upload', {
            target: 'http://47.95.205.101:88',
            changeOrigin: true, // needed for virtual hosted sites
            ws: true, // proxy websockets
            secure: false, // 验证SSL证书。应用于https
            // pathRewrite: {
            //     '^/custom': ''
            // }
        })
    );
    app.use(
        createProxyMiddleware('/download', {
            target: 'http://47.95.205.101:88',
            changeOrigin: true, // needed for virtual hosted sites
            ws: true, // proxy websockets
            secure: false, // 验证SSL证书。应用于https
            // pathRewrite: {
            //     '^/custom': ''
            // }
        })
    );
    // 用户登录配置
    app.use(
        createProxyMiddleware('/admin', {
            target: 'http://47.95.205.101:88',
            changeOrigin: true, // needed for virtual hosted sites
            secure: false, // 验证SSL证书。应用于https
            ws: true, // proxy websockets
            // pathRewrite: {
            //     '^/custom': ''
            // }
        })
    );
    // 拓扑配置环境
    app.use(
        createProxyMiddleware('/nx_api', {
            target: 'http://47.95.205.101:80',
            changeOrigin: true, // needed for virtual hosted sites
            secure: false, // 验证SSL证书。应用于https
            ws: true, // proxy websockets
            // pathRewrite: {
            //     '^/custom': ''
            // }
        })
    );
    /**
     * socket 数据发送接口
     */
    app.use(
        createProxyMiddleware('/receive/event', {
            target: 'http://47.95.205.101:88',
            changeOrigin: true, // needed for virtual hosted sites
            secure: false, // 验证SSL证书。应用于https
            ws: true, // proxy websockets
            // pathRewrite: {
            //     '^/custom': ''
            // }
        })
    );
    /**
     * socket 测试
     */
    app.use(
        createProxyMiddleware('/socket', {
            target: 'ws://127.0.0.1:7001',
            changeOrigin: true, // needed for virtual hosted sites
            secure: false, // 验证SSL证书。应用于https
            ws: true, // proxy websockets
            // pathRewrite: {
            //     '^/custom': ''
            // }
        })
    );
};