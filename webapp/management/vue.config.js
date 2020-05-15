// 翻阅文档https://cli.vuejs.org/zh/config/#vue-config-js
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_DEV = ['development', 'dev'].includes(process.env.NODE_ENV)

module.exports = {
  //生产环境的source map，设置为 false 加速生产环境构建，如果需要用到source map再打开
  productionSourceMap: false,
  //部署应用包时的基本 URL
  publicPath: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') ? './' : '/novel_node/',
  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'novel_node',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',
  //指定生成的 index.html 的输出路径 (相对于 outputDir)
  indexPath: 'index.html',

  // Webpack内部配置
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))

    // 找到各种loader 方便自定义配置
    const imagesRule = config.module.rule('images')

    // 图片压缩 开发环境不压缩，影响开发时候编译速度
    if (!IS_DEV) {
      imagesRule
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('img-loader')
        .loader('img-loader').options({
          plugins: [
            require('imagemin-jpegtran')(),
            require('imagemin-pngquant')({
              quality: [0.75, 0.85]
            })
          ]
        })
    }
  },
  devServer: { // 设置代理
    hot: true, //热加载
    host: '0.0.0.0', //ip地址
    port: 9000, //端口
    disableHostCheck: true, //内网穿透映射到外网需要添加这一行，不然会报Invalid Host header错误
    https: false, //false关闭https，true为开启
    open: false, //自动打开浏览器
  }
}