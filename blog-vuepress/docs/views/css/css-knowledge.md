# 你未必知道的 49 个 CSS 知识点

## 下边列举的每一条都是亲测有效的~

### 01.【`负边距`】💘 负边距的效果。注意左右负边距表现并不一致。左为**负**时，是**左移**，右为**负**时，是**左拉**。上下与左右类似

![16c3f20e0bfc9f24](./knowledge/16c3f20e0bfc9f24.png)

### 02.【`shape-outside`】💘 不要自以为是了。你以为自己是方的，在别人眼里你却是圆的

![16c3d4d63509b4f0](./knowledge/16c3d4d63509b4f0.png)

### 03.【BFC 应用】💓BFC 应用之阻止外边距合并（margin collapsing）

![16c3d4f1395d5cc2](./knowledge/16c3d4f1395d5cc2.png)

实现代码是这样的：

```html
<style>
  .outer {
    background-color: aqua;
    overflow: hidden;
  }

  .inner {
    margin-top: 30px;
  }
</style>
秋风用时光的旋律，用桂花的芬芳、苹果的馨香、菊花的灿烂、牵牛花的奔放、一串红的艳丽，把一望无际的田野乡村，演绎得在自然中沉醉，渲染得天地间空旷而又阳刚。
<div class="outer">
  <div class="inner">
    酷热的夏天刚刚过去，秋风吹来，秋牵着一个个节气的手，舞动着长袖，用婀娜多姿的舞姿，用变幻神奇的旋律，动听的音符，把蓝天吹得一会白云飘飘，一会云蒸霞蔚，一会仙女舞袖，一会又涌来千顷碧波。更让那成千上万得雀鸟，不顾辛苦劳顿，路途遥远，赶赴银汉，为牛郎织女架起一座相会的鹊桥，就为这对生离死别的鸳鸯说上一晚悄悄话。
    秋天的风，优雅中体现成熟和高雅。砍高粱、掐谷子、掰玉米、刨芋头、割豆子、下苹果、晒柿子、揪石榴、摘花生、耩麦子，一个个音符，无不让秋风演奏得动听、感人。仰望湛蓝的长空，会让你一扫往日沉闷枯燥的苦闷，心情更加舒畅了，一股热爱蓝天热爱大自然钟爱乡村田野的激情，便油然而生。
  </div>
</div>
```

### 04.【BFC 应用】💔BFC 应用之消除浮动的影响

![16c3d4f22d3173c9](./knowledge/16c3d4f22d3173c9.png)

实现代码是这样的：

```html
<style>
  .container {
    display: flow-root;
    border: 3px solid black;
  }

  .image {
    float: left;
    width: 100px;
    height: 100px;
    background-color: aqua;
  }

  .body {
    display: flow-root;
  }
</style>
<div class="container">
  <div class="image"></div>
  <div class="body">
    秋风用时光的旋律，用桂花的芬芳、苹果的馨香、菊花的灿烂、牵牛花的奔放、一串红的艳丽，把一望无际的田野乡村，演绎得在自然中沉醉，渲染得天地间空旷而又阳刚。
    酷热的夏天刚刚过去，秋风吹来，秋牵着一个个节气的手，舞动着长袖，用婀娜多姿的舞姿，用变幻神奇的旋律，动听的音符，把蓝天吹得一会白云飘飘，一会云蒸霞蔚，一会仙女舞袖，一会又涌来千顷碧波。更让那成千上万得雀鸟，不顾辛苦劳顿，路途遥远，赶赴银汉，为牛郎织女架起一座相会的鹊桥，就为这对生离死别的鸳鸯说上一晚悄悄话。
  </div>
</div>
```

### 05.【flex 不为人知的特性之一】💕flex 布局下 margin:auto 的神奇用法

![16c3d4f579c4de52](./knowledge/16c3d4f579c4de52.png)

实现代码是这样的

```html
<style>
    .container {
      display: flex;
    }

    .item {
      border: 1px solid black;
      width: 30px;
      height: 30px;
      background-color: aqua;
      text-align: center;
      /* margin: auto; */
    }

    .item:first-child {
      margin-right: auto;
    }

    .item:nth-child(3) {
      margin: auto;
    }

    .item:last-child {
      margin-left: auto;
    }
  </style>
  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
  </div
```

### 06.【flex 不为人知的特性之二】💖flex 布局，当 flex-grow 之和小于 1 时，只能按比例分配部分剩余空间，而不是全部

![16c3d4f642feaa48](./knowledge/16c3d4f642feaa48.png)

实现代码是这样的：

```html
<style>
  .container {
    display: flex;
    background-color: brown;
  }

  .item {
    border: 1px solid black;
    width: 30px;
    background-color: aqua;
    flex-grow: 0.1;
  }

  .item:first-child {
    flex-grow: 0.3;
  }
</style>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

### 07.【input 的宽度】💗 并不是给元素设置 display:block 就会自动填充父元素宽度。input 就是个例外，其默认宽度取决于 size 特性的值

![16c3d4f6fef0a871](./knowledge/16c3d4f6fef0a871.png)

实现代码是这样的

```html
<style>
  .container {
    display: flex;
  }

  input {
    display: block;
    width: 100%;
  }
</style>
<div class="container">
  <input type="text" size="30" />
