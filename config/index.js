'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
// const process_env = require('../config/dev.env');

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // Various Dev Server settings
    host:  (process.env.NODE_ENV === 'production') ? 'www.fuyingzhi.com':'localhost', // can be overwritten by process.env.HOST
    /*why？下面的方式本地运行（npm start）不成功*/
    // host:  (process.env.NODE_ENV === 'development') ? '192.168.1.149':'www.fuyingzhi.com',
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
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

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
