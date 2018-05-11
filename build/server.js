const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const fs = require("fs-extra");
const opn = require('opn');
// const OSInfo = require('../webpack.OSInfo')
//默认是开发时配置
const config = require("../webpack.config.js");

//webpack 设置本地服务器
new WebpackDevServer(webpack(config), {
  // 设置 WebpackDevServer 的开发目录，默认为当前项目的根目录
  contentBase: path.join(__dirname, "../../public"),
  publicPath: `/`,
//   proxy: appsConfig.proxy,
  // 其他配置项
  compress: true,
  hot: true,
  historyApiFallback: true,
  quiet: true,
  noInfo: true,
  stats: { colors: true },
  disableHostCheck: true,
  open: true,
  openPage:`http://localhost:8080/`
}).listen('8080', 'localhost', function(err, result) {
  if (err) {
    return console.log(err);
  }
  setTimeout(function(){
      opn(`http://localhost:8080/`);
  },1000);
});
