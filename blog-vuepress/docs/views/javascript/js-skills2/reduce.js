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
}

Array.prototype.selfReduce || (Object.defineProperty(Array.prototype, 'selfReduce', {
  value: selfReduce,
  enumerable: false,
  writable: true,
  configurable: true
}));

const arr = ['hello', 'javascript'];
const arrString = arr.selfReduce((accu, cur, index, arr) => accu = accu + ' ' + cur, '');
console.log('arrString', arrString); // hello javascript

// 因为可能存在稀疏数组的关系，所以 reduce 实现略有点复杂，需要保证跳过稀疏元素，遍历正确的元素和下标