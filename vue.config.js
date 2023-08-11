const { defineConfig } = require('@vue/cli-service')
const fs = require("fs");
const webpack = require("webpack");
let ThemesArr = [];

module.exports = defineConfig({
  transpileDependencies: true,
  css:{
    loaderOptions:{
      scss:{
        additionalData: `@import "@/assets/style/theme/index.scss";`
      }
    }
  },
  configureWebpack: (config) => {
    return {
      plugins: [
        new webpack.LoaderOptionsPlugin({
          // test: /\.xxx$/, // may apply this only for some modules
          options: {
            outputDir:"public", //设置打包后的项目目录名称
          }
        }),
        // 自定义webpack插件
        new webpack.DefinePlugin({
          THEMEARR: JSON.stringify(ThemesArr),
        }),
      ],
    };
  },
})
