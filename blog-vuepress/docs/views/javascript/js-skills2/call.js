// 实现函数 call 方法

const selfCall = function(context, ...args) {
  // 获取call绑定的函数
  const func = this;
  context = context || window;
  if (typeof func !== 'function') throw new Error('this is not a function');
  // 将要执行的函数赋值到新的上下文中,这里使用ES6 的 Symbol 类型，为了防止属性冲突
  const caller = Symbol.for('caller');
  context[caller] = func;
  // 执行创建的函数，接受可能传入的参数并传入
  const res = context[caller](...args);
  // 执行完，删除临时赋值到上下文函数
  delete context[caller];
  // 返回新的执行结果
  return res;
}

Function.prototype.selfCall || (Object.defineProperty(Function.prototype, 'selfCall', {
  value: selfCall,
  enumerable: false,
  configurable: true,
  writable: false
}));
const a = 1;

function func() {
  console.log(this.a);
}
let example2 = {
  a: 2
}
func.selfCall(example2)
console.log(example2)

// 2
// { a: 2 }