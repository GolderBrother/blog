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

## 参考资料

- [encodeURI()和 encodeURIComponent() 区别](https://blog.csdn.net/qq_34629352/article/details/78959707)

 <comment/>
