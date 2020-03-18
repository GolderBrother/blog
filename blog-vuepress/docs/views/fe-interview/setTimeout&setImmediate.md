# node中的setTimeout 和 setImmediate有什么区别

`setImmediate()` 和 `setTimeout()` 很类似，但是基于被调用的时机，他们也有不同表现。

- `setImmediate` 设计在`poll阶段`完成时执行，即`check`阶段；
- `setTimeout` 设计在`poll阶段`为空闲时，且设定时间到达后执行，但它在`timer`阶段执行

执行计时器的顺序将根据调用它们的上下文而异。如果二者都从主模块内调用，则计时器将受进程性能的约束。举个例子，有如下代码：

```js
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
```

上面代码应该先输出1，再输出2，但是实际执行的时候，结果却是不确定，有时还会先输出2，再输出1。

这是因为setTimeout的第二个参数默认为0。但是实际上，Node 做不到0毫秒，最少也需要1毫秒，根据官方文档，第二个参数的取值范围在**1毫秒**到**2147483647毫秒**之间。也就是说，`setTimeout(f, 0)`等同于`setTimeout(f, 1)`。

实际执行的时候，进入事件循环以后，有可能到了**1毫秒**，也可能还没到**1毫秒**，取决于系统当时的状况。如果没到**1毫秒**，那么 `timers` 阶段就会跳过，先进入 `check` 阶段，先执行`setImmediate`的回调函数。

但是，如果是这样的情况，输出顺序就固定了，例：

```js
const fs = require('fs');
fs.readFile('test.js', () => {
 setTimeout(() => console.log(1));
 setImmediate(() => console.log(2));
});
```

在上述代码中，一定是先输出2，再输出1。因为两个代码写在 `IO 回调`中，`IO 回调`是在 `poll` 阶段执行，当回调执行完毕后队列为空，发现存在 `setImmediate` 回调，所以就直接跳转到 `check` 阶段去执行回调(`setImmediate回调`)了，执行完成后再去到 `timers` 阶段，然后执行`setTimeout`。

node时事件循环的**三大重点阶段**：

```js
timer(定时器时间到了，才执行回调) -> poll(执行I/O相关的回调) -> check(执行setImmediate回调)
```

## 总结

`setImmediate()`约等于`setTimeout(()=>{}, 0)`， 都是**异步执行**，不同的是`setTimeout`在`timer`阶段执行，而`setImmediate`是在`nodejs`的`check`阶段执行。如果`setTimeout`设置成`0`，那么他们的执行顺序是: 有可能前有可能后是不确定的。这是因为`setTimeout`设置为0也需要**1ms**才能执行（**浏览器是4ms**），而`event loop`的启动从`timer`, `I/O(poll)`,到 `check` 时间有可能多大于`1ms`，如果大于`1ms`，这时 `timeout` 是`1ms`，已经符合执行条件 `setTimeout` 会**立即执行**，然后接着执行 `check` 阶段的 `setImmediate` 。如果 `event loop` 启动后到了 `poll` 阶段，耗时小于`1ms`，比如用了`0.8ms`,那么这时 `settimeout` 是`1ms`，不符合条件跳到 `check` 阶段先执行`setImmediate`然后再执行 `setTimeout` 。如果这两个事件调用是在某个 `I/O` 类的函数中，那么他们的执行顺序就是**固定**的，不会出现在前后执行的不确定性。
 
 <comment/> 
 