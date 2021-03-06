# 书到用时方恨少，一大波 JS 开发工具函数来了

## 前言

在我们日常开发的时候，可能会遇到各种各样的需求，但是自己一时半会儿可能找不到合适的办法去解决。书到用时方恨少，下面的这些 JavaScript 的工具函数可能就会派上大用场了，我们可以进行复用，提高我们的工作效率。

我把下面的方法都大致分了个类, 然后放在了我的[GitHub](https://github.com/GolderBrother/blog/tree/master/javascript/jstUtils)上。大家可以 clone 下来直接使用，也可以在需要用到时在里面去查找，善用`ctrl+F`。

这个仓库也会持更新的，如果里面没有，但是需要用到的工具函数，大家也可以在[issues](https://github.com/GolderBrother/blog/issues)提出来，说不定就帮到了别人哟~

以下所有方法**亲测可用**!!!

## 正则校验 check 工具函数

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
export const isCHNAndEN = value =>
  /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(
    value
  );

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
export const isPostcode = value =>
  /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value);

// 验证
console.log(isPostcode('361000')); // true
console.log(isPostcode('999999')); // false
```

### 验证微信号，6 至 20 位，以字母开头，字母，数字，减号，下划线

```js
/**
 * @param { string } value
 */
export const isWeChatNum = value => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(value);

// 验证
console.log(isWeChatNum(`goodnight-mylove123`)); // true
console.log(isWeChatNum(`晚安，醒来记得想我`)); // false
```

### 验证 16 进制颜色

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

### 验证必须带端口号的网址(或 ip)

```js
/**
 * @param { string } value
 */
export const isHttpAndPort = value =>
  /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value);

// 验证
console.log(isHttpAndPort(`http://www.golderbrother.cn:8090/`)); // true
console.log(isHttpAndPort(`http://www.golderbrother.cn/`)); // false
```

### 验证网址(支持端口和"?+参数"和"#+参数)

```js
/**
 *  @param { string } value
 */
export const isRightWebsite = value =>
  /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(value);

// 验证
console.log(isRightWebsite(`http://golderbrother.cn:8090/#/recommend`)); // true
console.log(isRightWebsite(`http://www.golderbrother.cn/`)); // true
```

### 验证统一社会信用代码

```js
/**
 *  @param { string } value
 */
export const isCreditCode = value =>
  /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g.test(value);

// 验证
console.log(isCreditCode(`91350200MA31KB4599`)); // true
```

### 验证迅雷链接

```js
/**
 *  @param { string } value
 */
export const isThunderLink = value => /^thunderx?:\/\/[a-zA-Z\d]+=$/g.test(value);

// 验证
console.log(isThunderLink(`thunderx://baidu=`)); // true
```

### 验证 ed2k 链接(宽松匹配)

```js
/**
 *  @param { string } value
 */
export const ised2k = value => /^ed2k:\/\/\|file\|.+\|\/$/g.test(value);

// 验证
console.log(ised2k(`ed2k://|file|xxx|/`)); // true
```

### 验证磁力链接(宽松匹配)

```js
/**
 *  @param { string } value
 */
export const isMagnet = value => /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/g.test(value);

// 验证
console.log(
  isMagnet(`magnet:?xt=urn:btih:123golderbrotherGolderBrother123golderbrotherGolderBrother`)
); //false
```

### 验证子网掩码

```js
/**
 *  @param { string } value
 */
export const isSubnetMask = value =>
  /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/g.test(value);

// 验证
console.log(isSubnetMask(`255.255.255.0`)); // true
console.log(isSubnetMask(`http://116.62.6.228/`)); // false
```

### 验证 linux"文件夹"路径

```js
/**
 *  @param { string } value
 */
export const isLinuxFolderPath = value => /^(\/[^/]+)+\/?$/g.test(value);

// 验证
console.log(isLinuxFolderPath(`/james/my/code/blog`)); // true
console.log(isLinuxFolderPath(`D:\\james\\my\\blog`)); // false
```

### 验证 linux"文件"路径

```js
/**
 *  @param { string } value
 */
export const isLinuxFilePath = value => /^(\/[^/]+)+$/g.test(value);

// 验证
console.log(isLinuxFilePath(`/d/james/my/code/blog/blog-vuepress/js-utils.md`)); // true
console.log(
  isLinuxFilePath(
    `https://github.com/GolderBrother/blog/blob/ed589cc373d5bccc5ac25b3500571a36dd77fae8/blog-vuepress/docs/views/javascript/js-utils.md`
  )
); // false
```

### 验证 window"文件夹"路径

```js
/**
 *  @param { string } value
 */
export const isWindowsFolderPath = value => /^[a-zA-Z]:\\(?:\w+\\?)*$/g.test(value);

// 验证
console.log(isWindowsFolderPath(`D:\james\my\code\blog`)); // false
```

### 验证 window 下"文件"路径

```js
/**
 *  @param { string } value
 */
export const isWindowsFilePath = value => /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/g.test(value);

// 验证
console.log(isWindowsFolderPath(`D:\james\my\code\blog\code\javascript\jsUtils\README.md`)); // false
```

### 验证股票代码(A 股)

```js
/**
 *  @param { string } value
 */
export const isAShare = value =>
  /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/g.test(value);

console.log(isAShare(`LK`)); // false
console.log(isAShare(`09988.HK`)); // alibaba false
```

### 验证版本号格式必须为 X.Y.Z

```js
/**
 *  @param { string } value
 */
