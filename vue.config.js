const { defineConfig } = require('@vue/cli-service')
const fs = require("fs");
const webpack = require("webpack");
// const themeFiles = fs.readdirSync("./src/style/theme");
let ThemesArr = [];
// themeFiles.forEach(function (item, index) {
//   let stat = fs.lstatSync("./src/style/theme/" + item);
//   if (stat.isDirectory() === true) {
//     ThemesArr.push(item);
//   }
// });

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
