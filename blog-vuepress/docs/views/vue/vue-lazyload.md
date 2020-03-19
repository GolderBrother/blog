# vue 路由懒加载及组件懒加载

## 一、为什么要使用路由懒加载

为给客户更好的客户体验，首屏组件加载速度更快一些，解决白屏问题。

## 二、定义

懒加载简单来说就是延迟加载或按需加载，即在需要的时候的时候进行加载。

## 三、使用

### 常用的懒加载方式有两种

- vue 异步组件
- ES6 提案中的 import

### 1、未用懒加载，vue 中路由代码如下

```js
import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    }
  ]
});
```

### 2、vue 异步组件实现懒加载

方法如下：`component: resolve => (require(['需要加载的路由的地址']), resolve)`

```js
import Vue from "vue";
import Router from "vue-router";
/* 此处省去之前导入的HelloWorld模块 */
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: resolve => require(["@/components/HelloWorld"], resolve)
    }
  ]
});
```

### 3、ES 提出的 import 方法，（------最常用------）

方法如下：

```js
const HelloWorld = () => import("需要加载的模块地址");
```

```js
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const HelloWorld = () => import("@/components/HelloWorld");
export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    }
  ]
});
```

import 不支持传入动态路径，但是可以传入 **半动态路径**

webpack 编译 ```es6``` 动态引入 ```import() ```时不能传入变量，例如`dir='path/to/my/file.js;import(dir)` , 而要传入字符串 `import('path/to/my/file.js')`，这是因为 webpack 的现在的实现方式不能实现完全动态。

这里有个 **hack** 方法：

可以通过字符串模板来提供部分信息给 webpack；例如`import(./path/${myFile})`, 这样编译时会编译所有./path 下的模块，但运行时确定`myFile`的值才会加载，从而实现懒加载

举个栗子:

```js
/**
 * 异步加载页面
 * @param {*} viewUrl 页面路径
 */
const asyncLoadView = (viewUrl = "") => () =>
  import(/* webpackChunkName: 'asyncView' */ `@views/${viewUrl}`);
```

上面的 `/* webpackChunkName: 'asyncView' */` 专业术语是 `魔法字符串`, 用来定义 webpack 编译后的代码块文件名称：`asyncView122.chunk.js`

如果项目中 ```.vue```文件是以 ```template src``` 外部方式引入模板的：

```vue
<template src="./hello-world.html"></template>
```

则需要改为在 ```.js``` 文件中导出 ```vue``` 中以 ```template``` 的方式引入模板, 否则webpack编译不通过

如下例子：

```js
export default {
  name: 'helloWorld',
  template: require('./hello-world.html'),
}
```

#### 然后还需要添加对html模板文件的编译

1. 安装 **html-loader**

```bash
npm install html-loader --save-dev or yarn add html-loader --dev
```

2. ```webpack```的```loader```添加如下配置

```js
// https://webpack.docschina.org/loaders/html-loader/
{
  test: /\.html$/i,
  use: [
    {
      loader: 'html-loader',
      options: {
        // 禁用 es module 语法
        esModule: false
      }
    }
  ]
}
```

因为配置了路由懒加载，所以需要单独对html文件进行解析，这样子就能正常解析```html```模板文件了

### 4、webpack 提供的 require.ensure()

```vue-router``` 配置路由，使用 ```webpack``` 的 ```require.ensure``` 技术，也可以实现按需加载。 
这种情况下，多个路由指定相同的 ```chunkName```，会合并打包成一个 js 文件。

```js
/* 组件懒加载方案三: webpack提供的require.ensure() */
const routerConfig = [
  {
    path: "/home",
    name: "home",
    component: r =>
      require.ensure([], () => r(require("@/components/home")), "demo")
  },

  {
    path: "/index",
    name: "Index",
    component: r =>
      require.ensure([], () => r(require("@/components/index")), "demo")
  },

  {
    path: "/about",
    name: "about",
    component: r =>
      require.ensure([], () => r(require("@/components/about")), "demo-01")
  }
];

// r就是resolve
const list = r => require.ensure([], () => r(require('../components/list/list')), 'list');
// 路由也是正常的写法  这种是官方推荐的写的 按模块划分懒加载
const router = new Router({
    routes: [
        {
           path: '/list/blog',
           component: list,
           name: 'blog'
        }
    ]
})；
```

## 四、组件懒加载

相同与路由懒加载

### 1、原来组件中写法

```vue
<template>
  <div class="hello">
    <One-com></One-com>
  </div>
</template>

<script>
import One from "./one";
export default {
  components: {
    "One-com": One
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>
```

### 2、const 方法

```vue
<template>
  <div class="hello">
    <One-com></One-com>
  </div>
</template>

<script>
const One = () => import("./one");
export default {
  components: {
    "One-com": One
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>
```

### 3、异步方法

```vue
<template>
  <div class="hello">
    <One-com></One-com>
  </div>
</template>

<script>
export default {
  components: {
    "One-com": resolve => (["./one"], resolve)
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>
```

## 五、总结

### 路由和组件的常用两种懒加载方式

- 1、vue异步组件实现路由懒加载

    ```js
        component：resolve=>(['需要加载的路由的地址'，resolve])
    ```

- 2、es提出的import(推荐使用这种方式)

    ```js
        const HelloWorld = （）=>import('需要加载的模块地址')
    ```

- 3、webpack 提供的 require.ensure()

    ```js
        component: r => require.ensure([], () => r(require("@/components/about")), "demo-01")
    ```
