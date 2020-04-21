// 拼接路径
const resolve = dir => require('path').join(__dirname, '.', dir)
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const port = 8082 // dev port

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  assetsDir: process.env.VUE_APP_ASSETS_DIR,
  pages: { // 修改 pages 入口
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
  },
  lintOnSave: true,
  configureWebpack: config => {
    /* config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: resolve('./plugin.properties'),
          to: resolve(`./${process.env.VUE_APP_OUTPUT_DIR}/../`),
          ignore: ['.*']
        }
      ])
    ) */
  },
  chainWebpack: config => {
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // @ 默认指向 src 目录，这里要改成 examples
    // 另外也可以新增一个 ~ 指向 packages
    config.resolve.alias
      .set('@', resolve('examples'))
      .set('@api', resolve('examples/api'))
      .set('~', resolve('packages'))

    // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule('js')
      .include.add('/packages/').end()
      .include.add('/examples/').end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    host: '0.0.0.0', // 10.3.89.52
    port: port,
    open: true,
    proxy: {
      [process.env.VUE_APP_API_MODULE]: {
        target: process.env.VUE_APP_API_PATH,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_API_MODULE]: process.env.VUE_APP_API_MODULE
        }
      }
    }
  }
}
