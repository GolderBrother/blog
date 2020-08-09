// 写一个惊艳面试官的深拷贝

const OBJECT_TYPES = [{}, [], new Map(), new Set(), new Error(), new Date(), /^$/].map(getType);
const MAP_TYPE = getType(new Map());
const SET_TYPE = getType(new Set());
const SYMBOL_TYPE = getType(Symbol('hello'));
const REGEXP_TYPE = getType(/^$/);
const CONSTRUCTOR_TYPE = [new Error(), new Date()].map(getType);
function getType(source) {
  return Object.prototype.toString.call(source);
}

function cloneDeep(source, map = new Map()) {
  const type = getType(source);
  if (!OBJECT_TYPES.includes(type)) {
    // 基本类型的直接返回，比如 string、number、boolean等
    return source;
  }
  if (map.get(source)) return map.get(source);
  if (CONSTRUCTOR_TYPE.includes(type)) {
    // 手动new一个
    // new Date(oldDate)、new Error(oldError)
    return new source.constructor(source);
  }

  const target = new source.constructor(); // {} []
  map.set(source, target);

  // symbol类型
  if (SYMBOL_TYPE === type) {
    // symbol的包装成对象
    return Object(Symbol.prototype.valueOf.call(source));
  }

  if (REGEXP_TYPE === type) {
    const flags = /\w*$/;
    // source.source: 匹配正则字符串 flags.exec(source): 匹配标识符
    const target = new RegExp(source.source, flags.exec(source));
    // lastIndex还原
    target.lastIndex = source.lastIndex;
    return target;
  }

  if (SET_TYPE === type) {
    source.forEach(value => target.add(cloneDeep(value, map)));
    return target;
  }

  if (MAP_TYPE === type) {
    source.forEach((value, key) => target.set(key, cloneDeep(value, map)));
  }

  // 耗时: 3195.835ms
  // for (const key in source) {
  //     if (source.hasOwnProperty(key)) {
  //         target[key] = cloneDeep(source[key], map);
  //     }
  // }

  // 耗时: 3005.832ms
  const keys = Object.keys(source);
  let index = 0, length = keys.length;
  // while循环性能比forin循环好点，所以使用while循环代替
  while (index < length) {
    const key = keys[index];
    target[key] = cloneDeep(source[key], map);
    index++;
  }

  return target;
}

let obj = {
  date: new Date(),
  married: true,
  age: 10,
  name: 'zhufeng',
  girlfriend: null,
  boyfriend: undefined,
  symbol: Symbol('man'),
  home: { name: '北京' },
  set: new Set(),
  map: new Map(),
  getName: function () { },
  hobbies: ['抽烟', '喝酒', '烫头'],
  error: new Error('error'),
  pattern: /^regexp$/ig,
  math: Math,
  json: JSON,
  // document: document,
  // window: window
};
// console.time('耗时');
// for(let i = 0; i < 100000; i++) {
//     cloneDeep(obj)
// }
// console.timeEnd('耗时');
console.log(cloneDeep(obj));

// { date: 2020-08-09T03:10:52.280Z,
//   married: true,
//   age: 10,
//   name: 'zhufeng',
//   girlfriend: null,
//   boyfriend: undefined,
//   symbol: Symbol(man),
//   home: { name: '北京' },
//   set: Set {},
//   map: Map {},
//   getName: [Function: getName],
//   hobbies: [ '抽烟', '喝酒', '烫头' ],
//   error:
//    Error: Error: error
//        at cloneDeep (d:\front-end\code\blog\blog-vuepress\docs\views\fe-interview\clone-deep-pro.js:23:16)
//        at cloneDeep (d:\front-end\code\blog\blog-vuepress\docs\views\fe-interview\clone-deep-pro.js:66:23)
//        at Object.<anonymous> (d:\front-end\code\blog\blog-vuepress\docs\views\fe-interview\clone-deep-pro.js:98:13)
//        at Module._compile (internal/modules/cjs/loader.js:776:30)
//        at Object.Module._extensions..js (internal/modules/cjs/loader.js:787:10)
//        at Module.load (internal/modules/cjs/loader.js:653:32)
//        at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
//        at Function.Module._load (internal/modules/cjs/loader.js:585:3)
//        at Function.Module.runMain (internal/modules/cjs/loader.js:829:12)
//        at startup (internal/bootstrap/node.js:283:19),
//   pattern: /^regexp$/gi,
//   math: Object [Math] {},
//   json: Object [JSON] {}