# 来，说说 node 的事件循环机制吧

浏览器中有**事件循环**，`node` 中也有，**事件循环**是 `node` 处理**非阻塞 I/O 操作**的机制，`node`中事件循环的实现是依靠的`libuv引擎`。由于 `node` 11 之后，事件循环的一些原理发生了变化，这里就以新的标准去讲，最后再列上变化点让大家了解前因后果。

## 宏任务和微任务

node 中也有宏任务和微任务，与浏览器中的事件循环类似，其中，

macro-task 大概包括：

- `setTimeout`
- `setInterval`
- `setImmediate`
- `script（整体代码`)
- `I/O 操作`

micro-task 大概包括：

- `node` 中的 `process.nextTick`(与普通微任务有区别，在微任务队列执行之前执行)
- `new Promise().then(回调)`

## node 事件循环整体理解

先看一张官网的 node 事件循环简化图：

![img](https://user-gold-cdn.xitu.io/2020/3/2/1709951e658af197?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

图中的每个框被称为事件循环机制的一个阶段，每个阶段都有一个 `FIFO`(First-In-First-Out) 队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，直到队列用尽或最大回调数已执行。当该队列已**用尽**或**达到回调限制**，事件循环将移动到下一阶段。

因此，从上面这个简化图中，我们可以分析出 node 的事件循环的阶段顺序为：

输入数据阶段(`incoming data`)->轮询阶段(`poll`)->检查阶段(`check`)->关闭事件回调阶段(`close callback`)->定时器检测阶段(timers)->I/O 事件回调阶段(I/O callbacks)->闲置阶段(idle, prepare)->轮询阶段...

## 阶段概述

- **定时器检测阶段**(`timers`)：本阶段执行 `timer` 的**回调**，即 `setTimeout、setInterval` 里面的回调函数。
- **I/O 事件回调阶段**(`I/O callbacks`)：执行延迟到下一个循环迭代的 `I/O` 回调，即上一轮循环中未被执行的一些`I/O`回调。
- **闲置阶段**(`idle`, `prepare`)：仅系统内部使用。
- **轮询阶段**(`poll`)：检索新的 `I/O` 事件;执行与 `I/O` 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 `setImmediate()` 调度的之外），其余情况 `node` 将在适当的时候在此阻塞。
- **检查阶段**(`check`)：`setImmediate()` 回调函数在这里执行
- **关闭事件回调阶段**(`close callback`)：一些关闭的回调函数，如：socket.on('close', ...)。

## 三大重点阶段

日常开发中的绝大部分异步任务都是在 `poll、check、timers` 这 3 个阶段处理的,所以我们来重点看看。

### timers

`timers` 阶段会执行 `setTimeout` 和 `setInterval` 回调，并且是由 `poll` 阶段控制的。 同样，在 `Node` 中定时器指定的时间也不是准确时间，只能是尽快执行。

### poll

`poll` 是一个至关重要的阶段，`poll` 阶段的执行逻辑流程图如下：

![img](https://user-gold-cdn.xitu.io/2020/3/2/1709951e65ffe00e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如果当前已经存在定时器，而且有定时器到时间了，拿出来执行，eventLoop 将回到 timers 阶段。

如果没有定时器, 会去看**回调函数队列**。

- 如果 `poll` 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制

- 如果 `poll` 队列为空时，会有两件事发生
  - 如果有 `setImmediate` 回调需要执行，`poll` 阶段会停止并且进入到 `check` 阶段执行回调
  - 如果没有 `setImmediate` 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个**超时时间**设置防止一直等待下去,一段时间后自动进入 `check` 阶段。

### check

check 阶段。这是一个比较简单的阶段，直接执行 setImmdiate 的回调

### setImmediate() 对比 setTimeout()

`setImmediate()` 和 `setTimeout()` 很类似，但是基于被调用的时机，他们也有不同表现。

`setImmediate()` 设计为一旦在当前 轮询 阶段完成， 就执行脚本。
`setTimeout()` 在最小阈值（ms 单位）过后运行脚本。

执行计时器的顺序将根据调用它们的上下文而异。如果二者都从主模块内调用，则计时器将受进程性能的约束（这可能会受到计算机上其他正在运行应用程序的影响）。

例如，如果运行以下不在 I/O 周期（即主模块）内的脚本，则执行两个计时器的顺序是非确定性的，因为它受进程性能的约束：

```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
```

```bash
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout
```

但是，如果你把这两个函数放入一个 I/O 循环内调用，setImmediate 总是被优先调用：

```js
// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

```bash
$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout
```

使用 setImmediate() 相对于setTimeout() 的主要优势是，如果setImmediate()是在 I/O 周期内被调度的，那它将会在其中任何的定时器之前执行，跟这里存在多少个定时器无关

使用 `setImmediate()` 相对于 `setTimeout()` 的主要优势是，如果`setImmediate()`是在 I/O 周期内被调度的，那它将会在其中任何的定时器之前执行，跟这里存在多少个定时器无关

### process.nextTick

`process.nextTick` 是一个独立于 `eventLoop` 的任务队列。

在每一个 `eventLoop` 阶段完成后会去检查 `nextTick` 队列，如果里面有任务，会让这部分任务**优先**于微任务执行。

可以看下面这个例子：

```js
setImmediate(() => {
  console.log("timeout1");
  Promise.resolve().then(() => console.log("promise resolve"));
  process.nextTick(() => console.log("next tick1"));
});
setImmediate(() => {
  console.log("timeout2");
  process.nextTick(() => console.log("next tick2"));
});
setImmediate(() => console.log("timeout3"));
setImmediate(() => console.log("timeout4"));
```

针对`node`不同的版本，有不同的输出结果：

- 在 **node11 之前**，因为每一个 `eventLoop` 阶段完成后会去检查 `nextTick` 队列，如果里面有任务，会让这部分任务优先于微任务执行，因此上述代码是先进入 `check` 阶段，执行所有 `setImmediate`，完成之后执行 `nextTick` 队列，最后执行**微任务队列**，因此输出为`timeout1=>timeout2=>timeout3=>timeout4=>next tick1=>next tick2=>promise resolve`
- 在 **node11 之后**，`process.nextTick` 是微任务的一种,因此上述代码是先进入 `check` 阶段，执行一个 `setImmediate` 宏任务，然后执行其**微任务队列**，再执行**下一个宏任务及其微任务**,因此输出为`timeout1=>next tick1=>promise resolve=>timeout2=>next tick2=>timeout3=>timeout4`。

## node 版本差异说明

这里主要说明的是 `node11` 前后的差异，因为 `node11` 之后一些特性已经向浏览器看齐了，总的变化一句话来说就是，如果是 `node11` 版本一旦执行一个阶段里的一个宏任务(`setTimeout,setInterval和setImmediate`)就立刻执行对应的微任务队列(`promise.then(回调)、process.nextTick(回调)`)，一起来看看吧～

### timers 阶段的执行时机变化

```js
setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)
```

- 如果是 node11 版本一旦执行一个阶段里的一个宏任务(`setTimeout,setInterval和setImmediate`)就立刻执行微任务队列，这就跟浏览器端运行一致，最后的结果为`timer1=>promise1=>timer2=>promise2`
- 如果是 node10 及其之前版本要看第一个定时器执行完，第二个定时器是否在完成队列中.

  - 如果是第二个定时器还**未在完成队列**中，最后的结果为`timer1=>promise1=>timer2=>promise2`
  - 如果是第二个定时器**已经在完成队列**中，则最后的结果为`timer1=>timer2=>promise1=>promise2`

### check 阶段的执行时机变化

```js
setImmediate(() => console.log('immediate1'));
setImmediate(() => {
    console.log('immediate2')
    Promise.resolve().then(() => console.log('promise resolve'))
});
setImmediate(() => console.log('immediate3'));
setImmediate(() => console.log('immediate4'));
```

- 如果是 **node11 后** 的版本，会输出`immediate1=>immediate2=>promise resolve=>immediate3=>immediate4`
- 如果是 **node11 前** 的版本，会输出`immediate1=>immediate2=>immediate3=>immediate4=>promise resolve`

### nextTick 队列的执行时机变化

```js
setImmediate(() => console.log('timeout1'));
setImmediate(() => {
    console.log('timeout2')
    process.nextTick(() => console.log('next tick'))
});
setImmediate(() => console.log('timeout3'));
setImmediate(() => console.log('timeout4'));
```

- 如果是 **node11 后** 的版本，会输出`timeout1=>timeout2=>next tick=>timeout3=>timeout4`
- 如果是 **node11 前** 的版本，会输出`timeout1=>timeout2=>timeout3=>timeout4=>next tick`

以上几个例子，我们能清晰感受到它的变化了，反正记着一个结论，如果是 **node11 版本** 一旦执行一个阶段里的一个宏任务(`setTimeout,setInterval和setImmediate`)就立刻执行对应的微任务队列(`promise.then(回调)、process.nextTick(回调)`)。

## node 和 浏览器 eventLoop的主要区别

两者最主要的区别在于浏览器中的**微任务**是在每个相应的**宏任务**中执行的，而**nodejs**中的**微任务**是在**不同阶段**(`timers、check、nextTick`)之间执行的，根据**nodejs的版本**(<10、>=11)有不同的执行顺序过程。

## 参考资料

- [Node.js 事件循环，定时器和 process.nextTick()](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)
- [New Changes to the Timers and Microtasks in Node v11.0.0 ( and above)](https://blog.insiderattack.net/new-changes-to-timers-and-microtasks-from-node-v11-0-0-and-above-68d112743eb3)

## 最后

欢迎关注鄙人的[github](https://github.com/GolderBrother)，一起学习呀~

 
 <comment/> 
 