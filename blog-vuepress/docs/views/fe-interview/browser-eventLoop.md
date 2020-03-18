# 小伙子，谈谈浏览器端的事件循环吧

`JavaScript` 代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠**任务队列**(`task queue`)来搞定另外一些代码的执行。整个执行过程，我们称为事件循环过程。一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为 `macro-task`（宏任务）与 `micro-task`（微任务），在最新标准中，它们被分别称为 `task` 与 `jobs`

macro-task 大概包括：

- `script`(整体代码)
- `setTimeout`
- `setInterval`
- `setImmediate`
- `I/O`流
- `UI render`

micro-task 大概包括:

- `process.nextTick`
- `Promise`
- `Async/Await`(实际就是`promise`)
- `MutationObserver`(html5 新特性)
- `Object.observe`([已废弃](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/observe))

整体执行，可以參考这个流程图

![img](https://user-gold-cdn.xitu.io/2020/2/27/170847d202084604?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

总的结论就是，执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则会先执行当前微任务，并将新的微任务排到当前微任务后面，待微任务执行完毕后，再回到宏任务中进行下一轮循环。举个例子：

![img](https://user-gold-cdn.xitu.io/2020/2/27/170847cc5f5eb691?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

结合流程图理解，答案输出为：`async2 end => Promise => async1 end => promise1 => promise2 => setTimeout` 但是，对于`async/await` ，我们有个细节还要处理一下。如下

## async/await 执行顺序

我们知道 `async` 隐式返回 `Promise` 作为结果的函数,那么可以简单理解为，`await`后面的函数执行完毕时，`await`会产生一个微任务(`Promise.then`是微任务)。但是我们要注意这个微任务产生的时机，它是执行完 await 之后，直接跳出 async 函数，执行其他**同步**代码(此处就是协程的运作，A 暂停执行，控制权交给 B)。其他代码执行完毕后，再回到 async 函数去执行**剩下的代码**，然后把 await 后面的代码注册到**微任务队列**当中。我们来看个例子：

```js
console.log("script start");

async function async1() {
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2 end");
}
async1();

setTimeout(function() {
  console.log("setTimeout");
}, 0);

new Promise(resolve => {
  console.log("Promise");
  resolve();
})
  .then(function() {
    console.log("promise1");
  })
  .then(function() {
    console.log("promise2");
  });

console.log("script end");
// 旧版输出如下，但是请继续看完下面的注意那里，新版有改动
// script start => async2 end => Promise => script end => promise1 => promise2 => async1 end => setTimeout
```

分析这段代码：

- 执行代码，输出 `script start`。
- 执行`async1()`,会调用`async2()`,然后输出`async2 end`,此时将会保留`async1`函数的上下文，然后跳出`async1`函数。
- 遇到`setTimeout`，产生一个宏任务
- 执行`Promise`，输出`Promise`。遇到`then`，产生第一个微任务
- 继续执行代码，输出`script end`
- 代码逻辑的主逻辑**同步任务**执行完毕(当前宏任务执行完毕)，开始执行当前宏任务产生的**微任务**队列，输出 `promise1` ，该**微任务**遇到 `then` ，产生一个新的**微任务**
- 执行产生的微任务，输出 `promise2` ,当前微任务队列执行完毕。执行权回到 `async1`
- 执行 `await` ,实际上会产生一个 `promise` 返回，即

```js
let promise_ = new Promise((resolve,reject){ resolve(undefined)})
```

执行完成，执行 `await` 后面的语句，输出 `async1 end`

- 最后，执行下一个宏任务，即执行 `setTimeout`，输出`setTimeout`

## 注意

新版的`chrome`浏览器中不是如上打印的，因为`chrome`优化了,`await`变得更快了,输出为:

```js
// script start => async2 end => Promise => script end => async1 end => promise1 => promise2 => setTimeout
```

但是这种做法其实是违法了规范的，当然规范也是可以更改的，这是 V8 团队的一个 PR ，目前新版打印已经修改。 知乎上也有相关讨论,可以看看 [这篇文章](https://www.zhihu.com/question/268007969)

我们可以分2种情况来理解：

1. 如果 `await` 后面直接跟的为一个**变量**或者**普通值**，比如：`await 1`；这种情况的话相当于直接把 `await` **下面的代码**注册为一个**微任务**，可以简单理解为 `promise.then(xxx)` (xxx为await下面的代码)。然后跳出`async1`函数，执行其他代码，当遇到`promise`函数的时候，会注册`promise.then()`函数到**微任务**队列，注意此时**微任务**队列里面已经存在 `await` 后面的**微任务**。所以这种情况会先执行 `await` 后面的代码（`async1 end`），再执行 `async1` 函数后面注册的 **微任务代码**(`promise1,promise2`)。
2. 如果 `await` 后面跟的是一个**异步函数(promise)**的调用，比如上面的代码，将代码改成这样：
将会把**await下面的代码**放到**本轮循环的最后面**执行

```js
console.log('script start')

async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
    return Promise.resolve().then(()=>{
        console.log('async2 end1')
    })
}
async1()

setTimeout(function() {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})

console.log('script end')
```

输出为：

```js
// script start => async2 end => Promise => script end => async2 end1 => promise1 => promise2 => async1 end => setTimeout
```

此时执行完 `await` 右边的代码后， 并不先把 `await` 下面的代码注册到**微任务队列**中去，而是执行完`await`右边的代码之后，直接跳出 `async1` 函数，执行其他代码(同步+微任务)。然后遇到 `promise` 的时候，把`promise.then`**注册**为`微任务`。其他代码执行完毕后，再回到`async1`函数去执行剩下的代码，然后把`await`下面的代码注册到**微任务队列**当中，注意**此时微任务队列中是有之前注册的微任务**的。所以这种情况会**先执行**`async1`函数之外的**微任务**(`promise1,promise2`)，然后才执行`async1`内注册的微任务(`async1 end`).
可以理解为，这种情况下，`await` 后面的代码会在**本轮循环的最后**被执行

## 参考资料

- [详解JavaScript中的Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)

## 最后

欢迎关注鄙人的[github](https://github.com/GolderBrother)，做个有专业的技术人，一起学习呀~
