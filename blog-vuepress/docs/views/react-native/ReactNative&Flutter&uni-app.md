
## 一、技术学习成本和难度

1. `react-native`，要求开发者学习 react，要求精通 flex 布局，要求原生开发协作。

2. `flutter`，要求开发者学习 dart，了解 dart 和 `flutter` 的 API、要求精通 flex 布局，要求原生开发协作。

3. `weex` 已经内嵌到 `uni-app` 中，就不单独提了。

4. `uni-app`，要求开发者学习 `vue`，了解小程序。

很明显 `uni-app` 的学习成本太低了，它没有附加专有技术，全部使用公共技术。

因此学习成本对比：`flutter` > `react-native` > `uni-app` > `weex`

学习成本和难度，直接意味着：开发成本、招聘成本、上线速度、上线风险

## 二、性能分析和写法的对比

我们先举个例子，用`React Native`和`uni-app`如何实现：

### React Native

```jsx
import React from "react";
import { View, Text, Image, ScrollView, TextInput } from "react-native";

const App = () => {
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: "https://reactnative.dev/docs/assets/p_cat2.png",
          }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
};

export default App;
```

### uni-app

```vue
<template>
  <view class="slide">
    <slide-view width="750" height="110" slide-width="500">
      <view slot="left" class="l">
        <image src="/static/file_transfer.jpg" class="img"></image>
        <view class="text">
          <view class="title">文件传输助手</view>
          <view class="time">7:00 PM</view>
        </view>
      </view>
      <view slot="right" class="r">
        <view class="read">标为已读</view>
        <view class="delete">删除</view>
      </view>
    </slide-view>
  </view>
</template>
<script>
export default {};
</script>
<style>
.slide {
  border-bottom: 1px solid #dedede;
}
.l {
  background-color: white;
  height: 110rpx;
  width: 750rpx;
  display: flex;
  flex-direction: row;
}
.r {
  height: 110rpx;
  display: flex;
  direction: row;
  text-align: center;
  vertical-align: middle;
  line-height: 110rpx;
}
.read {
  background-color: #ccc;
  color: #fff;
  width: 350rpx;
}
.delete {
  background-color: red;
  color: #fff;
  width: 150rpx;
}
.img {
  width: 90rpx;
  height: 90rpx;
  border-radius: 10rpx;
  margin: 10rpx 15rpx;
}
.text {
  display: flex;
  flex-direction: row;
}

.title {
  margin-top: 15rpx;
  font-size: 33rpx;
}
.time {
  margin-top: 15rpx;
  color: #ccc;
  font-size: 25rpx;
  margin-left: 330rpx;
}
</style>
```

可以看出

- `uni-app`完全遵循 `vue` 的语法, 对于前端来说，上手很快，并且一些 app 的原生功能也都能满足，而且调试打包，各种配置也简单明了;并且支持类似小程序的组件, 支持的功能更多, 跟原生的 `html` 和 `css` 很契合, 支持 `CSS3` 动画

- `React Native`遵循 `React` 的语法, 使用 `jsx` 来编写视图层

## 三、质量

2020 年 8 月 7 日的数据，各家的 `github` 的 `issues` 如下：

