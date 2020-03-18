# HMR 的原理是什么

## 简介

`Hot Module Replacement`（以下简称 `HMR`）是 `webpack` 发展至今引入的最令人兴奋的特性之一 ，当你对代码进行修改并保存后，`webpack` 将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。

基本实现原理大致这样的，构建 `bundle` 的时候，加入一段 `HMR` `runtime` 的 `js` 和一段和服务沟通的 `js` 。文件修改会触发 `webpack` 重新构建，服务器通过向浏览器发送更新消息，浏览器通过 `jsonp` 拉取更新的模块文件，`jsonp` 回调触发模块热替换逻辑。

## 为什么需要 HMR

在 `webpack HMR` 功能之前，已经有很多 `live reload` 的工具或库，比如 `b`，这些库监控文件的变化，然后通知浏览器端刷新页面，那么我们为什么还需要 HMR 呢？答案其实在上文中已经提及一些。

- `live reload` 工具并不能够保存应用的状态（`states`），当刷新页面后，应用之前状态丢失，还是上文中的例子，点击按钮出现弹窗，当浏览器刷新后，弹窗也随即消失，要恢复到之前状态，还需再次点击按钮。而 `webapck HMR` 则不会刷新浏览器，而是运行时对模块进行热替换，保证了应用状态不会丢失，提升了开发效率。
- 在古老的开发流程中，我们可能需要手动运行命令对代码进行打包，并且打包后再手动刷新浏览器页面，而这一系列重复的工作都可以通过 `HMR` 工作流来自动化完成，让更多的精力投入到业务中，而不是把时间浪费在重复的工作上。
- HMR 兼容市面上大多前端框架或库，比如 `React Hot Loader`，`Vue-loader`，能够监听 `React` 或者 `Vue` 组件的变化，实时将最新的组件更新到浏览器端。`Elm Hot Loader` 支持通过 `webpack` 对 `Elm` 语言代码进行转译并打包，当然它也实现了 `HMR` 功能。

## HMR 的工作原理图解

初识 HMR 的时候觉得其很神奇，一直有一些疑问萦绕在脑海。

