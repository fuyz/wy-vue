'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
debugger
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage, message);
};
const devWebpackConfig = merge(baseWebpackConfig, {
  // module: {
  // rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  // },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    compress: true, //文件压缩
    hot: false, // 热加载 ???
    liveReload: false,
    inline: false, //实时刷新
    contentBase: false, // since we use CopyWebpackPlugin.    //本地服务器所加载的页面所在的目录
    host: HOST || config.dev.host, //访问域名
    port: PORT || config.dev.port, //端口
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
    // 展示编译实时进度
    // new webpack.ProgressPlugin(handler)    
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
