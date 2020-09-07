// instanceof

const selfInstanceof = function(left, right) {
  // 获取[原型] left.__proto__
  let proto = Object.getPrototypeOf(left);
  // 递归遍历 right 参数的原型链，每次和 left 参数作比较，遍历到原型链终点时则返回 false，找到则返回 true
  while (true) {
    // 原型链终点时则返回 false
    if (proto == null) return false;
    if (proto == right.prototype) return true;
    // 继续通过[原型]__proto__ 属性获取原型
    proto = Object.getPrototypeOf(left);
  }

}

console.log(selfInstanceof({}, Array)) // false