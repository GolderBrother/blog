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

### 实现一个 `new`

#### 方法一

```js
function myNew() {
  // 1、创建一个空的对象
  const obj = new Object();
  // 2、获得构造函数，同时删除 arguments 中第一个参数
  const Cons = [].shift.call(arguments);
  // 3、链接到原型，obj 可以访问构造函数原型中的属性 obj.__proto__ -> Cons.prototype
  Object.setPrototypeOf(obj, Cons.prototype);
  // 4、绑定 this 实现继承，obj 可以访问到构造函数中的属性
  const res = Cons.apply(obj, arguments);
  // 5、优先返回构造函数返回的对象
  return res instanceof Object ? res : obj;
}
```

#### 方法二

```js
function myNew() {
  // 1、获得构造函数，同时删除 arguments 中第一个参数
  const cons = [].shift.call(arguments);
  // 2、创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
  const obj = Object.create(cons.prototype);
  // 3、绑定 this 实现继承，obj 可以访问到构造函数中的属性
  const res = cons.apply(obj, arguments);
  // 4、优先返回构造函数返回的对象
  return res instanceof obj ? res : obj;
}
```

### instanceof 原理及实现

instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。

```js
function C() {}
function D() {}

var o = new C();

o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype
o instanceof D; // false，因为 D.prototype 不在 o 的原型链上
```

instanceof 原理就是一层一层查找 **proto**，如果和 constructor.prototype 相等则返回 true，如果一直没有查找成功则返回 false。

```js
instance.[__proto__...] === instance.constructor.prototype
```

知道了原理后我们来实现 instanceof，代码如下。

```js
function myInstanceOf(L, R) {
  let proto = R.prototype,
    __pro = L.__proto__;
  while (true) {
    // Object.prototype.__proto__ === null
    // 如果是null说明已经达到原型链最顶端，就直接返回false
    if (__pro === null) return false;
    //  L.__proto__ === R.prototype 如果严格返回 那就是构造函数的原型(R.prototype)存在于实例的原型链上(L.__proto__)
    if (proto === __pro) return true;
    // 递归原型链向上查找
    __pro = __pro.__proto__;
  }
}

// 测试
function C() {}

function D() {}

var o = new C();
console.log(myInstanceOf(o, C)); // true
console.log(myInstanceOf(o, D)); // false
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~
