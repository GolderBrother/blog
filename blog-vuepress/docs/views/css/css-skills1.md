# 10 个让你受益匪浅的 css 使用技巧

## 1. Safari 3D 变换会忽略 z-index 的层级

在 Safari 浏览器下(此 Safari 浏览器包括 iOS 的 Safari，iPhone 上的微信浏览器，以及 Mac OS X 系统的 Safari 浏览器)，当我们使用 3D transform 变换的时候，如果祖先元素没有 overflow:hidden/scroll/auto 等限制，则会直接忽略自身和其他元素的 z-index 层叠顺序设置，而直接使用真实世界的 3D 视角进行渲染。 例如下面的场景，图中红框里面的模块，使用 3D transform 变换，进行旋转动画，但是在 Safari 浏览器下，忽略了二维码遮罩层的 z-index,结果使用了真实世界的 3D 视角进行渲染。

![img](https://raw.githubusercontent.com/GolderBrother/blog/master/images/css/WechatIMG135.png)

**解决方法**:

1. 父级，任意父级，非`body`级别，设置`overflow:hidden`可恢复和其他浏览器一样的渲染。
2. 以毒攻毒。有时候，页面复杂，我们不能给父级设置`overflow:hidden`，那么可以将被影响的元素设置一个足够大的`translateZ`值就可以，如`translateZ(100px)`。

## 2. 文字居中兼容

正常处理文字上下居中的手段是让元素`height`和`line-height`相等，但是安卓环境下当字体大小`<14px/0.7rem`的时候会出现居中失效的情况。

**解决方法**:

1. 判断系统环境（`安卓/IOS`）分别作**微调**；
2. `font-size、height、width`全部放大为 2 倍，利用`transform`进行缩放

```css
height: 1rem;
width: 2rem;
font-size: 0.5rem;

/* 变成：  */
height: 2rem;
width: 4rem;
font-size: 1rem;
transform: scale(0.5);
```

但由于放大之后占据空间，左右会留白，需要利用`margin`**负值** `margin: -0.35rem -0.45rem 0;`来调整。

3. 有解决方案是将`rem`改为`px`

## 3. 2 个 a 标签包裹的模块做 90 度旋转，其中一个模块会出现点击失灵

定义了一个动画效果如下(sass 代码)：

```scss
@keyframes official-featured_rotate {
  10%,
  50% {
    transform: rotateY(90deg);
  }
  60%,
  100% {
    transform: rotateY(0deg);
  }
}
&-rotate {
  position: absolute;
  width: rem(350/2);
  height: rem(160/2);
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 0);
  &.ani_rotate {
    animation: official-featured_rotate 5s linear 0s infinite;
    animation-delay: 2s;
  }
  &__item {
    width: rem(350/2);
    height: rem(160/2);
    position: absolute;
    &:nth-child(1) {
      transform: translateZ(rem(350/4));
    }
    &:nth-child(2) {
      transform: rotateY(90deg) translate3d(0, 0, rem(350/4));
    }
  }
}
```

这里是 2 个 `a` 标签，做 **90 度**的旋转效果使得两个 `a` 可以循环切换展示。这里 2 个的基本样式是一致的，宽高也一样。但是在**安卓下（ios 正常）只**有打开页面能看到的第一个 `a` 标签能正常跳转，能正常绑定事件。第二个 `a` 不能跳转，我就想那我通过点击事件来跳转可以不，结果绑定任何事件都不生效。

**解决方法**：

然后测试发现，在旋转过程中（只要未完全旋转 **90 度**）点击还是能一切正常的。于是把旋转角度改为了 `89.99` 度，一切正常。动画效果修改为

```scss
@keyframes official-featured_rotate {
  10%,
  50% {
    transform: rotateY(-89.99deg);
  }
  60%,
  100% {
    transform: rotateY(0deg);
  }
}
```

后来查找了一下[stackoverflow](https://stackoverflow.com/questions/23548612/cant-click-on-buttons-after-css-transform)。里面也是说了这个解决方法。

## 4. 使用 currentColor 来简化 css

设置`border-color`、`background-color`等颜色的时候，可以使用`currentColor`(与当前元素的字体颜色相同)来简化 `css`。

```css
.div {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  text-align: left;
  padding: 20px;
  border: solid 1px currentColor;
}
```

## 5. 利用灰色滤镜做样式的 disable 效果

灰色图可以直接加滤镜，不用切多一张图。如图：

![img](https://raw.githubusercontent.com/GolderBrother/blog/master/images/css/WechatIMG129.png)

**解决方法**：

```css
.coupon_style .disable {
  -webkit-filter: grayscale(1);
}
```

## 6. 曲线阴影和翘边阴影的实现

多个阴影重叠，就是正常阴影+曲线阴影
正常情况下，有个矩形有正常的阴影，作为主投影，这时候再定义一个有一定弧度圆角的圆角矩形，然后放在正常矩形的下面，并露出一点点底部有弧度的阴影，这样的话就可以形成曲线投影的效果。

效果：

![img](https://raw.githubusercontent.com/GolderBrother/blog/master/images/css/quxianyinying.png)

![img](https://raw.githubusercontent.com/GolderBrother/blog/master/images/css/qiaobianyinying.png)

所有代码如下：

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>CSS3实现曲线阴影和翘边阴影效果</title>
    <link rel="stylesheet" href="css/style.css" type="text/css" />
    <style>
      * {
        margin: 0;
        padding: 0;

        border: 0;
        outline: 0;
      }
      /*简易版reset*/

      ul {
        list-style: none;
      }
      /*取消列表样式*/

      p {
        font-size: 30px;
        font-weight: bold;

        margin: -30px 0 50px 0;

        text-align: center;
      }

      .wrap {
        width: 50%;
        height: 300px;
        margin: 80px auto;

        background: #fff;
      }
      /*包块的宽高,背景色及居中对齐*/

      .wrap h1 {
        font-size: 30px;
        line-height: 300px;

        text-align: center;
      }
      /*设置字体大小,对齐方式及行高(垂直居中)*/

      .effect {
        position: relative;

        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;

        -ms-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
        -o-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
      }
      /**
       * 设置盒子外阴影和内阴影
      -----------------------------------------------------------------------
        可以使用十六进制颜色,若是需要用到透明度,建议用rgba
          box-shadow:h-shadow v-shadow blur spread color inset
         必需：h-shadow(水平)，v-shadow（垂直）
         可选：blur（模糊距离），spread（阴影尺寸），color（阴影颜色），inset（内阴影）
         浏览器兼容：IE9+、FireFox4、Chrome、Opera、Safari5.1.1

         */

      .effect:after,
      .effect:before {
        position: absolute;
        z-index: -1;
        top: 50%;
        right: 30px;
        bottom: 0;
        left: 30px;
        content: '';
        border-radius: 100px/10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);

        -ms-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
        -o-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
      }
      /**
       * .追加盒子,产生曲线阴影的效果,应用after+before重叠阴影更加厚实,使用z-index调整位置
       * :after 和 :before ，content添加内容，
       * 浏览器兼容：对于IE8及更早版本中的：after，必须声明<!DOCTYPE>
       * border-radius:x/y(水平半径/垂直半径)
       */

      .box {
        clear: both;
        overflow: hidden;

        width: 980px;
        height: auto;
        margin: 20px auto;
      }
      /**
       * 主容器宽度固定,高度自适应..清除所有浮动且容器居中
       */

      .box li {
        position: relative;

        float: left;

        width: 300px;
        height: 300px;
        margin: 20px 10px;

        border: 2px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7), 0 0 60px rgba(0, 0, 0, 0.7) inset;

        -ms-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7), 0 0 60px rgba(0, 0, 0, 0.7) inset;
        -o-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7), 0 0 60px rgba(0, 0, 0, 0.7) inset;
      }
      /**
       * width:(300+10*2+2*2)*3 = 972 <980
       * 增加阴影
       */

      .box li img {
        display: block;

        width: 290px;
        height: 290px;
        margin: 5px;
      }
      /**
       * width:(290 + 5*2) = 300 == li.width
       * height:(290+ 5*2) = 300 == li.height
       */

      .box li:before {
        position: absolute;
        z-index: -1;
        bottom: 13px;
        left: 20px;

        width: 90%;
        height: 80%;

        content: '';
        -webkit-transform: skew(-8deg) rotate(-4deg);
        -ms-transform: skew(-8deg) rotate(-4deg);
        transform: skew(-8deg) rotate(-4deg);

        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);

        -ms-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
        -o-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
      }

      .box li:after {
        position: absolute;
        z-index: -2;
        right: 20px;
        bottom: 13px;

        width: 90%;
        height: 80%;

        content: '';
        -webkit-transform: skew(8deg) rotate(4deg);
        -ms-transform: skew(8deg) rotate(4deg);
        transform: skew(8deg) rotate(4deg);

        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);

        -ms-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
        -o-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
      }
    </style>
  </head>
  <body>
    <div class="wrap effect">
      <h1>啦啦啦德玛西亚!!!!</h1>
    </div>
    <p>这是曲线阴影效果!!!!</p>
    <ul class="box">
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <p>这是翘边阴影效果!!!!</p>
  </body>
