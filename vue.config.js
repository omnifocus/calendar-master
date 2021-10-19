var px2rem = require('postcss-px2rem');
module.exports = {
    devServer: {
      proxy: {
        '/api': {
            target: 'http://localhost:8088',//后端接口地址
            changeOrigin: true,//用于控制请求头中的host值
            pathRewrite: {
                '^/api': '/api',//重写,
            }
        }
      },
      disableHostCheck:true,//解决Invalid Host header
    },
    css: {
      loaderOptions: {
        postcss: {
          plugins: [
            // 设计稿宽度的1/10，根据原型图给出的尺寸标注来。我这里的原型图总宽度是375
            px2rem({ remUnit: 37.5 }),
          ],
        },
      },
    },
}