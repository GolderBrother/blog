# React Native 跟原生之间的通信

![RN.jpg](./imgs/RN.jpg)

## 原生加载 React Native 页面

`React Native` 维护了一个类似 `react` 的 **路由表**，然后 原生 那边会加载 `RN` 打包后的一个 `index.android.bundle` 包, 并且传入一个名称为约定好的 `routerName` 的属性，然后根据路由表匹配 `routerName` , 加载对应的页面

## 原生 通知事件给 React Native

类似**发布订阅**模式

原生那边发射一个全局的通知事件，`RN` 这边监听这个事件，执行自己的逻辑，在页面销毁后移除这个事件。

实现代码是这样的

```js
import { Platform, DeviceEventEmitter, NativeEventEmitter } from 'react-native';
const PLAN_EVENT_MAP = {
  // 修改计划成功事件
  PlanChangeSuccess: 'PlanChangeSuccess',
};

const FOO = (props) => {
  // 修改成功后刷新详情页的事件管理中心ref
  const eventReloadRef = useRef();
  // 初始化获取数据
  const getInitialDetail = () => {};
  useEffect(() => {
    getInitialDetail();
    () => {
      // 移除监听原生的事件
      eventReloadRef.current && eventReloadRef.current.remove();
    };
  }, []);

  /**
   * 监听原生发送的事件(全局)
   */
  useEffect(() => {
    // Android 端
    if (Platform.OS === 'android') {
      eventReloadRef.current = DeviceEventEmitter.addListener(
        PLAN_EVENT_MAP.PlanChangeSuccess,
        (success) => {
          console.log('android PlanChangeSuccess', success);
          // 更新完重新加载数据
          success && getInitialDetail();
        }
      );
    }
    // iOS 端
    if (Platform.OS === 'ios') {
      const EventEmitterManager = NativeModules.VKReactEventEmitter;
      if (EventEmitterManager) {
        const navigationEmitter = new NativeEventEmitter(EventEmitterManager);
        eventReloadRef.current = navigationEmitter.addListener(
          PLAN_EVENT_MAP.PlanChangeSuccess,
          (success) => {
            console.log('ios PlanChangeSuccess', success);
            // 更新完重新加载数据
            success && getInitialDetail(planId);
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
```

### 使用场景

比如在一个 `RN` 提供的详情页面，还有一个修改功能跳转到原生的修改内容页面，当修改完内容，返回到详情页面，就需要**通知** `RN` 更新详情页.

## React Native 调用原生的方法

### 初始化获取并赋值原生传入的参数

首先，我们前面提到过，当启动应用后，`React Native` 会初始化一个类似 `react` 的 **路由表**，然后 原生 那边会加载 `RN` 打包后的一个 `bundle` 包, 并且传入一个名称为约定好的 `routerName` 的属性，`RN` 会接收这个 `routerName` props，作为初始化路由(`initialRouteName`)来加载页面。

直接看代码吧

```js
import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomePage from '../pages/home';
const routes = {
  HomePage: {
    screen: HomePage, //Tab作为Stack路由
  },
};
class Routers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // 说明是原生加载的RN Bundle
    if (this.props.routerName) {
      // 根据原生传入的routerName来初始化路由页面
      options.initialRouteName = this.props.routerName;
      const keys = Object.keys(routes);
      keys.forEach((key) => {
        routes[key].params = {};
      });
      routes[this.props.routerName].params = {
        // 只要是原生加载的RN Bundle，那当前就是原生环境
        isNative: true,
        // 接收原生传入的其他属性，一一赋值到当前路由的params属性中
        ...this.props,
      };
    }
    const StackNavigator = createAppContainer(
      createStackNavigator(routes, options)
    );
    return <StackNavigator />;
  }
}
```

### 然后，在加载的页面中，可以从 `props`对象 中拿到原生传入的属性和方法

具体代码是这样子的

- 从 `props` 获取原生传入的参数

```js
import { NativeModules } from 'react-native';
function getNativeModuleParams(props) {
  const { state = {} } = props.navigation || {};
  const { params = {} } = state;
  // 这个select_content是跟原生约定好的参数名称，值是一个json字符串，因为原生发送json对象会有问题
  const { nativeParams = '{}', ...rnParams } = params;
  const nativeModuleParams = JSON.parse(nativeParams);
  return {
    rnParams,
    nativeModuleParams,
  };
}

const Page = (props) => {
  // 获取原生传过来的数据是序列化的对象, 已经反序列化
  const { nativeModuleParams = {}, rnParams = {} } =
    getNativeModuleParams(props) || {};
  const { isNative } = rnParams || {};
  // 参数名称跟原生约定好
  let {
    nativeParams, // 原生传入的参数
    nativeMethod, // 原生传入的方法
    moduleName,
  } = isNative ? nativeModuleParams : rnParams; // isNative ? 原生跳转传递过来的参数 : RN跳转传递过来的参数
};
```

- 调用原生传入的方法

```js
const handleMethod = useCallback(() => {
  // 调用原生传入的方法
  // 这个nativeMethod是原生定义的方法名的一个key，具体指向哪个方法是原生那边定义的，因此需要[]来获取
  if (NativeModules[moduleName] && NativeModules[moduleName][nativeMethod]) {
    NativeModules[moduleName][nativeMethod]({
      nativeParams,
    });
  }
}, [nativeMethod, moduleName, nativeParams]);
```

### 使用场景

比如原生那边使用了`RN`的一个`模态弹框`, 当 `RN` 关掉这个模态框后，虽然已经看出来是消失了，但是**装载**这个模态框的**容器**还没有被销毁，这是原生创建的，`RN`这边操作不到，在 `iOS` 端是一个 `ViewController`, 在 `Android` 是一个 `Activity`, 同一个页面中，只能存在一个，因此 `RN` 就需要通知到原生来销毁这个**容器**， 就可以通过调用原生提供的方法来销毁容器。

## 总结

本文主要介绍了在 React Native 开发过程中，跟原生 APP 联调通信的过程。 目前是根据自己公司业务场景实现的逻辑，读者可根据自身业务需求做定制，有问题欢迎沟通，一起交流学习 😊

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)~