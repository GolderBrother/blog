# 渲染引擎什么情况下才会为特定的节点创建新的图层

**层叠上下文**是`HTML元素`的三维概念，这些`HTML元素`在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的`z轴`上延伸，HTML元素依据其自身属性按照**优先级顺序**占用层叠上下文的空间。

1. 拥有层叠上下文属性的元素会被提升为**单独的一层**。

拥有层叠上下文属性：

- 根元素 (HTML),
- `z-index` 值不为 "auto"的 绝对/相对定位元素，
- `position`,固定（fixed） / 沾滞（sticky）定位（沾滞定位适配所有移动设备上的浏览器，但老的桌面浏览器不支持）
- `z-index`值不为 "auto"的 `flex` 子项 (`flex item`)，即：父元素 `display: flex|inline-flex`，
- `z-index`值不为 "auto" 的 `grid` 子项，即：父元素`display：grid`
- `opacity` 属性值小于 1 的元素（参考 the specification for opacity），
- `transform` 属性值不为 "none"的元素，
- `mix-blend-mode` 属性值不为 "normal"的元素，
- `filter` 值不为"none"的元素，
- `perspective` 值不为"none"的元素，
- `clip-path` 值不为"none"的元素
- `mask / mask-image / mask-border`不为"none"的元素
- `isolation` 属性被设置为 "isolate"的元素
- 在 `will-change` 中指定了任意CSS属性（参考 [这篇文章](https://dev.opera.com/articles/css-will-change-property/)）
- `-webkit-overflow-scrolling` 属性被设置 "touch"的元素
- `contain` 属性值为"`layout`"，"`paint`"，或者综合值比如"`strict`"，"`content`"

2. 需要剪裁（clip）的地方也会被创建为图层。

这里的剪裁指的是，假如我们把 `div` 的大小限定为 **200 * 200** 像素，而 `div` 里面的文字内容比较多，文字所显示的区域肯定会超出 **200 * 200** 的面积，这时候就产生了剪裁，渲染引擎会把裁剪文字内容的**这一部分**用于显示在 `div` 区域。出现这种裁剪情况的时候，渲染引擎会为文字部分**单独创建一个层**，如果出现滚动条，滚动条也会被提升为单独的层。

## 最后

欢迎关注鄙人的[github](https://github.com/GolderBrother)，做个有专业的技术人，一起学习呀~

 
 
 <comment/> 
 