</div>
```

### 08.【定位特性】💙 绝对定位和固定定位时，同时设置 left 和 right 等同于隐式地设置宽度

![16c3d4f7f76af224](./knowledge/16c3d4f7f76af224.png)

实现代码是这样的

```html
<style>
  .container {
    position: absolute;
    position: fixed;
    left: 30px;
    right: 30px;
    border: 1px solid rgb(59, 57, 57);
  }
</style>
<div class="container">
  container
</div>
```

### 09.【层叠上下文】💚 层叠上下文：小辈就是小辈，再厉害也只是个小辈

![16c3d4f89327d07d](./knowledge/16c3d4f89327d07d.png)

实现代码是这样的

```html
<style>
  div {
    width: 200px;
    height: 200px;
    background-color: aqua;
    border: 1px solid;
  }

  div.outer {
    position: relative;
    z-index: 1;
  }

  p.inner {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: red;
    /* 跟外层div不在同一个层级，z-index调成再高也没用 */
    z-index: 100000000;
  }

  div:nth-of-type(2) {
    position: relative;
    margin-top: -70px;
    margin-left: 30px;
    z-index: 1;
  }

  div:nth-of-type(3) {
    margin-top: -70px;
    margin-left: 60px;
  }
</style>
<div class="outer">
  <p class="inner"></p>
</div>
<div></div>
<div></div>
```

### 11.【相邻兄弟选择器】💜 相邻兄弟选择器之常用场景

![16c3d4f9f7e99a80](./knowledge/16c3d4f9f7e99a80.png)

实现代码是这样的

```html
<style>
  ul {
    text-align: center;
    border: 1px solid red;
    padding-left: 0;
    list-style: none;
  }

  ul > li + li {
    border-top: 1px solid blueviolet;
  }
</style>
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
</ul>
```

### 12.【三角形】💝css 绘制等边三角形的原理

![16c3d4fc3a5fd756](./knowledge/16c3d4fc3a5fd756.png)

实现代码是这样的

```html
<style>
  div {
    width: 0;
    border: 100px solid;
    /* height: 100px; */
    /* background-color: palevioletred; */
    /* 如果没给边框设置颜色，默认是黑色 */
    border: solid;
    border-color: red transparent transparent;
    border-width: calc(100px * 1.732) 100px;
  }
</style>
<!-- 我是等边三角形 -->
<div></div>
```

### 13.【table 布局】💞display:table 实现多列等高布局

![16c3d4fd6cc88002](./knowledge/16c3d4fd6cc88002.png)

实现代码是这样的

```html
<style>
  .container {
    margin-top: -30px;
    margin-right: -30px;
  }

  .container main {
    display: table;
    width: 100%;
    border-spacing: 30px 0;
  }

  .container main div {
    display: table-cell;
    width: 200px;
    background-color: aqua;
    border: 1px solid;
  }
</style>
<div class="container">
  <main>
    <div style="height: 200px;"></div>
    <div></div>
    <div></div>
    <div></div>
  </main>
</div>
```

### 【定宽高比】♥css 实现定宽高比的原理：padding 的百分比是相对于其包含块的宽度，而不是高度

![16c3d5000087a8d0](./knowledge/16c3d5000087a8d0.png)

实现代码是这样的

```html
<style>
  .container {
    width: 100px;
    display: flex;
    background-color: red;
    border: 1px solid;
  }

  .container:after {
    content: '';
    padding-top: 100%;
  }
</style>
<div class="container">
  我是文字
</div>
```

### 15. 【隐藏文本】🐯 隐藏文字内容的两种办法

![16c3d501284cbcff](./knowledge/16c3d501284cbcff.png)

实现代码是这样的

```html
<style>
  h1 {
    width: 200px;
    height: 200px;
    background: url('./knowledge/200.png');
    /* text-indent: -200px; */
    font-size: 0;
  }
</style>
<h1>我是文本</h1>
```

### 16.【角向渐变】🐲 新的渐变：角向渐变。可以用来实现饼图

![16c3d50444a314cc](./knowledge/16c3d50444a314cc.png)

实现代码是这样的

```html
<style>
  div {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    /* 重点 */
    background: conic-gradient(
      red 0 calc(100% / 3),
      green calc(100% / 3) calc(100% / 3 * 2),
      blue calc(100% / 3 * 2) 100%
    );
  }
</style>
<div></div>
```

### 17.【背景附着】🐐background-attachment 指定背景如何附着在容器上，注意其属性值 local 和 fixed 的使用

![16c3d50761cdf47c](./knowledge/16c3d50761cdf47c.png)

实现代码是这样的

```html
<style>
  body {
    height: 200vh;
  }

  div {
    width: 400px;
    height: 200px;
    background-image: url('./knowledge/200.png');
    overflow: auto;
    background-attachment: fixed;
  }
</style>
<div></div>
```

### 18.【动画延时】🐵 动画添加延迟时间可以使步调不一致

![16c3d5089051201a](./knowledge/16c3d5089051201a.png)

实现代码是这样的

```html
<style>
  div {
    width: 50px;
    height: 50px;
    background-color: aqua;
    border-radius: 100%;
    animation: move 2s ease-in-out infinite alternate;
  }

  div:nth-child(2n + 1) {
    animation-delay: 2s;
  }

  @keyframes move {
    100% {
      transform: translate(300%, 0);
    }
  }
</style>
<div></div>
<div></div>
<div></div>
<div></div>
```

 <comment/>
