# 关于 JavaScript 的数据类型，你知多少

数据类型通常是一门编程语言的基础知识，JavaScript 的数据类型可以分为 7 种：空（Null）、未定义（Undefined）、数字（Number）、字符串（String）、布尔值（Boolean）、符号（Symbol）、对象（Object）。

其中前 6 种类型为**基础类型**，最后 1 种为**引用类型**。这两者的区别在于，基础类型的数据在被引用或拷贝时，是值传递，也就是说会创建一个完全相等的变量；而引用类型只是创建一个指针指向原有的变量，实际上两个变量是“共享”这个数据的，并没有重新创建一个新的数据。

下面我们就来分别介绍这 7 种数据类型的重要概念及常见操作。

## Undefined

Undefined 是一个很特殊的数据类型，它只有一个值，也就是 undefined。可以通过下面几种方式来得到 undefined：

- 引用已声明但未初始化的变量；
- 引用未定义的对象属性；
- 执行无返回值函数；
- 执行 void 表达式；
- 全局常量 window.undefined 或 undefined。

对应代码如下：

```js
var a; // undefined
var o = {};
o.b(
  // undefined
  () => {}
)(); // undefined
void 0; // undefined
window.undefined; // undefined
```

其中比较推荐通过 void 表达式来得到 undefined 值，因为这种方式既简便（window.undefined 或 undefined 常量的字符长度都大于 "void 0" 表达式）又不需要引用额外的变量和属性；同时它作为表达式还可以配合三目运算符使用，**代表不执行任何操作**。

如下面的代码就表示满足条件 x 大于 0 且小于 5 的时候执行函数 fn，否则不进行任何操作：

```js
x > 0 && x < 5 ? fn() : void 0;
```

如何判断一个变量的值是否为 undefined 呢？
下面的代码给出了 3 种方式来判断变量 x 是否为 undefined，你可以先思考一下哪一种可行。

方式 1 直接通过**逻辑取非**操作来将变量 x 强制转换为布尔值进行判断；方式 2 通过 3 个等号将变量 x 与 `undefined` 做真值比较；方式 3 通过 `typeof` 关键字获取变量 x 的类型，然后与 'undefined' 字符串做真值比较：

```js
// 方式1
if(!x) {
  ...
}
// 方式2
if(x===undefined) {
  ...
}
// 方式2
if(typeof x === 'undefined') {
  ...
}

```

现在来揭晓答案，方式 1 不可行，因为只要变量 x 的值为 undefined、空字符串、数值 0、null 这些**假值**时都会判断为真。方式 2 也存在一些问题，虽然通过 “===” 和 undefined 值做比较是可行的，但如果 x 未定义则会抛出错误 `“ReferenceError: x is not defined”` 导致程序执行终止，这对于代码的健壮性显然是不利的。方式 3 则解决了这一问题。

## Null

Null 数据类型和 Undefined 类似，只有唯一的一个值 null，都可以表示空值，甚至我们通过 “==” 来比较它们是否相等的时候得到的结果都是 true，但 null 是 JavaScript 保留关键字，而 undefined 只是一个常量。

也就是说我们可以声明名称为 undefined 的变量（虽然只能在老版本的 IE 浏览器中给它重新赋值），但将 null 作为变量使用时则会报错。

### null 和 undefined 的区别是什么？

null 一般来为一个对象解除对堆内存地址的引用，undefined 一般用于定义变量初始值

## Boolean

Boolean 数据类型只有两个值：true 和 false，分别代表真和假，理解和使用起来并不复杂。但是我们常常会将各种表达式和变量转换成 Boolean 数据类型来当作判断条件，这时候就要注意了。

下面是一个简单地将星期数转换成中文的函数，比如输入数字 1，函数就会返回“星期一”，输入数字 2 会返回“星期二”，以此类推，如果未输入数字则返回 undefined。

```js
function getWeek(week) {
  const dict = ['日', '一', '二', '三', '四', '五', '六'];
  if (week) return `星期${dict[week]}`;
}
```

这里在 if 语句中就进行了类型转换，将 week 变量转换成 Boolean 数据类型，而 0、空字符串、null、undefined 在转换时都会返回 false。所以这段代码在输入 0 的时候不会返回“星期日”，而返回 undefined。
我们在做强制类型转换的时候一定要考虑这个问题。

