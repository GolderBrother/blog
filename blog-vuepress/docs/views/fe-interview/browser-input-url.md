# 细说浏览器输入 URL 后发生了什么

## 总体概览

大体上，可以分为六步，当然每一步都可以详细都展开来说，这里先放一张总览图:

![img](https://raw.githubusercontent.com/LuckyWinty/blog/master/images/broswer/url.png)

DNS 域名解析
在网络世界，也是这样的。你肯定记得住网站的名称，但是很难记住网站的 IP 地址，因而也需要一个地址簿，就是 DNS 服务器。DNS 服务器是高可用、高并发和分布式的，它是树状结构，如图：

![img](https://raw.githubusercontent.com/LuckyWinty/blog/master/images/broswer/1580300339022.jpg)

- 根 DNS 服务器 ：返回顶级域 DNS 服务器的 IP 地址
- 顶级域 DNS 服务器：返回权威 DNS 服务器的 IP 地址
- 权威 DNS 服务器 ：返回相应主机的 IP 地址

DNS 的域名查找，在客户端和浏览器，本地 DNS 之间的查询方式是递归查询；在本地 DNS 服务器与根域及其子域之间的查询方式是迭代查询；

递归过程：

![img](https://raw.githubusercontent.com/LuckyWinty/blog/master/images/broswer/1580316042086.jpg)

在客户端输入 URL 后，会有一个递归查找的过程，从浏览器缓存中查找->本地的 hosts 文件查找->找本地 DNS 解析器缓存查找->本地 DNS 服务器查找，这个过程中任何一步找到了都会结束查找流程。

如果本地 DNS 服务器无法查询到，则根据本地 DNS 服务器设置的转发器进行查询。若未用转发模式，则迭代查找过程如下图：

![img](https://raw.githubusercontent.com/LuckyWinty/blog/master/images/broswer/1580310912169.jpg)

结合起来的过程，可以用一个图表示：

![img](https://raw.githubusercontent.com/LuckyWinty/blog/master/images/broswer/1580311229864.jpg)

在查找过程中，有以下优化点：

- DNS 存在着多级缓存，从离浏览器的距离排序的话，有以下几种: 浏览器缓存，系统缓存，路由器缓存，IPS 服务器缓存，根域名服务器缓存，顶级域名服务器缓存，主域名服务器缓存。
- 在域名和 IP 的映射过程中，给了应用基于域名做负载均衡的机会，可以是简单的负载均衡，也可以根据地址和运营商做全局的负载均衡。

## 建立 TCP 连接

首先，判断是不是 https 的，如果是，则 HTTPS 其实是 HTTP + SSL / TLS 两部分组成，也就是在 HTTP 上又加了一层处理加密信息的模块。服务端和客户端的信息传输都会通过 TLS 进行加密，所以传输的数据都是加密后的数据。

进行三次握手，建立 TCP 连接。

    1. 第一次握手：建立连接。客户端发送连接请求报文段，将SYN位置为1，Sequence Number为x；然后，客户端进入SYN_SEND状态，等待服务器的确认；
    2. 第二次握手：服务器收到SYN报文段。服务器收到客户端的SYN报文段，需要对这个SYN报文段进行确认，设置Acknowledgment Number为x+1(Sequence Number+1)；同时，自己自己还要发送SYN请求信息，将SYN位置为1，Sequence Number为y；服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，此时服务器进入SYN_RECV状态；
    3. 第三次握手：客户端收到服务器的SYN+ACK报文段。然后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。

SSL 握手过程

    1. 第一阶段 建立安全能力 包括协议版本 会话Id 密码构件 压缩方法和初始随机数
    2. 第二阶段 服务器发送证书 密钥交换数据和证书请求，最后发送请求-相应阶段的结束信号
    3. 第三阶段 如果有证书请求客户端发送此证书 之后客户端发送密钥交换数据 也可以发送证书验证消息
    4. 第四阶段 变更密码构件和结束握手协议

完成了之后，客户端和服务器端就可以开始传送数据。更多 HTTPS 的资料可以看这里：

    https://zhuanlan.zhihu.com/p/26682342
    https://segmentfault.com/a/1190000012196642

`备注`

`ACK`：此标志表示应答域有效，就是说前面所说的`TCP`应答号将会包含在`TCP`数据包中；有两个取值：`0`和`1`，为`1`的时候表示应答域有效，反之为`0`。`TCP`协议规定，只有`ACK=1`时有效，也规定连接建立后所有发送的报文的`ACK`必须为 1。

`SYN(SYNchronization)`：在连接建立时用来同步序号。当`SYN=1`而`ACK=0`时，表明这是一个连接请求报文。对方若同意建立连接，则应在响应报文中使`SYN=1`和`ACK=1`. 因此, `SYN置1`就表示这是一个连接请求或连接接受报文。

`FIN(finis）`即完，终结的意思， 用来释放一个连接。当 `FIN = 1` 时，表明此报文段的发送方的数据已经发送完毕，并要求释放连接。

## 发送 HTTP 请求，服务器处理请求，返回响应结果

`TCP` 连接建立后，浏览器就可以利用 `HTTP／HTTPS` 协议向服务器发送请求了。服务器接受到请求，就解析请求头，如果头部有缓存相关信息如`if-none-match`与`if-modified-since`，则验证缓存是否有效，若有效则返回状态码为`304`，若无效则重新返回资源，状态码为`200`.

这里有发生的一个过程是 HTTP 缓存，是一个常考的考点，大致过程如图：

![img](https://raw.githubusercontent.com/LuckyWinty/blog/master/images/broswer/16dbf073d38fd016.png)

## 关闭 TCP 连接

1. 第一次挥手：主机 1（可以使客户端，也可以是服务器端），设置`Sequence Number`和`Acknowledgment Number`，向主机 2 发送一个`FIN`报文段；此时，主机 1 进入`FIN_WAIT_1`状态；这表示主机 1 没有数据要发送给主机 2 了；
2. 第二次挥手：主机 2 收到了主机 1 发送的`FIN`报文段，向主机 1 回一个`ACK报文段`，`Acknowledgment Number`为`Sequence Number`加 1；主机 1 进入`FIN_WAIT_2`状态；主机 2 告诉主机 1，我"同意"你的关闭请求；
3. 第三次挥手：主机 2 向主机 1 发送`FIN`报文段，请求关闭连接，同时主机 2 进入 LAST_ACK 状态；
4. 第四次挥手：主机 1 收到主机 2 发送的`FIN`报文段，向主机 2 发送`ACK报文段`，然后主机 1 进入 状态；主机 2 收到主机 1 的`ACK报文段`以后，就关闭连接；此时，主机 1 等待`2MSL`后依然没有收到回复，则证明`Server`端已正常关闭，那好，主机 1 也可以关闭连接了。

## 浏览器渲染

按照渲染的时间顺序，流水线可分为如下几个子阶段：**构建 DOM 树**、**样式计算**、**布局阶段**、**分层**、**栅格化**和**显示**。如图：

![img](https://raw.githubusercontent.com/LuckyWinty/blog/master/images/broswer/6.png)

1. 渲染进程将 `HTML` 内容转换为能够读懂 `DOM` 树结构。
2. 渲染引擎将 `CSS` 样式表转化为浏览器可以理解的 `styleSheets`，计算出 `DOM` 节点的样式。
3. 创建布局树，并计算元素的布局信息。
4. 对布局树进行**分层**，并生成**分层**树。
5. 为每个图层生成**绘制列表**，并将其提交到**合成线程**。**合成线程**将图层分图块，并**栅格化**将图块转换成**位图**。
6. **合成线程**发送绘制图块命令给**浏览器进程**。**浏览器进程**根据指令生成页面，并显示到显示器上。

## 构建 DOM 树

浏览器从网络或硬盘中获得 `HTML` 字节数据后会经过一个流程将字节解析为 `DOM` 树,先将 `HTML` 的**原始字节数据**转换为**文件指定编码的字符**,然后浏览器会根据 **HTML 规范**来将字符串转换成各种**令牌标签**，如 `html、body` 等。最终解析成一个**树状的对象模型**，就是 `dom` 树。

![img](https://raw.githubusercontent.com/LuckyWinty/blog/master/images/broswer/1580314848819.jpg)

具体步骤：

