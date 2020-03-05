# 浏览器缓存一探究竟~

先看一张经典的流程图，结合理解

> 吃了它

![img](http://img.golderbrother.cn/cache-fe.webp)

## 1. 缓存作用

- 减少了冗余的`数据传输`，节省了网费。
- 减少了服务器的负担， 大大提高了网站的`性能`
- 加快了客户端加载网页的`速度`

## 2. 缓存分类

### 2.1 DNS 缓存

主要就是在浏览器本地把对应的 IP 和域名关联起来，这样在进行 DNS 解析的时候就很快。

### 2.2 MemoryCache

是指存在**内存**中的**缓存**。从优先级上来说，它是浏览器最先尝试去命中的一种**缓存**。从效率上来说，它是**响应速度最快**的一种缓存。
**内存缓存**是快的，也是“短命”的。它和渲染进程“生死相依”，当进程结束后，也就是 tab 关闭以后，内存里的数据也将不复存在。

### 2.3 浏览器缓存

浏览器缓存，也称**Http 缓存**，分为**强缓存**和**协商缓存**。优先级较高的是**强缓存**，在命中**强缓存**失败的情况下，才会走**协商缓存**

### 2.3.1 强缓存

**强缓存**是利用 `http` 头中的 `Expires` 和 `Cache-Control` 两个字段来控制的。**强缓存**中，当请求再次发出时，浏览器会根据其中的 `Expires` 和 `cache-control` 判断目标资源是否“命中”**强缓存**，若命中则直接从缓存中获取资源，不会再与服务端发生通信。

#### Expires

实现**强缓存**，过去我们一直用`Expires`。当服务器返回响应时，在 Response Headers 中将过期时间写入 `Expires` 字段。像这样

`expires: Wed, 12 Sep 2019 06:12:18 GMT`

可以看到，`expires` 是一个时间戳，接下来如果我们试图再次向服务器请求资源，浏览器就会先对比本地时间和 `expires` 的时间戳，如果本地时间**小于** `expires` 设定的过期时间，那么就直接去缓存中取这个资源。

从这样的描述中大家也不难猜测，`expires` 是有问题的，它最大的问题在于对`本地时间`的依赖。如果服务端和客户端的时间设置可能不同，或者我直接手动去把客户端的时间改掉，那么 `expires` 将无法达到我们的预期。

#### Cache-Control

考虑到 `expires` 的局限性，`HTTP1.1` 新增了`Cache-Control`字段来完成 `expires` 的任务。`expires` 能做的事情，`Cache-Control` 都能做；`expires` 完成不了的事情，`Cache-Control` 也能做。因此，`Cache-Control` 可以视作是 `expires` 的完全替代方案。在当下的前端实践里，我们继续使用 `expires` 的唯一目的就是向下兼容。

在 `Cache-Control` 中，我们通过`max-age`来控制资源的有效期。`max-age` 不是一个时间戳，而是一个时间长度。在本例中，`max-age` 是 `31536000` 秒，它意味着该资源在 `31536000` 秒以内都是有效的，完美地规避了时间戳带来的潜在问题。

`Cache-Control` 相对于 expires 更加准确，它的优先级也更高。当 `Cache-Control` 与 expires 同时出现时，我们以 `Cache-Control` 为准。

可以参考下下面两张图：

![img](http://img.golderbrother.cn/cache1.png)

### 2.3.2 协商缓存(对比缓存)

协商缓存依赖于服务端与浏览器之间的通信。协商缓存机制下，浏览器需要向服务器去询问缓存的相关信息，进而判断是重新发起请求、下载完整的响应，还是从本地获取缓存的资源。如果服务端提示缓存资源未改动（Not Modified），资源会被重定向到浏览器缓存，这种情况下网络请求对应的状态码是 304。

协商缓存的实现,从 `Last-Modified` 到 `Etag`,`Last-Modified` 是一个时间戳，如果我们启用了协商缓存，它会在首次请求时随着 `Response Headers` 返回：

#### Last-Modified

```html
Last-Modified: Fri, 27 Oct 2017 06:35:57 GMT
```

随后我们每次请求时，浏览器的请求头 `headers` 会带上一个叫 `If-Modified-Since` 的时间戳字段，它的值正是上一次 `response` 返回给它的 `Last-Modified` 值：

```html
If-Modified-Since: Fri, 27 Oct 2017 06:35:57 GMT
```

服务器接收到这个时间戳后，会比对该时间戳和资源在服务器上的**最后修改时间**是否一致，从而判断资源是否发生了变化。如果发生了变化，就会返回一个完整的响应内容，并在 `Response Headers` 中添加新的 `Last-Modified` 值；否则，返回 304 响应，`Response Headers` 不会再添加 `Last-Modified` 字段。

如下图：

![img](http://img.golderbrother.cn/cache3.png)

通过最后修改时间来判断缓存是否可用

- `Last-Modified`：响应时告诉客户端此资源的最后修改时间
- `If-Modified-Since`：当资源过期时（使用 `Cache-Control` 标识的 `max-age`），发现资源具有 `Last-Modified` 声明，则再次向服务器请求时带上头 `If-Modified-Since`。
- 服务器收到请求后发现有头 `If-Modified-Since` 则与被请求资源的最后修改时间进行比对。若最后修改时间较新，说明资源又被改动过，则响应最新的资源内容并返回 `200` 状态码；
- 若最后修改时间和 `If-Modified-Since` 一样，说明资源没有修改，则响应 `304` 表示未更新，告知浏览器继续使用所保存的缓存文件。

看个实例代码：

```js
let http = require('http');
let fs = require('fs');
let path = require('path');
let mime = require('mime');
http.createServer(function (req, res) {
    let file = path.join(__dirname, req.url);
    fs.stat(file, (err, stat) => {
        if (err) {
            sendError(err, req, res, file, stat);
        } else {
            let ifModifiedSince = req.headers['if-modified-since'];
            if (ifModifiedSince) {
                if (ifModifiedSince == stat.ctime.toGMTString()) {
                    res.writeHead(304);
                    res.end();
                } else {
                    send(req, res, file, stat);
                }
            } else {
                send(req, res, file, stat);
            }
        }
    });
}).listen(8080);
function send(req, res, file, stat) {
    res.setHeader('Last-Modified', stat.ctime.toGMTString());
    res.writeHead(200, { 'Content-Type': mime.getType(file) });
    fs.createReadStream(file).pipe(res);
}
function sendError(err, req, res, file, stat) {
    res.writeHead(400, { "Content-Type": 'text/html' });
    res.end(err ? err.toString() : "Not Found");
```

使用 Last-Modified 存在一些弊端，这其中最常见的就是这样几个场景
    1. 某些服务器不能精确得到文件的**最后修改时间**， 这样就无法通过**最后修改时间**来判断文件是否更新了。
    2. 我们编辑了文件，但文件的内容没有改变。服务端并不清楚我们是否真正改变了文件，它仍然通过最后编辑时间进行判断。因此这个资源在再次被请求时，会被当做新资源，进而引发一次完整的响应——不该重新请求的时候，也会重新请求。
    3. 当我们修改文件的速度过快时（比如花了 `100ms` 完成了改动），由于 `If-Modified-Since` 只能检查到以**秒**为最小计量单位的时间差，所以它是**感知不到**这个改动的——该重新请求的时候，反而没有重新请求了。
    4. 如果同样的一个文件位于多个CDN服务器上的时候内容虽然一样，修改时间不一样。

第二和第三这两个场景其实指向了同一个 bug——服务器并没有正确感知文件的变化。为了解决这样的问题，Etag 作为 `Last-Modified` 的补充出现了。

#### Etag

> 这个是协商缓存中的另外一种

`Etag` 是由服务器为每个资源生成的唯一的标识字符串(**指纹**)，这个标识字符串可以是基于文件内容**编码**的，只要文件内容不同，它们对应的 `Etag` 就是不同的，反之亦然。因此 `Etag` 能够精准地感知文件的变化。

`Etag`是 Web 服务端产生的，然后发给浏览器客户端。生成过程需要服务器额外付出开销，会**影响服务端的性能**，这是它的弊端。因此启用 `Etag` 需要我们审时度势。正如我们刚刚所提到的——`Etag` 并不能替代 `Last-Modified`，它只能作为 `Last-Modified` 的补充和强化存在。

执行流程是这样的： 
    1. 客户端想判断缓存是否可用可以先获取缓存中文档的`ETag`，然后通过`If-None-Match`发送请求给 Web 服务器询问此缓存是否可用。 
    2. 服务器收到请求，将服务器的中此文件的`ETag`,跟请求头中的`If-None-Match`相比较,如果值是一样的,说明缓存还是最新的,Web 服务器将发送`304 Not Modified`响应码给客户端表示缓存未修改过，可以使用。 
    3. 如果不一样则 Web 服务器将发送该文档的最新版本给浏览器客户端


看如下实例代码：

```js
let http = require("http");
let fs = require("fs");
let path = require("path");
let mime = require("mime");
let crypto = require("crypto");
http
  .createServer(function(req, res) {
    let file = path.join(__dirname, req.url);
    fs.stat(file, (err, stat) => {
      if (err) {
        sendError(err, req, res, file, stat);
      } else {
        let ifNoneMatch = req.headers["if-none-match"];
        let etag = crypto
          .createHash("sha1")
          .update(stat.ctime.toGMTString() + stat.size)
          .digest("hex");
        if (ifNoneMatch) {
          if (ifNoneMatch == etag) {
            res.writeHead(304);
            res.end();
          } else {
            send(req, res, file, etag);
          }
        } else {
          send(req, res, file, etag);
        }
      }
    });
  })
  .listen(8080);
function send(req, res, file, etag) {
  res.setHeader("ETag", etag);
  res.writeHead(200, { "Content-Type": mime.lookup(file) });
  fs.createReadStream(file).pipe(res);
}
function sendError(err, req, res, file, etag) {
  res.writeHead(400, { "Content-Type": "text/html" });
  res.end(err ? err.toString() : "Not Found");
}
```

#### 强缓存和协商缓存比较

优先级：

`Etag` 在感知文件变化上比 `Last-Modified` 更加准确，优先级也更高。当 `Etag` 和 `Last-Modified` 同时存在时，以 `Etag` 为准。

对比：

- 强制缓存如果生效，不需要再和服务器发生交互，而对比缓存不管是否生效，都需要与服务端发生交互
- 两类缓存规则可以同时存在，强制缓存优先级高于对比缓存，也就是说，当执行强制缓存的规则时，如果缓存生效，直接使用缓存，不再执行对比缓存规则

### 2.4 Service Worker Cache

`Service Worker` 是一种独立于主线程之外的 `Javascript 线程`。它**脱离**于浏览器窗体，因此无法直接访问 `DOM。这样独立的个性使得` `Service Worker` 的“个人行为”**无法干扰**页面的性能，这个**幕后工作者**可以帮我们实现**离线缓存**、**消息推送**和**网络代理**等功能。我们借助 `Service worker` 实现的离线缓存就称为 `Service Worker` Cache。

`Service Worker` 的生命周期包括 `install、activited、working` 三个阶段。一旦 `Service Worker` 被 install，它将始终存在，只会在 active 与 working 之间切换，除非我们主动终止它。这是它可以用来实现离线存储的重要先决条件.

它就在浏览器开发工具(F12) `Application` 标签页中

### 2.5 Push Cache

`Push Cache` 是指 `HTTP2` 在 `server push` 阶段存在的缓存。这块的知识比较新，应用也还处于萌芽阶段，应用范围有限不代表不重要——`HTTP2` 是趋势、是未来。在它还未被推而广之的此时此刻，仍希望大家能对 `Push Cache` 的关键特性有所了解：

- `Push Cache` 是缓存的最后一道防线。浏览器只有在 `Memory Cache`、`HTTP Cache` 和 `Service Worker Cache` 均未命中的情况下才会去询问 `Push Cache`。
- `Push Cache` 是一种存在于会话阶段的缓存，当 session 终止时，缓存也随之释放。
- 不同的页面只要共享了同一个 `HTTP2` 连接，那么它们就可以共享同一个 `Push Cache`。

## 3. 请求流程

### 3.1 第一次请求

![img](http://img.golderbrother.cn/cache5.png)

### 3.2 第二次请求

走上面的缓存机制

## 4. 如何干脆不发请求

- 浏览器会将文件缓存到`Cache`目录，第二次请求时浏览器会先检查`Cache`目录下是否含有该文件，如果有，并且还没到`Expires`设置的时间，即文件还没有过期，那么此时浏览器将直接从 Cache 目录中读取文件，而不再发送请求
- `Expires`是服务器响应消息头字段，在响应 http 请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求,这是`HTTP1.0`的内容，现在浏览器均默认使用`HTTP1.1`,所以基本可以忽略
- `Cache-Control`与`Expires`的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据,如果同时设置的话，其优先级高于`Expires`

### 5.1 使用 Cache-Control

- private 客户端可以缓存
- public 客户端和代理服务器都可以缓存
- max-age=60 缓存内容将在 60 秒后失效
- no-cache 需要使用**对比缓存**验证数据,强制向源服务器再次验证
- no-store 所有内容都不会缓存，**强制缓存**和**对比缓存**都不会触发
- Cache-Control:private, max-age=60, no-cache

```js
let http = require("http");
let fs = require("fs");
let path = require("path");
let mime = require("mime");
let crypto = require("crypto");
http
  .createServer(function(req, res) {
    let file = path.join(__dirname, req.url);
    console.log(file);

    fs.stat(file, (err, stat) => {
      if (err) {
        sendError(err, req, res, file, stat);
      } else {
        send(req, res, file);
      }
    });
  })
  .listen(8080);
function send(req, res, file) {
  let expires = new Date(Date.now() + 60 * 1000);
  res.setHeader("Expires", expires.toUTCString());
  res.setHeader("Cache-Control", "max-age=60");
  res.writeHead(200, { "Content-Type": mime.lookup(file) });
  fs.createReadStream(file).pipe(res);
}
function sendError(err, req, res, file, etag) {
  res.writeHead(400, { "Content-Type": "text/html" });
  res.end(err ? err.toString() : "Not Found");
}
```

## 参考资料

[谈谈浏览器缓存](https://github.com/LuckyWinty/fe-weekly-questions/issues/8)
