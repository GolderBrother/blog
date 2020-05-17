// ES5 实现数组 filter 方法
const selfFilter = function(fn, context) {
  const arr = Array.prototype.slice.call(this);
  const filteredArr = [];
  for (let index = 0; index < arr.length; index++) {
    if (!arr.hasOwnProperty(index)) continue;
    fn.call(context, arr[index], index, this) && filteredArr.push(arr[index]);
  }
  return filteredArr;
}

Array.prototype.selfFilter || (Object.defineProperty(Array.prototype, 'selfFilter', {
  value: selfFilter,
  enumerable: false,
  configurable: true,
  writable: true
}));

const arr = ['html', 'css', 'javascript'];
const arr2 = arr.selfFilter(item => item === 'javascript');
console.log(`arr2`, arr2); // arr2 [ 'javascript' ]

const selfFilter2 = function(fn, context) {
  const arr = this.reduce((accu, cur, index) => fn.call(context, cur, index, this) ? [...accu, cur] : [...accu], []);
  return arr;
}

Array.prototype.selfFilter2 || (Object.defineProperty(Array.prototype, 'selfFilter2', {
  value: selfFilter2,
  enumerable: false,
  configurable: true,
  writable: true
}));

const arr3 = arr.selfFilter2(item => item === 'javascript');
console.log(`arr3`, arr3); // arr3 [ 'javascript' ]