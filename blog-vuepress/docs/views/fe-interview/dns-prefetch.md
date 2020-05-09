# 谈谈你对 dns-prefetch 的理解

DNS 是什么 -- `Domain Name System`，**域名系统**，作为**域名**和 **IP 地址**相互映射的一个**分布式数据库**。

## DNS Prefetching

浏览器根据自定义的规则，**提前去解析后面可能用到的域名**，来**加速网站的访问速度**。简单来讲就是**提前解析域名**，以免延迟。

## 使用方式

```html
<link rel="dns-prefetch" href="//wq.test.com" />
```

这个功能有个默认加载条件，所有的 `a` 标签的 `href` 都会自动去启用 `DNS Prefetching`，也就是说，你网页的 `a` 标签 `href` 带的域名，是不需要在 `head` 里面加上 `link` 手动设置的。但 `a` 标签的默认启动在 `HTTPS` 不起作用。

这时要使用 `meta` 里面 `http-equiv` 来强制启动功能。

```html
<meta http-equiv="x-dns-prefetch-control" content="on" />
```

## 总结

1. `DNS Prefetching` 是提前加载域名解析的，省去了解析时间。
2. `a` 标签的 `href` 是可以在 `chrome`、`firefox` 包括高版本的 `IE`，但是在 `HTTPS` 下面不起作用，需要 `meta` 来强制开启功能
3. 这是 `DNS` 的**提前解析**，并不是 css，js 之类的文件缓存，大家不要混淆了两个不同的概念。
4. 如果直接做了 `js` 的重定向，或者在服务端做了重定向，没有在 `link` 里面手动设置，是不起作用的。
5. 这个对于什么样的网站更有作用呢，类似 `某宝` 这种网站，你的网页引用了大量很多其他域名的资源，如果你的网站，基本所有的资源都在你本域名下，那么这个基本没有什么作用。因为 `DNS Chrome` 在访问你的网站就帮你缓存了。

## 参考资料

[web 下的性能优化 1(网络方向)](https://segmentfault.com/a/1190000022522349)

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~
