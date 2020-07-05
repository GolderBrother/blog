# Webpack 性能优化你知道哪些

## 优化开发体验

### 1. 优化 Loader 配置

由于 `Loader` 对文件的转换操作很耗时，所以需要让尽可能少的文件被 `Loader` 处理。可以通过 `test include exclude` 三个配置项来命中 `Loader` 要应用规则的文件。

示例代码如下：

```js
module.exports = {
  module: {
    rules: [
      {
        //如果项目源码中只有js文件，就不要写成/\jsx?$/，以提升正则表达式的性能
        test: /\.js$/,
        //babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启，一次编译到缓存中，后面直接走缓存
        use: ['babel-loader?cacheDirectory'],
        // 指定编译文件目录：只对项目根目录下 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, 'src')
      }
    ]
  }
};
```

webpack 官方文档中有提到，[传送门](https://www.webpackjs.com/loaders/babel-loader/#babel-loader-%E5%BE%88%E6%85%A2-)

### 2. 优化 resolve.modules 配置

`resolve.modules` 的默认值是 `node_modules`，含义是先去当前目录的 `node_modules` 目录下去找我们想找的模块，如果没找到就去**上一级目录** `../node_modules` 中找，再没有就去 `../../node_modules` 中找，以此类推。 这和 `Node.js` 的模块寻找机制很相似。

当安装的第三方模块都放在项目根目录的 `node_modules` 目录下时，就没有必要按照默认的方式去一层层地寻找，可以指明存放第三方模块的绝对路径，以减少寻找.

示例代码如下：

```js
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')]
  }
};
```

### 3. 优化 `resolve.mainFields` 配置

在安装的第三方模块中都会有一个 `package.json` 文件，用于描述这个模块的属性,其中可以存在多个字段描述入口文件，原因是某些模块可以同时用于多个环境中，针对不同的运行环境需要使用不同的代码。

`resolve.mainFields` 的默认值和当前的 `target` 配置有关系，对应的关系如下。

`target` 为 `web` 或者 `webworker` 时，值是`［'browser','module','main']`。
`target` 为其他情况时，值是 `['module','main']`。
以 `target` 等于 `web` 为例， `Webpack` 会先采用第三方模块中的 `browser` 宇段去寻找模块的**入口文件**，如果不存在，就采用 `module` 字段，以此类推。

为了减少搜索步骤，在明确第三方模块的**入口文件**描述字段时，我们可以将它设置得尽量少。 由于大多数第三方模块都采用 `main` 宇段去描述入口文件的位置，所以可以这样配置：

### 4. 优化 `resolve.alias` 配置

`resolve.alias` 配置项通过**别名**来将原导入路径**映射**成一个新的导入路径。

在实战项目中经常会依赖一些庞大的第三方模块，以 `React` 库为例，发布出去的 `React` 库中包含两套代码

一套是采用 `CommonJS` 规范的模块化代码，这些文件都放在 `lib` 目录下，以 `package.json` 中指定的入口文件 `react.js` 为模块的入口
一套是将 `React` 的所有相关代码打包好的完整代码放到一个单独的文件中， 这些代码没有采用模块化，可以直接执行。其中 `dist/react.js` 用于开发环境，里面包含检查和警告的代码。 `dist/react.min.js` 用于线上环境，被最小化了。

在默认情况下， Webpack 会从入口文件 `./node_modules/react/react.js` 开始递归解析和处理依赖的几十个文件，这会是一个很耗时的操作 通过配置 `resolve.alias`, 可以让 `Webpack` 在处理 `React` 库时，直接使用单独、完整的 `react.min.js` 文件,从而跳过耗时的**递归解析**操作.

示例代码如下：

```js
module.exports = {
  resolve: {
    //使用 alias 将导入 react 的语句换成直接使用单独、完整的 react.min.js 文件，
    //减少耗时的递归解析操作
    alias: {
      react: path.resolve(__dirname, './node_modules/react/dist/react.min.js')
    }
  }
};
```

但是，对某些库使用本优化方法后，会影响到使用 Tree-Sharking 去除无效代码的优化，因为打包好的完整文件中有部分代码在我们的项目中可能永远用不上。一般对整体性比较强的库采用本方法优化，因为完整文件中的代码是一个整体，每一行都是不可或缺的, 但是对于一些工具类的库，则不建议用此方法。

### 5. 优化 resolve.extensions 配置

在导入语句没带文件后缀时，`Webpack` 会自动带上**后缀**去尝试询问文件是否存在。如果这个列表越长，或者正确的**后缀**越往后，就会造成尝试的次数越多，所以 `resolve.extensions` 的配置也会影响到**构建**的性能, 在配置 `resolve.extensions` 时需要遵守 以下几点，以做到尽可能地优化构建性能。

- **后缀**尝试列表要尽可能小，不要将项目中不可能存在的情况写到**后缀**尝试列表中。
- 频率出现最高的文件**后缀**要优先放在最前面，以做到**尽快退出**寻找过程。
- 在源码中写导入语句时，要尽可能带上**后缀** 从而可以避免寻找过程。例如在确定的情况下将 `require ( './data ')` 写成 `require （'./data.json')`

示例代码如下：

```js
module.exports = {
  resolve: {
    //尽可能减少后缀尝试的可能性
    extensions: ['js']
  }
};
```

### 6. 优化 `module.noParse` 配置

`module.noParse` 配置项可以让 `Webpack` **忽略**对部分没采用模块化的文件的**递归解析**处理，这样做的好处是能**提高构建性能**。原因是一些库如 `jQuery`, 就不用去编译解析了。

示例代码如下：

```js
module.exports = {
  module: {
    noParse: /jquery/
  }
};
```

### 7. 使用 `DllPlugin`

`DLLPlugin` 和 `DLLReferencePlugin` 用某种方法实现了拆分 `bundles`，同时还大大**提升了构建的速度**。

包含大量复用模块的`动态链接库`**只需被编译一次**，在之后的构建过程中被`动态链接库`包含的模块将不会重新编译，而是直接使用`动态链接库`中 的代码, 由于动态链接库中大多数包含的是常用的第三方模块，例如 `react、react-dom` ，所以只要不升级这些模块的版本，**动态链接库**就不用重新编译, 减少不必要的构建开销，大大提高了**构建性能**。

```js
// https://github.com/webpack/webpack/tree/master/examples/dll-user

module.exports = {
  // mode: "development || "production",
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..', 'dll'),
      manifest: require('../dll/dist/alpha-manifest.json') // eslint-disable-line
    }),
    new webpack.DllReferencePlugin({
      scope: 'beta',
      manifest: require('../dll/dist/beta-manifest.json'), // eslint-disable-line
      extensions: ['.js', '.jsx']
    })
  ]
};
```

这个理解起来不费劲，操作起来很费劲。所幸，在 `Webpack5` 中已经不用它了，而是用 `HardSourceWebpackPlugin`，一样的优化效果，但是使用却及其简单

示例代码如下：

```js
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const plugins = [new HardSourceWebpackPlugin()];
```

更开心的是，这个插件，`webapck4` 就可以用啦，赶紧用起来吧～

**注意：该插件与测量各流程耗时的插件 `speed-measure-webpack-plugin` 不兼容。**

### 8. 使用 `HappyPack`

`Webpack` 是单线程模型的，也就是说 `Webpack` 需要一个一个地处理任务，不能同时处理多个任务。`HappyPack`将任
务分解给多个`子进程`去并发执行，`子进程`处理完后再将结果发送给主进程,从而发挥多核 `CPU` 电脑的威力。

示例代码如下：

```js
    const HappyPack = require('happypack')
    const os = require('os')
    const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

    {
        test: /\.js$/,
        // loader: 'babel-loader',
        loader: 'happypack/loader?id=happy-babel-js', // 增加新的HappyPack构建loader
        include: [resolve('src')],
        exclude: /node_modules/,
    }

    plugins: [
        new HappyPack({
        id: 'happy-babel-js',
        loaders: ['babel-loader?cacheDirectory=true'],
        threadPool: happyThreadPool
        })
    ]
```

在整个 `Webpack` 构建流程中，最耗时的流程可能就是 `Loader` 对文件的转换编译操作了，因为要转换的**文件数据量巨大**，而且这些转换操作都只能一个一个地处理, `HappyPack` 的核心原理就是将这部分任务分解到多个子进程中去**并行处理**，从而减少总的**构建时间**。

### 9. 使用 `ParallelUglifyPlugin`

`webpack`默认提供了`UglifyJS`插件来压缩 JS 代码，但是它使用的是**单线程压缩代码**，也就是说多个 js 文件需要被压缩，它需要一个个文件进行压缩。所以说在正式环境打包压缩代码速度非常慢(因为压缩 JS 代码需要先把代码解析成用`Object抽象`表示的`AST语法树`，再去应用各种**匹配规则分析**和**处理 AST**，导致这个过程耗时非常大)。

当`webpack`有多个 JS 文件需要输出和压缩时候，原来会使用`UglifyJS`去一个个压缩并且输出，但是`ParallelUglifyPlugin`插件则会开启多个**子进程**，把对多个文件压缩的工作分别给多个**子进程**去完成，实际上每个**子进程**还是通过`UglifyJS`去压缩代码。无非就是变成了**并行处理**该压缩了，**并行处理**多个子任务，效率会更加的提高。

### 10. 优化文件监昕的性能

在开启监听模式时，默认情况下会监听配置的 `Entry` 文件和所有 `Entry` 递归依赖的文件，在这些文件中会有很多存在于 `node_modules` 下，因为如今的 `Web` 项目会依赖**大量的第三方模块**， 所以在大多数情况下我们都不可能去编辑 `node_modules` 下的文件，而是编辑自己建立的`源码`文件，而一个很大的优化点就是**忽略** `node_modules` 下的文件，不监听它们。

示例代码如下：

```js
module.export = {
  watchOptions: {
    //不监听的 node_modules 目录下的文件
    ignored: /node_modules/
  }
};
```

采用这种方法优化后， `Webpack` 消耗的内存和 `CPU` 将会大大减少。

### 11. 提升体验

这里主要是介绍几款 webpack 插件来帮助大家提升构建体验，虽然说它们在提升构建效率上对你没有什么太大的帮助，但能让你在等待构建完成的过程中更加舒服。

#### progress-bar-webpack-plugin

[传送门](https://www.npmjs.com/package/progress-bar-webpack-plugin)

这是一款能为你展示构建进度的 `Plugin`，它的使用方法和普通 `Plugin` 一样，也不需要传入什么配置。下图就是你加上它之后，在你的终端面板上的效果，在你的终端底部，将会有一个构建的进度条，可以让你清晰的看见构建的执行进度：

![img](https://ss.csdn.net/p?https://mmbiz.qpic.cn/mmbiz_jpg/meG6Vo0Mevh6Bs5M42uoQhs6aQ896lqv41n8GFsApwHEmtoTHuzQ9rQ7D87AuibYVKpqSbRcMQDR8xxSmcluKZA/640?wx_fmt=jpeg)

#### webpack-build-notifier

[传送门](https://www.npmjs.com/package/webpack-build-notifier)

这是一款在你构建完成时，能够像`微信、Lark`这样的 APP 弹出消息的方式，提示你构建已经完成了。也就是说，当你启动构建时，就可以隐藏控制台面板，专心去做其他事情啦，到“点”了自然会来叫你，它的效果就是下面这样，同时还有提示音噢～

![img](https://ss.csdn.net/p?https://mmbiz.qpic.cn/mmbiz_jpg/meG6Vo0Mevh6Bs5M42uoQhs6aQ896lqvLm1K6gKOIgfAzbKFqPfUGaTvFmbls8He24pn9oOpfP3ZBzvnEdOsUw/640?wx_fmt=jpeg)

#### webpack-dashboard

[传送门](https://www.npmjs.com/package/webpack-dashboard)

当然，如果你对 webpack 原始的构建输出不满意的话，也可以使用这样一款 Plugin 来优化你的输出界面，它的效果就是下面这样，这里我就直接上官图啦：

![img](https://ss.csdn.net/p?https://mmbiz.qpic.cn/mmbiz_jpg/meG6Vo0Mevh6Bs5M42uoQhs6aQ896lqvWDQewO01X1dssdPcrpbSRhZicmGwCtxsYZ1P9VY76Y9WYGGvp3Xdz5A/640?wx_fmt=jpeg)

## 优化输出质量

### 1. Webpack 实现 CDN 的接入

总之，构建需要实现以下几点:

- 静态资源的导入 `URL` 需要变成指向 `DNS` 服务的绝对路径的 `URL`，而不是相对 `HTML` 文件的
- 静态资源的文件名需要带上由文件内容算出来的 `Hash` 值，以防止被缓存
- 将不同类型的资源放到不同域名的 `DNS` 服务上，以防止资源的并行加载被阻塞

[参考链接](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-9CDN%E5%8A%A0%E9%80%9F.html)

### 2. 使用 Tree Shaking

`Tree Shaking` 正常工作的前提是，提交给 `Webpack` 的 `JavaScript` 代码必须采用了 `ES6` 的模块化语法，因为 `ES6` 模块化语法是静态的，可以进行静态分析。

首先，为了将采用 `ES6` 模块化的代码提交给 `Webpack` ，需要配置 `Babel` 以让其保留 `ES6` 模块化语句。

修改 `.babelrc` 文件如下：

```json
{
  "presets": [
    [
      "env",
      {
        "module": false
      }
    ]
  ]
}
```

第二个要求，需要使用`UglifyJsPlugin`插件。如果在`mode: "production"`模式，这个插件已经默认添加了，如果在其它模式下，可以手工添加它。

另外要记住的是打开`optimization.usedExports`。在`mode: "production"`模式下，它也是默认打开了的。它告诉`webpack`每个模块明确使用`exports`。这样之后，`webpack`会在打包文件中添加诸如`/* unused harmony export */`这样的注释，其后`UglifyJsPlugin`插件会对这些注释作出理解。

示例代码如下：

```js
// npm i -D uglifyjs-webpack-plugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin()],
    usedExports: true,
    sideEffects: true
  }
};
```

### 3. 提取公共代码

大型网站通常由**多个页面**组成，每个页面都是一个独立的**单页应用**，但由于所有页面都采用同样的技术栈及同一套样式代码，就导致这些页面之间有很多相同的代码。可以使用 `splitChunks` 进行分包：

示例代码如下：

```js
splitChunks: {
    chunks: "async",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
    default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}
```

### 4. 分割代码以按需加载

`Webpack` 支持两种动态代码拆分技术：

符合 `ECMAScript proposal` 的 `import()` 语法，推荐使用
传统的 require.ensure
`import()` 用于动态加载模块，其引用的模块及子模块会被分割打包成一个独立的 `chunk`。

`Webpack` 还允许以**注释**的方式传参，这种专业名词为 **魔术字符串**，是用来对便编译后的代码块文件命名，进而更好的生成 `chunk`。

```js
// single target
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  'module'
);

// multiple possible targets
import(
  /* webpackInclude: /\.json$/ */
  /* webpackExclude: /\.noimport\.json$/ */
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  `./locale/${language}`
);
```

回归到实际业务场景，页面基本上都是通过路由的方式呈现，如果按照路由的方式实现**页面级的异步加载**，岂不是方便很多。例如，`react` 中可使用 `loadable` :

```js
import React from 'react';
import { Route } from 'react-router-dom';
import { loadable } from 'react-common-lib';

const Test = loadable({
  loader: () => import('./test')
});

const AppRouter = () => (
  <>
    <Route path="/test" exact component={Test} />
  </>
);
```

### 5. 分析工具

[官方可视化工具](http://webpack.github.io/analyse/)

## 如何更好地优化打包资源

原则

一般谈到打包会有两方面的意思，第一在于提高打包的速度，第二在于对打包后的静态资源的优化。而对于静态资源的优化又不仅仅是打包提及的缩减。

对于打包资源优化的总体原则，在于尽可能的减少或者延迟模块的引用。主要遵循以下三点

- 减小打包的整体体积
- `Code Splitting`: 按需加载，优化页面首次加载体积。如根据路由按需加载，根据是否可见按需加载
- `Bundle Splitting`：分包，根据模块更改频率分层次打包，充分利用缓存

### 01 减小打包的整体体积

#### 代码压缩

代码压缩可以非常可观地减小资源打包体积，但是它的可操作性空间过小。可操作性低的意思是这一项不太容易出现在晋级评审的 PPT 上，如同 `CDN` 在网站性能优化的重要程度一样，重要但不归你做(或者傻瓜式配置)。

它良好的模块化，以致于 `webpack` 就自作主张在生产环境中默认把这件事给做了。

那它是如何压缩代码的？最典型的两种方法就是**空白符替换**以及**缩短变量名**，如代码所示，仅仅通过这两种方式就大大压缩了 `javascript` 资源：

```js
// 压缩前
function sum(first, second) {
  return first + second;
}

// 压缩后
function s(x, y) {
  return a + b;
}
```

#### 移除不必要的模块

这句话好像是废话，但它却是真正有用并且极为容易实现的一点。

在以下代码中，对 `lodash` 这个模块进行了引入，但在之后的代码中并无使用 `lodash`，那在 webpack 中这个模块还会继续打包吗？

很遗憾，仍会对它进行打包。但好消息是这一点优化起来相当简单。

```js
// 仅仅引入而未在代码中使用，该模块仍然会被打包
import _ from 'lodash';
```

对于这类问题总应该防患于未然，扼杀于摇篮中。eslint 的用武之地来了，它除了统一团队的代码风格以外，也用来提高团队的代码质量以及性能。

#### 选择可替代的体积较小的模块

针对这一条，有一个典型的例子是以体积过大而臭名昭著的 `moment.js` 模块，它仅仅用于 `DateTime` 的格式化及各种计算。但你 `import` 之后它的体积竟然达到了 `200kb+`，gzip 后仍然有 `69kb`。以至于在 `github` 上有一个仓库专门用来介绍如何优化它

- [How to optimize moment.js with webpack](https://github.com/jmblog/how-to-optimize-momentjs-with-webpack)

此时可以选择一个可替代它功能，但体积更小的模块。与 `moment.js API` 兼容的 `day.js`，它 `gzip` 后体积仅仅只有 `2kb`。

#### 按需引入模块

当你面对一个巨无霸的，捆绑式的大型模块时，可能你并不会使用到它的所有的功能，你只需要按照你的需求引入模块就可以了。那经常会有哪些巨无霸模块呢？

如 `lodash (勉强算)`，`antd`，`echarts`，我相信这三个模块对于以 React 为主的前端工程师都或多或少使用过。对你所需要使用的模块单独引入：

```js
import DatePicker from 'antd/es/date-picker'; // for js
import 'antd/es/date-picker/style/css'; // for css

import get from 'lodash.get';
```

### 02 Code Splitting: 按需加载，优化页面首次加载体积

懒加载，如果面试中提到懒加载的话，大概率面试官此时是想问你关于图片懒加载的问题。

> 前端开发中的图片懒加载如何实现

在屏幕可视区域外，对`img`标签自定义标签属性`data-src`来赋予图片的`src`地址，待滚动到`可视区域内`, 在将 `data-src` 值 替换成 `src` 值，也就是等到了**需要的时候**才去加载对应的图片，这样就达到 **图片懒加载** 效果

通过 `Code Splitting` 可以只加载当前所需要的核心资源：

- 如果你处在首页，并且首页中有占用资源过重的图表，需要对图表懒加载，否则它会大幅拖垮应用的首次渲染，加大白屏时间
- 如果你处在首页，你无需加载当前不可见屏幕下方的复杂组件
- 如果你处在页面 A，你没有必要加载页面 B 的资源

他们实现起来均需要额外编写代码，所以可操作性中等，但是好在它能够带来极大的益处，投资回报率较高，操作起来也极为简单，接下来就属于体力活了：

- 使用 `import()` 动态加载模块
- 使用 `React.lazy()` 动态加载组件
- 使用 `lodable-component` 动态加载路由，组件或者模块

大部分情况下，你只要做一个莫得感情的 API 工程师调用以上三个 API 就可以解决问题，大幅度降低页面的首次加载体积。但是在前往高级前端工程师的路上，你有可能需要了解其中的原理，~~(有可能并不需要，数据比原理重要)~~ 来做更加精细化的控制，比如针对缓存。

### 03 Bundle Splitting

除了资源体积上的优化，另一个大的优化就是**缓存**。单页应用有一个最好的方面，就是所有资源都是带有**指纹信息**的，这意味着所有的资源都是能够设置**永久缓存**的。

但仅仅如此了吗？

如果你所有的 js 资源都打包成一个文件，它确实有**永久缓存**的优势。但是当有一行文件进行修改时，这一个大包的**指纹信息**发生改变，**永久缓存**失效。

所以我们现在需要做到的是：当修改文件后，造成**最小范围**的缓存失效，这样便能够更充分的利用缓存，减小宽带，减小服务器费用。一个好消息是 `webpack` 等打包工具虽然在 `optimization` 上内置了很多性能优化，但它不会帮你做这件事，它并不知道你有哪些模块，以及这些模块的重要紧急程度，你终于可以大展拳脚了。

此时我们可以对资源进行分层次缓存的打包方案，这是一个建议方案

- `webpack-runtime`: 应用中的 `webpack` 的版本比较稳定，分离出来，保证长久的永久缓存
- `react-runtime`: `react` 的版本更新频次也较低
- `vundor`: 常用的第三方模块打包在一起，如 `lodash`，`classnames` 基本上每个页面都会引用到，但是它们的更新频率会更高一些

随着 `http2` 的发展，特别是多路复用，初始页面的静态资源不受资源数量的影响。因此为了更好的**缓存效果**以及**按需加载**，也有很多方案建议把所有的**第三方模块进行单模块打包**。

在 `webpack` 中，使用 `splitChunks.cacheGroups` 分割代码，配置缓存组如下：

```js
{
  splitChunks: {
    cacheGroups: {
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom "\\/]node_modules[\\/")[\\/]/,
        name: 'react',
        chunks: 'all'
      },
      vendor: {

      }
    }
  },
  runtimeChunk: {
    name: entrypoint => `runtime-${entrypoint.name}`,
  },
}
```

## 使用 thread-loader 加速构建

**webpack4 强力推荐**

webpack4 官方提供了一个 [thread loader](https://github.com/amireh/happypack#how-it-works)

> 这个 loader 不要跟 `happypack` 混合使用，会出现编译失败的问题，webpack4 官方已经强烈推荐此方法来替代 `happypack`

把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker【worker pool】 池里运行，一个 worker 就是一个 nodeJS 进程【node.js process】，每个单独进程处理时间上限为 `600ms`，各个进程的数据交换也会限制在这个时间内。

它的配置长这样：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          'thread-loader'
          // your expensive loader (e.g babel-loader)
        ]
      }
    ]
  }
};
```

下面是带有 option 的配置:

```js
use: [
  {
    loader: 'thread-loader',
    // loaders with equal options will share worker pools
    // 设置同样option的loaders会共享
    options: {
      // worker的数量，默认是cpu核心数
      workers: 2,

      // 一个worker并行的job数量，默认为20
      workerParallelJobs: 50,

      // 添加额外的node js 参数
      workerNodeArgs: ['--max-old-space-size=1024'],

      // 允许重新生成一个dead work pool
      // 这个过程会降低整体编译速度
      // 开发环境应该设置为false
      poolRespawn: false,

      //空闲多少秒后，干掉work 进程
      // 默认是500ms
      // 当处于监听模式下，可以设置为无限大，让worker一直存在
      poolTimeout: 2000,

      // pool 分配给workder的job数量
      // 默认是200
      // 设置的越低效率会更低，但是job分布会更均匀
      poolParallelJobs: 50,

      // name of the pool
      // can be used to create different pools with elsewise identical options
      // pool 的名字
      //
      name: 'my-pool'
    }
  }
  // your expensive loader (e.g babel-loader)
];
```

## 参考资料

- 书籍：`《Webpack 深入浅出》`
- [Webpack 优化——将你的构建效率提速翻倍](https://blog.csdn.net/QQ729533020/article/details/100589186)

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~

 <comment/>
