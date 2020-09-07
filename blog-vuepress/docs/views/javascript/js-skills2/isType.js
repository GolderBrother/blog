// 使用 Object.prototype.toString 配合闭包，通过传入不同的判断类型来返回不同的判断函数，一行代码，简洁优雅灵活（注意传入 type 参数时首字母大写）
// 不推荐将这个函数用来检测可能会产生包装类型的基本数据类型上,因为 call 始终会将第一个参数进行装箱操作，导致基本类型和包装类型无法区分

/**
 * 判断对象的数据类型
 * @param {*} type 对象类型(首字母需要大写)
 */
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
const isArray = isType('Array');
const isObject = isType('Object');
console.log(isArray([])); // true
console.log(isObject([])); // false
console.log(isObject({})); // true
console.log(isObject(null)); // false