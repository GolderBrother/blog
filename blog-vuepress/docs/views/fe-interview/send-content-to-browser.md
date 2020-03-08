# 如何保证页面文件能被完整送达浏览器

互联网中的数据是通过**数据包**来传输的。**数据包**要在互联网上进行传输，就要符合网际协议(**IP**)，互联网上不同的在线设备都有唯一的地址，地址只是一个数字，只要知道这个具体的地址，就可以往这里发送信息。

如果要想把一个数据包从**主机 A**发送给**主机 B**，那么在传输之前，数据包上会被附加上主机 B 的 IP 地址信息，这样在传输过程中才能正确寻址。额外地，数据包上还会附加上主机 A 本身的 IP 地址，有了这些信息主机 B 才可以回复信息给主机 A。这些附加的信息会被装进一个叫 IP 头的数据结构里。IP 头是 IP 数据包开头的信息，包含 IP 版本、源 IP 地址、目标 IP 地址、生存时间等信息。

**IP** 是非常底层的协议，只负责把数据包传送到对方电脑，但是对方电脑并不知道把数据包交给哪个程序，是交给浏览器还是交给王者荣耀？因此，需要基于 **IP** 之上开发能和应用打交道的协议，最常见的是用户数据包协议（**User Datagram Protocol**)，简称**UDP**和传输控制协议（**Transmission Control Protocol**）,简称**TCP**.

基本传输过程为：

1. 上层将数据包交给**传输层**
2. **传输层**会在数据包前面附加上 `UDP` 头，组成新的 `UDP` 数据包，再将新的 `UDP` 数据包交给网络层
3. 网络层再将 IP 头附加到数据包上，组成新的 IP 数据包，并交给数据链路层，再到物理层。
4. 数据包被传输到主机 B 的网络层，在这里主机 B 拆开 IP 头信息，并将拆开来的数据部分交给**传输层**
5. 在**传输层**，数据包中的 `UDP` 头会被拆开，并根据 `UDP` 中所提供的端口号，把数据部分交给上层的应用程序
6. 最终，数据包就发送到了主机 B 上层应用程序这里。