1. webpack 可以将不同的模块打包成 bundle 文件或者几个 chunk 文件，但是当我通过 webpack HMR 进行开发的过程中，我并没有在我的 dist 目录中找到 webpack 打包好的文件，它们去哪呢？
2. 通过查看 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的 package.json 文件，我们知道其依赖于 [webpack-dev-middleware](https://link.zhihu.com/?target=https%3A//github.com/webpack/webpack-dev-middleware) 库，那么 webpack-dev-middleware 在 HMR 过程中扮演什么角色？
3. 使用 HMR 的过程中，通过 Chrome 开发者工具我知道浏览器是通过 websocket 和 webpack-dev-server 进行通信的，但是 websocket 的 message 中并没有发现新模块代码。打包后的新模块又是通过什么方式发送到浏览器端的呢？为什么新的模块不通过 websocket 随消息一起发送到浏览器端呢？
4. 浏览器拿到最新的模块代码，HMR 又是怎么将老的模块替换成新的模块，在替换的过程中怎样处理模块之间的依赖关系？
5. 当模块的热替换过程中，如果替换模块失败，有什么回退机制吗？

带着上面的问题，于是决定深入到 webpack 源码，寻找 HMR 底层的奥秘。

![img](https://pic1.zhimg.com/80/v2-f7139f8763b996ebfa28486e160f6378_1440w.jpg)

图一：HMR 工作流程图解

上图是 webpack 配合 webpack-dev-server 进行应用开发的模块热更新流程图。

- 上图底部红色框内是服务端，而上面的橙色框是浏览器端。
- 绿色的方框是 webpack 代码控制的区域。蓝色方框是 webpack-dev-server 代码控制的区域，洋红色的方框是文件系统，文件修改后的变化就发生在这，而青色的方框是应用本身。

上图显示了我们修改代码到模块热更新完成的一个周期，通过深绿色的阿拉伯数字符号已经将 HMR 的整个过程标识了出来。

- 第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。
- 第二步，是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。
- 第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。
- 第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。
- webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。
- HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。这就是上图中 7、8、9 步骤。
- 而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。
- 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。

## 热更新配置

- 使用`webpack-dev-server`,配置 `hot` 属性为 `true`.

```js
const config = {
  hot: true
};
```

写模块时，按照以下写法:

```js
if (module.hot) {
  //判断是否有热加载
  module.hot.accept("./hmrTest.js", function() {
    //热加载的模块路径
    console.log("Accepting the updated printMe module!"); //热加载的回调，即发生了模块更新时，执行什么 callback
    printMe();
  });
}
```

就是有个缺点：更新逻辑得自己写。比如要使页面显示的内容生效，需要在回调中写入 `document.append(xxx)`

- **react 的热加载，使用 `react-hot-loader`**

```js
import { hot } from 'react-hot-loader';
  const Record = ()=>{
      ...
  }
  export default hot(module)(Record);
```

或者这样写：

```js
if (module.hot) {
  module.hot.accept("./App", function() {
    const NextApp = require("./App");
    ReactDOM.render(<NextApp />, rootEl);
  });
}
```

## 实现过程

1. `watch` 编译过程、`devServer` 推送更新消息到浏览器
2. 浏览器接收到服务端消息做出响应
3. 对模块进行热更新或刷新页面

### `watch` 编译过程、`devServer` 推送更新消息到浏览器

1.`webpack-dev-server` 里引用了 `webpack-dev-middleware`，相关的 `watch` 逻辑就是在里面实现的。

相关代码如下：

```js
 //webpack-dev-server/lib/Server.js
  setupDevMiddleware() {
      // middleware for serving webpack bundle
      this.middleware = webpackDevMiddleware(
          this.compiler,
          Object.assign({}, this.options, { logLevel: this.log.options.level })
      );
  }
  // webpack-dev-middleware/index.js
  if (!options.lazy) {
      context.watching = compiler.watch(options.watchOptions, (err) => {
      if (err) {
          context.log.error(err.stack || err);
          if (err.details) {
          context.log.error(err.details);
          }
      }
      });
  } else {
      context.state = true;
  }
```

以上代码可以看出，`webpack-dev-middleware` 是通过调用 `webpack` 的 `api` 对文件系统 `watch` 的。`watchOptions` 如果没有配置的话，会取默认值。值的含义见：

https://webpack.js.org/configuration/watch/

2. 当文件发生变化时，重新编译输出 `bundle.js`。`devServer` 下，是没有文件会输出到 `output.path` 目录下的，这时 `webpack` 是对文件系统进行 `watch` 然后输出到了**内存**中。`webpack` 中使用的操作**内存**的库是 `memory-fs`，它是 `NodeJS` 原生 `fs` 模块内存版(`in-memory`)的完整功能实现，会将你请求的`url`映射到对应的内存区域当中，因此读写都比较快。

```js
// webpack-dev-middleware/index.js
// start watching
if (!options.lazy) {
  context.watching = compiler.watch(options.watchOptions, err => {
    if (err) {
      context.log.error(err.stack || err);
      if (err.details) {
        context.log.error(err.details);
      }
    }
  });
}
```

你可能会疑问了，为什么 `webpack` 没有将文件直接打包到 `output.path` 目录下呢？文件又去了哪儿？原来 `webpack` 将 `bundle.js` 文件打包到了**内存**中，不生成文件的原因就在于访问**内存**中的代码比访问文件系统中的文件更快，而且也减少了代码写入文件的开销，这一切都归功于`memory-fs`，`memory-fs` 是 `webpack-dev-middleware` 的一个依赖库，`webpack-dev-middleware` 将 webpack 原本的 `outputFileSystem` 替换成了 `MemoryFileSystem` 实例，这样代码就将输出到**内存**中。`webpack-dev-middleware` 中该部分源码如下：

```js
  // webpack-dev-middleware/lib/fs.js
  const isMemoryFs =
  !isConfiguredFs &&
  !compiler.compilers &&
  compiler.outputFileSystem instanceof MemoryFileSystem;
  ...
  compiler.outputFileSystem = fs;
  fileSystem = fs;
  } else if (isMemoryFs) {
    fileSystem = compiler.outputFileSystem;
  } else {
    fileSystem = new MemoryFileSystem();

    // eslint-disable-next-line no-param-reassign
    compiler.outputFileSystem = fileSystem;
  }
```

3. `devServer` 通知浏览器端文件发生改变，在启动 `devServer` 的时候，`sockjs` 在服务端和浏览器端建立了一个 `webSocket` 长连接，以便将 `webpack` 编译和打包的各个阶段状态实时告知浏览器，最关键的步骤还是 `webpack-dev-server` 调用 `webpack api` 监听 `compile` 的 `done` 事件，当 `compile` 完成后，`webpack-dev-server`通过 `_sendStatus` 方法将编译打包后的新模块 `hash` 值发送到浏览器端。

```js
// webpack-dev-server/lib/Server.js
const addHooks = (compiler) => {
   ...
   done.tap('webpack-dev-server', (stats) => {
       this._sendStats(this.sockets, this.getStats(stats));
       this._stats = stats;
   });
};
...
_sendStats(sockets, stats, force) {
   ...
   this.sockWrite(sockets, 'hash', stats.hash);
   if (stats.errors.length > 0) {
       this.sockWrite(sockets, 'errors', stats.errors);
   } else if (stats.warnings.length > 0) {
       this.sockWrite(sockets, 'warnings', stats.warnings);
   } else {
       this.sockWrite(sockets, 'ok');
   }
}
```

### 浏览器接收到服务端消息做出响应

1. 这里的主要逻辑位于 `webpack-dev-server/client-src` 中，`webpack-dev-server` 修改了 `webpack` 配置中的 `entry` 属性，在里面添加了 `webpack-dev-client` 的代码，这样在最后的 `bundle.js` 文件中就会有接收 `websocket` 消息的代码了。

```js
  //webpack-dev-server/lib/utils/addEntries.js
  /** @type {string} */
  const clientEntry = `${require.resolve(
  '../../client/'
  )}?${domain}${sockHost}${sockPath}${sockPort}`;

  /** @type {(string[] | string)} */
  let hotEntry;

  if (options.hotOnly) {
      hotEntry = require.resolve('webpack/hot/only-dev-server');
  } else if (options.hot) {
      hotEntry = require.resolve('webpack/hot/dev-server');
  }
  ...
  [].concat(config).forEach((config) => {
  ...
  const additionalEntries = checkInject(
      options.injectClient,
      config,
      webTarget
  )
      ? [clientEntry]
      : [];

  if (hotEntry && checkInject(options.injectHot, config, true)) {
      additionalEntries.push(hotEntry);
  }

  config.entry = prependEntry(config.entry || './src', additionalEntries);

  if (options.hot || options.hotOnly) {
      config.plugins = config.plugins || [];
      if (
      !config.plugins.find(
          (plugin) => plugin.constructor.name === 'HotModuleReplacementPlugin'
      )
      ) {
          config.plugins.push(new webpack.HotModuleReplacementPlugin());
      }
  }
  });
```

2. 以上代码可以看出，如果选择了热加载，输出的 `bundle.js` 会包含接收 `websocket` 消息的代码。而且 `plugin` 也会注入一个 `HotModuleReplacementPlugin`，构建过程中热加载相关的逻辑都在这个插件中。这个插件主要处理两部分逻辑：

- 注入 `HMR runtime` 逻辑
- 找到修改的模块，生成一个补丁 `js` 文件和更新描述 `json` 文件

我们先来看一张图，看看 `websocket` 中的消息长什么样子的：

![img](https://raw.githubusercontent.com/LuckyWinty/blog/master/images/websocket.jpg)

这样可以看到，接收的消息只有 `type` 和 `hash` 两个内容。在 `client` 里面的逻辑，他们分别对应不同的处理逻辑：

```js
// webpack-dev-server/client-src/default/index.js
hash(hash) {
    status.currentHash = hash;
},
...
ok() {
  sendMessage('Ok');
  if (options.useWarningOverlay || options.useErrorOverlay) {
    overlay.clear();
  }
  if (options.initial) {
    return (options.initial = false);
  } // eslint-disable-line no-return-assign
  reloadApp(options, status);
}
```

3. 可以看出，当接收到 `type` 为 `hash` 消息后会将 `hash` 值暂存(`currentHash`)起来，当接收到 `type` 为 `ok` 的消息后对应用执行 `reload` 操作，而 `hash` 消息是在 `ok` 消息之前的。再看看 `reload` 里面的处理逻辑：

```js
 // webpack-dev-server/client-src/default/reloadApp.js
  if (hot) {
    ...
    const hotEmitter = require('webpack/hot/emitter');
        hotEmitter.emit('webpackHotUpdate', currentHash);
    if (typeof self !== 'undefined' && self.window) {
        self.postMessage(`webpackHotUpdate${currentHash}`, '*');
    }
  }
  else if (liveReload) {
    ...
  }
```

4. 可以看出，如果配置了模块热更新，就调用 `webpack/hot/emitter` 将最新 `hash` 值发送给 `webpack`，然后将控制权交给 `webpack` 客户端代码。如果没有配置模块热更新，就进行 `liveReload` 的逻辑。`webpack/hot/dev-server` 中会监听 `webpack-dev-server/client-src` 发送的 `webpackHotUpdate` 消息,然后调用 `webpack/lib/HotModuleReplacement.runtime` 中的 `check` 方法，检测是否有新的更新：

```js
// webpack/hot/dev-server.js
var hotEmitter = require("./emitter");
  hotEmitter.on("webpackHotUpdate", function(currentHash) {
      lastHash = currentHash;
      if (!upToDate() && module.hot.status() === "idle") {
          log("info", "[HMR] Checking for updates on the server...");
          check();
      }
  });

  // webpack/lib/HotModuleReplacement.runtime
  function hotCheck(apply) {
  ...
      return hotDownloadManifest(hotRequestTimeout).then(function(update) {
          ...
              hotEnsureUpdateChunk(chunkId);
          ...
          return promise;
      });
  }
  function hotEnsureUpdateChunk(chunkId) {
      if (!hotAvailableFilesMap[chunkId]) {
          hotWaitingFilesMap[chunkId] = true;
      } else {
          hotRequestedFilesMap[chunkId] = true;
          hotWaitingFiles++;
          hotDownloadUpdateChunk(chunkId);
      }
  }
```

5. 以上代码可以看出，在 `check` 过程中，主要调用了两个方法 `hotDownloadManifest` 和 `hotDownloadUpdateChunk`。`hotDownloadManifest` 是通过 `Ajax` 向服务器请求十分有更新的文件，如果有就返回对应的文件信息，`hotDownloadUpdateChunk` 是通过 `Jsonp` 的方式，请求最新的代码模块。如下图所示:

![img](https://raw.githubusercontent.com/LuckyWinty/blog/master/images/manifest.png)

![img](https://raw.githubusercontent.com/LuckyWinty/blog/master/images/module.png)

这边补充下，这两个文件的名称是可以**配置**的，如果没有配置，则取定义在 `WebpackOptionsDefaulter` 中的默认配置。

```js
this.set("output.hotUpdateChunkFilename", "[id].[hash].hot-update.js");
this.set("output.hotUpdateMainFilename", "[hash].hot-update.json");
```

### 对模块进行热更新或刷新页面

综上，我们获得了更新的内容。接下来就可以进行更新了。这部分的逻辑在 `webpack/lib/HotModuleReplacement.runtime` 中。

1. 首先，更新过的模块，现在都属于 `outdated` 过期 的模块，所以先找出过期的模块及其依赖

```js
//webpack/lib/HotModuleReplacement.runtime

function getAffectedStuff(updateModuleId) {
  var outdatedModules = [updateModuleId];
  var outdatedDependencies = {};
  ...
  return {
      type: "accepted",
      moduleId: updateModuleId,
      outdatedModules: outdatedModules,
      outdatedDependencies: outdatedDependencies
  };
}
```

2. 根据调用的 `Api` 信息，对结果进行**标注及处理**。

```js
switch (result.type) {
   case "self-declined":
       ...
       break;
   case "declined":
       ...
       break;
   case "unaccepted":
       ...
       break;
   case "accepted":
       if (options.onAccepted) options.onAccepted(result);
       doApply = true;
       break;
   case "disposed":
       if (options.onDisposed) options.onDisposed(result);
       doDispose = true;
       break;
   default:
       throw new Error("Unexception type " + result.type);
}
```

3. 从缓存中删除过期的模块和依赖

```js
 // remove module from cache
 delete installedModules[moduleId];

 // when disposing there is no need to call dispose handler
 delete outdatedDependencies[moduleId];

 // remove "parents" references from all children
 for (j = 0; j < module.children.length; j++) {
     ...
 }
 // remove outdated dependency from module children
 var dependency;
 var moduleOutdatedDependencies;
 for (moduleId in outdatedDependencies) {
 	...
 }
```

4. 将新的模块添加到 `modules` 中，当下次调用 `webpack_require` (这方法是 `webpack` 重写的 `require` 方法)方法的时候，就是获取到了新的模块代码了。

```js
// insert new code
for (moduleId in appliedUpdate) {
  if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
    modules[moduleId] = appliedUpdate[moduleId];
  }
}
```

5. 接下来错误的兼容了，如果在热更新过程中出现错误，热更新将回退到**刷新浏览器**，这部分代码在 `dev-server` 代码中，简要代码如下：

```js
module.hot
  .check(true)
  .then(function(updatedModules) {
    if (!updatedModules) {
      return window.location.reload();
    }
    // ...
  })
  .catch(function(err) {
    var status = module.hot.status();
    if (["abort", "fail"].indexOf(status) >= 0) {
      window.location.reload();
    }
  });
```

`dev-server` 先验证是否有更新，没有代码更新的话，**重载**浏览器。如果在 `hotApply` 的过程中出现 `abort` 或者 `fail` 错误，也进行**重载**浏览器。

6. 最后，业务代码需要做些什么？

当用新的模块代码替换老的模块后，但是我们的业务代码并不能知道代码已经发生变化，也就是说，当 `hello.js` 文件修改后，我们需要在 `index.js` 文件中调用 `HMR` 的 `accept` 方法，添加模块更新后的处理函数，及时将 `hello` 方法的返回值插入到页面中。代码如下：

```js
// index.js
if (module.hot) {
  module.hot.accept("./hello.js", function() {
    div.innerHTML = hello();
  });
}
```

这样就是整个 HMR 的工作流程了。

## 参考资料

- [https://zhuanlan.zhihu.com/p/30669007](https://zhuanlan.zhihu.com/p/30669007)

## 最后

这里只是对 HMR 大概的流程做一个梳理，因为源整个源码过于庞大，这边摘取了主要部分贴出来便于理解，如果想了解更多的底层细节，建议还是得多去阅读下源码。

 
 <comment/> 
 