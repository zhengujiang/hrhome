'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
//提取css
const extract = new ExtractTextPlugin({
  filename: 'css/[name].css?[contenthash:8]'
  //allChunks: true  /* 没有引用公共的css样式时 这个属性不能带 */
})
// 提供公共代码块 CommonsChunkPlugin
// 实现作用域提升 ModuleConcatenationPlugin  webpack3新增
//根据路径生成唯一的module_id    HashedModuleIdsPlugin
//minChunks:Infinity 只会被打包到对应的name中，其他chunk不会被打包  [hash:8]
let plugins = [extract, new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  sourceMap: true
}), new webpack.HashedModuleIdsPlugin({
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 4
}), new webpack.NamedChunksPlugin((chunk) => {
  // 解决异步模块打包的问题
  if (chunk.name) {
    return chunk.name;
  }
  // console.log(chunk);
  // return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
}), new webpack.optimize.CommonsChunkPlugin({ name: 'verdor', minChunks: Infinity }), new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', chunks: ['verdor'] }), new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.DefinePlugin({
    'process.env.VERSION': JSON.stringify({ version: '2.0.' + Math.ceil(Date.now() / (1000 * 24 * 60 * 60)) + "." + ("00" + new Date().getHours()).substr(-2) }),
    'process.env': { NODE_ENV: '"production"' }//指明当前的环境
  }
  )];


module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
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
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
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
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
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
