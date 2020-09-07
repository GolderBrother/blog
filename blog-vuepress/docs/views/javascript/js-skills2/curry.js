// 函数柯里化

const curry = function(fn) {
  // fn.length fn函数参数的个数
  if (fn.length <= 1) return fn;
  // 根据拆分成的一个参数的多个函数生 -> 只有多个参数的一个函数
  const generatorFn = (...args) => {
    // 如果参数收集完毕，就执行回调fn
    if (fn.length === args.length) {
      // 需要将参数数组在一一展开传入
      return fn(...args);
    } else { // 没收集完就递归收集
      return (...args2) => {
        return generatorFn(...args, ...args2);
        // return generatorFn(...args.concat(args2));
      }
    }
  }
  return generatorFn;
}
const display = (a, b, c, d, e, f, g, h) => [a, b, c, d, e, f, g, h];
const curriedDisplay = curry(display);
console.log("curriedDisplay", curriedDisplay(1)(2)(3)(4)(5)(6)(7)(8)); // curriedDisplay [ 1, 2, 3, 4, 5, 6, 7, 8 ]

// ES6简写
const curry2 = fn => {
  // fn.length fn函数参数的个数
  if (fn.length <= 1) return fn;
  const generatorFn = (...args) => fn.length === args.length ? fn(...args) : (...args2) => generatorFn(...args, ...args2);
  return generatorFn;
}
const curriedDisplay2 = curry2(display);
console.log("curriedDisplay2", curriedDisplay2(1)(2)(3)(4)(5)(6)(7)(8)); // curriedDisplay2 [ 1, 2, 3, 4, 5, 6, 7, 8 ]


/**
 * @description 函数柯里化（ 支持占位符版本）
 * @param {function} fn - 柯里化的函数
 * @param {String} [placeholder = "_"] - 占位符 
 */
const curry3 = (fn, placeholder = "_") => {
  curry3.placeholder = placeholder
  if (fn.length <= 1) return fn;
  let argsList = []
  const generator = (...args) => {
    let currentPlaceholderIndex = -1 // 记录了非当前轮最近的一个占位符下标，防止当前轮元素覆盖了当前轮的占位符
    args.forEach(arg => {
      let placeholderIndex = argsList.findIndex(item => item === curry3.placeholder)
      if (placeholderIndex < 0) { // 如果数组中没有占位符直接往数组末尾放入一个元素
        currentPlaceholderIndex = argsList.push(arg) - 1
        // 防止将元素填充到当前轮参数的占位符
        // (1,'_')('_',2) 数字2应该填充1后面的占位符，不能是2前面的占位符
      } else if (placeholderIndex !== currentPlaceholderIndex) {
        argsList[placeholderIndex] = arg
      } else { // 当前元素是占位符的情况
        argsList.push(arg)
      }
    })
    let realArgsList = argsList.filter(arg => arg !== curry3.placeholder) //过滤出不含占位符的数组
    if (realArgsList.length >= fn.length) {
      return fn(...argsList)
    } else {
      return generator
    }
  }

  return generator
}

const curriedDisplay3 = curry3(display);
console.log("curriedDisplay3", curriedDisplay3('_', 2)(1, '_', 4)(3, '_')('_', 5)(6)(7, 8))
// curriedDisplay3 [ 1, 2, 3, 4, 5, 6, 7, 8 ]

const compose = function(...fns) {
  return function(initValue) {
    return fns.reduceRight((acc, cur) => {
      // 将前面的函数执行结果依次放入到当前函数中
      return cur(acc)
    }, initValue)
  }
}

// @example 函数组合 + 函数柯里化

const curriedJoin = curry3((separator, arr) => arr.join(separator))
const curriedMap = curry3((fn, arr) => arr.map(fn))
const curriedSplit = curry3((separator, str) => str.split(separator))

const composeFunc = compose(
  curriedJoin("1"),
  curriedMap(item => `${item}1`),
  curriedSplit(""),
)

console.log("compose + curry", composeFunc('helloworld'))
// compose + curry h11e11l11l11o11w11o11r11l11d1