function sum(...args) {
  function currySum(...rest) {
    args.push(...rest)
    return currySum
  }
  currySum.toString = function() {
    return args.reduce((result, cur) => {
      return result + cur
    })
  }
  currySum.toNumber = function() {
    return args.reduce((result, cur) => {
      return result + cur
    })
  }
  return currySum
}

const num = sum(1, 2, 3);
const num2 = sum(1)(2)(3);
console.log(`num`, num);
console.log(`num2`, num2);