export const isVersion = value => /^\d+(?:\.\d+){2}$/g.test(value);

// 验证
console.log(isVersion(`1.4.5`)); // true
console.log(isVersion(`1.4`)); // false
console.log(isVersion(`1.4.5.1`)); // false
```

### 验证视频链接地址（视频格式可按需增删）

```js
/**
 *  @param { string } value
 */
export const isVideoUrl = value =>
  /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i.test(value);

// 验证
console.log(isVideoUrl(`https://s2.luckincoffeecdn.com/luckywebrm/images/index/8sautoplay.mp4`)); // true
```

### 验证图片链接地址（图片格式可按需增删）

```js
/**
 *  @param { string } value
 */
export const isImageUrl = value =>
  /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(value);

// 验证
console.log(
  isImageUrl(`https://s2.luckincoffeecdn.com/luckywebrm/images/index/commitment/part_main-2.jpg`)
); // true
```

### 验证银行卡号（10 到 30 位, 覆盖对公/私账户, 参考微信支付）

```js
/**
 * @param { string } value
 */
export const isAccountNumber = value => /^[1-9]\d{9,29}$/g.test(value);

// 验证
console.log(isAccountNumber(`6228480688117346466`)); // true
```

### 验证中文姓名

```js
/**
 * @param { string } value
 */
export const isChineseName = value => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value);

// 验证
console.log(isChineseName(`神哥`)); // true
console.log(isChineseName(`GolderBrother`)); // false
```

### 验证英文姓名

```js
/**
 * @param { string } value
 */
export const isEnglishName = value => /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value);

// 验证
console.log(isEnglishName(`神哥`)); // false
console.log(isEnglishName(`GolderBrother`)); // true
```

### 验证车牌号(新能源汽车)

```js
/**
 * @param { string } value
 */
export const isLicensePlateNumberNER = value =>
  /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g.test(
    value
  );

// 验证
console.log(isLicensePlateNumberNER(`闽DD66666`)); // true 新能源
console.log(isLicensePlateNumberNER(`闽D66666`)); // false 非新能源
```

### 验证车牌号(非新能源)

```js
/**
 * @param { string } value
 */
export const isLicensePlateNumberNNER = value =>
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g.test(
    value
  );

// 验证
console.log(isLicensePlateNumberNNER(`闽D66666`)); // true 非新能源
console.log(isLicensePlateNumberNNER(`闽DD66666`)); // false 新能源
```

### 验证车牌号(新能源+非新能源)

```js
/**
 * @param { string } value
 */
export const isLicensePlateNumber = value =>
  /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g.test(
    value
  );

// 验证
console.log(isLicensePlateNumber(`闽D66666`)); // true 非新能源
console.log(isLicensePlateNumber(`闽DD66666`)); // true 新能源
```

### 验证手机号中国(严谨), 根据工信部 2019 年最新公布的手机号段

```js
/**
 * @param { string } value
 */
export const isMPStrict = value =>
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(
    value
  );

// 验证
console.log(isMPStrict(`18450087588`)); // true
```

### 验证手机号中国(宽松), 只要是 13,14,15,16,17,18,19 开头即可

```js
/**
 * @param { string } value
 */
export const isMPRelaxed = value => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value);

// 验证
console.log(isMPRelaxed(`18450087588`)); // true
```

### 验证 email(邮箱)

```js
/**
 * @param { string } value
 */
export const isEmail = value =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(
    value
  );

// 验证
console.log(isEmail(`1204788939@qq.com`)); // true
```

### 验证座机电话(国内),如: 0341-86091234

```js
/**
 * @param { string } value
 */
export const isLandlineTelephone = value => /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value);

// 验证
console.log(isLandlineTelephone(`041-86091234`)); // true
console.log(isLandlineTelephone(`0341-86091234`)); // true
console.log(isLandlineTelephone(`041-8091234`)); // false
```

### 验证身份证号(1 代,15 位数字)

```js
/**
 * @param { string } value
 */
export const isIDCardOld = value => /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/g.test(value);

// 验证
console.log(isIDCardOld(`350521190000000`)); // true
console.log(isIDCardOld(`350524199500001`)); // false
```

### 验证身份证号(2 代,18 位数字),最后一位是校验位,可能为数字或字符 X

```js
/**
 * @param { string } value
 */
export const isIDCardNew = value =>
  /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g.test(value);

// 验证
console.log(isIDCardNew(`350521199500001111`)); // true
console.log(isIDCardNew(`35052419950000111x`)); // true
```

### 验证身份证号, 支持 1/2 代(15 位/18 位数字)

```js
/**
 * @param { string } value
 */
export const isIDCard = value =>
  /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(
    value
  );

// 验证
console.log(isIDCard(`350521190000000`)); // true
console.log(isIDCard(`350521199500001111`)); // true
console.log(isIDCard(`35052419950000111x`)); // true
```

### 验证护照（包含香港、澳门）

```js
/**
 * @param { string } value
 */
export const isPassport = value =>
  /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(
    value
  );

// 验证
console.log(isPassport(`D17672342`)); // true
```

### 验证帐号是否合法(字母开头，允许 5-16 字节，允许字母数字下划线组合

```js
/**
 * @param { string } value
 */
export const isWebAccount = value => /^[a-zA-Z]\w{4,15}$/g.test(value);

// 验证
console.log(isWebAccount(`GolderBrother`)); // true
```

### 验证中文/汉字

```js
/**
 * @param { string } value
 */
export const isChineseCharacter = value =>
  /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/g.test(
    value
  );

