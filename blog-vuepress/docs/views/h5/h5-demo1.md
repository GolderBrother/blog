# 移动端 H5 相关基础技术概览

先看下大纲吧~

![img](https://user-gold-cdn.xitu.io/2019/12/24/16f368720d3eb421?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 原理与实践

> 以下解决方案，均经过我测试成功，健康安全，请放下食用。由于篇幅原因，某些非核心解决方案的实现细节暂未谈论，需要自行研究。

## iOS 滑动不流畅

**表现**:

上下滑动页面会产生卡顿，手指离开页面，页面立即停止运动。整体表现就是滑动不流畅，没有滑动惯性。

**产生原因**:

为什么 `iOS` 的 `webview` 中 滑动不流畅，它是如何定义的？

最终在 `safari` 文档里面寻找到了答案（文档链接在参考资料项）。

![img](https://user-gold-cdn.xitu.io/2019/12/19/16f1daab7c41e044?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

原来在 `iOS 5.0` 以及之后的版本，滑动有定义有两个值 `auto` 和 `touch`，默认值为 `auto`。

```css
-webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */

-webkit-overflow-scrolling: auto; /* 当手指从触摸屏上移开，滚动会立即停止 */
```

**解决方案**:

1.在滚动容器上增加滚动 touch 方法

将 `-webkit-overflow-scrolling` 值设置为 `touch`

代码如下：

```css
.wrapper {
  -webkit-overflow-scrolling: touch;
}
```

> 设置滚动条隐藏： `.container ::-webkit-scrollbar {display: none;}`

可能会导致使用 `position:fixed;` 固定定位的元素，随着页面一起滚动

### 2.设置 overflow

设置外部 `overflow` 为 `hidden`,设置内容元素 `overflow` 为 `auto`。内部元素超出 `body` 即产生滚动，超出的部分 `body` 隐藏。

代码如下：

```css
body {
  overflow-y: hidden;
}
.wrapper {
  overflow-y: auto;
}
```

## iOS 上拉边界下拉出现白色空白

**表现**:

在 iOS 中，手指按住屏幕上下拖动，会触发 touchmove 事件。这个事件触发的对象是整个 webview 容器，容器自然会被拖动，剩下的部分会成空白。

**产生原因**:

手指按住屏幕下拉，屏幕顶部会多出一块白色区域。手指按住屏幕上拉，底部多出一块白色区域。

**解决方案**:

### 1. 监听事件禁止滑动

移动端触摸事件有三个，分别定义为

```text
1. touchstart ：手指放在一个DOM元素上。
2. touchmove ：手指拖曳一个DOM元素(抚摸~)。
3. touchend ：手指从一个DOM元素上移开。
```

显然我们需要控制的是 touchmove 事件，由此在 `W3C` 文档中找到了这样一段话

> Note that the rate at which the user agent sends touchmove events is implementation-defined, and may depend on hardware capabilities and other implementation details.

> If the preventDefault method is called on the first touchmove event of an active touch point, it should prevent any default action caused by any touchmove event associated with the same active touch point, such as scrolling.

`touchmove` **事件的速度是可以实现定义的，取决于硬件性能和其他实现细节**

`preventDefault` **方法，阻止同一触点上所有默认行为，比如滚动。**

由此我们找到解决方案，通过监听 `touchmove`，让需要滑动的地方滑动，不需要滑动的地方禁止滑动。

> 值得注意的是我们要过滤掉具有滚动容器的元素。

实现如下：

```js
document.body.addEventListener(
  "touchmove",
  function(e) {
    if (e._isScroller) return;
    // 阻止默认事件
    e.preventDefault();
  },
  {
    passive: false
  }
);
```

### 2. 滚动妥协填充空白，装饰成其他功能

在很多时候，我们可以不去解决这个问题，换一直思路。根据场景，我们可以将下拉作为一个**功能性的操作**。

比如： 下拉后刷新页面
就像下面这样

![img](https://user-gold-cdn.xitu.io/2019/12/20/16f219d17a6fd448?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 页面放大或缩小不确定性行为

**表现**:

双击或者双指张开手指页面元素，页面会放大或缩小。

**产生原因**:

`HTML` 本身会产生放大或缩小的行为，比如在 `PC` 浏览器上，可以自由控制页面的放大缩小。但是在移动端，我们是不需要这个行为的。所以，我们需要**禁止**该不确定性行为，来提升用户体验。

**原理与解决方案**:

`HTML meta` 元标签标准中有个 中 `viewport` 属性，用来控制页面的缩放，一般用于移动端。如下图 `MDN` 中介绍

![img](https://user-gold-cdn.xitu.io/2019/12/19/16f1cf528e787498?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

移动端常规写法

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

因此我们可以设置 `maximum-scale、minimum-scale`(最大缩放比例、最小缩放比例) 与 `user-scalable=no`(不能缩放网页) 用来避免这个问题

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no"
/>
```

## click 点击事件延时与穿透

**表现**:

监听元素 `click` 事件，点击元素触发时间延迟约 `300ms`。

点击蒙层，蒙层消失后，下层元素点击触发。

**产生原因**:

为什么会产生 click 延时？

`iOS` 中的 `safari`，为了实现双击缩放操作，在单击 `300ms` 之后，如果未进行**第二次点击**，则执行 `click` 单击操作。也就是说来判断用户行为**是否为双击**产生的。但是，在 App 中，无论是否需要双击缩放这种行为，click 单击都会产生 300ms 延迟。

为什么会产生 click 点击穿透？

双层元素叠加时，在上层元素上绑定 `touch` 事件，下层元素绑定 `click` 事件。由于 `click` 发生在 `touch` 之后，点击上层元素，元素消失，下层元素会触发 `click` 事件，由此产生了**点击穿透**的效果。

触发顺序：

```text
touch -> click
```

**原理与解决方案**:

### 解决方案一：使用 `touchstart` 替换 `click`

前面已经介绍了，移动设备不仅支持点击，还支持几个触摸事件。
那么我们现在基本思路就是用 touch 事件代替 `click` 事件。
将 `click` 替换成 `touchstart` 不仅解决了 `click` 事件都延时问题，还解决了穿透问题。因为穿透问题是在 `touch` 和 `click` 混用时产生。

在原生中使用

```js
el.addEventListener(
  "touchstart",
  () => {
    console.log("ok");
  },
  false
);
```

在 vue 中使用

```html
<button @touchstart="handleTouchstart()">点击</button>
```

开源解决方案中，也是既提供了 `click` 事件，又提供了 `touchstart` 事件。如 vant 中的 button 组件

![img](https://user-gold-cdn.xitu.io/2019/12/19/16f1d13300321655?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**那么，是否可以将 `click` 事件全部替换成 `touchstart` 呢？为什么开源框架还会给出 `click` 事件呢？**

我们想象一种情景，同时需要点击和滑动的场景下。如果将 `click` 替换成 `touchstart` 会怎样？

> 事件触发顺序: `touchstart, touchmove, touchend, click`。

很容易想象，在我需要`touchmove`滑动时候，优先触发了`touchstart`的点击事件，是不是已经产生了冲突呢？

所以呢，在具有滚动的情况下，还是建议使用 click 处理。

在接下来的`fastclick`开源库中也做了如下处理。 针对 `touchstart` 和 `touchend`，截取了部分源码。

```js
// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
// 1) the user does a fling scroll on the scrollable layer
// 2) the user stops the fling scroll with another tap
// then the event.target of the last 'touchend' event will be the element that was under the user's finger
// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
this.updateScrollParent(targetElement);
```

```js
// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
scrollParent = targetElement.fastClickScrollParent;
if (
  scrollParent &&
  scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop
) {
  return true;
}
```

主要目的就是，在使用 `touchstart` 合成 `click` 事件时，保证其不在滚动的父元素之下。

### 解决方案二： 使用 fastclick 库

使用 npm/yarn 安装后使用

```bash
npm i fastclick -S
# yarn add fastclick
```

```js
import FastClick from "fastclick";
FastClick.attach(document.body, options);
```

同样，使用 `fastclick` 库后，`click` 延时和穿透问题都没了

按照我的惯例，只要涉及开源库，那么我们一定要去了解它实现的原理。主要是将现有的原生事件集合封装合成一个兼容性较强的事件集合。

[fastclick 源码](https://github.com/ftlabs/fastclick/blob/master/lib/fastclick.js) 核心代码不长， 1000 行不到。有兴趣可以了解一下!

## 软键盘将页面顶起来、收起未回落问题

**表现**:

`Android` 手机中，点击 `input` 框时，键盘弹出，将页面顶起来，导致页面样式错乱。

移开焦点时，键盘收起，键盘区域空白，未回落。

**产生原因**:

我们在 `app` 布局中会有个固定的底部。安卓一些版本中，输入弹窗出来，会将挤压 `absolute` 和 `fixed` 定位的元素。导致可视区域变小，布局错乱。

**原理与解决方案**:

软键盘将页面顶起来的解决方案，主要是通过**监听页面高度变化**，强制恢复成弹出前的高度。

```js
// 记录原有的视口高度
const originalHeight =
  document.body.clientHeight || document.documentElement.clientHeight;

window.onresize = function() {
  var resizeHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  if (resizeHeight < originalHeight) {
    // 恢复内容区域高度
    // const container = document.getElementById("container")
    // 例如 container.style.height = originalHeight;
  }
};
```

键盘不能回落问题出现在 `iOS 12+` 和 `wechat 6.7.4+` 中，而在微信 H5 开发中是比较常见的 Bug。

兼容原理:

- 1.判断版本类型
- 2.更改滚动的可视区域

```js
const isWechat = window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
if (!isWechat) return;
const wechatVersion = wechatInfo[1];
const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);

// 如果设备类型为iOS 12+ 和wechat 6.7.4+，恢复成原来的视口
if (+wechatVersion.replace(/\./g, "") >= 674 && +version[1] >= 12) {
  window.scrollTo(
    0,
    Math.max(document.body.clientHeight, document.documentElement.clientHeight)
  );
}
```

> `window.scrollTo(x-coord, y-coord)`，其中`window.scrollTo(0, clientHeight)`恢复成原来的视口

## iPhone X系列安全区域适配问题

**表现**:

头部刘海两侧区域或者底部区域，出现刘海遮挡文字，或者呈现黑底或白底空白区域。

**产生原因**:

iPhone X 以及它以上的系列，都采用**刘海屏设计**和**全面屏手势**。头部、底部、侧边都需要做特殊处理。才能适配 iPhone X 的特殊情况。

**解决方案**:

**设置安全区域，填充危险区域，危险区域不做操作和内容展示**。

> 危险区域指头部不规则区域，底部横条区域，左右触发区域。

![img](https://user-gold-cdn.xitu.io/2019/12/19/16f1d31150e79cb9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

具体操作为：`viewport-fit meta` 标签设置为 `cover`，获取所有区域填充。 判断设备是否属于 `iPhone X`，给头部底部增加适配层

`viewport-fit` 有 3 个值分别为：

- `auto`：此值不影响初始布局视图端口，并且整个web页面都是可查看的。
- `contain`：视图端口按比例缩放，以适合显示内嵌的最大矩形。
- `cover`：视图端口被缩放以填充设备显示。强烈建议使用 safe area inset 变量，以确保重要内容不会出现在显示之外。

#### 设置 viewport-fit 为 cover

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, viewport-fit=cover">
```

#### 增加适配层

使用 `safe area inset` 变量

```css
/* 适配 iPhone X 顶部填充*/
@supports (top: env(safe-area-inset-top)){
  body,
  .header{
      padding-top: constant(safe-area-inset-top, 40px);
      padding-top: env(safe-area-inset-top, 40px);
      padding-top: var(safe-area-inset-top, 40px);
  }
}
/* 判断iPhoneX 将 footer 的 padding-bottom 填充到最底部 */
@supports (bottom: env(safe-area-inset-bottom)){
    body,
    .footer{
        padding-bottom: constant(safe-area-inset-bottom, 20px);
        padding-bottom: env(safe-area-inset-bottom, 20px);
        padding-top: var(safe-area-inset-bottom, 20px);
    }
}
```

`safe-area-inset-top`, `safe-area-inset-right`, `safe-area-inset-bottom`, `safe-area-inset-left`
`safe-area-inset-*`由四个定义了视口边缘内矩形的 `top`, `right`, `bottom` 和 `left` 的环境变量组成，这样可以安全地放入内容，而不会有被非矩形的显示切断的风险。对于矩形视口，例如普通的笔记本电脑显示器，其值等于零。 对于非矩形显示器（如圆形表盘，`iPhoneX` 屏幕），在用户代理设置的四个值形成的矩形内，所有内容均可见。

其中 `env()` 用法为 `env( <custom-ident> , <declaration-value>?`)，第一个参数为自定义的区域，第二个为备用值。

其中 `var()` 用法为 `var( <custom-property-name> , <declaration-value>? )`，作用是在 `env()` 不生效的情况下，给出一个备用值。

`constant()` 被 `css 2017-2018` 年为草稿阶段，是否已被标准化未知。而其他iOS 浏览器版本中是否有此函数未知，作为兼容处理而添加进去。

#### 兼容性

![img](https://user-gold-cdn.xitu.io/2019/12/20/16f212ff998e1ec1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 页面生成为图片和二维码问题

**表现**:

在工作中有需要将页面生成图片或者二维码的需求。可能我们第一想到的，交给后端来生成更简单。但是这样我们需要把页面代码全部传给后端，网络性能消耗太大。

**解决方案**:

### 生成二维码

使用 QRCode 生成二维码

```js
import QRCode from 'qrcode';
// 使用 async 生成图片
const options = {};
const url = window.location.href;
async url => {
  try {
    console.log(await QRCode.toDataURL(url, options))
  } catch (err) {
    console.error(err);
  }
}
```

将 `await QRCode.toDataURL(url, options)` 表达式的值 赋值给 图片 url 即可

### 生成图片

主要是使用 `htmlToCanvas` 生成 `canvas` 画布

```js
import html2canvas from 'html2canvas';

html2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
});

```

但是不单单在此处就完了，由于是 `canvas` 的原因。移动端生成出来的图片比较模糊。

我们使用一个新的 `canvas` 方法多倍生成，放入一倍容器里面，达到更加清晰的效果，通过超链接下载图片 **下载文件简单实现，更完整的实现方式之后更新**

```js
const scaleSize = 2;
const newCanvas = document.createElement("canvas");
const target = document.querySelector('div');
const width = parseInt(window.getComputedStyle(target).width);
const height = parseInt(window.getComputedStyle(target).height);
newCanvas.width = width * scaleSize;
newCanvas.height = widthh * scaleSize;
newCanvas.style.width = width + "px";
newCanvas.style.height =width + "px";
const context = newCanvas.getContext("2d");
context.scale(scaleSize, scaleSize);
html2canvas(document.querySelector('.demo'), { canvas: newCanvas }).then(function(canvas) {
  // 简单的通过超链接设置下载功能
  document.querySelector(".btn").setAttribute('href', canvas.toDataURL());
}
```

> 这个根据需要设置 scaleSize 大小



## 参考资料

- [Safari CSS Reference](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html#//apple_ref/css/property/-webkit-overflow-scrolling)

<!-- https://juejin.im/post/5dfadb91e51d45584006e486 -->