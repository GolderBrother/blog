// 8. 使用 reduce 实现数组的 flat 方法

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

Array.prototype.selfFlat || Object.defineProperty(Array.prototype, 'selfFlat', {
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