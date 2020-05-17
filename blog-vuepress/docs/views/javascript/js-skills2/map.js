// 循环实现map
const selfMap = function(fn, context) {
  const arr = Array.prototype.slice.call(this);
  let mappedArr = [];
  for (let index = 0; index < arr.length; index++) {
    // 对稀疏数组的处理，通过 hasOwnProperty 来判断当前下标的元素是否存在与数组中
    if (!arr.hasOwnProperty(index)) continue;
    // 思路是每个元素都添加一个对应的回调, 三个参数分别为当前项 当前项索引 数组本身
    mappedArr.push(fn.call(context, arr[index], index, this));
  }
  return mappedArr;
}

// reduce实现map
const selfMap2 = function(fn, context) {
  const arr = Array.prototype.slice.call(this);
  return arr.reduce((accu, cur, index) => [...accu, fn.call(context, cur, index, this)], [])
}

// 放到数组原型上
Array.prototype.selfMap || (Object.defineProperty(Array.prototype, 'selfMap', {
  value: selfMap,
  enumerable: false,
  configurable: true,
  writable: true
}));

Array.prototype.selfMap2 || (Object.defineProperty(Array.prototype, 'selfMap2', {
  value: selfMap2,
  enumerable: false,
  configurable: true,
  writable: true
}));
const arr = ['a', 'b', 'c', 'd'];
const arr2 = arr.selfMap(item => item + '~');
console.log(`arr2`, arr2); // arr2 [ 'a~', 'b~', 'c~', 'd~' ]

const arr3 = arr.selfMap(item => item + '~');
console.log(`arr3`, arr3); // arr3 [ 'a~', 'b~', 'c~', 'd~' ]