// 验证
console.log(isChineseCharacter(`神哥醒来记得想我`)); // true
console.log(isChineseCharacter(`神哥，醒来记得想我`)); // false
```

### 验证小数

```js
/**
 * @param { string } value
 */
export const isDecimal = value => /^\d+\.\d+$/g.test(value);

// 验证
console.log(isDecimal(`0.999`)); // true
```

### 验证数字

```js
/**
 * @param { string } value
 */
export const isNumber = value => /^\d{1,}$/g.test(value);

// 验证
console.log(isNumber(123)); // true
```

### 验证 qq 号格式(5-11 位数)

```js
/**
 * @param { string } value
 */
export const isQQNum = value => /^[1-9][0-9]{4,10}$/g.test(value);

// 验证
console.log(isQQNum(1204788939)); // true
```

### 验证数字和字母组成

```js
/**
 * @param { string } value
 */
export const isNumAndStr = value => /^[A-Za-z0-9]+$/g.test(value);

// 验证
console.log(isNumAndStr(`GolderBrother23333`)); // true
```

### 验证英文字母

```js
/**
 * @param { string } value
 */
export const isEnglish = value => /^[a-zA-Z]+$/g.test(value);

// 验证
console.log(isEnglish(`GolderBrothe`)); // true
console.log(isEnglish(`GolderBrother23333`)); // false
```

### 验证大写英文字母

```js
/**
 * @param { string } value
 */
export const isCapital = value => /^[A-Z]+$/g.test(value);

// 验证
console.log(isCapital(`HELLO`)); // true
```

### 验证小写英文字母

```js
/**
 * @param { string } value
 */
export const isLowercase = value => /^[a-z]+$/g.test(value);

// 验证
console.log(isLowercase(`hello`)); // true
```

## 浏览器操作相关 browser 工具函数

### 返回当前 url

```js
export const currentURL = () => window.location.href;

// 访问 https://golderbrother.github.io/blog/views/
console.log(currentURL()); // https://golderbrother.github.io/blog/views/
```

### 获取 url 参数（第一种）

```js
/**
 * @param {*} name
 * @param {*} origin
 */

export function getUrlParam(name, origin = null) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  let r = null;
  if (origin == null) {
    r = window.location.search.substr(1).match(reg);
  } else {
    r = origin.substr(1).match(reg);
  }
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
```

### 获取 url 参数（第二种）

```js
/**
 * @param {*} origin
 */
export function getUrlQuery(origin = null) {
  let url = location.href;
  let temp1 = url.split('?');
  let pram = temp1[1];
  let keyValue = pram.split('&');
  let obj = {};
  for (let i = 0; i < keyValue.length; i++) {
    let item = keyValue[i].split('=');
    let key = item[0];
    let value = item[1];
    obj[key] = value;
  }
  return obj;
}
/**
 * @param {*} name
 * @param {*} origin
 */
export function getUrlParams(name, origin = null) {
  let url = location.href;
  let temp1 = url.split('?');
  let pram = temp1[1];
  let keyValue = pram.split('&');
  let obj = {};
  for (let i = 0; i < keyValue.length; i++) {
    let item = keyValue[i].split('=');
    let key = item[0];
    let value = item[1];
    obj[key] = value;
  }
  return obj[name];
}

// 验证
const url = `https://www.baidu.com/s?wd=javascript&rsv_spt=1&rsv_iqid=0xc9e8e32a0013d76b&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&oq=%25E6%2589%258B%25E5%258A%25A8&inputT=2886&rsv_t=5df3hAyPIAu7Q34opac%2FOE3Idt21A09vBsS2AYyNO1O2jPusXy%2B%2FkLNw8Yyzvw9BGo8Z&rsv_sug3=14&rsv_sug1=8&rsv_sug7=100&rsv_pq=b814586d00040be3&rsv_sug2=0&rsv_sug4=3027`;
console.log(getUrlQuery(url)); // wd: "javascript", rsv_spt: "1", rsv_iqid: "0xc9e8e32a0013d76b", ...}
console.log(getUrlParams(`wd`, url)); // javascript
```

### 修改 url 中的参数

```js
/**
 * @param { string } paramName
 * @param { string } replaceWith
 */
export function replaceParamVal(paramName, replaceWith) {
  let oUrl = location.href.toString();
  let re = eval('/(' + paramName + '=)([^&]*)/gi');
  location.href = oUrl.replace(re, paramName + '=' + replaceWith);
  return location.href;
}
```

### 删除 url 中指定的参数

```js
/**
 * @param { string } name
 */
