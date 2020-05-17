# 一个合格的中级`前端er`需要掌握的 28 个 `JavaScript` 技巧

## 1.判断对象的数据类型

```js
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
const isArray = isType('Array');
const isObject = isType('Object');
console.log(isArray([])); // true
console.log(isObject([])); // false
console.log(isObject({})); // true
console.log(isObject(null)); // false
```

使用 Object.prototype.toString 配合闭包，通过传入不同的判断类型来返回不同的判断函数，一行代码，简洁优雅灵活（注意传入 type 参数时首字母大写）

不推荐将这个函数用来检测可能会产生包装类型的基本数据类型上,因为 call 始终会将第一个参数进行装箱操作，导致基本类型和包装类型无法区分

## 2. 循环实现数组 map 方法

```js
// 循环实现map
const selfMap = function(fn, context) {
  // context: 原生数组的map方法可以传入的第二个参数，可以用来改变回调函数的执行上下文
  const arr = Array.prototype.slice.call(this);
  let mappedArr = [];
  for (let index = 0; index < arr.length; index++) {
    // 对稀疏数组的处理，通过 hasOwnProperty 来判断当前下标的元素是否存在与数组中
    if (!arr.hasOwnProperty(index)) continue;
    // 思路是每个元素都添加一个对应的回调, 三个参数分别为当前项 当前项索引 数组本身
    mappedArr.push(fn.call(context, arr[index], index, this));
  }
  return mappedArr;
};
// 放到数组原型上
Array.prototype.selfMap ||
  Object.defineProperty(Array.prototype, 'selfMap', {
    value: selfMap,
    enumerable: false,
    configurable: true,
    writable: true
  });

const arr = ['a', 'b', 'c', 'd'];
const arr2 = arr.selfMap(item => item + '~');
console.log(`arr2`, arr2); // arr2 [ 'a~', 'b~', 'c~', 'd~' ]
```

## 3. reduce 实现 map

```js
// reduce实现map
const selfMap2 = function(fn, context) {
  const arr = Array.prototype.slice.call(this);
  return arr.reduce((accu, cur, index) => [...accu, fn.call(context, cur, index, this)], []);
};

Array.prototype.selfMap2 ||
  Object.defineProperty(Array.prototype, 'selfMap2', {
    value: selfMap2,
    enumerable: false,
    configurable: true,
    writable: true
  });
const arr = ['a', 'b', 'c', 'd'];
const arr3 = arr.selfMap(item => item + '~');
console.log(`arr3`, arr3); // arr3 [ 'a~', 'b~', 'c~', 'd~' ]
```

## 4. ES5 实现数组 filter 方法

```js
// ES5 实现数组 filter 方法
const selfFilter = function(fn, context) {
  const arr = Array.prototype.slice.call(this);
  const filteredArr = [];
  for (let index = 0; index < arr.length; index++) {
    if (!arr.hasOwnProperty(index)) continue;
    fn.call(context, arr[index], index, this) && filteredArr.push(arr[index]);
  }
  return filteredArr;
};

Array.prototype.selfFilter ||
  Object.defineProperty(Array.prototype, 'selfFilter', {
    value: selfFilter,
    enumerable: false,
    configurable: true,
    writable: true
  });

const arr = ['html', 'css', 'javascript'];
const arr2 = arr.selfFilter(item => item.includes('javascript'));
console.log(`arr2`, arr2); // arr2 [ 'javascript' ]
```

## 5. 使用 reduce 实现数组 filter 方法

```js
const selfFilter2 = function(fn, context) {
  const arr = this.reduce(
    (accu, cur, index) => (fn.call(context, cur, index, this) ? [...accu, cur] : [...accu]),
    []
  );
  return arr;
};

Array.prototype.selfFilter2 ||
  Object.defineProperty(Array.prototype, 'selfFilter2', {
    value: selfFilter2,
    enumerable: false,
    configurable: true,
    writable: true
  });

const arr = ['html', 'css', 'javascript'];
const arr3 = arr.selfFilter2(item => item.includes('javascript'));
console.log(`arr3`, arr3); // arr3 [ 'javascript' ]
```

## 6. ES5 实现数组的 some 方法

