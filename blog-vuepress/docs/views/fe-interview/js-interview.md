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

### 1. 算术交换

针对的是 `Number`，或者类型可以转换成数字的变量类型

```js
function swap(a, b) {
  a = a + b;
  b = a - b;
  a = a - b;
}
```

通过算术运算过程中的技巧，可以巧妙地将两个值进行互换。但是，有个缺点就是变量数据溢出。因为 `JavaScript` 能存储数字的精度范围是 `-2^53` 到 `2^53`。所以，加法运算，会存在溢出的问题。

### 2. 异或运算

^ 按位异或 若参加运算的两个**二进制位值相同则为 0，否则为 1**

此算法能够实现是由异或运算的特点决定的，通过异或运算能够使数据中的某些位翻转，其他位不变。这就意味着任意一个数与任意一个给定的值连续异或两次，值不变.

```js
a = a ^ b;
b = a ^ b;
a = a ^ b;
```

### 3. ES6 的解构(真香~)

```js
[a, b] = [b, a];
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~
