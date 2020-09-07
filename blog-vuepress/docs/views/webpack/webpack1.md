# 一大波 Webpack 面试题来啦~

## 0.有哪些常见的 Loader？你用过哪些 Loader？

- [`raw-loader`](https://webpack.js.org/loaders/raw-loader/#root): 加载文件原始内容（utf-8）

- [`file-loader`](https://webpack.js.org/loaders/file-loader/#root): 原封不动的把文件输出到一个文件夹中，在代码中通过相对 `URL` 去引用输出的文件 (处理图片和字体)

- [`url-loader`](https://webpack.js.org/loaders/url-loader/#root): 与 [`file-loader`](https://webpack.js.org/loaders/file-loader/#root) 类似，区别是用户可以设置一个**阈值(`limit`)**，大于这个**阈值(`limit`)**会交给 `file-loader`直接复制处理，小于**阈值(`limit`)**时返回文件的 `base64` 形式编码 (处理图片和字体)

- [`source-map-loader`](https://webpack.js.org/loaders/source-map-loader/#root): 加载额外的 `Source Map` 文件，以方便**断点调试**

- [`svg-inline-loader`](https://webpack.js.org/loaders/svg-inline-loader/#root): 将压缩后的 `SVG` 内容注入代码中

- [`image-loader`](https://www.npmjs.com/package/image-webpack-loader): 加载并且压缩图片文件

- [`json-loader`](https://webpack.js.org/loaders/json-loader/#root): 加载 `JSON` 文件（默认包含）

- [`handlebars-loader`](https://www.npmjs.com/package/handlebars-loader): 将 `Handlebars` 模版编译成函数并返回

- [`babel-loader`](https://webpack.js.org/loaders/babel-loader/#root): 把 `ES6` 转换成 `ES5`

- [`ts-loader`](https://www.npmjs.com/package/ts-loader): 将 `TypeScript` 转换成 `JavaScript`

- [`awesome-typescript-loader`](https://www.npmjs.com/package/awesome-typescript-loader): 将 `TypeScript` 转换成 `JavaScript`，性能优于 `ts-loader`

- [`sass-loader`](https://webpack.js.org/loaders/sass-loader/#root)：将 `SCSS/SASS` 代码转换成 `CSS`

- [`css-loader`](https://www.webpackjs.com/loaders/css-loader/): 可以处理 `import .css`的文件.并将`css`代码写入 `bundle.js` 文件中，支持**模块化、压缩、文件导入**等特性(还需要借助 style-loader 的功能将样式插入到 `html.head.style` 标签中去)

- [`style-loader`](https://www.webpackjs.com/loaders/style-loader/): 将 `css-loader` 获取到的代码 转交给 `style-loader`.让 `style-loader` 将 `css` 插入到页面的 `html.head.style` 标签中去

- [`postcss-loader`](https://www.webpackjs.com/loaders/postcss-loader/)：实际上是一套强大的**插件体系**，扩展 `CSS` 语法，使用下一代 `CSS`，可以配合 `autoprefixer` 插件自动补齐 `CSS3` 前缀

- [`eslint-loader`](https://webpack.js.org/loaders/eslint-loader/#root)：通过 [`ESLint`](https://eslint.org/) 检查 `JavaScript` 代码

- [`tslint-loader`](https://www.npmjs.com/package/tslint-loader)：通过 `TSLint` 检查 `TypeScript` 代码, 用的不多，主要用 `eslint-loader`

- [`mocha-loader`](https://webpack.js.org/loaders/mocha-loader/#root): 加载 [`Mocha`](https://mochajs.org/) 测试（浏览器/NodeJS）用例的代码

- [`coverjs-loader`](https://webpack.js.org/loaders/coverjs-loader/#root): 使用 [`CoverJS`](https://github.com/arian/CoverJS) 来计算测试的覆盖率

- [`vue-loader`](https://vue-loader.vuejs.org/): 解析和转换 `.vue` 单文件组件，提取出其中的逻辑代码 `script`、样式代码 `style`、以及 `HTML` 模版 `template`，再分别把它们交给对应的 `Loader` 去处理

- [`i18n-loader`](https://webpack.js.org/loaders/i18n-loader/#root): 国际化

- [`cache-loader`](https://webpack.js.org/loaders/cache-loader/#root): 可以在一些性能开销较大的 `Loader` 之前添加，目的是将结果缓存到磁盘里

更多 Loader 请移步[官网](https://webpack.docschina.org/loaders/)

## 1.有哪些常见的 Plugin？你用过哪些 Plugin？

- [`define-plugin`](https://webpack.js.org/plugins/define-plugin/)：定义全局环境变量 (`Webpack4` 之后指定 `mode` 会自动配置)
- [`ignore-plugin`](https://webpack.js.org/plugins/ignore-plugin/)：在打包时忽略本地化内容
- [`ProvidePlugin`](https://www.webpackjs.com/plugins/provide-plugin/): 这是 `webpack` 内置的插件，可以自动加载模块，而不必到处 `import` 或 `require` 。
- [`uglifyjs-webpack-plugin`](https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin/): 用来缩小（压缩优化）`js`文件，至少需要`Node v6.9.0`和`Webpack v4.0.0`版本。
- [`html-webpack-plugin`](https://webpack.js.org/plugins/html-webpack-plugin/)：简化 `HTML` 文件创建 (依赖于 `html-loader`)
  - 为 `html` 文件中引入的外部资源如 `script、link` 动态添加每次 `compile` 后的 `hash`，防止引用缓存的外部文件问题
  - 可以生成创建 `html` 入口文件，比如单页面可以生成一个 `html` 文件入口，配置 `N` 个 `html-webpack-plugin` 可以生成 `N` 个页面入口
- [`copy-webpack-plugin`](https://www.webpackjs.com/plugins/copy-webpack-plugin/): 在 `webpack` 中拷贝文件和文件夹
- [`web-webpack-plugin`](https://www.npmjs.com/package/web-webpack-plugin): 可方便地为单页应用输出 `HTML`，比 `html-webpack-plugin` 好用
- [`clean-webpack-plugin`](https://www.npmjs.com/package/clean-webpack-plugin): 在每次生成`dist`目录前，先删除本地的`dist`文件（不然每次手动删除太麻烦）
- [`DllPlugin`](https://www.webpackjs.com/plugins/dll-plugin/): 这是 `webpack` 内置的插件，为了极大减少构建时间，进行分离打包不常更新的依赖包，比如 `react`, `react-dom` 就可以打包一次，后面只要不更新依赖，就直接用打包好的 `dll` 文件，不必重复打包
- [`ModuleConcatenationPlugin`](https://www.webpackjs.com/plugins/module-concatenation-plugin/): 这是 `webpack` 内置的插件，开启 `Scope Hoisting`(作用域提升)
- [`HotModuleReplacementPlugin`](https://www.webpackjs.com/plugins/hot-module-replacement-plugin/): 这是 `webpack` 内置的插件，模块热替换，也被称为 `HMR`
- [`speed-measure-webpack-plugin`](https://www.npmjs.com/package/speed-measure-webpack-plugin): 费时分析，可以看到每个 `Loader` 和 `Plugin` 执行耗时 (整个打包耗时、每个 `Plugin` 和 `Loader` 耗时)
- [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer): 可视化 `Webpack` 输出的所有文件的体积 (`业务组件、依赖第三方模块`)

更多 `Plugin` 请移步[官网](https://webpack.js.org/plugins/)
更多第三方插件，请查看 [awesome-webpack](更多第三方插件，请查看 awesome-webpack 列表。) 列表。

## 2.说一说 Loader 和 Plugin 的区别？

`Loader` 本质就是一个函数，在该函数中对接收到的**文件内容**进行**转换**，返回**转换后的结果**。
因为 `Webpack` 只认识 `JavaScript`，所以 `Loader` 就成了**翻译官**，对其他类型的资源进行**转译的预处理工作**。

`Plugin` 就是插件，基于事件流框架 `Tapable`，插件可以扩展 `Webpack` 的功能，在 `Webpack` 运行的**生命周期**中会**广播出许多事件**，`Plugin` 可以监听这些事件，在**合适的时机**通过 `Webpack` 提供的 `API` **改变输出结果**。

`Loader` 在 `module.rules` 中配置，作为模块的解析规则，类型为**数组**。每一项都是一个 `Object`，内部包含了 `test`(类型文件)、`loader`、`options` (参数)等属性。

`Plugin` 在 `plugins` 中单独配置，类型为**数组**，每一项是一个 `Plugin` 的**实例**，参数都通过构造函数传入。

## 3.Webpack 构建流程简单说一下

`Webpack` 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

- `初始化参数`：从配置文件和 `Shell` 语句中读取与合并参数，得出最终的参数

- `开始编译`：用上一步得到的参数初始化 `Compiler` 对象，加载所有配置的插件，执行对象的 `run` 方法开始执行编译

- `确定入口`：根据配置中的 `entry` 找出所有的入口文件

- `编译模块`：从入口文件出发，调用所有配置的 `Loader` 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理

- `完成模块编译`：在经过第 4 步使用 `Loader` 翻译完所有模块后，得到了每个模块被**编译**后的最终内容以及它们之间的**依赖关系**

- `输出资源`：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会

- `输出完成`：在确定好**输出内容**后，根据配置确定输出的路径和文件名，把文件内容写入到**文件系统**

在以上过程中，`Webpack` 会在**特定**的时间点**广播**出**特定**的事件，插件在监听到**特定**的事件后会执行**特定**的逻辑，并且插件可以调用 `Webpack` 提供的 `API` **改变** `Webpack` 的运行结果。

简单说

- **初始化**：启动构建，读取与合并配置参数，加载 `Plugin`，实例化 `Compiler`

- **编译**：从 `Entry` 出发，针对每个 `Module` **串行**调用对应的 `Loader` 去翻译文件的内容，再找到该 `Module` 依赖的 `Module`，递归地进行编译处理

- **输出**：将编译后的 `Module` 组合成 `Chunk`，将 `Chunk` 转换成文件，输出到**文件系统**中

对源码感兴趣的可以看看这篇文章 [从源码窥探 Webpack4.x 原理](https://juejin.im/post/5e1b2f77e51d454d5177a69d)

## 4.使用 webpack 开发时，用过哪些可以提高效率的插件？

- [`webpack-dashboard`](https://www.npmjs.com/package/webpack-dashboard)：为 webpack 在命令行上构建了一个一目了然的仪表盘(`dashboard`)，其中包括**构建过程**和**状态**、**日志**以及涉及的**模块列表**

- [`webpack-merge`](https://www.npmjs.com/package/webpack-merge)：可以用来提取**公共配置**(`webpack.base.config.js`)，减少重复配置代码

- [`speed-measure-webpack-plugin`](https://www.npmjs.com/package/speed-measure-webpack-plugin)：简称 `SMP`(**费时分析**)，分析出 `Webpack` 打包过程中 `Loader` 和 `Plugin` 的耗时，有助于找到**构建过程**中的性能瓶颈。

- [`size-plugin`](https://www.npmjs.com/package/size-plugin)：监控资源体积变化，尽早发现问题

- [`HotModuleReplacementPlugin`](https://www.webpackjs.com/plugins/hot-module-replacement-plugin/)：**模块热替换**插件，能够实现修改、添加或删除前端页面中的模块代码，而且是在页面不刷新的前提下

- [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer): `webpack` **打包模块分析工具**

## 5.source map 是什么？生产环境怎么用？

`source map` 是将编译、打包、压缩后的代码**映射回源代码**的过程。打包压缩后的代码不具备良好的可读性，想要**调试源码**就需要 soucre map。

map 文件**只要不打开开发者工具，浏览器是不会加载的**

线上环境一般有三种处理方案：

- `hidden-source-map`：借助第三方错误监控平台 `Sentry` 使用
- `nosources-source-map`：只会显示**具体行数**以及查看**源代码的错误栈**。安全性比 `sourcemap` 高
- `sourcemap`：通过 `nginx` 设置将 `.map` 文件只对**白名单开放**(**公司内网**)

注意：避免在生产中使用 `inline-` 和 `eval-`，因为它们会增加 `bundle` 体积大小，并降低整体性能。

## 6.模块打包原理？

`Webpack` 实际上为每个模块创造了一个**可以导出和导入的环境**，本质上并没有修改代码的执行逻辑，**代码执行顺序**与**模块加载顺序**也完全一致。

## 7.文件监听原理？

在发现**代码发生变化**时，**自动重新构建**出新的输出文件。

`Webpack`开启监听模式，有两种方式：

- 启动 `webpack` 命令时，在命令行后面带上 `--watch` 参数
- 在配置 `webpack.config.js` 中设置 `watch:true`

缺点：每次需要手动刷新浏览器

原理：**轮询判断文件的最后编辑时间是否变化**，如果某个文件发生了变化，并不会立刻告诉监听者，而是**先缓存**起来，等 `aggregateTimeout` 后再执行。

具体的配置如下：

```js
module.export = {
  // 默认false,也就是不开启
  watch: true,
  // 只有开启监听模式时，watchOptions才有意义
  watchOptions: {
    // 默认为空，不监听的文件或者文件夹，支持正则匹配
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
    poll: 1000
  }
};
```

## 8.说一说 `Webpack` 的热更新原理？

**重要，前方高能！！！**

`Webpack` 的热更新又称**热模块替换**（`Hot Module Replacement`），缩写为 `HMR`。 这个机制可以做到**不用刷新浏览器而将新变更的模块替换掉旧的模块**。

`HMR`的核心就是**客户端从服务端拉取更新后的文件**，准确的说是 `chunk diff` (`chunk` 需要更新的部分)，实际上 `WDS`(`webpack-dev-server`) 与浏览器之间维护了一个 `Websocket`，当本地资源发生变化时，`WDS` 会**向浏览器推送更新**，并带上构建时的 `hash`，让客户端与上一次资源进行**对比**。客户端**对比出差异**后会向 `WDS` 发起 `Ajax` 请求来获取更改内容(**文件列表、hash**)，这样客户端就可以再借助这些信息继续向 `WDS` 发起 `jsonp` 请求获取**该 chunk 的增量更新**。

后续的部分(拿到**增量更新**之后如何处理？哪些状态该保留？哪些又需要更新？)由 [`HotModuleReplacementPlugin`](https://www.webpackjs.com/plugins/hot-module-replacement-plugin/) 来完成，提供了相关 `API` 以供开发者针对自身场景进行处理，像 `react-hot-loader` 和 `vue-loader` 都是借助这个 `API` 实现 `HMR`

更多细节的可以参考下这篇文章 → [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)

## 9.如何对 bundle 体积进行监控和分析？

`VSCode` 中有一个插件 `Import Cost` 可以帮助我们对引入模块的大小进行实时监测，还可以使用 [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer) 生成 `bundle` 的模块组成图表形式，显示所占用的体积大小。

[`bundlesize`](https://developer.aliyun.com/mirror/npm/package/webpack-bundle-size-analyzer) 工具包可以进行自动化资源体积监控。

## 10.文件指纹是什么？怎么用？

文件指纹是打包后输出的文件名的后缀。

- `Hash`：和**整个项目**的构建相关，只要项目文件有修改，**整个项目**构建的 `hash` 值就会更改
- `Chunkhash`：和 `Webpack` 打包的 `chunk`(代码块) 有关，不同的 `entry` 会生出不同的 `chunkhash`
- `Contenthash`：根据**文件内容**为指标来定义 `hash`，**文件内容**不变，则 `contenthash` 不变

### JS 的文件指纹设置

设置 `output` 的 `filename`，用 `chunkhash`。

具体的配置代码如下：

```js
module.exports = {
  entry: { app: './scr/app.js', search: './src/search.js' },
  output: { filename: '[name][chunkhash:8].js', path: __dirname + '/dist' }
};
```

### CSS 的文件指纹设置

设置 `MiniCssExtractPlugin` 的 `filename`，使用 `contenthash`。

具体的配置代码如下：

```js
module.exports = {
  entry: { app: './scr/app.js', search: './src/search.js' },
  // chunkhash:8 的意思是根据chunk来生成长度为8的hash值
  output: { filename: '[name][chunkhash:8].js', path: __dirname + '/dist' },
  // contenthash:8 的意思是根据文件内容来生成长度为8的hash值
  plugins: [new MiniCssExtractPlugin({ filename: `[name][contenthash:8].css` })]
};
```

### 图片的文件指纹设置

设置`file-loader`的`name`，使用`hash`。
占位符名称及含义

- `ext` 资源后缀名
- `name` 文件名称
- `path` 文件的相对路径
- `folder` 文件所在的文件夹
- `contenthash` 文件的内容 `hash`，默认是 `md5` 生成
- `hash` 文件内容的 `hash`，默认是 `md5` 生成
- `emoji` 一个随机的指代文件内容的 `emoj`

具体的配置代码如下：

```js
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: path.resolve(__dirname, 'dist') },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: 'file-loader', options: { name: 'img/[name][hash:8].[ext]' } }]
      }
    ]
  }
};
```

## 11.在实际工程中，配置文件上百行乃是常事，如何保证各个 loader 按照预想方式工作？

可以使用 `enforce` 强制执行 `loader` 的作用顺序，`pre` 代表在所有正常 `loader` **之前**执行，`post` 是所有 `loader` **之后**执行。(`inline` 官方不推荐使用)

## 12.如何优化 Webpack 的构建速度？

> 其实这个问题就像能不能说一说「从 URL 输入到页面显示发生了什么」一样，实际上当然是越详细越好咯~

- 使用`高版本`的 `Webpack` 和 `Node.js`

- **多进程/多实例构建**：[`HappyPack`](https://github.com/amireh/happypack)(不维护了)、[`thread-loader`](https://www.webpackjs.com/loaders/thread-loader/)

- 压缩代码

  - 多进程并行压缩

    - `webpack-paralle-uglify-plugin`
    - `uglifyjs-webpack-plugin` 开启 `parallel` 参数 (不支持 ES6)
    - `terser-webpack-plugin` 开启 `parallel` 参数

  - 通过 `mini-css-extract-plugin` 提取 `Chunk` 中的 `CSS` 代码到单独文件，通过 `css-loader` 的 `minimize` 选项开启 `cssnano` 压缩 `CSS`。

- 图片压缩

  - 使用基于 `Node` 库的 `imagemin` (很多定制选项、可以处理多种图片格式)
  - 配置 `image-webpack-loader`

- 缩小打包作用域：

  - `exclude/include` (确定 `loader` 规则范围)
  - `resolve.modules` 指明第三方模块的绝对路径 (减少不必要的查找)
  - `resolve.mainFields` 只采用 `main` 字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)
  - `resolve.extensions` 尽可能减少后缀尝试的可能性
  - `noParse` 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 `bundle` 中，注意被忽略掉的文件里不应该包含 `import、require、define` 等模块化语句)
  - `IgnorePlugin` (完全排除模块)
  - 合理使用 `alias`(路径别名,可以让后续引用的地方减少路径的复杂度。)

- `提取页面公共资源`：

  - 基础包分离：

    - 使用 `html-webpack-externals-plugin`，将基础包通过 `CDN` 引入，不打入 `bundle` 中
    - 使用 `SplitChunksPlugin` 进行(公共脚本、基础包、页面公共文件)分离(`Webpack4` 内置) ，替代了 CommonsChunkPlugin 插件

- `DLL`：

  - 使用 `DllPlugin` 进行分包，使用 `DllReferencePlugin`(索引链接) 对 `manifest.json` 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
  - `HashedModuleIdsPlugin` 可以解决模块数字 `id` 问题

- `充分利用缓存提升二次构建速度`：

  - `babel-loader`
  - 开启缓存 `terser-webpack-plugin`
  - 开启缓存使用 `cache-loader` 或者 `hard-source-webpack-plugin`

- `Tree shaking`

  - 打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 `bundle` 中去掉(**只能对 `ES6 Modlue` 生效**) 开发中尽可能使用 `ES6 Module` 的模块，提高 `tree shaking`
  - 效率禁用 `babel-loader` 的模块依赖解析，否则 `Webpack` 接收到的就都是转换过的 `CommonJS` 形式的模块，无法进行 `tree-shaking`
  - 使用 `PurifyCSS`(不在维护) 或者 `uncss` 去除无用 `CSS` 代码
    - `purgecss-webpack-plugin` 和 `mini-css-extract-plugin` 配合使用(建议)

- `Scope hoisting`

  - 构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。`Scope hoisting` 将所有模块的代码按照引用顺序放在一个**函数作用域**里，然后适当的**重命名**一些变量以防止变量名冲突
  - 必须是 `ES6` 的语法，因为有很多第三方库仍采用 `CommonJS` 语法，为了充分发挥 `Scope hoisting` 的作用，需要配置 `mainFields` 对**第三方模块优先采用** `jsnext:main` 中指向的 `ES6` 模块化语法

- 动态 `Polyfill`

  - 建议采用 `polyfill-service` 只给用户返回需要的 `polyfill`，社区维护。 (部分国内奇葩浏览器 `UA` 可能无法识别，但可以降级返回所需全部 `polyfill`)

更多优化可以参考[官网-构建性能](https://www.webpackjs.com/guides/build-performance/)

## 13.代码分割的本质是什么？有什么意义呢？

代码分割是指，将脚本中**无需立即调用**的代码**在代码构建时转变为异步加载的过程**。

在 `Webpack` 构建时，会避免加载已声明要异步加载的代码，异步代码会被**单独分离**出一个文件，**当代码实际调用时被加载至页面**。

代码分割的本质其实就是在**源代码全部直接上线**和**打包成唯一脚本 `main.bundle.js`** 这两种极端方案之间的一种更适合实际场景的中间状态。

代码分割技术的核心是**异步加载资源**，可喜的是，浏览器允许我们这么做，W3C stage 3 规范：`whatwg/loader` 对其进行了定义：你可以通过 `import()` 关键字让浏览器在程序执行时异步加载相关资源。

**「用可接受的服务器性能压力增加来换取更好的用户体验」**。

**源代码全部直接上线**：虽然过程可控，但是 http 请求多，性能开销大。

**打包成唯一脚本**：一把梭完自己爽，服务器压力小，但是页面空白期长，用户体验不好

可以参考下这篇文章 → [项目不知道如何做性能优化？不妨试一下代码分割](https://blog.csdn.net/liuyan19891230/article/details/105384037)

## 14.是否写过`Loader`？简单描述一下编写`Loader`的思路？

`Loader` 支持链式调用，所以开发上需要严格遵循**单一职责**，每个 `Loader` 只负责自己需要负责的事情。

[`Loader`的 `API`](https://www.webpackjs.com/api/loaders/) 可以去官网查阅

- `Loader` 是运行在 `Node.js` 中，我们可以调用任意 `Node.js` 自带的 API 或者安装第三方模块进行调用
- `Webpack` 传给 `Loader` 的原内容都是 `UTF-8` 格式编码的字符串，当某些场景下 `Loader` 处理二进制文件时，需要通过 `exports.raw = true` 告诉 `Webpack` 该 `Loader` 是否需要二进制数据
- 尽可能的**异步化 `Loader`**，如果计算量很小，同步也可以
- `Loader` 是无状态的，我们不应该在 `Loader` 中保留状态
- 使用 `loader-utils` 和 `schema-utils` 为我们提供的实用工具
- 加载**本地 `Loader`** 方法
  - `Npm link`
  - `ResolveLoader`

## 15.是否写过 Plugin？简单描述一下编写 Plugin 的思路？

`webpack`在运行的生命周期中会**广播**出许多事件，`Plugin` 可以**监听**这些事件，在特定的阶段**植入**想要添加的**自定义功能**。`Webpack` 的 `Tapable` **事件流**机制保证了**插件的有序性**，使得整个系统**扩展性良好**。

[Plugin 的 API](https://www.webpackjs.com/api/plugins/) 可以去官网查阅

- `compiler`(**全局只有一个**) 暴露了和 `Webpack` 整个生命周期相关的钩子
- `compilation`(每次**编译过程生成的实例**) 暴露了与模块和依赖有关的粒度更小的**事件钩子**
- 插件需要在其原型上绑定`apply`方法，才能访问 `compiler` 实例
- 传给每个插件的 `compiler` 和 `compilation` 对象都是**同一个引用**，若在一个插件中修改了它们身上的属性，会影响后面的插件
- 找出合适的事件点去完成想要的功能

  - `emit` 事件发生时，可以读取到**最终输出的资源、代码块、模块及其依赖**，并进行**修改**(`emit` 事件是修改 `Webpack` 输出资源的最后时机)
  - `watch-run` 当**依赖的文件发生变化时会触发**

- 异步的事件需要在插件处理完任务时**调用回调函数**通知 `Webpack` 进入下一个流程，不然会卡住

## 16.聊一聊 Babel 原理吧

大多数`JavaScript Parser`遵循 `estree` 规范，`Babel` 最初基于 `acorn` 项目(轻量级现代 `JavaScript` 解析器) `Babel`大概分为三大部分：

- 解析：将代码转换成 `AST`

  - **词法分析**：将代码(字符串)分割为`token`(令牌，不是验证功能的 token)流，即语法单元成的数组
  - **语法分析**：分析`token`流(上面生成的数组), 并生成 `AST`

- 转换：访问 `AST` 的节点进行**变换操作**生产**新的 `AST`**

  - `Taro` 就是利用 `babel` 完成的**小程序语法转换**

- 生成：以**新的 `AST`** 为**基础**生成代码

如果想了解如何一步一步实现一个**编译器**的同学可以移步 Babel 官网曾经推荐的开源项目

[the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)

## 参考资料

- [《深入浅出 Webpack》](https://pan.baidu.com/s/1EC3YPrESo2WuCvC9hO9rLg) 提取码: `nrkn`
- [Webpack 实战](https://www.sohu.com/a/317977807_797635)
- [玩转 Webpack](https://time.geekbang.org/course/intro/100028901)
- [爪哇教育-Webpack 原理与实战-腾讯 T10 止水老师](https://www.bilibili.com/video/BV15f4y1S7dH/)

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)~
