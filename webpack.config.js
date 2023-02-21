const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  module: {
    rules: [
        {	
            test: /\.(jpg|png|gif)$/i,  //i表示忽略图片格式大小写，例如.PNG
            use: [{
                loader: 'url-loader',  // url-loader依赖于file-loader所以这两个包都需要下载
                options:{
                    limit: 10000*1024 ,//如果图片小于10k，就使用base64处理，
                    name: '[hash10].[ext]' //取hash值的前10位，[ext]:取原来的扩展名.jpg .png
                }
            }]
        }
    ]
  },
  plugins: [

  ]
}