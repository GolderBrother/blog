# 你可能不知道的 JS 开发技巧

既然写文章有这么多的写作技巧，那么也需要对「JS 开发技巧」整理一下，起个易记的名字。

- 「String Skill」：字符串技巧

## String Skill

### 对比时间

时间个位数形式需补 0

```js
const time1 = "2019-02-14 21:00:00";
const time2 = "2019-05-01 09:00:00";
const overtime = time1 > time2;
// overtime => false
```

### 格式化金钱

```js
const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const money = ThousandNum(20190214);
// money => "20,190,214"
```

### 生成随机 ID

```js
const RandomId = len =>
  Math.random()
    .toString(36)
    .substr(3, len);
const id = RandomId(10);
// id => "jg7zpgiqva"
```

### 生成随机 HEX 色值

```js
const RandomColor = () =>
  "#" +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0");
const color = RandomColor();
// color => "#f03665"
```

### 生成星级评分

```js
const StartScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
const start = StartScore(3);
// start => "★★★"
```

### 操作 URL 查询参数

```js
const params = new URLSearchParams(location.search.replace(/\?/gi, "")); // location.search = "?name=young&sex=male"
params.has("young"); // true
params.get("sex"); // "male"
```

## Number Skill

### 向下取整

可以代替正数的`Math.floor()`，代替负数的`Math.ceil()`

```js
const num1 = ~~1.69;
const num2 = 1.69 | 0;
const num3 = 1.69 >> 0;
// num1 num2 num3 => 1 1 1
```

### 补零

```js
const FillZero = (num, len) => num.toString().padStart(len, "0");
const num = FillZero(169, 5);
// num => "00169"
```

### 转数值

只对 null、""、false、数值字符串有效

```js
const num1 = +null;
const num2 = +"";
const num3 = +false;
const num4 = +"169";
const num5 = Number("169");
// num1 num2 num3 num4 num5 => 0 0 0 169 169
```

### 时间戳

```js
const timestamp = +new Date("2019-02-14");
const timestamp2 = Number(new Date("2019-02-14"));
// timestamp => 1550102400000
// timestamp2 => 1550102400000
```

### 精确小数

```js
const RoundNum = (num, decimal) =>
  Math.round(num * 10 ** decimal) / 10 ** decimal;
const num = RoundNum(1.69, 1);
// num => 1.7
```

### 判断奇偶

```js
const OddEven = num => (!!(num & 1) ? "odd" : "even");
const num = OddEven(2);
// num => "even"
```

### 取最小最大值

```js
const arr = [0, 1, 2];
const min = Math.min(...arr);
const max = Math.max(...arr);
// min max => 0 2
```

### 生成范围随机数

```js
const RandomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const num = RandomNum(1, 10);
```

## Boolean Skill

### 判断数据类型

可判断类型：`undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap`

```js
function DataType(tgt, type) {
  const dataType = Object.prototype.toString
    .call(tgt)
    .replace(/\[object (\w+)\]/, "$1")
    .toLowerCase();
  return type ? dataType === type : dataType;
}
DataType("young"); // "string"
DataType(20190214); // "number"
DataType(true); // "boolean"
DataType([], "array"); // true
DataType({}, "array"); // false
```

## Array Skill

### 混淆数组

```js
const arr = [0, 1, 2, 3, 4, 5].slice().sort(() => Math.random() - 0.5);
// arr => [3, 4, 0, 5, 1, 2]
```

### 过滤空值

假值：`undefined、null、""、+0、-0、false、NaN`

```js
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean);
// arr => [1, 2]
```

### 数组首部插入成员

```js
let arr = [1, 2]; // 以下方法任选一种
arr.unshift(0);
arr = [0].concat(arr);
arr = [0, ...arr];
// arr => [0, 1, 2]
```

### 数组尾部插入成员

```js
let arr = [0, 1]; // 以下方法任选一种
arr.push(2);
arr.concat(2);
arr[arr.length] = 2;
arr = [...arr, 2];
// arr => [0, 1, 2]
```

### 统计数组成员个数(重复项)

```js
const arr = [0, 1, 1, 2, 2, 2];
const count = arr.reduce((t, v) => {
  t[v] = t[v] ? ++t[v] : 1;
  return t;
}, {});
// count => { 0: 1, 1: 2, 2: 3 }
```

### reduce 代替 map 和 filter

```js
const _arr = [0, 1, 2];

// map
const arr = _arr.map(i => i * 2);
const arr2 = _arr.reduce((accu, cur) => {
  accu.push(cur * 2);
  return accu;
}, []);
// arr => [0, 2, 4]

// filter
const arr = _arr.filter(v => v > 0);
const arr2 = _arr.reduce((accu, cur) => {
  cur > 0 && accu.push(cur);
  return accu;
}, []);
// arr => [1, 2]

// map和filter
const arr = _arr.map(v => v * 2).filter(v => v > 2);
const arr2 = _arr.reduce((t, v) => {
  v = v * 2;
  v > 2 && t.push(v);
  return t;
}, []);
// arr => [4]
```

## Object Skill

### 对象变量属性

```js
const flag = false;
const obj = {
  a: 0,
  b: 1,
  [flag ? "c" : "d"]: 2
};
// obj => { a: 0, b: 1, d: 2 }
```

### 创建纯空对象

```js
const obj = Object.create(null);
Object.prototype.a = 0;
// obj => {}
```

### 删除对象无用属性

```js
const obj = { a: 0, b: 1, c: 2 }; // 只想拿b和c
const { a, ...rest } = obj;
// rest => { b: 1, c: 2 }
```

## Function Skill

函数自执行

```js
const Func = function() {...}(); // 常用

(function() {...})(); // 最常用
(function() {...}()); // 最常用
[function() {...}()];

+ function() {...}();
- function() {...}();
~ function() {...}();
! function() {...}();
```

### 一次性函数

> 适用于运行一些只需执行一次的初始化代码

```js
function Func() {
  console.log("x");
  Func = function() {
    console.log("y");
  };
}
```

### 检测非空参数

```js
function IsRequired() {
  throw new Error("param is required");
}
// 如果name严格等于undefined,就会执行 IsRequired() 这个表达式
function Func(name = IsRequired()) {
  console.log("I Love " + name);
}
Func(); // "param is required"
Func("You"); // "I Love You"
```

### 字符串创建函数

```js
const Func = newFunction("name", 'console.log("I Love " + name)');
```

### 优雅处理错误信息

```js
try {
  Func();
} catch (e) {
  location.href = "https://stackoverflow.com/search?q=[js]+" + e.message;
}
```

### 优雅处理 Async/Await 参数

```js
function AsyncTo(promise) {
  return promise.then(data => [null, data]).catch(err => [err]);
}
// 这个有点类似node的回调，第一个参数永远是异常值，第二个是成功值
const [err, res] = await AsyncTo(Func());
```

## DOM Skill

### 显示全部 DOM 边框

> 调试页面元素边界时使用

```js
[].forEach.call($$("*"), dom => {
  dom.style.outline =
    "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});
```

### 自适应页面

> 页面基于一张设计图但需做多款机型自适应，元素尺寸使用 rem 进行设置

```js
function AutoResponse(width = 750) {
  const target = document.documentElement;
  target.clientWidth >= 600
    ? (target.style.fontSize = "80px")
    : (target.style.fontSize = (target.clientWidth / width) * 100 + "px");
}
```

### 过滤XSS

```js
function FilterXss(content) {
    let elem = document.createElement("div");
    elem.innerText = content;
    const result = elem.innerHTML;
    elem = null;
    return result;
}
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)哦~
