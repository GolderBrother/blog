// debugger.js 和项目中的 packge.json 同级
// 右键运行 debugger.js ，相当于使用 npx webpack 运行 webpack
// npx webpack 其实就是用 node 执行 bin 下面的 cli.js 
// npx webpack = node ./node_modules/webpack-cli/bin/cli.js
// 找到 webpack-cli/bin/cli.js ，设置断点，就可以开始调试了（这是第一种方法）
const path = require("path");
const pkgPath = require.resolve(`webpack-cli/package.json`);
const pkg = require(pkgPath);
require(path.resolve(
  path.dirname(pkgPath),
  './bin/cli.js'
  //pkg.bin['webpack-cli']
));