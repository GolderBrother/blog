# 总结移动端 H5 开发常用技巧

## html 篇

### 常用的 meta 属性设置

`meta`对于移动端的一些特殊属性，可根据需要自行设置

```html
<meta name="screen-orientation" content="portrait" /> //Android 禁止屏幕旋转
<meta name="full-screen" content="yes" /> //全屏显示
<meta name="browsermode" content="application" />
//UC应用模式，使用了application这种应用模式后，页面讲默认全屏，禁止长按菜单，禁止收拾，标准排版，以及强制图片显示。
<meta name="x5-orientation" content="portrait" /> //QQ强制竖屏
<meta name="x5-fullscreen" content="true" /> //QQ强制全屏
<meta name="x5-page-mode" content="app" /> //QQ应用模式
```

### 电话号码识别

在 `iOS Safari` 浏览器 （其他浏览器和 Android 均不会）上会对那些看起来像是电话号码的数字处理为**电话链接**，比如：

- 7 位数字，形如：1234567
- 带括号及加号的数字，形如：(+86)123456789
- 双连接线的数字，形如：00-00-00111
- 11 位数字，形如：13800138000

关闭识别

```html
<meta name="format-detection" content="telephone=no" />
```

开启识别

```html
<a href="tel:123456">123456</a>
```

### 邮箱识别（Android）

安卓上会对符合邮箱格式的字符串进行**识别**，我们可以通过如下的 `meta` 来**禁止邮箱的自动识别**：

```html
<meta content="email=no" name="format-detection" />
```

同样地，我们也可以通过标签属性来开启长按邮箱地址弹出邮件发送的功能：

```html
<a href="mailto:1204788939@qq.com">1204788939@qq.com</a>
```

## css 篇

### 0.5px 细线

移动端 `H5` 项目越来越多，设计师对于 `UI` 的要求也越来越高，比如 `1px` 的边框。在高清屏下，移动端的 `1px` 会很粗。

那么为什么会产生这个问题呢？主要是跟一个东西有关，`DPR`(`devicePixelRatio`) 设备像素比，它是默认缩放为 `100%` 的情况下，设备像素和 `CSS` 像素的比值。目前主流的屏幕 `DPR=2`（`iPhone 8`）,或者 `3`（`iPhone 8 Plus`）。拿 `2 倍屏`来说，设备的物理像素要实现 `1 像素`，而 `DPR=2`，所以 `css` 像素只能是 `0.5`。

下面介绍最常用的方法

`css3` 的 缩放属性 `transform: scaleY(0.5)`

```css
/* 底边框 */
.b-border {
  position: relative;
}
.b-border:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #d9d9d9;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
/* 上边框 */
.t-border {
  position: relative;
}
.t-border:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background: #d9d9d9;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
/* 右边框 */
.r-border {
  position: relative;
}
.r-border:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1px;
  height: 100%;
  background: #d9d9d9;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
/* 左边框 */
.l-border {
  position: relative;
}
.l-border:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 1px;
  height: 100%;
  background: #d9d9d9;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}

/* 四条边 */
.setBorderAll {
  position: relative;
  &:after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: left top;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
  }
}
```

### 屏蔽用户选择

禁止用户选择页面中的文字或者图片

实现代码如下

```css
div {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

### 清除输入框内阴影

在 `iOS` 上，输入框默认有内部阴影,以这样关闭：

```css
div {
  -webkit-appearance: none;
}
```

### 如何禁止保存或拷贝图像

```css
img {
  -webkit-touch-callout: none;
}
```

### 输入框默认字体颜色

设置 `input` 里面 `placeholder` 字体的颜色

```css
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #c7c7c7;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #c7c7c7;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #c7c7c7;
}
```

### 用户设置字号放大或者缩小导致页面布局错误

设置字体禁止缩放

```css
body {
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
}
```

### android 系统中元素被点击时产生边框

部分`android`系统点击一个链接，会出现一个边框或者**半透明灰色遮罩**, 不同生产商定义出来的效果不一样。

去除代码如下

```css
a,button,input,textarea{
  -webkit-tap-highlight-color: rgba(0,0,0,0)
  -webkit-user-modify:read-write-plaintext-only;
}

