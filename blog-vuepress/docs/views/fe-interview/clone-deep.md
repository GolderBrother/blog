# 面试题之如何实现一个深拷贝

这里使用了 Reflect.ownKeys() 获取所有的键值，同时包括 Symbol，对 source 遍历赋值即可。

```js
function cloneDeep4(source, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source);

  let target = Array.isArray(source) ? [...source] : { ...source }; // 改动 1
  hash.set(source, target);

  Reflect.ownKeys(target).forEach(key => {
    // 改动 2
    if (isObject(source[key])) {
      target[key] = cloneDeep4(source[key], hash);
    } else {
      target[key] = source[key];
    }
  });
  return target;
}
```
