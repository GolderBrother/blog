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
const noWordStr = "123_";
console.log(isNoWord(noWordStr)); // true
console.log(isNoWord("hello")); // false
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
const word = "前端超神路222";
console.log(isCHNAndEN(word)); // true
console.log(isCHNAndEN("hello")); // false
```

### 验证邮政编码(中国)

```js
/**
 * @param { string } value
 */
export const isPostcode = value =>
  /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(
    value
  );

// 验证
console.log(isPostcode("361000")); // true
console.log(isPostcode("999999")); // false
```

### 验证微信号，6 至 20 位，以字母开头，字母，数字，减号，下划线

```js
/**
 * @param { string } value
 */
export const isWeChatNum = value =>
  /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(value);

// 验证
console.log(isWeChatNum(`goodnight-mylove123`)); // true
console.log(isWeChatNum(`晚安，醒来记得想我`)); // false
```

### 验证 16 进制颜色

```js
/**
 * @param { string } value
 */
export const isColor16 = value =>
  /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(value);

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
  /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(
    value
  );

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
export const isThunderLink = value =>
  /^thunderx?:\/\/[a-zA-Z\d]+=$/g.test(value);

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
export const isMagnet = value =>
  /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/g.test(value);

// 验证
console.log(
  isMagnet(
    `magnet:?xt=urn:btih:123golderbrotherGolderBrother123golderbrotherGolderBrother`
  )
); //false
```

### 验证子网掩码

```js
/**
 *  @param { string } value
 */
export const isSubnetMask = value =>
  /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/g.test(
    value
  );

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
export const isWindowsFolderPath = value =>
  /^[a-zA-Z]:\\(?:\w+\\?)*$/g.test(value);

// 验证
console.log(isWindowsFolderPath(`D:\james\my\code\blog`)); // false
```

### 验证 window 下"文件"路径

```js
/**
 *  @param { string } value
 */
export const isWindowsFilePath = value =>
  /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/g.test(value);

// 验证
console.log(
  isWindowsFolderPath(`D:\james\my\code\blog\code\javascript\jsUtils\README.md`)
); // false
```

### 验证股票代码(A 股)

```js
/**
 *  @param { string } value
 */
export const isAShare = value =>
  /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/g.test(
    value
  );

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
  /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i.test(
    value
  );

// 验证
console.log(
  isVideoUrl(
    `https://s2.luckincoffeecdn.com/luckywebrm/images/index/8sautoplay.mp4`
  )
); // true
```

### 验证图片链接地址（图片格式可按需增删）

```js
/**
 *  @param { string } value
 */
export const isImageUrl = value =>
  /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(
    value
  );

// 验证
console.log(
  isImageUrl(
    `https://s2.luckincoffeecdn.com/luckywebrm/images/index/commitment/part_main-2.jpg`
  )
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
export const isChineseName = value =>
  /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value);

// 验证
console.log(isChineseName(`神哥`)); // true
console.log(isChineseName(`GolderBrother`)); // false
```

### 验证英文姓名

```js
/**
 * @param { string } value
 */
export const isEnglishName = value =>
  /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value);

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
export const isMPRelaxed = value =>
  /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value);

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
export const isLandlineTelephone = value =>
  /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value);

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
export const isIDCardOld = value =>
  /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/g.test(value);

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
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
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
  let temp1 = url.split("?");
  let pram = temp1[1];
  let keyValue = pram.split("&");
  let obj = {};
  for (let i = 0; i < keyValue.length; i++) {
    let item = keyValue[i].split("=");
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
  let temp1 = url.split("?");
  let pram = temp1[1];
  let keyValue = pram.split("&");
  let obj = {};
  for (let i = 0; i < keyValue.length; i++) {
    let item = keyValue[i].split("=");
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
  let re = eval("/(" + paramName + "=)([^&]*)/gi");
  location.href = oUrl.replace(re, paramName + "=" + replaceWith);
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
  let baseUrl = baseURL || loca.origin + loca.pathname + "?";
  let query = loca.search.substr(1);
  if (query.indexOf(name) > -1) {
    let obj = {};
    let arr = query.split("&");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    let url =
      baseUrl +
      JSON.stringify(obj)
        .replace(/[\"\{\}]/g, "")
        .replace(/\:/g, "=")
        .replace(/\,/g, "&");
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
    a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
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
    d = g.compatMode == "BackCompat" ? a : g.documentElement;
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
        document.compatMode === "BackCompat"
          ? document.body.clientWidth
          : document.documentElement.clientWidth,
      h:
        document.compatMode === "BackCompat"
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
    behavior: "smooth"
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
  if (location.protocol !== "https:")
    location.replace("https://" + location.href.split("//")[1]);
};

httpsRedirect();
```

### 检查页面底部是否可见

```js
export const bottomVisible = () => {
  return (
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight ||
      document.documentElement.clientHeight)
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
  const isMSIE = navigator.appName == "Microsoft Internet Explorer";
  if (isMSIE) {
    const p = "resizable=1,location=no,scrollbars=no,width=";
    p = p + width;
    p = p + ",height=";
    p = p + height;
    p = p + ",left=";
    p = p + x;
    p = p + ",top=";
    p = p + y;
    window.open(url, windowName, p);
  } else {
    const win = window.open(
      url,
      "ZyiisPopup",
      "top=" +
        y +
        ",left=" +
        x +
        ",scrollbars=" +
        scrollbars +
        ",dialog=yes,modal=yes,width=" +
        width +
        ",height=" +
        height +
        ",resizable=no"
    );
    eval("try { win.resizeTo(width, height); } catch(e) { }");
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
    ? (target.style.fontSize = "80px")
    : (target.style.fontSize = (target.clientWidth / width) * 100 + "px");
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
  if (typeof i !== "number") return;
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

可以参考一篇文章[《前端的各种日期操作》](https://juejin.im/post/5e0a201ce51d4575eb4f38e7)

## 浏览器存储相关storage工具函数

未完待续...

## 参考文章

- [常用正则大全](https://github.com/any86/any-rule)
- [灵活运用 JS 开发技巧](https://juejin.im/post/5cc7afdde51d456e671c7e48)

## 最后

上面的这些工具函数，一部分来自于自己平时的总结, 一部分来自于上面的参考文章, 感谢大神们的总结。如果这些对你有帮助，为了方便查阅，不妨在 GitHub 上点个[`star`](https://github.com/GolderBrother/blog/tree/master/code/javascript/jsUtils)~, 小伙伴的`star`是我持续输出的动力

这个仓库会持续更新，如果你有更好的点子，或者没有找到你想要的工具函数，欢迎[issues](https://github.com/GolderBrother/blog/issues)~

文中若有不准确或错误的地方，欢迎指出，更欢迎[issues](https://github.com/GolderBrother/blog/issues)~
