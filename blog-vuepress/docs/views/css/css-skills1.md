# 10 个让你受益匪浅的 css 使用技巧

## 1. Safari 3D 变换会忽略 z-index 的层级

在 Safari 浏览器下(此 Safari 浏览器包括 iOS 的 Safari，iPhone 上的微信浏览器，以及 Mac OS X 系统的 Safari 浏览器)，当我们使用 3D transform 变换的时候，如果祖先元素没有 overflow:hidden/scroll/auto 等限制，则会直接忽略自身和其他元素的 z-index 层叠顺序设置，而直接使用真实世界的 3D 视角进行渲染。 例如下面的场景，图中红框里面的模块，使用 3D transform 变换，进行旋转动画，但是在 Safari 浏览器下，忽略了二维码遮罩层的 z-index,结果使用了真实世界的 3D 视角进行渲染。

 