export function funcUrlDel(baseURL, name) {
  let loca = location;
  let baseUrl = baseURL || loca.origin + loca.pathname + '?';
  let query = loca.search.substr(1);
  if (query.indexOf(name) > -1) {
    let obj = {};
    let arr = query.split('&');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=');
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    let url =
      baseUrl +
      JSON.stringify(obj)
        .replace(/[\"\{\}]/g, '')
        .replace(/\:/g, '=')
        .replace(/\,/g, '&');
    return url;
  }
}
// https://www.baidu.com/s?wd=javascript&rsv_spt=1&rsv_iqid=0xc9e8e32a0013d76b&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&oq=%25E6%2589%258B%25E5%258A%25A8&inputT=2886&rsv_t=5df3hAyPIAu7Q34opac%2FOE3Idt21A09vBsS2AYyNO1O2jPusXy%2B%2FkLNw8Yyzvw9BGo8Z&rsv_sug3=14&rsv_sug1=8&rsv_sug7=100&rsv_pq=b814586d00040be3&rsv_sug2=0&rsv_sug4=3027
funcUrlDel(`wd`); // https://www.baidu.com/s?wd=javascript&rsv_spt=1&rsv_iqid=0xc9e8e32a0013d76b&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&oq=%25E6%2589%258B%25E5%258A%25A8&inputT=2886&rsv_t=5df3hAyPIAu7Q34opac%2FOE3Idt21A09vBsS2AYyNO1O2jPusXy%2B%2FkLNw8Yyzvw9BGo8Z&rsv_sug3=14&rsv_sug1=8&rsv_sug7=100&rsv_pq=b814586d00040be3&rsv_sug2=0&rsv_sug4=3027
```

### 获取窗口可视范围宽度

```js
export function getPageViewWidth() {
  let d = document,
    a = d.compatMode == 'BackCompat' ? d.body : d.documentElement;
  return a.clientWidth;
}

console.log(getPageViewWidth()); // 1519
```

### 获取窗口可视范围的高度

```js
export function getClientHeight() {
  const clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return clientHeight;
}

console.log(getClientHeight()); // 722
```

### 获取窗口宽度

```js
export function getPageWidth() {
  const g = document,
    a = g.body,
    f = g.documentElement,
    d = g.compatMode == 'BackCompat' ? a : g.documentElement;
  return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}

console.log(getPageWidth()); // 1519
```

### 获取窗口尺寸

```js
export function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    };
  } else {
    // ie8应该是没怎么用了吧?? 算了，还是兼容下
    // ie8及其以下 ? 怪异模式 : 标准模式
    return {
      w:
        document.compatMode === 'BackCompat'
          ? document.body.clientWidth
          : document.documentElement.clientWidth,
      h:
        document.compatMode === 'BackCompat'
          ? document.body.clientHeight
          : document.documentElement.clientHeight
    };
  }
}

// 验证：chrome最新版浏览器
console.log(getViewportOffset()); // {w: 1536, h: 722}
```

### 获取滚动条距顶部高度

```js
export function getPageScrollTop() {
  const doc = document;
  return doc.documentElement.scrollTop || doc.body.scrollTop;
}

// 验证
console.log(getPageScrollTop()); // 12755.2001953125
```

### 获取滚动条距左边的高度

```js
export function getPageScrollLeft() {
  const doc = document;
  return doc.documentElement.scrollLeft || doc.body.scrollLeft;
}

// 验证
console.log(getPageScrollLeft()); // 0
```

### 开启全屏

> emmmm~~ 貌似不太好用

```js
/**
 * @param {*} element
 */
export function launchFullscreen(element) {
  // 兼容不同内核的浏览器
  /* element.requestFullscreen && element.requestFullscreen();
    // Firefox
    element.mozRequestFullScreen && element.mozRequestFullScreen();
    // IE
    element.msRequestFullscreen && element.msRequestFullscreen();
    // Chrome、Safari
    element.webkitRequestFullscreen && element.webkitRequestFullscreen(); */
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}

launchFullscreen(document);
```

### 关闭全屏

> emmmm~~ 貌似不太好用

```js
export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

exitFullscreen();
```

### 返回当前滚动条位置

```js
export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

// 验证
console.log(getScrollPosition()); // {x: 0, y: 13655.2001953125}
```

### 滚动到指定元素区域

```js
export const smoothScroll = element => {
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
};

smoothScroll(`#domID`);
```

### 平滑滚动到页面顶部

```js
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

scrollToTop(`#domID`);
```

### http 跳转 https

```js
export const httpsRedirect = () => {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};

httpsRedirect();
```

### 检查页面底部是否可见

```js
export const bottomVisible = () => {
  return (
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight || document.documentElement.clientHeight)
  );
};

bottomVisible();
```

### 打开一个窗口

```js
/**
 * @param { string } url
 * @param { string } windowName
 * @param { number } width
 * @param { number } height
 */
export function openWindow(url, windowName, width = 1920, height = 1030) {
  const x = parseInt(screen.width / 2.0) - width / 2.0;
  const y = parseInt(screen.height / 2.0) - height / 2.0;
  const isMSIE = navigator.appName == 'Microsoft Internet Explorer';
  if (isMSIE) {
    const p = 'resizable=1,location=no,scrollbars=no,width=';
    p = p + width;
    p = p + ',height=';
    p = p + height;
    p = p + ',left=';
    p = p + x;
    p = p + ',top=';
    p = p + y;
    window.open(url, windowName, p);
  } else {
    const win = window.open(
      url,
      'ZyiisPopup',
      'top=' +
        y +
        ',left=' +
        x +
        ',scrollbars=' +
        scrollbars +
        ',dialog=yes,modal=yes,width=' +
        width +
        ',height=' +
        height +
        ',resizable=no'
    );
    eval('try { win.resizeTo(width, height); } catch(e) { }');
    win.focus();
  }
}

openWindow(`https://juejin.im/`, `juejin`, 800, 600);
```

### 自适应页面计算工具（rem）

```js
/**
 * @param { number } width
 */
export function AutoResponse(width = 750) {
  const target = document.documentElement;
  target.clientWidth >= 600
    ? (target.style.fontSize = '80px')
    : (target.style.fontSize = (target.clientWidth / width) * 100 + 'px');
}

