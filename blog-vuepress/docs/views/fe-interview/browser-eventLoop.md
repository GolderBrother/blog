# 小伙子，谈谈浏览器端的事件循环吧

`JavaScript` 代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠**任务队列**(`task queue`)来搞定另外一些代码的执行。整个执行过程，我们称为事件循环过程。一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为 `macro-task`（宏任务）与 `micro-task`（微任务），在最新标准中，它们被分别称为 `task` 与 `jobs`

macro-task大概包括：

- script(整体代码)
- setTimeout
- setInterval
- setImmediate
- I/O刘
UI render

micro-task大概包括:

process.nextTick
Promise
Async/Await(实际就是promise)
MutationObserver(html5新特性)


 
 