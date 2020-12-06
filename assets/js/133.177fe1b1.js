(window.webpackJsonp=window.webpackJsonp||[]).push([[133],{562:function(_,v,e){"use strict";e.r(v);var t=e(1),o=Object(t.a)({},(function(){var _=this,v=_.$createElement,e=_._self._c||v;return e("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[e("h1",{attrs:{id:"细说浏览器输入-url-后发生了什么"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#细说浏览器输入-url-后发生了什么"}},[_._v("#")]),_._v(" 细说浏览器输入 URL 后发生了什么")]),_._v(" "),e("h2",{attrs:{id:"总体概览"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总体概览"}},[_._v("#")]),_._v(" 总体概览")]),_._v(" "),e("p",[_._v("大体上，可以分为六步，当然每一步都可以详细都展开来说，这里先放一张总览图:")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/url.png",alt:"img"}})]),_._v(" "),e("p",[_._v("DNS 域名解析\n在网络世界，也是这样的。你肯定记得住网站的名称，但是很难记住网站的 IP 地址，因而也需要一个地址簿，就是 DNS 服务器。DNS 服务器是高可用、高并发和分布式的，它是树状结构，如图：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/1580300339022.jpg",alt:"img"}})]),_._v(" "),e("ul",[e("li",[e("code",[_._v("根 DNS 服务器")]),_._v(" ：返回顶级域 "),e("code",[_._v("DNS 服务器")]),_._v("的 "),e("code",[_._v("IP 地址")])]),_._v(" "),e("li",[e("code",[_._v("顶级域 DNS 服务器")]),_._v("：返回权威 "),e("code",[_._v("DNS 服务器")]),_._v("的 "),e("code",[_._v("IP 地址")])]),_._v(" "),e("li",[e("code",[_._v("权威 DNS 服务器")]),_._v(" ：返回相应主机的 "),e("code",[_._v("IP 地址")])])]),_._v(" "),e("p",[_._v("DNS 的域名查找，在客户端和浏览器，本地 DNS 之间的查询方式是递归查询；在本地 "),e("code",[_._v("DNS 服务器")]),_._v("与"),e("strong",[_._v("根域")]),_._v("及其"),e("strong",[_._v("子域")]),_._v("之间的查询方式是迭代查询；")]),_._v(" "),e("p",[_._v("递归过程：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/1580316042086.jpg",alt:"img"}})]),_._v(" "),e("p",[_._v("在客户端输入 URL 后，会有一个"),e("strong",[_._v("递归查找")]),_._v("的过程，从"),e("strong",[_._v("浏览器缓存")]),_._v("中查找 -> "),e("strong",[_._v("本地的 hosts 文件")]),_._v("查找 -> 找"),e("strong",[_._v("本地 DNS 解析器缓存")]),_._v("查找 -> "),e("strong",[_._v("本地 DNS 服务器")]),_._v("查找，这个过程中任何一步找到了都会"),e("strong",[_._v("结束查找")]),_._v("流程。")]),_._v(" "),e("p",[_._v("如果"),e("strong",[_._v("本地 DNS 服务器")]),_._v("无法查询到，则根据"),e("strong",[_._v("本地 DNS 服务器")]),_._v("设置的"),e("strong",[_._v("转发器")]),_._v("进行查询。若未用转发模式，则迭代查找过程如下图：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/1580310912169.jpg",alt:"img"}})]),_._v(" "),e("p",[_._v("结合起来的过程，可以用一个图表示：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/1580311229864.jpg",alt:"img"}})]),_._v(" "),e("p",[_._v("在查找过程中，有以下优化点：")]),_._v(" "),e("ul",[e("li",[e("code",[_._v("DNS")]),_._v(" 存在着多级缓存，从离浏览器的距离排序的话，有以下几种: "),e("strong",[_._v("浏览器缓存，系统缓存，路由器缓存，IPS 服务器缓存，根域名服务器缓存，顶级域名服务器缓存，主域名服务器缓存")]),_._v("。")]),_._v(" "),e("li",[_._v("在"),e("strong",[_._v("域名")]),_._v("和 "),e("code",[_._v("IP")]),_._v(" 的"),e("strong",[_._v("映射")]),_._v("过程中，给了应用基于"),e("strong",[_._v("域名")]),_._v("做"),e("strong",[_._v("负载均衡")]),_._v("的机会，可以是简单的"),e("strong",[_._v("负载均衡")]),_._v("，也可以根据"),e("strong",[_._v("地址")]),_._v("和"),e("strong",[_._v("运营商")]),_._v("做全局的"),e("strong",[_._v("负载均衡")]),_._v("。")])]),_._v(" "),e("h2",{attrs:{id:"建立-tcp-连接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#建立-tcp-连接"}},[_._v("#")]),_._v(" 建立 TCP 连接")]),_._v(" "),e("p",[_._v("首先，判断是不是 "),e("code",[_._v("https")]),_._v(" 的，如果是，则 "),e("code",[_._v("HTTPS")]),_._v(" 其实是 "),e("code",[_._v("HTTP + SSL / TLS")]),_._v(" 两部分组成，也就是在 "),e("code",[_._v("HTTP")]),_._v(" 上又加了一层"),e("code",[_._v("处理加密信息")]),_._v("的模块。服务端和客户端的信息传输都会通过 "),e("code",[_._v("TLS")]),_._v(" 进行加密，所以传输的数据都是加密后的数据。")]),_._v(" "),e("p",[_._v("进行三次握手，建立 "),e("code",[_._v("TCP")]),_._v(" 连接。")]),_._v(" "),e("ol",[e("li",[_._v("第一次握手：建立连接。客户端发送连接请求报文段，将"),e("code",[_._v("SYN")]),_._v("位置为 1，Sequence Number 为 x；然后，客户端进入"),e("code",[_._v("SYN")]),_._v("_SEND 状态，等待服务器的确认；")]),_._v(" "),e("li",[_._v("第二次握手：服务器收到"),e("code",[_._v("SYN")]),_._v("报文段。服务器收到客户端的"),e("code",[_._v("SYN")]),_._v("报文段，需要对这个"),e("code",[_._v("SYN")]),_._v("报文段进行确认，设置"),e("code",[_._v("Acknowledgment Number")]),_._v("为 x+1("),e("code",[_._v("Sequence Number+1")]),_._v(")；同时，自己自己还要发送"),e("code",[_._v("SYN")]),_._v("请求信息，将 SYN 位置为 1，"),e("code",[_._v("Sequence Number")]),_._v("为 y；服务器端将上述所有信息放到一个报文段（即"),e("code",[_._v("SYN+ACK")]),_._v("报文段）中，一并发送给客户端，此时服务器进入"),e("code",[_._v("SYN_RECV")]),_._v("状态；")]),_._v(" "),e("li",[_._v("第三次握手：客户端收到服务器的"),e("code",[_._v("SYN+ACK")]),_._v("报文段。然后将"),e("code",[_._v("Acknowledgment Number")]),_._v("设置为 y+1，向服务器发送 ACK 报文段，这个报文段发送完毕以后，客户端和服务器端都进入"),e("code",[_._v("ESTABLISHED")]),_._v("("),e("strong",[_._v("建立连接")]),_._v(")状态，完成"),e("strong",[_._v("TCP 三次握手")]),_._v("。")])]),_._v(" "),e("p",[_._v("SSL 握手过程")]),_._v(" "),e("ol",[e("li",[_._v("第一阶段 建立安全能力 包括 "),e("strong",[_._v("协议版本")]),_._v(" "),e("strong",[_._v("会话 Id")]),_._v(" 密码构件 压缩方法和初始随机数")]),_._v(" "),e("li",[_._v("第二阶段 服务器"),e("strong",[_._v("发送证书")]),_._v(" "),e("strong",[_._v("密钥交换数据")]),_._v(" 和"),e("strong",[_._v("证书请求")]),_._v("，最后"),e("strong",[_._v("发送请求-相应阶段")]),_._v("的结束信号")]),_._v(" "),e("li",[_._v("第三阶段 如果有"),e("strong",[_._v("证书请求")]),_._v("客户端发送此证书 之后客户端发送"),e("strong",[_._v("密钥交换数据")]),_._v(" 也可以发送证书验证消息")]),_._v(" "),e("li",[_._v("第四阶段 "),e("strong",[_._v("变更密码构件")]),_._v("和"),e("strong",[_._v("结束握手")]),_._v("协议")])]),_._v(" "),e("p",[_._v("完成了之后，客户端和服务器端就可以开始传送数据。更多 "),e("code",[_._v("HTTPS")]),_._v(" 的资料可以看这里：")]),_._v(" "),e("ul",[e("li",[e("p",[e("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/26682342",target:"_blank",rel:"noopener noreferrer"}},[_._v("https://zhuanlan.zhihu.com/p/26682342"),e("OutboundLink")],1)])]),_._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://segmentfault.com/a/1190000012196642",target:"_blank",rel:"noopener noreferrer"}},[_._v("https://segmentfault.com/a/1190000012196642"),e("OutboundLink")],1)])])]),_._v(" "),e("p",[e("code",[_._v("备注")])]),_._v(" "),e("p",[e("code",[_._v("ACK")]),_._v("：此标志表示应答域有效，就是说前面所说的"),e("code",[_._v("TCP")]),_._v("应答号将会包含在"),e("code",[_._v("TCP")]),_._v("数据包中；有两个取值："),e("code",[_._v("0")]),_._v("和"),e("code",[_._v("1")]),_._v("，为"),e("code",[_._v("1")]),_._v("的时候表示应答域有效，反之为"),e("code",[_._v("0")]),_._v("。"),e("code",[_._v("TCP")]),_._v("协议规定，只有"),e("code",[_._v("ACK=1")]),_._v("时有效，也规定连接建立后所有发送的报文的"),e("code",[_._v("ACK")]),_._v("必须为 1。")]),_._v(" "),e("p",[e("code",[_._v("SYN(SYNchronization)")]),_._v("：在连接建立时用来同步序号。当"),e("code",[_._v("SYN=1")]),_._v("而"),e("code",[_._v("ACK=0")]),_._v("时，表明这是一个连接请求报文。对方若同意建立连接，则应在响应报文中使"),e("code",[_._v("SYN=1")]),_._v("和"),e("code",[_._v("ACK=1")]),_._v(". 因此, "),e("code",[_._v("SYN置1")]),_._v("就表示这是一个连接请求或连接接受报文。")]),_._v(" "),e("p",[e("code",[_._v("FIN(finis）")]),_._v("即完，终结的意思， 用来释放一个连接。当 "),e("code",[_._v("FIN = 1")]),_._v(" 时，表明此报文段的发送方的数据已经发送完毕，并要求"),e("strong",[_._v("释放连接")]),_._v("。")]),_._v(" "),e("h2",{attrs:{id:"发送-http-请求，服务器处理请求，返回响应结果"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#发送-http-请求，服务器处理请求，返回响应结果"}},[_._v("#")]),_._v(" 发送 HTTP 请求，服务器处理请求，返回响应结果")]),_._v(" "),e("p",[e("code",[_._v("TCP")]),_._v(" 连接建立后，浏览器就可以利用 "),e("code",[_._v("HTTP／HTTPS")]),_._v(" 协议向服务器发送请求了。服务器接受到请求，就解析请求头，如果头部有缓存相关信息如"),e("code",[_._v("if-none-match")]),_._v("与"),e("code",[_._v("if-modified-since")]),_._v("，则验证缓存是否有效，若有效则返回状态码为"),e("code",[_._v("304")]),_._v("，若无效则重新返回资源，状态码为"),e("code",[_._v("200")]),_._v(".")]),_._v(" "),e("p",[_._v("这里有发生的一个过程是 HTTP 缓存，是一个常考的考点，大致过程如图：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/16dbf073d38fd016.png",alt:"img"}})]),_._v(" "),e("h2",{attrs:{id:"关闭-tcp-连接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#关闭-tcp-连接"}},[_._v("#")]),_._v(" 关闭 TCP 连接")]),_._v(" "),e("ol",[e("li",[_._v("第一次挥手：主机 1（可以使客户端，也可以是服务器端），设置"),e("code",[_._v("Sequence Number")]),_._v("和"),e("code",[_._v("Acknowledgment Number")]),_._v("，向主机 2 发送一个"),e("code",[_._v("FIN")]),_._v("报文段；此时，主机 1 进入"),e("code",[_._v("FIN_WAIT_1")]),_._v("状态；这表示主机 1 没有数据要发送给主机 2 了；")]),_._v(" "),e("li",[_._v("第二次挥手：主机 2 收到了主机 1 发送的"),e("code",[_._v("FIN")]),_._v("报文段，向主机 1 回一个"),e("code",[_._v("ACK报文段")]),_._v("，"),e("code",[_._v("Acknowledgment Number")]),_._v("为"),e("code",[_._v("Sequence Number")]),_._v("加 1；主机 1 进入"),e("code",[_._v("FIN_WAIT_2")]),_._v('状态；主机 2 告诉主机 1，我"同意"你的关闭请求；')]),_._v(" "),e("li",[_._v("第三次挥手：主机 2 向主机 1 发送"),e("code",[_._v("FIN")]),_._v("报文段，请求关闭连接，同时主机 2 进入 LAST_ACK 状态；")]),_._v(" "),e("li",[_._v("第四次挥手：主机 1 收到主机 2 发送的"),e("code",[_._v("FIN")]),_._v("报文段，向主机 2 发送"),e("code",[_._v("ACK报文段")]),_._v("，然后主机 1 进入 状态；主机 2 收到主机 1 的"),e("code",[_._v("ACK报文段")]),_._v("以后，就关闭连接；此时，主机 1 等待"),e("code",[_._v("2MSL")]),_._v("后依然没有收到回复，则证明"),e("code",[_._v("Server")]),_._v("端已正常关闭，那好，主机 1 也可以关闭连接了。")])]),_._v(" "),e("h2",{attrs:{id:"浏览器渲染"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器渲染"}},[_._v("#")]),_._v(" 浏览器渲染")]),_._v(" "),e("p",[_._v("按照渲染的时间顺序，流水线可分为如下几个子阶段："),e("strong",[_._v("构建 DOM 树")]),_._v("、"),e("strong",[_._v("样式计算")]),_._v("、"),e("strong",[_._v("布局阶段")]),_._v("、"),e("strong",[_._v("分层")]),_._v("、"),e("strong",[_._v("栅格化")]),_._v("和"),e("strong",[_._v("显示")]),_._v("。如图：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/6.png",alt:"img"}})]),_._v(" "),e("ol",[e("li",[_._v("渲染进程将 "),e("code",[_._v("HTML")]),_._v(" 内容转换为能够读懂 "),e("code",[_._v("DOM")]),_._v(" 树结构。")]),_._v(" "),e("li",[_._v("渲染引擎将 "),e("code",[_._v("CSS")]),_._v(" 样式表转化为浏览器可以理解的 "),e("code",[_._v("styleSheets")]),_._v("，计算出 "),e("code",[_._v("DOM")]),_._v(" 节点的样式。")]),_._v(" "),e("li",[_._v("创建"),e("strong",[_._v("布局树")]),_._v("，并计算元素的"),e("strong",[_._v("布局信息")]),_._v("。")]),_._v(" "),e("li",[_._v("对布局树进行"),e("strong",[_._v("分层")]),_._v("，并生成"),e("strong",[_._v("分层")]),_._v("树。")]),_._v(" "),e("li",[_._v("为每个图层生成"),e("strong",[_._v("绘制列表")]),_._v("，并将其提交到"),e("strong",[_._v("合成线程")]),_._v("。"),e("strong",[_._v("合成线程")]),_._v("将图层分图块，并"),e("strong",[_._v("栅格化")]),_._v("将图块转换成"),e("strong",[_._v("位图")]),_._v("。")]),_._v(" "),e("li",[e("strong",[_._v("合成线程")]),_._v("发送绘制图块命令给"),e("strong",[_._v("浏览器进程")]),_._v("。"),e("strong",[_._v("浏览器进程")]),_._v("根据指令生成页面，并显示到显示器上。")])]),_._v(" "),e("h2",{attrs:{id:"构建-dom-树"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#构建-dom-树"}},[_._v("#")]),_._v(" 构建 DOM 树")]),_._v(" "),e("p",[_._v("浏览器从网络或硬盘中获得 "),e("code",[_._v("HTML")]),_._v(" 字节数据后会经过一个流程将字节解析为 "),e("code",[_._v("DOM")]),_._v(" 树,先将 "),e("code",[_._v("HTML")]),_._v(" 的"),e("strong",[_._v("原始字节数据")]),_._v("转换为"),e("strong",[_._v("文件指定编码的字符")]),_._v(",然后浏览器会根据 "),e("strong",[_._v("HTML 规范")]),_._v("来将字符串转换成各种"),e("strong",[_._v("令牌标签")]),_._v("，如 "),e("code",[_._v("html、body")]),_._v(" 等。最终解析成一个"),e("strong",[_._v("树状的对象模型")]),_._v("，就是 "),e("code",[_._v("dom")]),_._v(" 树。")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/1580314848819.jpg",alt:"img"}})]),_._v(" "),e("p",[_._v("具体步骤：")]),_._v(" "),e("ol",[e("li",[_._v("转码（"),e("code",[_._v("Bytes")]),_._v(" -> "),e("code",[_._v("Characters")]),_._v("）—— 读取接收到的 "),e("code",[_._v("HTML")]),_._v(" 二进制数据，按指定编码格式将"),e("strong",[_._v("字节")]),_._v("转换为 "),e("code",[_._v("HTML")]),_._v(" 字符串")]),_._v(" "),e("li",[e("code",[_._v("Tokens")]),_._v("("),e("strong",[_._v("令牌")]),_._v(") 化（"),e("code",[_._v("Characters")]),_._v(" -> "),e("code",[_._v("Tokens")]),_._v("）—— 解析 "),e("code",[_._v("HTML")]),_._v("，将 "),e("code",[_._v("HTML")]),_._v(" 字符串转换为结构清晰的 "),e("code",[_._v("Tokens")]),_._v("，每个 "),e("code",[_._v("Token")]),_._v(" 都有特殊的含义同时有自己的一套规则")]),_._v(" "),e("li",[_._v("构建 "),e("code",[_._v("Nodes")]),_._v("（"),e("code",[_._v("Tokens")]),_._v(" -> "),e("code",[_._v("Nodes")]),_._v("）—— 每个 "),e("code",[_._v("Node")]),_._v("("),e("strong",[_._v("节点")]),_._v(") 都添加特定的"),e("strong",[_._v("属性")]),_._v("（或属性访问器），通过指针能够确定 "),e("code",[_._v("Node")]),_._v(" 的父、子、兄弟关系和所属 "),e("code",[_._v("treeScope")]),_._v("（例如：iframe 的 "),e("code",[_._v("treeScope")]),_._v(" 与外层页面的 "),e("code",[_._v("treeScope")]),_._v(" 不同）")]),_._v(" "),e("li",[_._v("构建 "),e("code",[_._v("DOM")]),_._v(" 树（"),e("code",[_._v("Nodes")]),_._v(" -> "),e("code",[_._v("DOM Tree")]),_._v("）—— 最重要的工作是建立起每个结点的父子兄弟关系")])]),_._v(" "),e("h2",{attrs:{id:"样式计算"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#样式计算"}},[_._v("#")]),_._v(" 样式计算")]),_._v(" "),e("p",[_._v("渲染引擎将 "),e("code",[_._v("CSS")]),_._v(" 样式表转化为"),e("strong",[_._v("浏览器可以理解")]),_._v("的 "),e("code",[_._v("styleSheets")]),_._v("，计算出 DOM 节点的样式。")]),_._v(" "),e("p",[e("code",[_._v("CSS")]),_._v(" 样式来源主要有 3 种，分别是通过 "),e("code",[_._v("link")]),_._v(" 引用的外部 "),e("code",[_._v("CSS")]),_._v(" 文件、"),e("code",[_._v("style")]),_._v("标签内的 "),e("code",[_._v("CSS")]),_._v("、元素的 "),e("code",[_._v("style")]),_._v(" 属性内嵌的 "),e("code",[_._v("CSS")]),_._v("。,其样式计算过程主要为：,其样式计算过程主要为：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/1580314997230.jpg",alt:"img"}})]),_._v(" "),e("p",[_._v("可以看到上面的 "),e("code",[_._v("CSS")]),_._v(" 文本中有很多属性值，如 "),e("code",[_._v("2em")]),_._v("、"),e("code",[_._v("blue")]),_._v("、"),e("code",[_._v("bold")]),_._v("，这些类型数值"),e("strong",[_._v("不容易被渲染引擎理解")]),_._v("，所以需要将所有值"),e("strong",[_._v("转换")]),_._v("为渲染引擎容易理解的、"),e("strong",[_._v("标准化")]),_._v("的计算值，这个过程就是"),e("strong",[_._v("属性值标准化")]),_._v("。处理完成后再处理样式的"),e("strong",[_._v("继承")]),_._v("和"),e("strong",[_._v("层叠")]),_._v("，有些文章将这个过程称为"),e("code",[_._v("CSSOM")]),_._v("("),e("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model",target:"_blank",rel:"noopener noreferrer"}},[_._v("CSS Object Model"),e("OutboundLink")],1),_._v(")的构建过程。")]),_._v(" "),e("h2",{attrs:{id:"页面布局"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#页面布局"}},[_._v("#")]),_._v(" 页面布局")]),_._v(" "),e("p",[_._v("布局过程，即排除 "),e("code",[_._v("script")]),_._v("、"),e("code",[_._v("meta")]),_._v(" 等功能化、非视觉节点，排除 "),e("code",[_._v("display: none")]),_._v(" 的节点，计算元素的"),e("strong",[_._v("位置信息")]),_._v("，确定元素的"),e("strong",[_._v("位置")]),_._v("，构建一棵只包含"),e("strong",[_._v("可见元素布局树")]),_._v("。如图：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/1580315271559.jpg",alt:"img"}})]),_._v(" "),e("p",[_._v("其中，这个过程需要注意的是回流和重绘，关于 "),e("strong",[_._v("回流")]),_._v("和"),e("strong",[_._v("重绘")]),_._v(" ，详细的可以看这篇文章"),e("a",{attrs:{href:"https://juejin.im/post/5da18b1af265da5bb318ed07#heading-10",target:"_blank",rel:"noopener noreferrer"}},[_._v("《浏览器相关原理(面试题)详细总结一》"),e("OutboundLink")],1),_._v("，这里就不说了～")]),_._v(" "),e("h2",{attrs:{id:"生成分层树"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#生成分层树"}},[_._v("#")]),_._v(" 生成分层树")]),_._v(" "),e("p",[_._v("页面中有很多复杂的效果，如一些复杂的 "),e("strong",[_._v("3D 变换")]),_._v("、"),e("strong",[_._v("页面滚动")]),_._v("，或者使用 "),e("code",[_._v("z-index")]),_._v(" 做 "),e("code",[_._v("z 轴排序")]),_._v("等，为了更加方便地实现这些效果，渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树（"),e("code",[_._v("LayerTree")]),_._v("），如图：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/1580315408178.jpg",alt:"img"}})]),_._v(" "),e("p",[_._v("如果你熟悉 PS，相信你会很容易理解图层的概念，正是这些图层叠加在一起构成了最终的页面图像。在浏览器中，你可以打开 "),e("code",[_._v("Chrome")]),_._v(" 的 "),e("strong",[_._v("开发者工具")]),_._v("，选择"),e("code",[_._v("Layers")]),_._v("标签。渲染引擎给页面分了很多"),e("strong",[_._v("图层")]),_._v("，这些"),e("strong",[_._v("图层")]),_._v("按照一定顺序叠加在一起，就形成了最终的页面。")]),_._v(" "),e("p",[_._v("并不是布局树的每个节点都包含一个"),e("code",[_._v("图层")]),_._v("，如果一个节点没有对应的层，那么这个节点就从属于父节点的"),e("code",[_._v("图层")]),_._v("。那么需要满足什么条件，渲染引擎才会为特定的节点创建新的层呢？详细的可以看这篇文章"),e("a",{attrs:{href:"https://juejin.im/post/5da18b1af265da5bb318ed07#heading-10",target:"_blank",rel:"noopener noreferrer"}},[_._v("《浏览器相关原理(面试题)详细总结一》"),e("OutboundLink")],1)]),_._v(" "),e("h2",{attrs:{id:"栅格化"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#栅格化"}},[_._v("#")]),_._v(" 栅格化")]),_._v(" "),e("p",[e("strong",[_._v("合成线程")]),_._v("会按照"),e("strong",[_._v("视口附近的图块")]),_._v("来优先生成"),e("strong",[_._v("位图")]),_._v("，实际生成"),e("strong",[_._v("位图")]),_._v("的操作是由"),e("strong",[_._v("栅格化")]),_._v("来执行的。所谓"),e("strong",[_._v("栅格化")]),_._v("，是指将"),e("strong",[_._v("图块")]),_._v("转换为"),e("strong",[_._v("位图")]),_._v("。如图：")]),_._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/GolderBrother/blog/master/images/browser/1580315642763.jpg",alt:"img"}})]),_._v(" "),e("p",[_._v("通常一个页面可能很大，但是用户只能看到其中的一部分，我们把用户可以看到的这个部分叫做"),e("code",[_._v("视口（viewport）")]),_._v("。在有些情况下，有的图层可以很大，比如有的页面你使用滚动条要滚动好久才能滚动到底部，但是通过"),e("strong",[_._v("视口")]),_._v("，用户只能看到页面的很小一部分，所以在这种情况下，要绘制出所有图层内容的话，就会产生太大的开销，而且也没有必要。")]),_._v(" "),e("p",[_._v("最后，"),e("strong",[_._v("合成线程")]),_._v("发送绘制图块命令给"),e("strong",[_._v("浏览器进程")]),_._v("。"),e("strong",[_._v("浏览器进程")]),_._v("根据"),e("strong",[_._v("指令")]),_._v("生成页面，并显示到显示器上，渲染过程完成。")]),_._v(" "),e("h2",{attrs:{id:"参考资料"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[_._v("#")]),_._v(" 参考资料")]),_._v(" "),e("ul",[e("li",[_._v("极客时间《浏览器工作原理与实践》")])]),_._v(" "),e("h2",{attrs:{id:"最后"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#最后"}},[_._v("#")]),_._v(" 最后")]),_._v(" "),e("p",[_._v("文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下"),e("a",{attrs:{href:"https://github.com/GolderBrother",target:"_blank",rel:"noopener noreferrer"}},[_._v("Github"),e("OutboundLink")],1),_._v("，一起学习呀~~")]),_._v(" "),e("comment")],1)}),[],!1,null,null,null);v.default=o.exports}}]);