AutoResponse();
```

## 日期工具 date 工具函数

```js
/**
 * 根据标准时区获取对应的时间（浏览器环境下，node环境下new Date()为零时区时间）
 * @param {number} i 时区值数字，比如北京为东八区则输入+8,西5输入-5
 * @param {Date|string} d 要转换的时间(Date类型)
 * @description　由于服务器时间是标准时区时间，浏览器new Date()解析则是默认当前时区时间，所以我们需要转一下，将服务器时间，转为对应时区时间
 */
export function getLocalTime(i = 0, d) {
  d = d ? new Date(d) : new Date();
  if (typeof i !== 'number') return;
  const len = d.getTime();
  // 本地时间与GMT时间的时间偏移差
  // 注意：new Date().getTimezoneOffset()，获取的东时区为 负数，西时区为正数。
  const offset = d.getTimezoneOffset() * 60000;
  // 得到现在的格林尼治时间
  const utcTime = len + offset;
  return new Date(utcTime + 3600000 * i);
}

// 验证
// 格林威治时间:0时区
console.log(getLocalTime(0, new Date())); // Wed Mar 25 2020 13:46:54 GMT+0800 (中国标准时间)
```

### 时间格式化显示

```js
/**
 * @param {Date|number|undefined} date 具体日期值
 * @param {string} dateType 需要返回类型
 * @return {string} dateText 返回为指定格式的日期字符串
 */
export function getFormatDate(date, dateType) {
  dateType = dateType || 'yyyy-mm-dd MM:mm:ss';
  let dateObj = date ? new Date(date) : new Date();
  let month = dateObj.getMonth() + 1;
  let strDate = dateObj.getDate();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();
  // 不够2位前面补0
  month = String(month).padStart(2, 0);
  strDate = String(strDate).padStart(2, 0);
  hours = String(hours).padStart(2, 0);
  minutes = String(minutes).padStart(2, 0);
  seconds = String(seconds).padStart(2, 0);

  let dateText =
    dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日';
  if (dateType === 'yyyy-mm-dd') {
    dateText =
      dateObj.getFullYear() +
      '-' +
      String(dateObj.getMonth() + 1).padStart(2, 0) +
      '-' +
      String(dateObj.getDate()).padStart(2, 0);
  }
  if (dateType === 'yyyy.mm.dd') {
    dateText =
      dateObj.getFullYear() +
      '.' +
      String(dateObj.getMonth() + 1).padStart(2, 0) +
      '.' +
      String(dateObj.getDate()).padStart(2, 0);
  }
  if (dateType === 'yyyy-mm-dd MM:mm:ss') {
    dateText =
      dateObj.getFullYear() +
      '-' +
      month +
      '-' +
      strDate +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds;
  }
  if (dateType === 'mm-dd MM:mm:ss') {
    dateText = month + '-' + strDate + ' ' + hours + ':' + minutes + ':' + seconds;
  }
  if (dateType === 'yyyy年mm月dd日 MM:mm:ss') {
    dateText =
      dateObj.getFullYear() +
      '年' +
      month +
      '月' +
      strDate +
      '日' +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds;
  }
  return dateText;
}

getFormatDate(); // "2020-03-26 06:00:54"
getFormatDate(new Date(), `yyyy-mm-dd`); // "2020-03-26"
```

可以参考一篇文章[《前端的各种日期操作》](https://juejin.im/post/5e0a201ce51d4575eb4f38e7)

## 浏览器存储相关 storage 工具函数

> 主要为浏览器存储方面的工具函数

### localStorage 存储

```js
/**
 * 目前对象值如果是函数 、RegExp等特殊对象存储会被忽略
 * @param { String } key  属性
 * @param { string } value 值
 */
export const localStorageSet = (key, value) => {
  if (typeof value === 'object') value = JSON.stringify(value);
  localStorage.setItem(key, value);
};
```

### localStorage 获取

```js
/**
 * @param {String} key  属性
 */
export const localStorageGet = key => {
  return localStorage.getItem(key);
};
```

### localStorage 移除

```js
/**
 * @param {String} key  属性
 */
export const localStorageRemove = key => {
  localStorage.removeItem(key);
};
```

### localStorage 存储某一段时间失效(支持配置过期时间)

```js
/**
 * @param {String} key  属性
 * @param {*} value 存贮值
 * @param { number } expire 过期时间,毫秒数 默认1天(24 * 6000 * 1000)
 */
export const localStorageSetExpire = (key, value, expire = 24 * 6000 * 1000) => {
  if (typeof value === 'object') value = JSON.stringify(value);
  localStorage.setItem(key, value);
  setTimeout(() => {
    localStorage.removeItem(key);
  }, expire);
};
```

> `sessionStorage` 同理，直接将 `localStorage` 改为 `sessionStorage` 即可，不在赘述。。。

### cookie 存贮

```js
/**
 * @param {String} key  属性
 * @param {*} value  值
 * @param { String } expire  过期时间,单位天
 */
