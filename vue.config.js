const { defineConfig } = require('@vue/cli-service')
const fs = require("fs");
const webpack = require("webpack");
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const CompressionPlugin = require('compression-webpack-plugin');


const CDN = {
  css: [
   'https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css',
   'https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.16/index.min.css'
  ],
  js: [
   'https://cdn.bootcdn.net/ajax/libs/vue/3.2.13/vue.global.js',
   'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.2/vuex.global.js',
   'https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.16/index.full.js',
  ]
};

let objExternals = {
  vue: 'Vue',
  vuex: 'Vuex',
  'element-plus': 'ElementPlus'
}

module.exports = defineConfig({
  indexPath: 'index.html' , // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  css: {
      extract: IS_PROD,
      sourceMap:false,
      requireModuleExtension: false,// 去掉文件名中的 .module
  },
  pwa: {
    iconPaths: {
        favicon32: 'favicon.ico',
        favicon16: 'favicon.ico',
        appleTouchIcon: 'favicon.ico',
        maskIcon: 'favicon.ico',
        msTileImage: 'favicon.ico'
    }
},

  transpileDependencies: true,
  css:{
    loaderOptions:{
      scss:{
        additionalData: `@import "@/assets/style/theme/index.scss";`
      }
    }
  },
  chainWebpack: config => {
  	// 配置，将当前页定义的cdn值传到主页面（index.html）
    config.plugin('html').tap(args => {
    // 这里我是除本地环境，其余均使用CDN，可自己选择是否配置
      args[0].cdn = process.env.NODE_ENV === 'development' ? {} : CDN
      return args;
    });
  },

  configureWebpack: (config) => {
    return {
      externals: process.env.NODE_ENV === 'development' ? {} : objExternals,
      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            outputDir:"public", //设置打包后的项目目录名称
          }
        }),
        new CompressionPlugin({
          algorithm:'gzip',
          test: /\.(js|css)(\?.*)?$/i, //需要压缩的文件正则
          threshold: 1024, //文件大小大于这个值时启用压缩
          deleteOriginalAssets: false //压缩后保留原文件
        })
      ],
    };
  },
})