```js
// ES5 实现数组的 some 方法
const selfSome = function(fn, context) {
  const arr = Array.prototype.slice.call(this);
  if (!arr.length) return false;
  let flag = false;
  for (let index = 0; index < arr.length; index++) {
    if (!arr.hasOwnProperty(index)) continue;
    flag = Boolean(fn.call(context, arr[index], index, this));
    if (flag) break;
  }
  return flag;
};

Array.prototype.selfSome ||
  Object.defineProperty(Array.prototype, 'selfSome', {
    value: selfSome,
    enumerable: false,
    configurable: true,
    writable: true
  });

const arr = ['html', 'css', 'javascript'];
const hasJavascript = arr.selfSome(item => item.includes('javascript'));
const hasNode = arr.selfSome(item => item.includes('node'));
console.log(`hasJavascript`, hasJavascript); // hasJavascript true
console.log(`hasNode`, hasNode); // hasNode false
```

执行 some 方法的数组如果是一个空数组，最终始终会返回 false，而另一个数组的 every 方法中的数组如果是一个空数组，会始终返回 true

```js
console.log([].some(item => item.includes('javascript'))); // false
console.log([].every(item => item.includes('javascript'))); // true
```

## 7. ES5 实现数组的 reduce 方法

```js
// ES5循环实现reduce
const selfReduce = function(fn, initialValue) {
  let arr = Array.prototype.slice.call(this);
  let accu, startIndex;
  // 如果初始值没传入，则使用数组的第一个非空单元 元素
  if (initialValue === undefined) {
    for (let index = 0; index < arr.length; index++) {
      if (!arr.hasOwnProperty(index)) continue;
      startIndex = index;
      accu = arr[index];
      break;
    }
  } else {
    accu = initialValue;
  }
  // 遍历的起点为上一步中找到的真实元素的后面一个真实元素
  // 每次遍历会跳过空单元的元素
  for (let index = startIndex || 0; index < arr.length; index++) {
    if (!arr.hasOwnProperty(index)) continue;
    accu = fn.call(null, accu, arr[index], index, this);
  }
  return accu;
};

Array.prototype.selfReduce ||
  Object.defineProperty(Array.prototype, 'selfReduce', {
    value: selfReduce,
    enumerable: false,
    writable: true,
    configurable: true
  });

const arr = ['hello', 'javascript'];
const arrString = arr.selfReduce((accu, cur, index, arr) => (accu = accu + ' ' + cur), '');
console.log('arrString', arrString); // hello javascript
```

因为可能存在稀疏数组的关系，所以 reduce 实现略有点复杂，需要保证跳过稀疏元素，遍历正确的元素和下标

## 8. 使用 reduce 实现数组的 flat 方法

```js
const selfFlat = function(depth = 1) {
  const arr = Array.prototype.slice.call(this);
  // 如果没有传入扁平层级，就默认扁平化1级
  if (depth === 0) return arr;
  return arr.reduce((accu, cur) => {
    if (Array.isArray(cur)) {
      return [...accu, ...selfFlat.call(cur, depth - 1)];
      // 也可以使用ES5的concat方法
      // return accu.concat(selfFlat.call(cur, depth - 1));
    } else {
      return [...accu, cur];
      // 也可以使用ES5的concat方法
      // return accu.concat(cur);
    }
  }, []);
};

Array.prototype.selfFlat ||
  Object.defineProperty(Array.prototype, 'selfFlat', {
    value: selfFlat,
    enumerable: false,
    configurable: true,
    writable: true
  });

const arr = [1, [2, [3, [4, [5]]]]];
const flattedArr = arr.selfFlat();
console.log(`flattedArr`, flattedArr); // flattedArr [ 2, [ 3, [ 4, [5] ] ] ]
const flattedArr2 = arr.selfFlat(Number.POSITIVE_INFINITY);
console.log(`flattedArr2`, flattedArr2); // flattedArr2 [ 1, 2, 3, 4, 5 ]
```

因为 `selfFlat` 是依赖 `this` 指向的，所以在 `reduce` 遍历时需要指定 `selfFlat` 的 `this` 指向，否则会默认指向 `window` 从而发生错误
原理通过 `reduce` 遍历数组，遇到数组的某个元素仍是数组时，通过 `ES6` 的扩展运算符对其进行降维（`ES5` 可以使用 `concat` 方法），而这个数组元素可能内部还嵌套数组，所以需要递归调用 `selfFlat`
同时原生的 `flat` 方法支持一个 `depth` 参数表示降维的深度，默认为 `1` 即给数组降一层维度
传入 `Number.POSITIVE_INFINITY`(正无穷大) 会将传入的数组变成一个一维数组， 原理是每递归一次将 `depth` 参数减 1，如果 `depth` 参数为 0 时，直接返回原数组

