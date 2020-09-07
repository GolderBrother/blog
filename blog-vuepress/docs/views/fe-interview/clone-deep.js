function isObject(source){
    return typeof source === 'object' && source !== null;
}
function cloneDeep(source, hash = new WeakMap()) {
    if (!isObject(source)) return source;
    if (hash.has(source)) return hash.get(source);

    let target = Array.isArray(source) ? [...source] : { ...source }; // 改动 1
    hash.set(source, target);

    Reflect.ownKeys(target).forEach(key => {
        // 改动 2
        if (isObject(source[key])) {
            target[key] = cloneDeep(source[key], hash);
        } else {
            target[key] = source[key];
        }
    });
    return target;
}
let obj = {
    date: new Date(),
    married: true,
    age: 10,
    name: 'zhufeng',
    girlfriend: null,
    boyfriend: undefined,
    flag: Symbol('man'),
    home: { name: '北京' },
    set: new Set(),
    map: new Map(),
    getName: function () { },
    hobbies: ['抽烟', '喝酒', '烫头'],
    error: new Error('error'),
    pattern: /^regexp$/ig,
    symbol: Symbol('symbol'),
    math: Math,
    json: JSON,
    // document: document,
    // window: window
};
console.log(cloneDeep(obj));

// { 
//   date: {},
//   married: true,
//   age: 10,
//   name: 'zhufeng',
//   girlfriend: null,
//   boyfriend: undefined,
//   flag: Symbol(man),
//   home: { name: '北京' },
//   set: {},
//   map: {},
//   getName: [Function: getName],
//   hobbies: [ '抽烟', '喝酒', '烫头' ],
//   error: {},
//   pattern: {},
//   symbol: Symbol(symbol),
//   math: {},
//   json: {}
// }
