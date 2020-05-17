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
}

Array.prototype.selfSome || (Object.defineProperty(Array.prototype, 'selfSome', {
  value: selfSome,
  enumerable: false,
  configurable: true,
  writable: true
}));

const arr = ['html', 'css', 'javascript'];
const hasJavascript = arr.selfSome(item => item === 'javascript');
const hasNode = arr.selfSome(item => item === 'node');
console.log(`hasJavascript`, hasJavascript); // hasJavascript true
console.log(`hasNode`, hasNode); // hasNode false

// 执行 some 方法的数组如果是一个空数组，最终始终会返回 false，而另一个数组的 every 方法中的数组如果是一个空数组，会始终返回 true

console.log([].some(item => item === 'javascript')); // false
console.log([].every(item => item === 'javascript')); // true