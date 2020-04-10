# 说说 js 的模块化

## 什么是 js 的模块化

> 规范 JavaScript 的模块定义和加载机制,降低了学习和使用各种框架的门槛，能够以一种统一的方式去定义和使用模块，提高开发效率，降低了应用维护成本。模块化解决的问题

- 命名冲突
- 文件依赖

## 1. commonJS

- 1、模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。

- 2、模块加载会阻塞接下来代码的执行，需要等到模块加载完成才能继续执行——同步加载。

`适用场景`：服务器环境，`nodejs`的模块化规范是参照`commonJS`实现的。

`用法`：

- 1、导入：require('路径')
- 2、导出：`module.exports`和`exports`

示例代码如下:

```js
// a.js
// 相当于这里还有一行：const exports = module.exports;代码
exports.a = 'Hello world'; // 相当于：module.exports.a = 'Hello world';

// b.js
const moduleA = require('./a.js');
console.log(moduleA.a); // 打印出hello world
```

注意：`module.exports`和 exports 的区别是 exports 只是对`module.exports`的一个引用，相当于 Node 为每个模块提供一个 exports 变量，指向`module.exports`。这等同在每个模块头部，有一行 const exports = `module.exports`;这样的命令。
`exports`是 `commonjs` 规范; `module.exports`是`commonjs2`规范,用的比`exports`多点。

## AMD

1、异步加载
2、管理模块之间的依赖性，便于代码的编写和维护。

3、适用场景：

浏览器环境，`requireJS`是参照`AMD规范`实现的

4、用法：
(1) 导入：

```js
require(['模块名称'], function ('模块变量引用'){// 代码});
```

(2) 导出：

```js
define(function (){return '值');
```

(3) 示例代码如下：

```js
// a.js
define(function() {
  return {
    a: 'hello world'
  };
});
// b.js
require(['./a.js'], function(moduleA) {
  console.log(moduleA.a); // 打印出：hello world
});
```

## CMD

1、CMD 是在 AMD 基础上改进的一种规范，和 AMD 不同在于对依赖模块的执行时机处理不同，CMD 是就近依赖，而 AMD 是前置依赖。

适用场景：浏览器环境，seajs 是参照 UMD 规范实现的，requireJS 的最新的几个版本也是部分参照了 UMD 规范的实现。

2、用法：

(1) 导入：

```js
define(function(require, exports, module) {});
```

(2) 导出：

```js
define(function (){return '值');
```

(3) 示例代码如下：

```js
// a.js
define(function(require, exports, module) {
  exports.a = 'hello world';
});
// b.js
define(function(require, exports, module) {
  const moduleA = require('./a.js');
  console.log(moduleA.a); // 打印出：hello world
});
```

## AMD 与 CMD 区别

最明显的区别就是在模块定义时对依赖的处理不同

1. AMD 推崇**依赖前置**，在定义模块的时候就要声明其依赖的模块(**预先声明**)
2. CMD 推崇**依赖就近**，只有在用到某个模块的时候再去 require 执行(**用到才执行**)

`AMD`和`CMD`最大的区别是对依赖模块的**执行时机**处理不同

很多人说`requireJS`是异步加载模块，`SeaJS`是同步加载模块，这么理解实际上是不准确的，其实**加载模块都是异步**的，只不过**AMD 依赖前置**，js 可以方便知道依赖模块是谁，立即加载，而 CMD 就近依赖，需要使用时把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病 CMD 的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略

为什么我们说两个的区别是依赖模块执行时机不同，为什么很多人认为 ADM 是异步的，CMD 是同步的（除了名字的原因。。。）

同样都是异步加载模块，**AMD 在加载模块完成后就会执行该模块**，所有模块都加载执行完后会进入 require 的回调函数，执行主逻辑，这样的效果就是**依赖模块的执行顺序和书写顺序不一定一致**，看网络速度，哪个先下载下来，哪个先执行，但是主逻辑一定在所有依赖加载完成后才执行，这个有点类似于`script`的`async`属性

`CMD`加载完某个依赖模块后并不执行，只是下载而已，在所有依赖模块加载完成后进入主逻辑，遇到 require 语句的时候才执行对应的模块，这样**模块的执行顺序和书写顺序是完全一致的**，这个有点类似于`script`的`defer`属性

这也是很多人`说AMD`用户体验好，因为没有延迟，依赖模块提前执行了，`CMD`性能好，因为只有用户需要的时候才执行的原因

## UMD

1、兼容 AMD 和 commonJS 规范的同时，还兼容全局引用的方式。

2、适用场景：

**浏览器**或**服务器环境**

3、用法：

无导入导出规范，只有如下的一个常规写法：

```js
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    //AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    //Node, CommonJS之类的
    module.exports = factory(require('jquery'));
  } else {
    //浏览器全局变量(root 即 window)
    root.returnExports = factory(root.jQuery);
  }
})(this, function($) {
  //方法
  function myFunc() {}
  //暴露公共方法
  return myFunc;
});
```

## ES6 module

1、按需加载（编译时加载）
2、import 和 export 命令只能在模块的顶层，不能在代码块之中（如：if 语句中）,import()语句可以在代码块中实现异步动态按需动态加载

3、适用场景：

**浏览器**或**服务器环境**（以后可能支持）

4、用法：

(1) 导入：

```js
import {模块名A，模块名B...} from '模块路径'
```

(2) 导出：

```js
export和export default
```

(3) ES6+ 的异步引入方案

```js
import('模块路径').then(module => {
  console.log(module.default);
  // ···
});
```

```js
/*错误的写法*/
// 写法一
export 1;

// 写法二
const m = 1;
export m;

// 写法三
if (x === 2) {
  import MyModual from './myModual';
}

/*正确的三种写法*/
// 写法一
export const m = 1;

// 写法二
const m = 1;
export {m};

// 写法三
const n = 1;
export {n as m};

// 写法四
const n = 1;
export default n;

// 写法五
if (true) {
    import('./myModule.js')
    .then(({export1, export2}) => {
      // ...·
    });
}

// 写法六
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```

注意：
`export`只支持对象形式导出，不支持值的导出，`export default`命令用于指定模块的**默认输出**，只支持**值导出**，但是只能指定一个，本质上它就是输出一个叫做`default`的变量或方法。

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~

 <comment/>