export const cookieSet = (key, value, expire) => {
  const d = new Date();
  d.setDate(d.getDate() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`;
};

cookieSet(`name`, 'golderbrother', new Date(Date.now() + 6000 * 1000));
```

### cookie 获取

```js
/**
 * @param {String} key  属性
 */
export const cookieGet = key => {
  const cookieStr = unescape(document.cookie);
  const arr = cookieStr.split('; ');
  let cookieValue = '';
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i].split('=');
    if (temp[0] === key) {
      cookieValue = temp[1];
      break;
    }
  }
  return cookieValue;
};

cookieGet(`name`); // "golderbrother"
```

### cookie 删除

> 直接将过期时间设为现在时间即可

```js
/**
 * @param {String} key  属性
 */
export const cookieRemove = key => {
  if (!key) return;
  document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`;
};

cookieRemove();
```

## 更多的工具函数

这里包含了平时可能常用的工具函数，包含数字，字符串，数组和对象等等操作。

### 金钱格式化，三位加逗号

```js
/**
 *  @param { number } num
 */
export const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

formatMoney(9999999); // "9,999,999"
```

### 截取字符串并加身略号

```js
export function subText(str, length) {
  if (str.length === 0) {
    return '';
  }
  if (str.length > length) {
    return str.substr(0, length) + '...';
  } else {
    return str;
  }
}

// subText(`截取字符串并加身略号`, 3) // "截取字..."
```

### 获取文件 base64 编码

```js
/**
 * @param file
 * @param format  指定文件格式
 * @param size  指定文件大小(字节)
 * @param formatMsg 格式错误提示
 * @param sizeMsg   大小超出限制提示
 * @returns {Promise<any>}
 */
export function fileToBase64String(
  file,
  format = ['jpg', 'jpeg', 'png', 'gif'],
  size = 20 * 1024 * 1024,
  formatMsg = '文件格式不正确',
  sizeMsg = '文件大小超出限制'
) {
  return new Promise((resolve, reject) => {
    // 格式过滤
    let suffix = file.type.split('/')[1].toLowerCase();
    let inFormat = false;
    for (let i = 0; i < format.length; i++) {
      if (suffix === format[i]) {
        inFormat = true;
        break;
      }
    }
    if (!inFormat) {
      reject(formatMsg);
    }
    // 大小过滤
    if (file.size > size) {
      reject(sizeMsg);
    }
    // 转base64字符串
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      let res = fileReader.result;
      resolve({ base64String: res, suffix: suffix });
      reject('异常文件，请重新选择');
    };
  });
}
```

### B 转换到 KB,MB,GB 并保留两位小数

```js
/**
 * @param { number } fileSize
 */
export function formatFileSize(fileSize) {
  let temp;
  if (fileSize < 1024) {
    return fileSize + 'B';
  } else if (fileSize < 1024 * 1024) {
    temp = fileSize / 1024;
    temp = temp.toFixed(2);
    return temp + 'KB';
  } else if (fileSize < 1024 * 1024 * 1024) {
    temp = fileSize / (1024 * 1024);
    temp = temp.toFixed(2);
    return temp + 'MB';
  } else {
    temp = fileSize / (1024 * 1024 * 1024);
    temp = temp.toFixed(2);
    return temp + 'GB';
  }
}
```

### base64 转 file

```js
/**
 *  @param { base64 } base64
 *  @param { string } filename 转换后的文件名
 */
export const base64ToFile = (base64, filename) => {
  let arr = base64.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split('/')[1]; // 图片后缀
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime });
};
```

### base64 转 blob

```js
/**
 *  @param { base64 } base64
 */
export const base64ToBlob = base64 => {
  let arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
```

### blob 转 file

```js
/**
 *  @param { blob } blob
 *  @param { string } fileName
 */
export const blobToFile = (blob, fileName) => {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
};
```

### file 转 base64

```js
/**
 * @param { * } file 图片文件
 */
export const fileToBase64 = file => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    return e.target.result;
  };
};
```

### 递归生成树形结构

```js
export function getTreeData(
  data,
  pid,
  pidName = 'parentId',
  idName = 'id',
  childrenName = 'children',
  key
) {
  let arr = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i][pidName] == pid) {
      data[i].key = data[i][idName];
      data[i][childrenName] = getTreeData(data, data[i][idName], pidName, idName, childrenName);
      arr.push(data[i]);
    }
  }

  return arr;
}
```

### 遍历树节点

```js
export function forEachTree(data, childrenName = 'children', callback) {
  for (let i = 0; i < data.length; i++) {
    callback(data[i]);
    if (data[i][childrenName] && data[i][childrenName].length > 0) {
      forEachTree(data[i][childrenName], childrenName, callback);
    }
  }
}
```

### 追溯父节点

```js
export function traceParentNode(
  pid,
  data,
  rootPid,
  pidName = 'parentId',
  idName = 'id',
  childrenName = 'children'
) {
  let arr = [];
  forEachTree(data, childrenName, node => {
    if (node[idName] == pid) {
      arr.push(node);
      if (node[pidName] != rootPid) {
        arr = arr.concat(traceParentNode(node[pidName], data, rootPid, pidName, idName));
      }
    }
  });
  return arr;
}
```

### 寻找所有子节点

```js
export function traceChildNode(
  id,
  data,
  pidName = 'parentId',
  idName = 'id',
  childrenName = 'children'
) {
  let arr = [];
  forEachTree(data, childrenName, node => {
    if (node[pidName] == id) {
      arr.push(node);
      arr = arr.concat(traceChildNode(node[idName], data, pidName, idName, childrenName));
    }
  });
  return arr;
}
```

### 根据 pid 生成树形结构

```js
/**
 *  @param { object } items 后台获取的数据
 *  @param { * } id 数据中的id
 *  @param { * } link 生成树形结构的依据
 */
export const createTree = (items, id = null, link = 'pid') => {
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: createTree(items, item.id) }));
};
```

### 查询数组中是否存在某个元素并返回元素第一次出现的下标

> 类似数组中的 `find`方法

```js
/** 元素查询，返回索引值 查找不到返回-1
 * @param {*} item
 * @param { array } data
 */
