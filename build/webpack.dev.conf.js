'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
// console.log(utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: false }))
// console.log(utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: false })[2].use)
const devWebpackConfig = merge(baseWebpackConfig, {
  // module: {
  //   rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: false })
  // },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warn', // 客户端启动日志
    historyApiFallback: { //使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容
      rewrites: [ //通过传递对象，可以使用配置选项诸如 rewrites
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    compress: true, //文件压缩
    hot: true, // 热加载
    liveReload: false,
    inline: true, //实时刷新
    contentBase: false, // since we use CopyWebpackPlugin.    //本地服务器所加载的页面所在的目录
    host: process.env.HOST || config.dev.host, //访问域名
    port: process.env.PORT && Number(process.env.PORT) || config.dev.port, //端口
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    // 当 devServer 服务器内部的 所有中间件执行完成之后执行
    after: function (app, server, compiler) {
      // console.log([app, server, compiler])
      // do fancy stuff
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),

  ]
})
module.exports = devWebpackConfig
// new Promise((resolve, reject) => {
//   portfinder.basePort = process.env.PORT || config.dev.port
//   portfinder.getPort((err, port) => {
//     if (err) {
//       reject(err)
//     } else {
//       // publish the new Port, necessary for e2e tests
//       process.env.PORT = port
//       // add port to devServer config
//       devWebpackConfig.devServer.port = port
//       resolve(devWebpackConfig)
//     }
//   })
// })
