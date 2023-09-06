const { createProxyMiddleware } = require('http-proxy-middleware');

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api1', {
            target: API_ENDPOINT,
            changeOrigin: true,
            pathRewrite: {
                "^/api1": "",
            },
            headers: {
                Connection: "keep-alive"
            }
        })
    );
};
//     app.use(
//         createProxyMiddleware('/api2', {
//             target: "http://pnp_server:3000",
//             changeOrigin: true,
//             pathRewrite: {
//                 "^/api2": "",
//             },
//             headers: {
//                 Connection: "keep-alive"
//             }
//         })
//     )
// }