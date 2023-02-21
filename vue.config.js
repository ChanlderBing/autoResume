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
        // 自定义webpack插件
        new webpack.DefinePlugin({
          THEMEARR: JSON.stringify(ThemesArr),
        }),
      ],
    };
  },
})