```

### iOS 滑动不流畅

`ios` 手机上下滑动页面会产生**卡顿**，手指离开页面，页面立即停止运动。整体表现就是**滑动不流畅**，**没有滑动惯性**。 `iOS 5.0` 以及之后的版本，滑动有定义有两个值 `auto` 和 `touch`，默认值为 `auto`。

#### 解决方案

1. 在**滚动容器**上增加滚动 `touch` 方法

```css
.wrapper {
  -webkit-overflow-scrolling: touch;
}
```

2. 设置 `overflow` 设置外部 `overflow` 为 `hidden`,设置内容元素 `overflow` 为 `auto`。内部元素超出 `body` 即产生**滚动**，超出的部分 `body` **隐藏**。

```css
body {
  overflow-y: hidden;
}
.wrapper {
  overflow-y: auto;
}
```

## js 篇

### 移动端 click 屏幕产生 200-300 ms 的延迟响应

移动设备上的`web`网页是有`300ms`**延迟**的，往往会造成按钮点击**延迟**甚至是**点击失效**。解决方案：

- `fastclick`可以解决在手机上点击事件的`300ms`**延迟**
- `zepto`的`touch`模块，`tap`事件也是为了解决在 click 的**延迟**问题

触摸事件的响应顺序

1. ontouchstart(开始)
2. ontouchmove(移动)
3. ontouchend(结束)
4. onclick(点击事件)

### audio 和 video 在 ios 和 andriod 中自动播放

这个不是 bug，由于自动播放网页中的音频或视频，会给用户带来一些**困扰**或者不必要的**流量消耗**，所以苹果系统和安卓系统通常都会**禁止自动播放**和使用 `JS` 的触发播放，必须由**用户来触发才可以播放**。加入**自动触发播放**的代码

`js` 版本

```js
//创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
document.addEventListener('touchstart', function() {
  document.getElementById('audios').play();
});
```

`jquery` 版本

```js
// JS 绑定自动播放（操作 window 时，播放音乐）
$('html').one('touchstart', function() {
  audio.play();
});
```

微信下兼容处理

```js
document.addEventListener(
  'WeixinJSBridgeReady',
  function() {
    music.play();
  },
  false
);
```

> 注意不要遗漏微信的兼容处理需要引用微信 JS；

**注意**：

1. `audio`元素的`autoplay`属性在`IOS`及`Android`上无法使用，在`PC端`正常；
2. `audio`元素没有设置`controls`时，在`IOS`及`Android`会占据空间大小，而在`PC端Chrome`是不会占据任何空间；

### iOS 上拉边界下拉出现空白

手指按住屏幕下拉，屏幕顶部会多出**一块白色区域**。手指按住屏幕上拉，底部多出**一块白色区域**。

在 `iOS` 中，手指按住屏幕上下拖动，会触发 `touchmove` 事件。这个事件触发的对象是整个 `webview` 容器，容器自然会被**拖动**，剩下的部分会成**空白**。

解决方案

```js
document.body.addEventListener(
  'touchmove',
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

### ios 日期转换 NAN 的问题

这个问题遇到不少~

解决方案

将日期字符串的格式符号`-`替换成`/`

```js
'yyyy-MM-dd'.replace(/-/g, '/');
```

## 软键盘问题

### `IOS` 键盘弹起挡住原来的视图

解决方案

可以通过监听移动端软键盘弹起

`Element.scrollIntoView(Boolean)` 方法让当前的元素滚动到浏览器窗口的可视区域内。参数如下。

参数如下：

- `true`，则元素将在其**所在滚动区的可视区域中居中对齐**。
- `false`，则元素将与其**所在滚动区的可视区域最近的边缘对齐**。

`Element.scrollIntoViewIfNeeded(Boolean)`方法也是用来将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。但如果该元素已经在浏览器窗口的可见区域内，则不会发生滚动。此方法是标准的 Element.scrollIntoView()方法的专有变体。

根据可见区域**最靠近元素的哪个边缘**，元素的顶部将与可见区域的顶部边缘对准，或者元素的底部边缘将与可见区域的底部边缘对准。

```js
window.addEventListener('resize', function() {
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
    window.setTimeout(function() {
      if ('scrollIntoView' in document.activeElement) {
        document.activeElement.scrollIntoView(false);
      } else {
        document.activeElement.scrollIntoViewIfNeeded(false);
      }
    }, 0);
  }
});
```

### `onkeyup` 和 `onkeydown` 兼容性问题

`iOS` 中 `input` 键盘事件 `keyup、keydown`、等支持不是很好, 用 `input` 监听键盘 `keyup` 事件，在安卓手机浏览器中没有问题，但是在 `iOS` 手机浏览器中用输入法输入之后，并未立刻相应 `keyup` 事件

### `iOS12` 输入框难以点击获取焦点，弹不出软键盘

定位找到问题是 `fastclick.js` 对 `iOS12` 的兼容性，可在 `fastclick.js` 源码或者 `main.js` 做以下修改

```js
FastClick.prototype.focus = function(targetElement) {
  var length;
  // deviceIsIOS: 是否为iOS设置，请自行判断
  if (
    deviceIsIOS &&
    targetElement.setSelectionRange &&
    targetElement.type.indexOf('date') !== 0 &&
    targetElement.type !== 'time' &&
    targetElement.type !== 'month'
  ) {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length);
    targetElement.focus();
  } else {
    targetElement.focus();
  }
};
```

### `iOS` 键盘收起时页面没用回落，底部会留白

通过监听**键盘回落事件**来滚动到原来的位置

```js
window.addEventListener('focusout', function() {
  window.scrollTo(0, 0);
});

//input输入框弹起软键盘的解决方案。
const bfscrolltop = document.body.scrollTop;
const inputDOM = document.querySelector('#input');
inputDOM.addEventListener('focus', () => {
  document.body.scrollTop = document.body.scrollHeight;
  //console.log(document.body.scrollTop);
});
inputDOM.addEventListener('blur', () => {
  document.body.scrollTop = bfscrolltop;
  //console.log(document.body.scrollTop);
});
```

### `iOS` 下 `fixed` 失效的原因

**软键盘唤起**后，页面的 `fixed` 元素将失效，变成了 `absolute`，所以当页面内容**超过一屏且滚动**时，失效的 `fixed` 元素就会跟随滚动了。不仅限于 `type=text` 的输入框，凡是**软键盘**（比如时间日期选择、select 选择等等）被唤起，都会遇到同样地问题。

解决方法:

不让页面滚动，而是让**主体部分自己滚动**,主体部分高度 `height` 设为 `100%`，`overflow:scroll`

具体代码如下

```html
<body>
  <div class='warper'>
    <div class='main'></div>
  <div>
  <div class="fix-bottom"></div>
</body>

```

```css
.warper {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
}
.main {
  height: 100%;
  overflow: scroll;
}
.fix-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
}
```

### `fastclick` 导致下拉框焦点冲突

移动端使用 `fastclick` 之后，在 `iOS` 环境下，有几个连续的下拉框 第一个 `select` 框突然填充了第二个下拉框的内容。
根本原因是 `fastclick` 导致 `iOS` 下多个 `select` ，点击某一个，**焦点不停变换的** bug。修改源码，在 `onTouchStart` 事件内**判断设备是否为 `iOS`**，再判断**当前节点** `nodeName` 是否为 `select`，如果是，则 `return false` 去阻止 `fastClick` 执行其他事件。

github 源码地址：[fastclick.js](https://github.com/ftlabs/fastclick)

```js
//line 391行
FastClick.prototype.onTouchStart = function(event) {
  //在其方法中添加判断 符合ios select的时候 不返回事件
  if (deviceIsIOS && this.targetElement == 'select') this.targetElement = null;
  event.preventDefault();
};
//line521 或者讲源码中 有关touchEnd判断非ios或者非select的事件注释，
if (!deviceIsIOS || targetTagName !== 'select') {
  this.targetElement = null;
  event.preventDefault();
}
```

### iOS 键盘换行变为搜索

1. `input type="search"`
2. `input` 外面套 `form`，必须要有 `action`，`action="javascript:return true"`
3. 表单提交**阻止默认提交**事件

vue 中

```html
<form action="javascript:return true" @submit.prevent="formSubmit">
  <input type="search" placeholder="请输入名称" id="search" />
</form>
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)~
