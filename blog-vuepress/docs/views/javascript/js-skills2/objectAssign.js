// 实现 Object.assign

const isComplexDataType = obj => obj !== null && (typeof obj === 'object' || typeof obj === 'function');

// 简单实现ES6的Object.assign
const selfAssign = function(target, ...source) {
  if (target == null) throw new Error(`Cannot convert undefined or null to object`);
  return source.reduce((accu, cur) => {
    // 如果不是复杂数据类型，就包装成基本包装类型
    !isComplexDataType(accu) && (accu = new Object(accu));
    //source为null,undefined时忽略
    if (cur == null) return accu;
    // 遍历出Symbol属性和可枚举属性
    [...Object.keys(cur), ...Object.getOwnPropertySymbols(cur)].forEach(key => {
      accu[key] = cur[key];
    });
    return accu;
  }, target);
}

Object.selfAssign || Object.defineProperty(Object, 'selfAssign', {
  value: selfAssign,
  configurable: true,
  enumerable: false,
  writable: false
});

let target = {
  a: 1,
  b: 1
}

let obj1 = {
  a: 2,
  b: 2,
  c: undefined
}

let obj2 = {
  a: 3,
  b: 3,
  // Symbol类型
  [Symbol.for("a")]: 3,
  d: null
}

console.log(Object.selfAssign(target, obj1, obj2))
// { a: 3, b: 3, c: undefined, d: null, [Symbol(a)]: 3 }
console.log(Object.selfAssign("abd", null, undefined))