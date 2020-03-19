# 如何理解回流和重绘

`回流`：当我们对 DOM 的修改引发了 **DOM 几何尺寸的变化**（比如修改元素的`宽、高或隐藏元素`等）时，浏览器**需要重新计算**元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是**回流**（也叫**重排**）。

`重绘`：当我们对 DOM 的修改导致了**样式的变化**、却并未影响其几何属性（比如修改了`颜色或背景色`）时，浏览器**不需重新计算**元素的几何属性、直接为该元素**绘制新的样式**（跳过了上图所示的回流环节）。这个过程叫做**重绘**。 由此我们可以看出，重绘不一定导致回流，回流一定会导致重绘

## 常见的会导致回流的元素

常见的几何属性有 `width、height、padding、margin、left、top、border` 等等。
最容易被忽略的操作：获取一些需要通过即时计算得到的属性,当你要用到像这样的属性：`offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight` 时，浏览器为了获取这些最新的值，就会进行回流。
当我们调用了 `getComputedStyle` 方法，或者 IE 里的 `currentStyle` 时，也会触发回流。原理是一样的，都为求一个“即时性”和“准确性”。

## 避免方式

1. 避免逐条改变样式，使用**类名**去合并样式
2. 将 DOM “离线”, 使用文档片段 `DocumentFragment`

    可以看下如下demo：

    ```js
    // Create the fragment
    var fragment = document.createDocumentFragment();

    //add DOM to fragment 
    var spanNode = document.createElement("span");
    spanNode.innerHTML = "Hello World";
    fragment.appendChild(spanNode);


    //add this DOM to body
    document.body.appendChild(spanNode);
    ```

3. 提升为合成层,如使用`will-change`

```css
#divId {
  will-change: transform;
}
```

## 优点

- 合成层的位图，会交由 `GPU` 合成，比 `CPU` 处理要快
- 当需要 `repaint` 时，只需要 `repaint` 本身，不会影响到其他的层
- 对于 `transform` 和 `opacity` 效果，不会触发 `layout` 和 `paint`

## 注意

部分浏览器缓存了一个 `flush` 队列，把我们触发的回流与重绘任务都塞进去，待到队列里的任务多起来、或者达到了一定的时间间隔，或者“不得已”的时候，再将这些任务一口气出队。但是当我们访问一些**即时属性**时，浏览器会为了获得**此时此刻的、最准确**的属性值，而提前将 `flush` 队列的任务出队。

## 最后

欢迎关注鄙人的[github](https://github.com/GolderBrother)，做个有专业的技术人，一起学习呀~
 
 <comment/> 
 