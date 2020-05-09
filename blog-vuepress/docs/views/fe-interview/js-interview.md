# 收集一些 `javascript` 相关的面试题

## 实现 `sum(1,2,3)==sum(1)(2)(3)`

```js
function sum(...args) {
  function currySum(...rest) {
    args.push(...rest);
    return currySum;
  }
  currySum.toString = function() {
    return args.reduce((result, cur) => {
      return result + cur;
    });
  };
  currySum.toNumber = function() {
    return args.reduce((result, cur) => {
      return result + cur;
    });
  };
  return currySum;
}

const num = sum(1, 2, 3);
const num2 = sum(1)(2)(3);
console.log(`num`, num);
console.log(`num2`, num2);
```

## 不借助变量，交换两个数

TODO

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~
