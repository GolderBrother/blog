# 实现一个 LazyMan，可以按照以下方式调用

```js
LazyMan('Hank')
输出:
Hi! This is Hank!

LazyMan('Hank').sleep(10).eat('dinner')
输出:
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan('Hank').sleep(10).eat('dinner').eat('supper')
输出:
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan('Hank').sleepFirst(5).eat('supper')
输出:
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper~
以此类推。
```

示例代码如下：

```js
function LazyMan(name) {
  if (!(this instanceof LazyMan)) {
    return new LazyMan(name);
  }
  const cb = next => {
    console.log(`Hi This is ${name}!`);
    next();
  };
  this.cbs = [].concat(cb);
  setTimeout(() => {
    this.next();
  }, 0);
}
LazyMan.prototype.eat = function(food) {
  const cb = next => {
    console.log(`Eat ${food}~`);
    next();
  };
  this.cbs.push(cb);
  return this;
};
LazyMan.prototype.sleepFirst = function(time) {
  const cb = next => {
    setTimeout(() => {
      next();
    }, time * 1000);
  };
  this.cbs.unshift(cb);
  return this;
};
LazyMan.prototype.sleep = function(time) {
  const cb = next => {
    setTimeout(() => {
      next();
    }, time * 1000);
  };
  this.cbs.push(cb);
  return this;
};
LazyMan.prototype.next = function() {
  if (this.cbs.length <= 0) return;
  const first = this.cbs.shift();
  // 注意 这边回调函数cb需要自行绑定this到LazyMan实例
  first(this.next.bind(this));
};
```

## 最后

欢迎关注鄙人的[github](https://github.com/GolderBrother)，做个有专业的技术人，一起学习呀~
 
 <comment/> 
 