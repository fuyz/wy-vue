module.exports = {
  devServer: {
    // sockHost: 'http://localhost:8080/',
    disableHostCheck: true,
  },
  chainWebpack: (config) => {
    config.plugin('html')
      .tap((options) => {
        options[0].HtmlWebpackPlugin = {
          ...options[0].HtmlWebpackPlugin,
          pageId: process.env.NODE_ENV === 'production' ? 49 : 50
        }
        console.log(options)
        return options
      })
  }
}