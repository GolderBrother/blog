// new 关键字

const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null;

const selfNew = function(fn, ...rest) {
  const instance = Object.create(fn.prototype);
  const res = fn.apply(instance, rest);
  // 如果值是对象或者函数类型，则返回对象，否则返回实例
  return isComplexDataType(res) ? res : instance;
}

function Person(name, sex) {
  this.name = name
  this.sex = sex
}


let newPerson = new Person('zyh', 'male')
let selfNewPerson = selfNew(Person, 'zyh', 'male')

console.log(newPerson)
console.log(selfNewPerson)

// Person { name: 'zyh', sex: 'male' }
// Person { name: 'zyh', sex: 'male' }