export function findInArray(item, data) {
  for (let i = 0; i < data.length; i++) {
    if (item === data[i]) {
      return i;
    }
  }
  return -1;
}
findInArray(5, [1, 2, 5, 6]); // 2
```

### Windows 根据详细版本号判断当前系统名称

```js
/**
 * @param { string } osVersion
 */
export function OutOsName(osVersion) {
  if (!osVersion) {
    return;
  }
  let str = osVersion.substr(0, 3);
  // 也可以用Map结构来存储
  const osNameMap = {
    '5.0': 'Win 2000',
    '5.1': 'Win XP',
    '5.2': 'Win XP64',
    '6.0': 'Win Vista',
    '6.1': 'Win 7',
    '6.2': 'Win 8',
    '6.3': 'Win 8.1',
    '10.': 'Win 10'
  };
  str = osNameMap[str] || 'Win';
  return str;
}
```

### 判断手机是 Andoird 还是 IOS

```js
/**
 *  0: ios
 *  1: android
 *  2: 其它
 */
export function getOSType() {
  let u = navigator.userAgent,
    app = navigator.appVersion;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    return 0;
  }
  if (isAndroid) {
    return 1;
  }
  return 2;
}

getOSType(); // 2
```

### 函数防抖

> 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。表示多次执行同一个操作，只执行(触发)最后一次。

**使用场景**：

- search 搜索联想，用户在不断输入值时，用防抖来节约请求资源
- window 触发 resize 的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

```js
/**
 * @param { function } func
 * @param { number } wait 延迟执行毫秒数
 * @param { boolean } immediate  true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

const fn = debounce(
  () => {
    // 防抖成功...
  },
  1000,
  true
);

window.addEventListener(`scroll`, fn);
```

### 函数节流

> 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。表示多次执行同一个操作，会在规定时间到了才执行，没到就不执行

**使用场景**：

- 鼠标不断点击触发，mousedown(单位时间内只触发一次)
- 监听滚动事件，比如是否滑到底部自动加载更多，用 throttle 来判断

```js
/**
 * @param { function } func 函数
 * @param { number } wait 延迟执行毫秒数
 * @param { number } type 1 表时间戳版，2 表定时器版
 */
export function throttle(func, wait, type) {
  let previous, timeout;
  if (type === 1) {
    previous = 0;
  } else if (type === 2) {
    timeout = null;
  }
  return function() {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
}
```

### 判断数据类型

```js
/**
 * @param {*} target
 */
export function type(target) {
  let ret = typeof target;
  let template = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'number - object',
    '[object Boolean]': 'boolean - object',
    '[object String]': 'string-object'
  };

  if (target === null) {
    return 'null';
  } else if (ret == 'object') {
    let str = Object.prototype.toString.call(target);
    return template[str];
  } else {
    return ret;
  }
}

// type(null) // "null"
// type(undefined) // "undefined"
```

### 生成指定范围随机数

```js
/**
 * @param { number } min
 * @param { number } max
 */
export const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

RandomNum(0, 10); // 6
```

### 数组乱序

```js
/**
 * @param {array} arr
 */
export function arrScrambling(arr) {
  let array = arr;
  let index = array.length;
  while (index--) {
    let randomIndex = Math.floor(Math.random() * index);
    let middleware = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = middleware;
  }
  return array;
}
```

### 数组交集

```js
/**
 * @param { array} arr1
 * @param { array } arr2
 */
export const similarity = (arr1, arr2) => arr1.filter(v => arr2.includes(v));

console.log(similarity([1, 2], [2, 3])); // [2]
```

### 数组中某元素出现的次数

```js
/**
 * @param { array } arr
 * @param {*} value
 */
export function countOccurrences(arr, value) {
  return arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
}
console.log(countOccurrences([1, 2, 2, 1, 3, 5, 6, 7], 2)); // 2
```

### 数组中某元素连续出现的次数

```js
/**
 * 计算元素连续出现的次数
 * @param arr 元素所在的数组
 * @param value 元素
 * @param startIndex 查找的开始索引值，默认从0开始查找
 */
function countContinuousOccurrences(arr, value, startIndex = 0) {
  // 钙元素是否为首次出现的
  let isFirstOccur = false;
  // 元素首次出现的索引
  let firstOccurIndex = -1,
    // 元素最后一次出现的索引
    lastOccurIndex = arr.length - 1;
  // 记录元素连续出现的次数
  let count = 0;
  for (let index = startIndex; index < arr.length; index++) {
    const val = arr[index];
    if (val === value) {
      count++;
      if (!isFirstOccur) {
        firstOccurIndex = index;
        isFirstOccur = true;
      }
    } else if (isFirstOccur) {
      lastOccurIndex = index - 1;
      break;
    }
  }
  return {
    count,
    firstOccurIndex,
    lastOccurIndex,
    isFirstOccur
  };
}

// 测试
// 没有传入开始查找的索引
const count = countContinuousOccurrences([1, 2, 2, 2, 2, 2, 2, 4, 2, 2, 6], 2);
console.log(`count`, count);
// count { count: 6,
//   firstOccurIndex: 1,
//   lastOccurIndex: 6,
//   isFirstOccur: true }

// 从索引为7开始查找
const count = countContinuousOccurrences([1, 2, 2, 2, 2, 2, 2, 4, 2, 2, 6], 2, 7);
console.log(`count`, count);
// count { count: 2,
//   firstOccurIndex: 8,
//   lastOccurIndex: 9,
//   isFirstOccur: true }
```

### 加法函数（精度丢失问题）

```js
/**
 * @param { number } arg1
 * @param { number } arg2
 */
