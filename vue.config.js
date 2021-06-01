const path = require('path')
const webpack = require('webpack')
module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // express服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}