| 框架                                                     | issue                                                  | star                                                         |
| -------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| [uni-app](https://github.com/dcloudio/uni-app)           | [495](https://github.com/dcloudio/uni-app/issues)      | [24.4K](https://github.com/dcloudio/uni-app/stargazers)      |
| [react native](https://github.com/facebook/react-native) | [832](https://github.com/facebook/react-native/issues) | [89.1K](https://github.com/facebook/react-native/stargazers) |
| [flutter](https://github.com/flutter/flutter)            | [5K+](https://github.com/flutter/flutter/issues)       | [98.1K](https://github.com/flutter/flutter/stargazers)       |

代码量是 `flutter` 最多，对应它的 `issues` 的数量也越多。
对于 `uni-app` 和 `react native` 来讲，渲染层是基于相对成熟的原生渲染或 `webview` 渲染来做的，不像 `flutter` 一切都是自己实现。而逻辑层 `uni-app` 也使用相对成熟的 `v8` 和 `jscore`，出问题的点相对要少。

各框架的更新都比较频繁，真的有影响商用的大问题，肯定都会及时修复。

目前各个框架都有较大的用户使用量，质量方面均是可控的。

## 四、生态

任何开发引擎，都离不开生态。

对于国外的开发者，`react-native`、`flutter` 的生态肯定比 `uni-app` 好，比如 facebook 登陆分享、Google 地图等。

但对于国内的开发者，那是反过来的，中国开发者需要的全端推送（UniPush 集成了 iOS、华为、小米、OPPO 等众多原厂推送）、各种国内登陆、支付、分享 SDK、各种国内地图、各种 ui 库、以及 Echart 图表等，都是在 `uni-app` 体系里，这方面生态可比 `react-native`、`flutter` 丰富多了。`uni-app` 的插件市场有数千款插件，不能说应有尽有，但确实是最丰富的跨端开发框架生态了

另外，`uni-app` 的生态还比其他竞品强在如下方面：

- App 和 H5 提供了 renderjs 技术，使得浏览器专用的库也可以在 App 和 H5 里使用，比如 echart、threejs 等参考
- 兼容微信小程序 JS SDK，丰富的小程序生态内容可直接引入 `uni-app`，并且在 App 侧通用，参考
- 兼容微信小程序自定义组件，并且 App、H5 侧通用，参考

这些丰富的生态兼容，是 `react-native` 和 `flutter` 无法享受的。

## 五、相关资源

- [uni-app 中使用微信小程序第三方 SDK 及资源汇总](https://ask.dcloud.net.cn/article/35070)
- [React Native 资源整理](https://www.jianshu.com/p/74a35eddc619)

## 总结

1. 目前，`flutter` 在国内一些大厂的原生 App 里得到了局部应用。这个应用场景，目的不是为了节省成本，`flutter` 开发成本很高，生态也不完善，但因为性能高，一些大公司愿意负担这个代价来使用 `flutter`，在原生 app 里部分页面使用 `flutter` 制作。但是这个场景，有个尴尬，就是 `flutter` 页面无法动态更新，但很多大 app 对动态发版的需求极强，有些厂商改造了 `flutter` 使其可动态发布，但又降低了 `flutter` 的性能。目前还没有一个完美的解决方案。

2. `flutter` VS `uni-app`

- `flutter` 与 `uni-app` 的相对优势：

  - 性能好一丢丢。比 `react-native` 有优势，但比拥有 bindingx 和 wxs 的 weex/`uni-app`，在实际开发中没有很明显的差距。

- `flutter` 与 `uni-app` 的相对劣势：
  - 需要原生协作，维护 3 套代码，无法有效降低开发成本，提升开发效率
  - 嵌套地狱，代码难看难维护
  - 不支持热更新
  - 目前质量和成熟度很低
  - 原生可视控件融合不好，比如 webview、video、map
  - ui 库不适合国情
  - 学习成本高
  - 应用场景有限，dart 未来扑朔迷离

3. `react-native` VS `uni-app`

- `react-native` 与 `uni-app` 的相对优势：

  - `react-native` 的坑虽然比 weex 的少，但 `uni-app` 已经填了 weex 的很多坑。这方面差别不大。
  - `react-native` 的生态虽然比 weex 丰富。但 `uni-app` 是反过来的，`uni-app` 的[国内应用生态](https://ext.dcloud.net.cn/)丰富度超过了 `react-native`。
  - `react-native` 是纯单页的，嵌入原生 App 比较灵活。而 `uni-app` 是应用整体的概念，如果要内嵌入其他原生应用的话，要求原生应用内嵌 `uni-app` 应用整体进来。即集成 `uni-app` 小程序 sdk。

- `react-native` 与 `uni-app` 的相对劣势：
  - 需要原生协作，维护 3 套代码，无法有效降低开发成本，提升开发效率
  - 不支持小程序，发布到 h5 也无法直接发
  - 性能不如 `uni-app`
  - 国内的插件生态不如 `uni-app` 丰富
  - ui 库不适合国情，learn once，write anywhere
  - 学习成本高，用人成本高，不利于开发商降低开发成本
  - `react-native` 是纯单页应用，如果一个应用的页面很多，用 `react-native` 写会很崩溃，变量污染和干扰严重。而 weex/uni-app 支持多页面，页面之间上下文隔离，写页面较多的大型应用更合适

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)~