export function add(arg1, arg2) {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

console.log(add(1 / 123456, 2 / 123456789)); // 0.000008116251840479197
```

### 减法函数（精度丢失问题）

```js
/**
 * @param { number } arg1
 * @param { number } arg2
 */
export function sub(arg1, arg2) {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}
```

### 除法函数（精度丢失问题）

```js
/**
 * @param { number } num1
 * @param { number } num2
 */
export function division(num1, num2) {
  let t1, t2, r1, r2;
  try {
    t1 = num1.toString().split('.')[1].length;
  } catch (e) {
    t1 = 0;
  }
  try {
    t2 = num2.toString().split('.')[1].length;
  } catch (e) {
    t2 = 0;
  }
  r1 = Number(num1.toString().replace('.', ''));
  r2 = Number(num2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
```

### 乘法函数（精度丢失问题）

```js
/**
 * @param { number } num1
 * @param { number } num2
 */
export function mcl(num1, num2) {
  let m = 0,
    s1 = num1.toString(),
    s2 = num2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
}
```

### 递归优化（尾递归）

```js
/**
 * @param { function } f
 */
export function tco(f) {
  let value;
  let active = false;
  let accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}
```

### 生成随机整数

```js
export function randomNumInteger(min, max) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * min + 1, 10);
    case 2:
      return parseInt(Math.random() * (max - min + 1) + min, 10);
    default:
      return 0;
  }
}

randomNumInteger(1, 100); // 51
```

### 去除空格

```js
/**
 * @param { string } str 待处理字符串
 * @param  { number } type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
 */
export function trim(str, type = 1) {
  if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) return;
  switch (type) {
    case 1:
      return str.replace(/\s/g, '');
    case 2:
      return str.replace(/(^\s)|(\s*$)/g, '');
    case 3:
      return str.replace(/(^\s)/g, '');
    case 4:
      return str.replace(/(\s$)/g, '');
    default:
      return str;
  }
}

trim(` 1 23 456 `); // "123456"
trim(` 1 23 456 `); // "1 23 456"
```

### 大小写转换

```js
/**
 * @param { string } str 待转换的字符串
 * @param { number } type 1-全大写 2-全小写 3-首字母大写 其他-不转换
 */

export function turnCase(str, type) {
  switch (type) {
    case 1:
      return str.toUpperCase();
    case 2:
      return str.toLowerCase();
    case 3:
      return str[0].toUpperCase() + str.substr(1).toLowerCase();
    default:
      return str;
  }
}
```

### 随机 16 进制颜色 hexColor

```js
/**
 * 方法一
 */
export function hexColor() {
  let str = '#';
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  for (let i = 0; i < 6; i++) {
    let index = Number.parseInt((Math.random() * 16).toString());
    str += arr[index];
  }
  return str;
}

hexColor(); // "#0F6C42"
```

### 随机 16 进制颜色 randomHexColorCode

```js
/**
 * 方法二
 */
export const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

randomHexColorCode();
```

### 转义 html(防 XSS 攻击)

```js
export const escapeHTML = str => {
  return str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );
};
escapeHTML(`<h1>golderBrother</h1>`); // "&lt;h1&gt;golderBrother&lt;/h1&gt;"
```

### 检测移动/PC 设备

```js
export const detectDeviceType = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';
};
detectDeviceType();
```

### 隐藏所有指定标签

```js
/**
 * 例: hide(document.querySelectorAll('img'))
 */
export const hideTag = (...el) => [...el].forEach(e => (e.style.display = 'none'));

hideTag();
```

### 返回指定元素的生效样式

```js
/**
 * @param { element} el  元素节点
 * @param { string } ruleName  指定元素的名称
 */
export const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
```

### 检查是否包含子元素

```js
/**
 * @param { element } parent
 * @param { element } child
 * 例：elementContains(document.querySelector('head'), document.querySelector('title')); // true
 */
export const elementContains = (parent, child) => parent !== child && parent.contains(child);

elementContains(document.querySelector('head'), document.querySelector('title'));
```

### 数字超过规定大小加上加号“+”，如数字超过 99 显示 99+

```js
/**
 * @param { number } val 输入的数字
 * @param { number } maxNum 数字规定界限
 */
export const outOfNum = (val, maxNum) => {
  val = val ? val - 0 : 0;
  if (val > maxNum) {
    return `${maxNum}+`;
  } else {
    return String(val);
  }
};

outOfNum(1000, 99); // "99+"
outOfNum(99, 99); // "99"
```

未完待续...

## 参考文章

- [常用正则大全](https://github.com/any86/any-rule)
- [灵活运用 JS 开发技巧](https://juejin.im/post/5cc7afdde51d456e671c7e48)

## 最后

上面的这些工具函数，一部分来自于自己平时的总结, 一部分来自于上面的参考文章, 感谢大神们的总结。如果这些对你有帮助，为了方便查阅，不妨在 GitHub 上点个[`star`](https://github.com/GolderBrother/blog/tree/master/code/javascript/jsUtils)~, 小伙伴的`star`是我持续输出的动力

这个仓库会持续更新，如果你有更好的点子，或者没有找到你想要的工具函数，欢迎[issues](https://github.com/GolderBrother/blog/issues)~

文中若有不准确或错误的地方，欢迎指出，更欢迎[issues](https://github.com/GolderBrother/blog/issues)~
