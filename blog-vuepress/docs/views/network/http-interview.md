# HTTP 灵魂之问，巩固你的 HTTP 知识体系

为了帮助大家树立完整的 HTTP 知识体系，并达到一定的深度，从容地应对各种灵魂之问，也同时提升自己作为一个 web 开发的专业素养吧。这是本文的思维导图

![img](https://user-gold-cdn.xitu.io/2020/3/23/17104ea1fdee5669?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 001. HTTP 报文结构是怎样的？

对于 **TCP** 而言，在传输的时候分为两个部分:**TCP 头**和**数据部分**。

而 **HTTP** 类似，也是`header + body`的结构，具体而言:

```txt
起始行 + 头部 + 空行 + 实体
```

由于 http **请求报文**和**响应报文**是有一定区别，因此我们分开介绍。

### 起始行

对于请求报文来说，起始行类似下面这样:

```js
GET /home HTTP/1.1
```

也就是**方法 + 路径 + http 版本**。

对于响应报文来说，起始行一般长这个样:

```js
HTTP/1.1 200 OK

```

响应报文的起始行也叫做**状态行**。由**http 协议版本、状态码和描述**三部分组成。
其中协议版本`HTTP/1.1`或者`HTTP/1.0`，`200`就是它的**状态码**，`OK`则为它的**描述**。

值得注意的是，在起始行中，每两个部分之间用**空格**隔开，最后一个部分后面应该接一个**换行**，严格遵循`ABNF`语法规范。

### 头部

展示一下请求头和响应头在报文中的位置:

![img](https://user-gold-cdn.xitu.io/2020/3/22/170ffd6012e2fc88?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

不管是请求头还是响应头，其中的字段是相当多的，而且牵扯到`http`非常多的特性，这里就不一一列举的，重点看看这些头部字段的格式：

- 字段名不区分大小写
- 字段名不允许出现**空格**，不可以出现下划线`_`
- 字段名后面必须紧接着`:`

### 空行

很重要，用来区分开**头部**和**实体**。

问: 如果说在头部中间故意加一个空行会怎么样？

那么空行后的内容全部被视为**实体**。

### 实体

就是具体的数据了，也就是`body`部分。请求报文对应**请求体**, 响应报文对应**响应体**。

## 002. 如何理解 HTTP 的请求方法？

### 有哪些请求方法？

`http/1.1`规定了以下请求方法(注意，都是**大写**):

- `GET`: 通常用来获取资源
- `HEAD`: 获取资源的元信息
- `POST`: 提交数据，即上传数据
- `PUT`: 修改数据
- `DELETE`: 删除资源(几乎用不到)
- `CONNECT`: 建立连接隧道，用于代理服务器
- `OPTIONS`: 列出可对资源实行的请求方法，用来跨域请求。允许客户端查看服务器的性能
- `TRACE`: 追踪请求-响应的传输路径
- `PATCH`: 是对 PUT 方法的补充，用来对已知资源进行局部更新 。

### GET 和 POST 有什么区别？

首先最直观的是**语义**上的区别。

而后又有这样一些具体的差别:

- 从**缓存**的角度:
  - GET 请求会被浏览器主动缓存下来，留下历史记录，而 `POST` 默认不会。
  - GET 请求参数会被保留在浏览器历史记录里，而 POST 中的参数不会被保留。
- 从**编码**的角度，GET 只能进行 `URL` 编码，只能接收 `ASCII` 字符，而 `POST` 没有限制, 支持多种编码方式。
- 从**参数**的角度
  - GET 一般放在 `URL` 中，因此不安全，`POST` 放在请求体中，更适合传输敏感信息。
  - GET 请求在`URL` 中传送的参数是有长度限制的，而`POST`没有, 实际上是大部分浏览器都会限制`url`长度在`2K`个字节
- 从**幂等性**的角度，GET 是幂等的，而`POST`不是。(幂等表示执行相同的操作，结果也是相同的)
- 从**TCP**的角度，GET 请求会把请求报文一次性发出去，而 `POST` 会分为两个 `TCP` 数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 `body` 部分。(火狐浏览器除外，它的 POST 请求只发一个 `TCP` 包)

### 003: 如何理解 URI？

**URI**, 全称为(`Uniform Resource Identifier`), 也就是**统一资源标识符**，它的作用很简单，就是区分**互联网上不同的资源**。

但是，它并不是我们常说的网址, 网址指的是`URL`, 实际上`URI`包含了`URN`和`URL`两个部分，由于 `URL` 过于普及，就默认将 `URI` 视为 `URL` 了。

#### URI 的结构

URI 真正最完整的结构是这样的。

![img](https://user-gold-cdn.xitu.io/2020/3/22/170ffd677629b70d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

我们来一一拆解分析这个结构

`scheme` 表示**协议名**，比如`http, https, file, rtsp, rtmp`等等。后面必须和`://`连在一起。

`user:passwd@` 表示登录主机时的**用户信息**，不过很不安全，不推荐使用，也不常用。

`host:port`表示**主机名**和**端口**。

`path`表示**请求路径**，标记资源所在位置。

`query`表示**查询参数**，为`key=va`l 这种形式，多个键值对之间用`&`隔开。比如 `wd=http&rsv_spt=1&rsv_iqid=0xe4c8526f0004bf6d&issp=1&f=8&rsv_bp=1&rsv_idx=2`

`fragment`表示 `URI` 所定位的资源内的一个**锚点**，浏览器可以根据这个**锚点**跳转到对应的位置。

举个栗子:

```js
https://www.baidu.com/s?wd=http&rsv_spt=1&rsv_iqid=0xe4c8526f0004bf6d&issp=1&f=8&rsv_bp=1&rsv_idx=2
```

上面这个 `URI` 中，`https`即`scheme`(**协议**)部分，`www.baidu.com`为`host:port`(**主机名:端口**)部分（注意，`http` 和 `https` 的默认端口分别为`80、443`），`/s`为`path`(**请求路径**)部分，而`wd=http&rsv_spt=1&rsv_iqid=0xe4c8526f0004bf6d&issp=1&f=8&rsv_bp=1&rsv_idx=2`就是`query`(**查询参数**)部分。

### URI 编码

`URI` 只能使用`ASCII`, `ASCII` 之外的字符是不支持显示的，而且还有一部分符号是**界定符**，如果不加以处理就会导致解析出错。

因此，`URI` 引入了**编码**机制，将所有非 `ASCII` 码字符和**界定符**转为**十六进制字节值**，然后在前面加个`%`。

如，**空格**被转义成了`%20`，**神哥**被转义成了`%E7%A5%9E%E5%93%A5`。

可以直接使用`encodeURI`或者`encodeURIComponent`方法对**整个 URI**或者**URI 中的某一段**进行**编码**

我们来看下面的栗子：

```js
const uri = 'https://www.baidu.com/s?wd=http&rsv_spt=1&rsv_iqid=0xdca1d90b00033d32 ';

console.log(encodeURI(uri)); // https://www.baidu.com/s?wd=http&rsv_spt=1&rsv_iqid=0xdca1d90b00033d32%20
console.log(encodeURIComponent(uri)); // https%3A%2F%2Fwww.baidu.com%2Fs%3Fwd%3Dhttp%26rsv_spt%3D1%26rsv_iqid%3D0xdca1d90b00033d32%20
```

`encodeURI`和`encodeURIComponent`的区别

- `encodeURI()`不会对本身属于`URI`的特殊字符进行编码，例如`冒号、正斜杠、问号和井字号`；而`encodeURIComponent()`则会对它发现的**任何非标准字符**进行编码
- 使用`encodeURI()`编码后的结果是**除了空格之外的其他字符**都原封不动，只有空格被替换成了**%20**。而`encodeURIComponent()`方法则会使用对应的编码替换**所有非字母数字字符**

这也正是可以对整个`URI`使用`encodeURI()`，而只能对附加在现有 URI 后面的字符串使用`encodeURIComponent()`的原因所在。一般来说,我们使用`encodeURIComponent()`方法的时候要比使用`encodeURI()`更多,因为在实践中更常见的是对查询字符串参数而不是对基础 URL 进行编码.
经我的观测，很多网站的`cookie`在进行编码的时候，是`encodeURIComponent`格式的，所以应该使用`decodeURIComponent`进行解码

## 004: 如何理解 HTTP 状态码？

`RFC` 规定 `HTTP` 的状态码为**三位数**，被分为五类:

- 1xx: 表示目前是协议处理的**中间状态**，还**需要后续**操作。
- 2xx: 表示**请求成功**状态。
- 3xx: **重定向**状态，资源位置发生变动，需要重新请求。
- 4xx: **请求报文有误**。
- 5xx: **服务器端发生错误**。

接下来我们就一一分析这里面具体的状态码。

### 1xx

**101 Switching Protocols**。切换到新的 HTTP 版本比旧版本更有优势，或者切换到一个实时且同步的协议以传送利用此类特性的资源。比如在`HTTP`升级为`WebSocket`的时候，如果服务器同意变更，就会发送状态码 101。

### 2xx

**200 OK** 是见得最多的成功状态码。通常在响应体中放有数据。

**204 No Content**: 服务器成功处理了请求，但不需要返回任何实体内容，并且希望返回更新了的元信息, 含义与 `200` 相同，但响应头后没有 **body** 数据。

**206 Partial Content**: 顾名思义，表示部分内容，它的使用场景为 **HTTP 分块下载**和**断点续传**，当然也会带上相应的响应头字段`Content-Range`。

### 3xx

**301 Moved Permanently**: 被请求的资源已永久移动到新位置，即**永久重定向**，对应着`302 Found`，即**临时重定向**。

比如你的网站从 HTTP 升级到了 HTTPS 了，以前的站点再也不用了，应当返回 301，这个时候浏览器默认会做缓存优化，在第二次访问的时候自动访问重定向的那个地址。
而如果只是暂时不可用，那么直接返回 302 即可，和 301 不同的是，浏览器并不会做缓存优化。

**304 Not Modified**: 当协商缓存命中时会返回这个状态码。详见[浏览器缓存一探究竟~](https://golderbrother.github.io/blog/views/fe-interview/browser-cache.html)

### 4xx

**400 Bad Request**: **语义有误**或者**请求参数有误**, 开发者经常看到一头雾水，只是笼统地提示了一下错误，并不知道哪里出错了。

**401 Unauthorized**: 当前请求**需要用户验证**, 表示发送的请求需要有通过 **HTTP 认证**的认证信息

**403 Forbidden**: 服务器已经理解请求，但是拒绝执行它, 这实际上并不是请求报文出错，而是服务器禁止访问，原因有很多，比如法律禁止、信息敏感。

**404 Not Found**: 资源未找到，表示没在服务器上找到相应的资源。

**405 Method Not Allowed**: 请求行中指定的请求方法不能被用于请求相应的资源，请求方法不被服务器端允许。

**406 Not Acceptable**: 请求的资源的内容特性无法满足请求头中的条件，因而无法生成响应实体，资源无法满足客户端的条件。

**408 Request Timeout**: 客户端请求超时，服务器等待了太长时间。

**409 Conflict**: 由于和被请求的资源的当前状态之间存在冲突，请求无法完成，相当于多个请求发生了冲突。

**413 Request Entity Too Large**: 请求体的数据过大, 服务器拒绝处理当前请求。

**414 Request-URI Too Long**: 请求行里的 `URI` 太大，长度超过了服务器能够解释的长度。

**429 Too Many Request**: 客户端发送的请求过多。

**431 Request Header Fields Too Large**：请求头的字段内容太大。

### 5xx

**500 Internal Server Error**: 服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现，但是出了啥错咱也不知道。

**501 Not Implemented**: 表示客户端请求的功能服务器还不支持。

**502 Bad Gateway**: 作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应，服务器自身是正常的，但访问的时候出错了。

**503 Service Unavailable**: 由于临时的服务器维护或者过载，服务器当前无法处理请求。表示服务器当前很忙，暂时无法响应服务。

## 005: 简要概括一下 HTTP 的特点？HTTP 有哪些缺点？

HTTP 特点
HTTP 的特点概括如下:

1. 灵活可扩展，主要体现在两个方面。一个是语义上的自由，只规定了基本格式，比如空格分隔单词，换行分隔字段，其他的各个部分都没有严格的语法限制。另一个是传输形式的多样性，不仅仅可以传输文本，还能传输图片、视频等任意数据，非常方便。

2. 可靠传输。`HTTP` 基于 `TCP/IP`，因此把这一特性继承了下来。这属于 `TCP` 的特性，不具体介绍了。

3. 请求-应答。也就是**一发一收、有来有回**， 当然这个请求方和应答方不单单指**客户端**和**服务器**之间，如果某台服务器作为**代理**来**连接后端**的服务端，那么这台服务器也会扮演**请求方**的角色。

4. 无状态。这里的状态是指**通信过程的上下文信息**，而每次 `http` 请求都是**独立、无关**的，默认不需要保留状态信息。

### HTTP 缺点

#### 无状态

所谓的优点和缺点还是要分场景来看的，对于 `HTTP` 而言，最具争议的地方在于它的**无状态**。

在需要**长连接**的场景中，需要保存大量的**上下文信息**，以免传输大量重复的信息，那么这时候**无状态**就是 `http` 的缺点了。

但与此同时，另外一些应用仅仅只是为了获取一些数据，**不需要保存连接上下文信息**，**无状态**反而减少了网络开销，成为了 `http` 的优点。

#### 明文传输

即协议里的报文(主要指的是头部)不使用二进制数据，而是文本形式。

这当然对于调试提供了便利，但同时也让 `HTTP` 的报文信息暴露给了外界，给攻击者也提供了便利。`WIFI陷阱`就是利用 `HTTP` **明文传输**的缺点，诱导你连上热点，然后**疯狂抓你所有的流量**，从而拿到你的敏感信息。

#### 队头阻塞问题

当 `http` 开启**长连接**时，共用一个 `TCP` 连接，同一时刻只能处理一个请求，那么当前请求耗时过长的情况下，其它的请求只能处于阻塞状态，也就是著名的**队头阻塞**问题。接下来会有一小节讨论这个问题。

## 006: 对 Accept 系列字段了解多少？

对于 Accept 系列字段的介绍分为四个部分: **数据格式、压缩方式、支持语言和字符集**。

### 数据格式

上一节谈到 HTTP 灵活的特性，它支持非常多的数据格式，那么这么多格式的数据一起到达客户端，客户端怎么知道它的格式呢？

当然，最低效的方式是直接猜，有没有更好的方式呢？直接指定可以吗？

答案是肯定的。不过首先需要介绍一个标准——**MIME**(Multipurpose Internet Mail Extensions, **多用途互联网邮件扩展**)。它首先用在电子邮件系统中，让邮件可以发任意类型的数据，这对于 `HTTP` 来说也是通用的。

具体而言，这两个字段的取值可以分为下面几类:

- text：`text/html, text/plain, text/css` 等
- image: `image/gif, image/jpeg, image/png` 等
- audio/video: `audio/mpeg, video/mp4` 等
- application: `application/json(最常用), application/javascript, application/pdf, application/octet-stream`

### 压缩方式

当然一般这些数据都是会进行编码压缩的，采取什么样的压缩方式就体现在了发送方的`Content-Encoding`字段上， 同样的，接收什么样的压缩方式体现在了接受方的`Accept-Encoding`字段上。这个字段的取值有下面几种：

- `gzip`: 当今最流行的压缩格式
- `deflate`: 另外一种著名的压缩格式
- `br`: 一种专门为 `HTTP` 发明的压缩算法

比如：

```js
// 发送端
Content-Encoding: gzip
// 接收端
Accept-Encoding: gzip
```

### 支持语言

对于发送方而言，还有一个 `Content-Language` 字段，在需要实现国际化的方案当中，可以用来指定支持的语言，在接受方对应的字段为 `Accept-Language`。如:

```js
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7,zh-TW;q=0.6,ko;q=0.5
```

```js
// 发送端
Content-Language: zh-CN, zh, en
// 接收端
Accept-Language: zh-CN, zh, en

```

### 字符集

最后是一个比较特殊的字段, 在接收端对应为`Accept-Charset`，指定可以接受的字符集，而在发送端并没有对应的`Content-Charset`, 而是直接放在了`Content-Type`中，以`charset`属性指定。如:

```js
// 发送端
Content-Type: application/json; charset=utf-8
// 接收端
Accept-Charset: charset=utf-8

```

最后以一张图来总结一下吧:

![img](https://user-gold-cdn.xitu.io/2020/3/22/170ffd6bb6d09c2d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 007: 对于定长和不定长的数据，HTTP 是怎么传输的？

### 定长包体

对于定长包体而言，发送端在传输的时候一般会带上 `Content-Length`, 来指明包体的长度。

我们用一个 `nodejs` 服务器来模拟一下:

```js
const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', 10);
    res.write('helloworld');
  }
});

server.listen(8081, () => {
  console.log('成功启动');
});
```

启动后访问: `localhost:8081`。

浏览器中显示如下:

`helloworld`

这是长度正确的情况，那不正确的情况是如何处理的呢？

我们可以试着把这个长度设置的小一些:

```js
res.setHeader('Content-Length', 8);
```

重启服务，再次访问，现在浏览器中内容如下:

`hellowor`

那后面的 ld 哪里去了呢？实际上在 `http` 的响应体中直接被截掉了。

然后我们试着将这个长度设置得大一些:

```js
res.setHeader('Content-Length', 12);
```

此时浏览器显示如下:

![img](https://user-gold-cdn.xitu.io/2020/3/22/170ffd6f598bea62?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

直接无法显示了。可以看到`Content-Length`对于 `http` 传输过程起到了十分关键的作用，如果设置不当可以直接导致传输失败。

### 不定长包体

上述是针对于`定长包体`，那么对于`不定长包体`而言是如何传输的呢？

这里就必须介绍另外一个 http 头部字段了:

```js
Transfer-Encoding: chunked
```

表示**分块传输数据**，设置这个字段后会自动产生两个效果:

- `Content-Length` 字段会被**忽略**
- 基于长连接**持续推送动态内容**

我们依然以一个实际的例子来模拟分块传输，nodejs 程序如下:

```js
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.setHeader('Content-Length', 10);
    res.setHeader('Transfer-Encoding', 'chunked');
    res.write('<p>来啦</p>');
    setTimeout(() => {
      res.write('第一次传输<br/>');
    }, 1000);
    setTimeout(() => {
      res.write('第二次传输<br/>');
      res.end();
    }, 2000);
  }
});

server.listen(8009, () => {
  console.log('成功启动');
});
```

访问效果入下:

![img](https://user-gold-cdn.xitu.io/2020/3/22/170ffd78332368a0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

注意，`Connection: keep-alive`及之前的为**响应行**(HTTP/1.1 200 OK)和**响应头**(响应行下面的那部分)，后面的内容为响应体，这两部分用**换行符**隔开。

响应体的结构比较有意思，如下所示:

```txt
chunk长度(16进制的数)
第一个chunk的内容
chunk长度(16进制的数)
第二个chunk的内容
......
0

```

最后是留有有一个**空行**的，这一点请大家注意。

以上便是 `http` 对于定长数据和不定长数据的传输方式。

## 008: HTTP 如何处理大文件的传输？

对于几百 `M` 甚至上 `G` 的大文件来说，如果要一口气全部传输过来显然是不现实的，会有大量的等待时间，严重影响用户体验。因此，`HTTP` 针对这一场景，采取了范围请求的解决方案，允许客户端仅仅请求一个资源的一部分。

### 如何支持

当然，前提是服务器要支持范围请求，要支持这个功能，就必须加上这样一个响应头:

```http
Accept-Ranges: none
```

用来告知客户端这边是支持范围请求的。

### Range 字段拆解

而对于客户端而言，它需要指定请求哪一部分，通过 `Range` 这个请求头字段确定，格式为`bytes=x-y`。接下来就来讨论一下这个 `Range` 的书写格式:

- `0-499` 表示从开始到第 499 个字节。
- `500-` 表示从第 500 字节到文件终点。
- `-100` 表示文件的最后100个字节。

服务器收到请求之后，首先验证范围**是否合法**，如果越界了那么返回`416`错误码，否则读取相应片段，返回`206`状态码(上面说过的服务端**返回部分内容**)。

同时，服务器需要添加`Content-Range`字段，这个字段的格式根据请求头中`Range`字段的不同而有所差异。

具体来说，请求`单段数据`和请求`多段数据`，响应头是不一样的。

举个例子:

```js
// 单段数据
Range: bytes=0-9
// 多段数据
Range: bytes=0-9, 30-39

```

接下来我们就分别来讨论着两种情况。

### 单段数据

对于`单段数据`的请求，返回的响应如下:

```js
HTTP/1.1 206 Partial Content
Content-Length: 10
Accept-Ranges: bytes
Content-Range: bytes 0-9/100

i am xxxxx

```

值得注意的是`Content-Range`字段，`0-9`表示请求的返回，`100`表示资源的总大小，很好理解。

### 多段数据

接下来我们看看多段请求的情况。得到的响应会是下面这个形式:

```js
HTTP/1.1 206 Partial Content
// 非常关键的字段
Content-Type: multipart/byteranges; boundary=00000010101
Content-Length: 189
Connection: keep-alive
Accept-Ranges: bytes


--00000010101
Content-Type: text/plain
Content-Range: bytes 0-9/96

i am xxxxx
--00000010101
Content-Type: text/plain
Content-Range: bytes 20-29/96

eex jspy e
--00000010101--

```

这个时候出现了一个非常关键的字段`Content-Type: multipart/byteranges;boundary=00000010101`，它代表了信息量是这样的:

- 请求一定是多段数据请求
- 响应体中的分隔符是 00000010101

因此，在响应体中各段数据之间会由这里指定的分隔符分开，而且在最后的分隔末尾添上`--`表示结束。

以上就是 http 针对大文件传输所采用的手段。

## 009: HTTP 中如何处理表单数据的提交？

在 http 中，有两种主要的表单提交的方式，体现在两种不同的`Content-Type`取值:

```js
application/x-www-form-urlencoded
multipart/form-data
```

由于表单提交一般是`POST`请求，很少考虑`GET`，因此这里我们将默认提交的数据放在请求体中。

### application/x-www-form-urlencoded

对于`application/x-www-form-urlencoded`格式的表单内容，有以下特点:

- 其中的数据会被编码成以`&`分隔的键值对
- 字符以`URL`编码方式编码。

如：

```js
// 转换过程: {a: 1, b: 2} -> a=1&b=2 -> 如下(最终形式)
"a%3D1%26b%3D2"

// 相当于如下URI编码
encodeURIComponent(`a=1&b=2`) // a%3D1%26b%3D2
```

### multipart/form-data

对于`multipart/form-data`而言:

- 请求头中的`Content-Type`字段会包含`boundary`，且`boundary`的值有浏览器默认指定。例: `Content-Type: multipart/form-data;boundary=----WebkitFormBoundaryRRJKeWfHPGrS4LKe`。

- 数据会分为多个部分，每两个部分之间通过分隔符来分隔，每部分表述均有 `HTTP` 头部描述子包体，如`Content-Type`，在最后的分隔符会加上`--`表示结束。

相应的`请求体`是下面这样:

```js
Content-Disposition: form-data;name="data1";
Content-Type: text/plain
data1
----WebkitFormBoundaryRRJKeWfHPGrS4LKe
Content-Disposition: form-data;name="data2";
Content-Type: text/plain
data2
----WebkitFormBoundaryRRJKeWfHPGrS4LKe--

```

### 小结

值得一提的是，`multipart/form-data` 格式最大的特点在于:**每一个表单元素都是独立的资源表述**。另外，你可能在写业务的过程中，并没有注意到其中还有`boundary`的存在，
如果你打开抓包工具，确实可以看到不同的表单元素被拆分开了，之所以在平时感觉不到，是以为浏览器和 `HTTP` 给你封装了这一系列操作。

而且，在实际的场景中，对于**图片等文件的上传**，基本采用**multipart/form-data**而不用`application/x-www-form-urlencoded`，因为没有必要做 `URL` 编码，带来**巨大耗时**的同时也**占用了更多的空间**。

## 010: HTTP1.1 如何解决 HTTP 的队头阻塞问题？

### 什么是 HTTP 队头阻塞？

从前面的小节可以知道，`HTTP` 传输是基于**请求-应答**的模式进行的，报文必须是**一发一收**，但值得注意的是，里面的任务被放在一个**任务队列**中**串行执行**，一旦队首的请求处理太慢，就会**阻塞**后面请求的处理。这就是著名的**HTTP队头阻塞**问题。

### 并发连接

对于一个域名允许分配多个长连接，那么相当于增加了任务队列，不至于一个队伍的任务阻塞其它所有任务。在`RFC2616`规定过客户端最多**并发 2 个连接**，不过事实上在现在的浏览器标准中，这个上限要多很多，`Chrome` 中是 `6` 个。

但其实，即使是提高了**并发连接**，还是不能满足人们对性能的需求。

### 域名分片

一个域名不是可以并发 `6` 个**长连接**吗？那我们就可以多分几个域名。

比如 `content1.golderbrother.com 、content2.golderbrother.com`

这样一个`golderbrother.com`域名下可以分出非常多的二级域名，而它们都指向同样的一台服务器，能够并发的长连接数更多了，事实上也更好地解决了队头阻塞的问题。

## 011: 对 Cookie 了解多少？

### Cookie 简介

前面说到了 `HTTP` 是一个无状态的协议，每次 `http` 请求都是**独立、无关**的，默认不需要保留状态信息。但有时候需要保存一些状态，怎么办呢？

`HTTP` 为此引入了 `Cookie`。`Cookie` 本质上就是浏览器里面存储的一个很小的文本文件，内部以键值对的方式来存储(在`chrome`开发者面板的`Application`这一栏可以看到)。向同一个域名下发送请求，都会携带相同的 `Cookie`，服务器拿到 `Cookie` 进行解析，便能拿到客户端的状态。而服务端可以通过响应头中的`Set-Cookie`字段来对客户端写入`Cookie`。举例如下:

```js
// 请求头
Cookie: a=xxx;b=xxx
// 响应头
Set-Cookie: a=xxx
set-Cookie: b=xxx

```

`Cookie` 的有效期可以通过`Expires`和`Max-Age`两个属性来设置。

`Expires`即过期时间, 比如 `2020-04-01T02:04:24.377Z`
`Max-Age`用的是一段时间间隔，单位是秒，从浏览器收到报文开始计算。

若 `Cookie` 过期，则这个 `Cookie` 会被删除，并不会发送给服务端。


### Cookie 属性

#### 生存周期

### 作用域

关于作用域也有两个属性: `Domain`和`path`, 给 `Cookie` 绑定了域名和路径，在发送请求之前，发现域名或者路径和这两个属性不匹配，那么就不会带上 `Cookie`。值得注意的是，对于路径来说，`/`表示域名下的任意路径都允许使用 Cookie。

### 安全相关

如果带上 `Secure`，说明只能通过 `HTTPS` 传输 `cookie`。

如果 `cookie` 字段带上 `HttpOnly` ，那么说明只能通过 `HTTP` 协议传输，不能通过 `JS` 访问，这也是预防 `XSS` 攻击的重要手段。

相应的，对于 `CSRF` 攻击的预防，也有 `SameSite` 属性。

`SameSite` 可以设置为三个值，`Strict、Lax和None`。 

a. 在 `Strict` 模式下，浏览器完全禁止第三方请求携带 `Cookie` 。比如请求 `golderbrother.cn` 网站只能在`golderbrother.cn`域名当中请求才能携带 `Cookie` ，在其他网站请求都不能。

b. 在 `Lax` 模式，就宽松一点了，但是只能在 `get` 方法**提交表单**或者 `a 标签` 发送 `get` 请求的情况下可以携带 `Cookie`，其他情况均不能。

c. 在 `None` 模式下，也就是默认模式，请求会自动携带上 `Cookie` 。

## Cookie 的缺点

1. **容量缺陷**。`Cookie` 的体积上限只有`4KB`，只能用来存储少量的信息。

2. **性能缺陷**。`Cookie` 紧跟域名，不管域名下面的某一个地址需不需要这个 `Cookie` ，请求都会携带上完整的 `Cookie`，这样随着请求数的增多，其实会造成巨大的性能浪费的，因为请求**携带了很多不必要的内容**。但可以通过`Domain`和`Path`指定作用域来解决。

3. **安全缺陷**。由于 `Cookie` 以纯文本的形式在浏览器和服务器中传递，很容易被非法用户截获，然后进行一系列的篡改，在 `Cookie` 的有效期内重新发送给服务器，这是相当危险的。另外，在 `HttpOnly` 为 `false` 的情况下，`Cookie` 信息能直接通过前端 `JS 脚本`来**读取**。

### 012: 如何理解 HTTP 代理？

我们知道在 HTTP 是基于请求-响应模型的协议，一般由**客户端发请求**，**服务器来进行响应**。

当然，也有特殊情况，就是**代理服务器**的情况。引入代理之后，作为代理的服务器相当于一个**中间人**的角色，**对于客户端而言，表现为服务器进行响应**；而对于**源服务器，表现为客户端发起请求**，具有**双重身份**。
比如我们在日常工作中，会使用 `NodeJS` 作为中间端来**转发客户端请求到**真正的服务端，接收到响应体后再经过我们自己的数据处理，最终返回给客户端。

那代理服务器仅仅只是做个**中间商**吗？还能用来做什么的呢？

### 功能

#### 1. 负载均衡

客户端的请求只会先到达代理服务器，后面到底有多少源服务器，IP 都是多少，客户端是不知道的。因此，这个代理服务器可以拿到这个请求之后，可以通过特定的算法分发给不同的源服务器，让各台源服务器的负载尽量平均。当然，这样的算法有很多，包括**随机算法**、**轮询**、**一致性hash**、**LRU**(`最近最少使用`)等等，不过这些算法并不是本文的重点，大家有兴趣自己可以研究一下。

#### 2. 保障安全

利用**心跳**机制监控后台的服务器，一旦发现故障机就将其踢出集群。并且对于上下行的数据进行过滤，对非法 IP 限流，这些都是代理服务器的工作。

#### 3. 缓存代理

将内容缓存到代理服务器，使得客户端可以直接从代理服务器获得而不用到源服务器那里。下一节详细拆解。

### 相关头部字段

#### Via

如果代理服务器需要标明自己的身份，在 HTTP 传输中留下自己的痕迹，那怎么办呢？

我们可以通过`Via`字段来记录。举个例子，现在中间有两台代理服务器，在客户端发送请求后会经历这样一个过程:

```js
客户端 -> 代理1 -> 代理2 -> 源服务器
```

在源服务器收到请求后，我们会在**请求头**拿到这个字段:

```js
Via: proxy_server1, proxy_server2
```

而源服务器响应时，最终在客户端会拿到这样的**响应头**:

```js
Via: proxy_server2, proxy_server1

```

可以看到，`Via`中代理的顺序即为在 `HTTP` 传输中**报文传达**的顺序(proxy_server1 -> proxy_server2 -> source)。

#### X-Forwarded-For

字面意思就是**为谁转发**, 它记录的是**请求方**的`IP`地址(注意，和`Via`区分开，`X-Forwarded-For`记录的是请求方这一个`IP`)。

#### X-Real-IP

是一种获取用户真实 `IP` 的字段，不管中间经过多少代理，这个字段始终记录最初的客户端的`IP`。

相应的，还有 `X-Forwarded-Host` 和 `X-Forwarded-Proto` ，分别记录客户端(注意哦，不包括代理)的**域名**和**协议名**。

#### X-Forwarded-For产生的问题

前面可以看到，`X-Forwarded-For`这个字段记录的是请求方的 `IP`，这意味着每经过一个不同的代理，这个字段的名字都要变，从`客户端`到`代理1`，这个字段是客户端的 `IP`，从`代理1`到`代理2`，这个字段就变为了`代理1`的 `IP`。

```js
客户端 -> 代理1 -> 代理2
  客户端 IP -> 代理1 IP
```

但是这会产生两个问题:

  1. 意味着代理必须解析 `HTTP` 请求头，然后修改，比直接转发数据性能下降。

  2. 在 `HTTPS` 通信加密的过程中，原始报文是不允许修改的。

由此产生了`代理协议`，一般使用明文版本，只需要在 `HTTP` 请求行上面加上这样格式的文本即可:

```js
// PROXY + TCP4/TCP6 + 请求方地址(0.0.0.1) + 接收方地址(0.0.0.2) + 请求端口(1111) + 接收端口(2222)
PROXY TCP4 0.0.0.1 0.0.0.2 1111 2222
GET / HTTP/1.1
...

```

这样就可以解决`X-Forwarded-For`带来的问题了。

### 013: 如何理解 HTTP 缓存及缓存代理？

关于强缓存和协商缓存的内容，我已经在[浏览器缓存一探究竟~](https://golderbrother.github.io/blog/views/fe-interview/browser-cache.html)做了详细分析，小结如下:

首先通过 `Cache-Control` **验证强缓存**是否可用

- 如果强缓存可用，直接使用
- 否则进入**协商缓存**即发送 HTTP 请求，服务器通过请求头中的`If-Modified-Since`或者`If-None-Match`这些条件请求字段检查资源是否更新
  - 若资源更新，返回资源和`200`状态码
  - 否则，返回`304`，告诉浏览器直接**从缓存获取资源**

这一节我们主要来说说另外一种缓存方式: **代理缓存**。

#### 为什么产生代理缓存？

对于源服务器来说，它也是有缓存的，比如`Redis, Memcache`，但对于 `HTTP 缓存`来说，如果每次客户端缓存失效都要到源服务器获取，那给源服务器的压力是很大的。

由此引入了**缓存代理**的机制。让代理服务器**接管**一部分的**服务端HTTP缓存**，客户端缓存过期后就近到代理缓存中获取，代理缓存过期了才请求源服务器，这样流量巨大的时候能明显降低源服务器的压力。

那缓存代理究竟是如何做到的呢？

总的来说，缓存代理的控制分为两部分，一部分是**源服务器端**的控制，一部分是**客户端**的控制。

#### 源服务器的缓存控制

##### private 和 public

在源服务器的响应头中，会加上`Cache-Control`这个字段进行缓存控制字段，那么它的值当中可以加入`private`或者`public`表示是否允许代理服务器缓存，前者**禁止**，后者为**允许**。

比如对于一些非常私密的数据，如果缓存到代理服务器，别人直接访问代理就可以拿到这些数据，是非常危险的，因此对于这些数据一般是不会允许代理服务器进行缓存的，将响应头部的`Cache-Control`设为`private`，而不是`public`。

就像下面这样:

```js
Cache-control: private
```

##### proxy-revalidate

`must-revalidate`的意思是**客户端**缓存过期就去源服务器获取，而`proxy-revalidate`则表示**代理服务器**的缓存过期后到源服务器获取。

##### s-maxage

`s`是`share`的意思，限定了缓存在**代理服务器**中可以**存放多久**(缓存时间)，和限制客户端缓存时间的`max-age`并不冲突。

讲了这几个字段，我们不妨来举个小例子，源服务器在响应头中加入这样一个字段:

```js
Cache-Control: public, max-age=1000, s-maxage=2000

```

相当于源服务器说: 我这个响应是允许**代理服务器缓存**的，客户端缓存过期了到代理中拿，并且在客户端的**缓存时间**为 `1000 s`，在代理服务器中的**缓存时间**为 `2000 s`。

#### 客户端的缓存控制

##### max-stale 和 min-fresh

在客户端的请求头中，可以加入这两个字段，来对代理服务器上的缓存进行**宽容**和**限制**操作。比如：

```js
max-stale: 5

```

表示客户端到代理服务器上拿缓存的时候，即使代理**缓存过期了也不要紧**，只要**过期时间在5秒之内**，还是可以从代理中获取的。

又比如:

```js
min-fresh: 5

```

表示代理缓存需要一定的**新鲜度**，不要等到缓存刚好到期再拿，一定要在**到期前 5 秒之前**的时间拿，否则拿不到。

##### only-if-cached

这个字段加上后表示客户端只会接受**代理缓存**，而不会接受源服务器的响应。如果**代理缓存**无效，则直接返回`504（Gateway Timeout）`。

以上便是缓存代理的内容，涉及的字段比较多，希望能好好回顾一下，加深理解。

## 014: 什么是跨域？浏览器如何拦截响应？如何解决？

在前后端分离的开发模式中，经常会遇到跨域问题，即 Ajax 请求发出去了，服务器也成功响应了，前端就是拿不到这个响应。接下来我们就来好好讨论一下这个问题。

### 那什么是跨域

咱们来回顾一下 `URI` 的组成:

![img](https://user-gold-cdn.xitu.io/2020/3/22/170ffd7ac23846fe?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

浏览器遵循**同源政策**(`scheme(协议)`、`host(主机)`和`port(端口)`都相同则为同源)。非同源站点有这样一些限制:

- 不能读取和修改对方的 DOM
- 不读访问对方的 Cookie、IndexDB 和 LocalStorage
- 限制 XMLHttpRequest 请求。(后面的话题着重围绕这个)

当浏览器向目标 `URI` 发 `Ajax` 请求时，只要当前 `URL` 和目标 `URL` **不同源**，则产生**跨域**，被称为`跨域请求`。

跨域请求的响应一般会被浏览器所拦截，注意，是**被浏览器拦截**，**响应其实是成功到达客户端**了。那这个拦截是如何发生呢？

首先要知道的是，浏览器是多进程的，以 `Chrome` 为例，进程组成如下：

![img](https://user-gold-cdn.xitu.io/2020/3/22/170ffd8131a4628f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**WebKit 渲染引擎**和**V8 引擎**都在渲染进程当中。

当`xhr.send`被调用，即 `Ajax` 请求准备发送的时候，其实还只是在渲染进程的处理。为了防止黑客通过脚本触碰到系统资源，浏览器将每一个渲染进程装进了沙箱，并且为了防止 CPU 芯片一直存在的 `Spectre` 和 `Meltdown` 漏洞，采取了`站点隔离`的手段，给每一个不同的站点(一级域名不同)分配了沙箱，互不干扰。
具体见[YouTube上Chromium安全团队的演讲视频](https://www.youtube.com/watch?v=dBuykrdhK-A&feature=emb_logo)。

在沙箱当中的渲染进程是没有办法发送网络请求的，那怎么办？只能通过网络进程来发送。那这样就涉及到进程间通信(`IPC，Inter Process Communication`)了。接下来我们看看 chromium 当中进程间通信是如何完成的，在 chromium 源码中调用顺序如下:

![img](https://user-gold-cdn.xitu.io/2020/3/22/170ffd924eaecb41?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可能看了你会比较懵，如果想深入了解可以去看看 chromium 最新的源代码, [IPC源码地址](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/ipc/)及[Chromium IPC源码解析文章](https://blog.csdn.net/Luoshengyang/article/details/47822689)。

总的来说就是利用`Unix Domain Socket`套接字，配合事件驱动的高性能网络并发库`libevent`完成进程的 `IPC 过程`。

好，现在数据传递给了浏览器主进程，主进程接收到后，才真正地发出相应的网络请求。

在服务端处理完数据后，将响应返回，主进程检查到跨域，且没有`cors`(跨域资源共享)响应头，将响应体**全部丢掉**，并不会发送给渲染进程。这就达到了**拦截数据**的目的。

接下来我们来说一说解决跨域问题的几种方案。

### 浏览器限制跨域请求一般有两种方式 

- 浏览器限制发起跨域请求 
- 跨域请求可以正常发起，但是返回的结果被浏览器拦截了

### CORS

`CORS` 其实是 `W3C` 的一个标准，全称是**跨域资源共享**。它需要浏览器和服务器的共同支持，具体来说，**非 IE 和 IE10 以上**支持`CORS`，服务器需要附加特定的`响应头`，后面具体拆解。不过在弄清楚 `CORS` 的原理之前，我们需要清楚两个概念: **简单请求**和**非简单请求**。

浏览器根据请求方法和请求头的特定字段，将请求做了一下分类，具体来说规则是这样，凡是满足下面条件的属于**简单请求**:

- 请求方法为 `GET、POST` 或者 `HEAD`
- 请求头的取值范围: `Accept、Accept-Language、Content-Language、Content-Type`(只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`)

```js
// 表单提交
Content-Type: application/x-www-form-urlencoded
// 文件上传
Content-Type: multipart/form-data
// 纯文本
Content-Type: text/plain
```

浏览器画了这样一个圈，在这个**圈里面**的就是**简单请求**, **圈外面**的就是**非简单请求**，然后针对这两种不同的请求进行不同的处理。

### 简单请求

请求发出去之前，浏览器做了什么？

它会自动在请求头当中，添加一个`Origin`字段，用来说明请求来自哪个源。服务器拿到请求之后，在回应时对应地添加`Access-Control-Allow-Origin`字段，如果`Origin`不在这个字段的范围中，那么浏览器就会将响应拦截。

因此，`Access-Control-Allow-Origin`字段是服务器用来决定浏览器是否拦截这个响应，这是必需的字段。与此同时，其它一些可选的功能性的字段，用来描述如果不会拦截，这些字段将会发挥各自的作用。

比方说访问掘金网站，我们打开控制台随便查看一条请求信息

```js
access-control-allow-origin: https://juejin.im
```

`Access-Control-Allow-Credentials`。这个字段是一个布尔值，表示是否允许发送 `Cookie`，对于跨域请求，浏览器对这个字段默认值设为 `false`，而如果需要拿到浏览器的 `Cookie`，需要添加这个响应头并设为`true`, 并且在前端也需要设置`withCredentials`属性:

```http
access-control-allow-credentials: true
```

```js
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

`Access-Control-Expose-Headers`。这个字段是给 `XMLHttpRequest` 对象赋能，让它不仅可以拿到基本的 6 个响应头字段（包括`Cache-Control、Content-Language、Content-Type、Expires、Last-Modified和Pragma`）, 还能拿到这个字段声明的响应头字段。比如这样设置:

```js
Access-Control-Expose-Headers: aaa
```

```js
access-control-allow-headers: x-requested-with,content-type,Cache-Control,Pragma,Date,x-timestamp
```

那么在前端可以通过 `XMLHttpRequest.getResponseHeader('aaa')` 拿到 `aaa` 这个字段的值。

### 非简单请求

非简单请求相对而言会有些不同，体现在两个方面: **预检请求**和**响应字段**

我们以 `PUT` 方法为例。

```js
var url = 'http://xxx.com';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'xxx');
xhr.send();

```

当这段代码执行后，首先会发送**预检请求**(`preflight request`)。这个**预检请求**的请求行和请求体是下面这个格式:

```js
OPTIONS / HTTP/1.1
Origin: 当前地址
Host: xxx.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header

```

预检请求的方法是`OPTIONS`，同时会加上`Origin源地址`和`Host目标地址`，这很简单。同时也会加上两个关键的字段:

- `Access-Control-Request-Method`, 列出 `CORS` 请求用到哪个**HTTP方法**
- `Access-Control-Request-Headers`，指定 `CORS` 请求将要加上什么**请求头**

预检请求的响应。如下面的格式:

```js
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0

```

其中有这样几个关键的**响应头字段**:

- `Access-Control-Allow-Origin`: 表示可以允许**请求的源**，可以填具体的源名，也可以填`*`表示**允许任意源请求**。
- `Access-Control-Allow-Methods`: 表示允许的**请求方法列表**。
- `Access-Control-Allow-Credentials`: 是否允许携带`cookie`。
- `Access-Control-Allow-Headers`: 表示允许发送的**请求头字段**
- `Access-Control-Max-Age`: 预检请求的**有效期**，在此期间，不用发出另外一条预检请求。

在预检请求的响应返回后，如果请求不满足响应头的条件，则触发`XMLHttpRequest`的`onerror`方法，当然后面真正的`CORS请求`也不会发出去了。

**CORS 请求的响应**。绕了这么一大转，到了真正的 `CORS` 请求就容易多了，现在它和简单请求的情况是一样的。浏览器自动加上`Origin`字段，服务端响应头返回`Access-Control-Allow-Origin`。可以参考以上简单请求部分的内容。

### JSONP

虽然`XMLHttpRequest`对象遵循同源政策，但是`script`标签不一样，它可以通过 `src` 填上**目标地址**从而发出 `GET` 请求，**实现跨域请求并拿到响应**。这也就是 `JSONP` 的原理，接下来我们就来封装一个 `JSONP`:

```js
const jsonp = ({ url, params, callbackName }) => {
  const generateURL = () => {
    let dataStr = '';
    for(let key in params) {
      dataStr += `${key}=${params[key]}&`;
    }
    dataStr += `callback=${callbackName}`;
    return `${url.endsWith(`?`) : '' : '?'}${dataStr}`;
  };
  return new Promise((resolve, reject) => {
    // 初始化回调函数名称
    callbackName = callbackName || Math.random().toString.replace(',', '');
    // 创建 script 元素并加入到当前文档中
    const scriptEle = document.createElement('script');
    scriptEle.src = generateURL();
    document.body.appendChild(scriptEle);
    // 绑定到 window 上，为了后面调用
    window[callbackName] = (data) => {
      resolve(data);
      // script 执行完了，成为无用元素，需要清除
      document.body.removeChild(scriptEle);
    }
  });
}

```

当然在服务端也会有响应的操作, 以 `express` 为例:

```js
let express = require('express')
let app = express()
app.get('/', function(req, res) {
  let { a, b, callback } = req.query
  console.log(a); // 1
  console.log(b); // 2
  // 注意哦，返回给script标签，浏览器直接把这部分"字符串回调函数"执行
  res.end(`${callback}('数据包xxx')`);
})
app.listen(3000)

```

然后前端这样简单地调用一下就好了:

```js
jsonp({
  // 请求地址
  url: 'http://localhost:3000',
  params: { 
    a: 1,
    b: 2
  }
}).then(data => {
  // 拿到数据进行处理
  console.log(data); // 数据包
})

```

和`CORS`相比，`JSONP` 最大的优势在于兼容性好，IE 低版本不能使用 `CORS` 但可以使用 `JSONP`，缺点也很明显，请求方法单一，**只支持 GET 请求**。

### Nginx

`Nginx` 是一种高性能的**反向代理服务器**，可以用来轻松**解决跨域问题**。

`what`？反向代理？我给你看一张图你就懂了。

![img](https://user-gold-cdn.xitu.io/2020/3/22/170ffd97d0b1cf15?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**正向代理**帮助客户端**访问**客户端**自己访问不到**的服务器，然后将结果返回给客户端。

反向代理拿到客户端的请求，将请求转发给其他的服务器，主要的场景是维持服务器集群的**负载均衡**，换句话说，**反向代理帮其它的服务器拿到请求**，然后**选择一个合适的服务器**，将**请求转交**给它。

比如我们去银行办理业务，首先我们会去找个取号机，然后取出我们的号码以及对应的办理柜台，这个取号机就相当于上面说的`nginx`，它可以帮我们将业务分配到**合适的柜台**(当前最少人的，有空闲时间的)办理，这也就相当于**负载均衡**的作用。

好了，那 Nginx 是如何来解决跨域的呢？

比如说现在客户端的域名为`client.com`，服务器的域名为`server.com`，客户端向服务器发送 `Ajax` 请求，当然会跨域了，那这个时候让 Nginx 登场了，通过下面这个配置:

```js
server {
  listen  80;
  server_name  client.com;
  location /api {
    proxy_pass server.com;
  }
}
```

Nginx 相当于起了一个**跳板机**，这个**跳板机**的域名也是`client.com`，让客户端首先访问 `client.com/api`，这当然没有跨域，然后 `Nginx` 服务器作为反向代理，将**请求转发**给`server.com`，当响应返回时又将响应给到客户端，这就完成整个跨域请求的过程。

其实还有一些不太常用的方式，大家了解即可，比如postMessage，当然WebSocket也是一种方式，但是已经不属于 HTTP 的范畴，另外一些奇技淫巧就不建议大家去死记硬背了，一方面从来不用，名字都难得记住，另一方面临时背下来，面试官也不会对你印象加分，因为看得出来是背的。当然没有背并不代表减分，把跨域原理和**前面三种主要的跨域方式**理解清楚，经得起更深一步的推敲，反而会让别人觉得你是一个靠谱的人。

## 015: TLS1.2 握手的过程是怎样的？

之前谈到了 HTTP 是明文传输的协议，传输保文对外完全透明，非常不安全，那如何进一步保证安全性呢？

由此产生了 `HTTPS`，其实它并不是一个新的协议，而是在 HTTP 下面增加了一层 `SSL/TLS` 协议，简单的讲，`HTTPS = HTTP + SSL/TLS`。

那什么是 `SSL/TLS` 呢？

实际上以前是成为`SSL`, 现在是`TLS`

`SSL` 即`安全套接层（Secure Sockets Layer）`，在 `OSI` 七层模型中处于会话层(第 5 层)。之前 `SSL` 出过三个大版本，当它发展到**第三个大版本**的时候才被标准化，成为 `TLS`（传输层安全，`Transport Layer Security`），并被当做 `TLS1.0` 的版本，准确地说，`TLS1.0 = SSL3.1`。

现在主流的版本是 `TLS/1.2`, 之前的 `TLS1.0、TLS1.1` 都被认为是不安全的，在不久的将来会被完全淘汰。因此我们接下来主要讨论的是 `TLS1.2`, 当然在 `2018` 年推出了更加优秀的 `TLS1.3`，大大优化了 `TLS` 握手过程，这个我们放在下一节再去说。

TLS 握手的过程比较复杂，写文章之前我查阅了大量的资料，发现对 `TLS` 初学者非常不友好，也有很多知识点说的含糊不清，可以说这个整理的过程是相当痛苦了。希望我下面的拆解能够帮你理解得更顺畅些吧!

### 传统 RSA 握手

先来说说传统的 `TLS` 握手，也是大家在网上经常看到的。可以参考这篇文章，[(传统RSA版本)`HTTPS`为什么让数据传输更安全](http://47.98.159.95/my_blog/browser-security/003.html)，其中也介绍到了对称加密和非对称加密的概念，建议大家去读一读，不再赘述。之所以称它为 `RSA` 版本，是因为它在`加解密pre_random`的时候采用的是 `RSA` 算法。

#### TLS 1.2 握手过程

现在我们来讲讲主流的 TLS 1.2 版本所采用的方式。

![img](https://user-gold-cdn.xitu.io/2020/3/22/170ffd9b35c7a81b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

刚开始你可能会比较懵，先别着急，过一遍下面的流程再来看会豁然开朗。

##### step 1: Client Hello

首先，浏览器发送 `client_random、TLS版本、加密套件列表`。

`client_random` 是什么？用来最终 `secret` 的一个参数。

加密套件列表是什么？我举个例子，加密套件列表一般长这样子:

```js
TLS_ECDHE_WITH_AES_128_GCM_SHA256

```

意思是`TLS`握手过程中，使用`ECDHE`算法生成`pre_random`(**预随机数**，这个数后面会介绍)，128位的AES算法进行对称加密，在对称加密的过程中使用主流的GCM分组模式，因为对称加密中很重要的一个问题就是如何分组。最后一个是**哈希摘要**算法，采用SHA256算法。

其中值得解释一下的是这个**哈希摘要**算法，试想一个这样的场景，服务端现在给客户端发消息来了，客户端并不知道此时的消息到底是服务端发的，还是中间人伪造的消息呢？现在引入这个哈希摘要算法，将服务端的证书信息通过**这个算法**生成一个摘要(可以理解为**比较短的字符串**)，用来**标识**这个服务端的**身份**，用私钥加密后把**加密后的标识**和**自己的公钥**传给客户端。客户端拿到这个**公钥来解密**，生成另外一份摘要。**两个摘要进行对比**，如果相同则能确认服务端的身份。这也就是所谓**数字签名**的原理。其中除了**哈希算法**，最重要的过程是**私钥加密，公钥解密**。

##### step 2: Server Hello

可以看到服务器一口气给客户端回复了非常多的内容。

`server_random`也是最后生成`secret`的一个参数, 同时确认 `TLS` 版本、需要使用的**加密套件**和**自己的证书**，这都不难理解。那剩下的`server_params`是干嘛的呢？

我们先埋个伏笔，现在你只需要知道，`server_random`到达了客户端。



## 参考资料

- [encodeURI()和 encodeURIComponent() 区别](https://blog.csdn.net/qq_34629352/article/details/78959707)

 <comment/>