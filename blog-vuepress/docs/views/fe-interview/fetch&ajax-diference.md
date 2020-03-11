# 请说下 fetch 和 ajax 的区别吧

## 1. ajax

`Ajax` 技术的核心是 `XMLHttpRequest` 对象（简称`XHR`）。
`XHR` 为向服务器发送请求和解析服务器响应提供了流畅的接口。能够以异步方式从服务器取得更多信息，意味着用户单击后，可以不必刷新页面也能取得新数据。

看一个调用例子：

```js
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Request was unsuccessful: " + xhr.status);
    }
  }
};
xhr.open("get", "example.txt", true);
xhr.send(null);
```

## 2. fetch

`fetch`号称是`ajax`的替代品，它的 API 是基于`Promise`设计的，旧版本的浏览器不支持`Promise`，需要使用`polyfill es6-promise`,举个例子：

示例代码如下：

```js
// 原生XHR
const xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText); // 从服务器获取数据
  }
};
xhr.send();

// fetch
fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

看起来好像是方便点，`then`链就像之前熟悉的 `callback`。
在 [MDN](https://developer.mozilla.org/zh-CN/search?q=fetch) 上，讲到它跟`jquery ajax`的区别，这也是 fetch 很奇怪的地方：

- 当接收到一个代表错误的 `HTTP` 状态码时，从 `fetch()`返回的 `Promise` 不会被标记为 `rejected`， 即使该 `HTTP` 响应的状态码是 `404` 或 `500`。相反，它会将 `Promise` 状态标记为 `resolve` （但是会将 `resolved` 的返回值的 `ok` 属性设置为 `false` ）， 仅当**网络故障**时或**请求被阻止**时，才会标记为 `rejected` 状态。
- 默认情况下, `fetch` 不会从服务端发送或接收任何 `cookies`, 如果站点依赖于用户 `session`，则会导致未经认证的请求（要发送 `cookies`，必须设置 `credentials` 选项）.
- `fetch()` 不会接受跨域 `cookies`；你也不能使用 `fetch()` 建立起跨域会话。其他网站的 `Set-Cookie` 头部字段将会被无视。
- `fetch` 不会发送 `cookies`。除非你使用了 `credentials` 的初始化选项。（自 2017 年 8 月 25 日以后，默认的 `credentials` 政策变更为 `same-origin`。`Firefox` 也在 61.0b13 版本中进行了修改）