</html>
```

## 8.利用-webkit-mask 实现蒙版效果

效果图：

![img](https://raw.githubusercontent.com/GolderBrother/blog/master/images/css/A1CDFCA0-0F5F-42DB-94B0-CB9A386C8362.png)

代码：

```css
background: url('images/logo.png') no-repeat;
-webkit-mask: url('images/mask.png');
```

mask.png 中黑色代表是不透明的（alpha：1）,其他部分为透明的（alpha：0），将它盖在背景图上，注意：背景图对应 mask.png 中透明的位置也会变成透明，留下非透明的形状，即背景图的可见形状与 mask.png 的可见形状相同。 即为"蒙版"。

## 9.图片自适应占位方式

当图片未正确加载，或加载完成前，由于图片高度为 0，其容器会因为没有内容，导致容器无法撑高而塌陷，而如果加载较慢则会再图片加载完成后出现闪烁的情况。

css 中，当 padding-top/bottom 值为百分比时，其值都是以其父元素的宽度为参照对象。因此对于宽高比例固定的情况，可以利用 padding-top/bottom 用于图片自适应占位，解决页面闪烁的问题。

如果仅设置值 padding-top/bottom 为百分比，会出现一个问题，就是该方法容器的 max-height 属性会失效，就无法限制容器的最大高度了。

因此，可以给容器添加一个伪元素的子元素用于撑起内容，该子元素拥有一个 padding-top:100%，同时给容器一个 max-height 尝试限制容器的高度，最后内容用绝对定位的方式添加即可。如：

```css
#container {
  width: 50%;
  max-height: 300px;
  background-color: #ddd;
  /*由于margin存在塌陷的问题，需要通过构建BFC来保证容器不会受到影响，因此这里可以给容器一个overflow:hidden来保证伪元素的margin不会塌陷。*/
  overflow: hidden;
  position: relative; /* 父容器相对定位 */
}
.placeholder::after {
  content: '';
  display: block;
  margin-top: 100%;
}
img {
  position: absolute; /* 内容绝对定位 */
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%); /* 控制内容绝对定位位置 */
  width: 80%; /* 控制图片不溢出，因此这里使用的图片实际宽度受父容器影响 */
}
```

但是对于宽高比例不定的图片来说，这样做可能导致图片显示不全，使用时要注意。

## 10.页面自适应最佳实践

> 经过大型项目实践，下面这段 CSS 是最好的基于 rem 和 vm 和 calc 实践代码：

```css
html {
  font-size: 16px;
}
@media screen and (min-width: 375px) {
  html {
    /* iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
    font-size: calc(100% + 2 * (100vw - 375px) / 39);
    font-size: calc(16px + 2 * (100vw - 375px) / 39);
  }
}
@media screen and (min-width: 414px) {
  html {
    /* 414px-1000px每100像素宽字体增加1px(18px-22px) */
    font-size: calc(112.5% + 4 * (100vw - 414px) / 586);
    font-size: calc(18px + 4 * (100vw - 414px) / 586);
  }
}
@media screen and (min-width: 600px) {
  html {
    /* 600px-1000px每100像素宽字体增加1px(20px-24px) */
    font-size: calc(125% + 4 * (100vw - 600px) / 400);
    font-size: calc(20px + 4 * (100vw - 600px) / 400);
  }
}
@media screen and (min-width: 1000px) {
  html {
    /* 1000px往后是每100像素0.5px增加 */
    font-size: calc(137.5% + 6 * (100vw - 1000px) / 1000);
    font-size: calc(22px + 6 * (100vw - 1000px) / 1000);
  }
}
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)~
