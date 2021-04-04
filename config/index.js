'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
// const process_env = require('../config/dev.env');

const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/app': {
        target: '192.168.0.100/app/',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,     // target是域名的话，需要这个参数，
        secure: false,          // 设置支持https协议的代理
        //本地服务器所加载的页面所在的目录
      },
    }
  },
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // Various Dev Server settings    
    // host: (process.env.NODE_ENV === 'production') ? 'www.fuyingzhi.com' : 'localhost', // can be overwritten by process.env.HOST
    host: (process.env.NODE_ENV === 'production') ? '192.168.0.100' : 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    servePort: 9999,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    // host: 'www.fuyingzhi.com', // can be overwritten by process.env.HOST
    // port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // servePort: 9999,
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // 对打包文件进行压缩
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // 运行带有额外参数的构建命令，在构建完成后查看bundle analyzer报告:
    // `npm run build --report`
    // 也可以设置为' true '或' false '总是打开或关闭它
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
