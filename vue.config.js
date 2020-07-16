const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://39.100.126.64:8789/gradleRole',
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    },
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.resolve.alias.set('@', resolve('./src')) // set第一个参数：设置的别名，第二个参数：设置的路径
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
    // 用cdn方式引入
    config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        "md5":"md5",
        'element-ui': 'ELEMENT'
    }
},
}