## 9. 实现 ES6 的 class 语法

```js
// 简单模拟ES6的class实现
// class Animal {
//     constructor(name) {
//         this.name = name
//     }
//
//     sleep() {
//         console.log('animal is sleeping')
//     }
//
//     static staticFunc() {
//         console.log('staticFunc')
//     }
// }
//
// class Dog extends Animal {
//     constructor(name, color) {
//         super(name)
//         this.color = color
//     }
//
//     barking() {
//         console.log('wang!')
//     }
// }
//
// let brownTeddy = new Dog('teddy', 'brown')
// Dog.staticFunc()
// console.log(brownTeddy)
// brownTeddy.sleep()
// brownTeddy.barking()

function Animal(name) {
  this.name = name;
}

Animal.staticFunc = function() {
  console.log('staticFunc');
};
Animal.prototype.sleep = function() {
  console.log('animal is sleeping');
};

function Dog(name, color) {
  Animal.call(this, name);
  this.color = color;
}
// 寄生组合式继承 + 构造函数之间的继承
function inherit(subType, superType) {
  //由于JavaScript引用类型和函数按值传递的特性，不能改变subType的引用地址
  subType.prototype = Object.create(superType.prototype, {
    constructor: {
      // 指向子类，和默认的继承行为保持一致
      value: subType,
      enumerable: false,
      configurable: true,
      writable: true
    }
  });
  //子构造函数继承父构造函数(为了子类继承父类的静态方法和静态属性)
  Object.setPrototypeOf(subType, superType);
}

inherit(Dog, Animal);

//需要在继承之后再往Dog中添加原型方法，否则会被覆盖掉
Dog.prototype.barking = function() {
  console.log('wang!');
};

let brownTeddy = new Dog('teddy', 'brown');
Dog.staticFunc();
console.log(brownTeddy);
brownTeddy.sleep();
brownTeddy.barking();
```

`ES6` 的 `class` 内部是基于寄生组合式继承，它是目前最理想的继承方式，通过 `Object.create` 方法创造一个空对象，并将这个空对象继承 `Object.create` 方法的参数，再让子类（`subType`）的原型对象等于这个空对象，就可以实现子类实例的原型等于这个空对象，而这个空对象的原型又等于父类原型对象（superType.prototype）的继承关系

而 `Object.create` 支持第二个参数，即给生成的空对象定义属性和属性描述符/访问器描述符，我们可以给这个空对象定义一个 `constructor` 属性更加符合默认的继承行为，同时它是不可枚举的内部属性（`enumerable:false`）

而 `ES6` 的 `class` 允许子类继承父类的静态方法和静态属性，而普通的寄生组合式继承只能做到实例与实例之间的继承，对于类与类之间的继承需要额外定义方法，这里使用 `Object.setPrototypeOf` 将 `superType` 设置为 `subType` 的原型，从而能够从父类中继承静态方法和静态属性

## 10. 函数柯里化

```js
const curry = function(fn) {
  // fn.length fn函数参数的个数
  if (fn.length <= 1) return fn;
  // 根据拆分成的一个参数的多个函数生 -> 只有多个参数的一个函数
  const generatorFn = (...args) => {
    // 如果参数收集完毕，就执行回调fn
    if (fn.length === args.length) {
      // 需要将参数数组在一一展开传入
      return fn(...args);
    } else {
      // 没收集完就递归收集
      return (...args2) => {
        return generatorFn(...args, ...args2);
        // return generatorFn(...args.concat(args2));
      };
    }
  };
  return generatorFn;
};
const display = (a, b, c, d, e, f, g, h) => [a, b, c, d, e, f, g, h];
const curriedDisplay = curry(display);
console.log('curriedDisplay', curriedDisplay(1)(2)(3)(4)(5)(6)(7)(8)); // curriedDisplay [ 1, 2, 3, 4, 5, 6, 7, 8 ]

// ES6简写
const curry2 = fn => {
  // fn.length fn函数参数的个数
  if (fn.length <= 1) return fn;
  const generatorFn = (...args) =>
    fn.length === args.length ? fn(...args) : (...args2) => generatorFn(...args, ...args2);
  return generatorFn;
};
const curriedDisplay2 = curry2(display);
console.log('curriedDisplay2', curriedDisplay2(1)(2)(3)(4)(5)(6)(7)(8)); // curriedDisplay2 [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```

