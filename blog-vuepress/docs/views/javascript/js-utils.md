# 书到用时方恨少，一大波JS开发工具函数来了

## 前言

在我们日常开发的时候，可能会遇到各种各样的需求，但是自己一时半会儿可能找不到合适的办法去解决。书到用时方恨少，下面的这些JavaScript的工具函数可能就会派上大用场了，我们可以进行复用，提高我们的工作效率。

我把下面的方法都大致分了个类, 然后放在了我的[GitHub](https://github.com/GolderBrother/blog/tree/master/javascript/jstUtils)上。大家可以clone下来直接使用，也可以在需要用到时在里面去查找，善用`ctrl+F`。

这个仓库也会持更新的，如果里面没有，但是需要用到的工具函数，大家也可以在[issues](https://github.com/GolderBrother/blog/issues)提出来，说不定就帮到了别人哟~

以下所有方法**亲测可用**!!!

## 正则校验check工具函数

这里的正则表达式主要参考了[any-rule](https://github.com/any86/any-rule)。

### 验证不能包含字母

```js
/**
 * @param { string } value
 */
// [^A-Za-z] 排除字母之外的所有字符
export const isNoWord = value => /^[^A-Za-z]*$/g.test(value);

// 验证
const noWordStr = '123_';
console.log(isNoWord(noWordStr)); // true
console.log(isNoWord('hello')); // false
```

## 验证中文和数字

```js
/**
 * @param { string } value
 */
export const isCHNAndEN = value => /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(value);

// 验证
const word = '前端超神路222';
console.log(isCHNAndEN(word)); // true
console.log(isCHNAndEN('hello')); // false
```

### 验证邮政编码(中国)

```js
/**
 * @param { string } value
 */
export const isPostcode = value => /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value);

// 验证
console.log(isPostcode('361000')); // true
console.log(isPostcode('999999')); // false
```

### 验证微信号，6至20位，以字母开头，字母，数字，减号，下划线

```js
/**
 * @param { string } value
 */
export const isWeChatNum = value => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(value);

// 验证
console.log(isWeChatNum(`goodnight-mylove123`)); // true
console.log(isWeChatNum(`晚安，醒来记得想我`)); // false
```

### 验证16进制颜色

```js
/**
 * @param { string } value
 */
export const isColor16 = value => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(value);

// 验证
console.log(isColor16(`#7ac143`)); // true
console.log(isColor16(`#333333e8`)); // false
```

### 验证火车车次

```js
/**
 * @param { string } value
 */
export const isTrainNum = value => /^[GCDZTSPKXLY1-9]\d{1,4}$/g.test(value);

// 验证
console.log(isTrainNum(`D6426`)); // true
console.log(isTrainNum(`D64261`)); // false
```

### 验证手机机身码(IMEI)

```js
/**
 *  @param { string } value
 */
export const isIMEI = value => /^\d{15,17}$/g.test(value);

// 验证
console.log(isIMEI(123456789123456)); // true
console.log(isIMEI(123456789123456789)); // false
```

### 验证必须带端口号的网址(或ip)

```js
/**
 * @param { string } value
 */
export const isHttpAndPort = value => /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value);

// 验证
console.log(isHttpAndPort(`http://www.golderbrother.cn:8090/`)); // true
console.log(isHttpAndPort(`http://www.golderbrother.cn/`)); // false
```

### 验证网址(支持端口和"?+参数"和"#+参数)

```js
/**
 *  @param { string } value
 */
export const isRightWebsite = value => /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(value);

// 验证
console.log(isRightWebsite(`http://golderbrother.cn:8090/#/recommend`)); // true
console.log(isRightWebsite(`http://www.golderbrother.cn/`)); // true
```

### 验证统一社会信用代码

```js
/**
 *  @param { string } value
 */
export const isCreditCode = value => /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g.test(value);

// 验证
console.log(isCreditCode(`91350200MA31KB4599`));  // true
```

### 验证迅雷链接

```js
/**
 *  @param { string } value
 */
export const isThunderLink = value => /^thunderx?:\/\/[a-zA-Z\d]+=$/g.test(value);

console.log(isThunderLink(`thunderx://baidu=`)); // true
```

### 验证ed2k链接(宽松匹配)

```js
/**
 *  @param { string } value
 */
export const ised2k = value => /^ed2k:\/\/\|file\|.+\|\/$/g.test(value);

console.log(ised2k(`ed2k://|file|xxx|/`)); // true
```

### 验证磁力链接(宽松匹配)

```js
/**
 *  @param { string } value
 */
export const isMagnet = value => /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/g.test(value);

```
