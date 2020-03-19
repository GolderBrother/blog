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
document.body.addEventListener('touchmove', function(e) {
    if(e._isScroller) return;
    // 阻止默认事件
    e.preventDefault();
}, {
    passive: false
});
```

### 2. 滚动妥协填充空白，装饰成其他功能

在很多时候，我们可以不去解决这个问题，换一直思路。根据场景，我们可以将下拉作为一个**功能性的操作**。

比如： 下拉后刷新页面
就像下面这样

![img](https://user-gold-cdn.xitu.io/2019/12/20/16f219d17a6fd448?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 页面放大或缩小不确定性行为

## 参考资料

- [Safari CSS Reference](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html#//apple_ref/css/property/-webkit-overflow-scrolling)