柯里化是函数式编程的一个重要技巧，将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

函数式编程另一个重要的函数 `compose`，能够将函数进行组合，而组合的函数只接受一个参数，所以如果有接受多个函数的需求并且需要用到 `compose` 进行函数组合，就需要使用柯里化对准备组合的函数进行部分求值，让它始终只接受一个参数

借用冴羽博客中的一个例子

![curry](./js-skills2/images/curry.png)

## 11. 函数柯里化（支持占位符）

```js
/**
 * @description 函数柯里化（ 支持占位符版本）
 * @param {function} fn fn - 柯里化的函数
 * @param {String} [placeholder = "_"] - 占位符
 */
const curry3 = (fn, placeholder = '_') => {
  curry3.placeholder = placeholder;
  if (fn.length <= 1) return fn;
  let argsList = [];
  const generator = (...args) => {
    let currentPlaceholderIndex = -1; // 记录了非当前轮最近的一个占位符下标，防止当前轮元素覆盖了当前轮的占位符
    args.forEach(arg => {
      let placeholderIndex = argsList.findIndex(item => item === curry3.placeholder);
      if (placeholderIndex < 0) {
        // 如果数组中没有占位符直接往数组末尾放入一个元素
        currentPlaceholderIndex = argsList.push(arg) - 1;
        // 防止将元素填充到当前轮参数的占位符
        // (1,'_')('_',2) 数字2应该填充1后面的占位符，不能是2前面的占位符
      } else if (placeholderIndex !== currentPlaceholderIndex) {
        argsList[placeholderIndex] = arg;
      } else {
        // 当前元素是占位符的情况
        argsList.push(arg);
      }
    });
    let realArgsList = argsList.filter(arg => arg !== curry3.placeholder); //过滤出不含占位符的数组
    if (realArgsList.length >= fn.length) {
      return fn(...argsList);
    } else {
      return generator;
    }
  };

  return generator;
};

const curriedDisplay3 = curry3(display);
console.log('curriedDisplay3', curriedDisplay3('_', 2)(1, '_', 4)(3, '_')('_', 5)(6)(7, 8));
// curriedDisplay3 [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```

通过占位符能让柯里化更加灵活，实现思路是，每一轮传入的参数先去填充上一轮的占位符，如果当前轮参数含有占位符，则放到内部保存的数组末尾，当前轮的元素不会去填充当前轮参数的占位符，只会填充之前传入的占位符

## 12. 偏函数

```js
// 偏函数

const display = (a, b, c, d, e, f, g, h) => [a, b, c, d, e, f, g, h];

/**
 * @description 偏函数（创建已经设置好一个或多个参数的函数,并且添加了占位符功能）
 * @param {Function} func -部分求值的函数
 * @param {...*} [args] -部分求值的参数
 * @return {Function} -部分求值后的函数
 **/

const partialFunc = (func, ...args) => {
  let placeholderNum = 0;
  return (...args2) => {
    args2.forEach(arg => {
      const index = args.findIndex(item => item === '_');
      if (index < 0) return;
      // 将placeholder转为args2中的值
      args[index] = arg;
      placeholderNum++;
    });
    // 如果占位符后面的还有元素，就继续截取处理
    if (placeholderNum < args2.length) {
      args2 = args2.slice(placeholderNum, args2.length);
    }
    return func.apply(this, [...args, ...args2]);
  };
};

let partialDisplay = partialFunc(display, 1, 2);
console.log('partialFunc', partialDisplay(3, 4, 5, 6, 7, 8));
// partialFunc [ 1, 2, 3, 4, 5, 6, 7, 8 ]

let partialDisplay2 = partialFunc(display, '_', 2, '_'); // 使用占位符
console.log('partialFunc2', partialDisplay2(1, 3, 4, 5, 6, 7, 8));
// partialFunc2 [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```
