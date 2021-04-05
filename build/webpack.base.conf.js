'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const os = require('os')
const HappyPack = require('happypack')
// 手动创建进程池
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('src')],
        options: {
          extractCSS: true
        }
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'happypack/loader?id=vue',  //配置happyPack
      //   include: [resolve('src')]
      // },

      // {
      //   test: /\.(le|c)ss$/,
      //   use: ['style-loader', 'css-loader', 'less-loader']
      // },
      {
        test: /\.css$/,
        loader: 'happypack/loader?id=css',  //配置happyPack
      },
      {
        test: /\.less$/,
        loader: 'happypack/loader?id=less',  //配置happyPack
      },
      {
        // babel-loader is slow! 所以不仅要使用exclude、include，尽可能准确的指定要转化内容的范畴，而且要充分利用缓存，进一步提升性能。
        // babel-loader 提供了 cacheDirectory特定选项（默认 false）：设置时，给定的目录将用于缓存加载器的结果。
        test: /\.js$/,
        // loader: 'babel-loader?cacheDirectory=true',
        loader: 'happypack/loader?id=happyBabel',  //配置happyPack
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            }
          }
        ],
        exclude: /node_modules/,
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        },
        // exclude: [resolve('src/assets')]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // loader vue 文件必依赖插件
    new MiniCssExtractPlugin(),
    new HappyPack({
      // 这个HappyPack的“名字”就叫做happyBabel，和楼上的查询参数遥相呼应
      id: 'happyBabel',
      // 指定进程池
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory']
    }),
    // new HappyPack({
    //   id: 'happyTsx',
    //   threadPool: happyThreadPool,
    //   loaders: [
    //     {
    //       loader: 'babel-loader'
    //     },
    //     {
    //       loader: 'ts-loader',
    //       options: {
    //         appendTsSuffixTo: [/\.vue$/],
    //       }
    //     }]
    // })

    // new HappyPack({
    //   id: 'vue',
    //   threadPool: happyThreadPool,
    //   loaders: [{
    //     loader: 'vue-loader',
    //     options: {
    //       extractCSS: true,
    //     }
    //   }]
    // }),
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: ['css-loader']
    }),

    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      loaders: ['css-loader', 'less-loader']
    }),

  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}