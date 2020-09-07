# 一个DOM元素绑定多个事件时，先执行冒泡还是捕获

## 问题引入：

一个DOM元素绑定两个事件，一个冒泡，一个捕获，则事件会执行多少次，执行顺序如何。

这次不卖关思了，直接给你个答案。不理解你就继续往下看。

> 绑定在被点击元素的事件是按照代码顺序发生，其他元素通过冒泡或者捕获“感知”的事件，按照W3C的标准，先发生捕获事件，后发生冒泡事件。所有事件的顺序是：其他元素捕获阶段事件 -> 本元素代码顺序事件 -> 其他元素冒泡阶段事件 。

## addEventListener参数

``` js
element.addEventListener(type, function, useCapture)
//【事件类型】，【事件处理程序】，【可选。布尔值，指定事件是否在捕获或冒泡阶段执行。true：事件句柄在捕获阶段执行；false：默认。事件句柄在冒泡阶段执行】
```

## 1. 冒泡

> 冒泡是从下向上，DOM元素绑定的事件被触发时，此时该元素为目标元素，目标元素执行后，它的的祖元素绑定的事件会向上顺序执行。

如下代码所示，四个嵌套的div：

**addEventListener函数的第三个参数设置为false说明不为捕获事件，即为冒泡事件**。

``` html
<div id='one'>
    <div id='two'>
        <div id='three'>
            <div id='four'>
            </div>
        </div>
    </div>
</div>

<script type='text/javascript'>
    var one = document.getElementById('one');
    var two = document.getElementById('two');
    var three = document.getElementById('three');
    var four = document.getElementById('four');
    one.addEventListener('click', function() {
        alert('one');
    }, false);
    two.addEventListener('click', function() {
        alert('two');
    }, false);
    three.addEventListener('click', function() {
        alert('three');
    }, false);
    four.addEventListener('click', function() {
        alert('four');
    }, false);
</script>
```

代码的执行顺序是：

    点击one元素，输出one；
    点击two元素，输出two one;
    点击three元素，输出 three two one；
    点击four元素，输出 four three two one；

## 2. 捕获

> 捕获则和冒泡相反，目标元素被触发后，会从目标元素的最顶层的祖先元素事件往下执行到目标元素为止。

**将上面的代码第三个参数均改为true，事件为捕获阶段执行**。

注意： 在事件处理程序中删除目标元素也能阻止事件冒泡，目标元素在文档中是事件冒泡的前提。

则执行结果如下：

    点击one，输出one；
    点击two，输出one two；
    点击three，输出one two three；
    点击four，输出one two three four；

很明显执行顺序是不同的。

## 3. 当一个元素绑定两个事件，一个冒泡，一个捕获

> 首先，无论是冒泡事件还是捕获事件，元素都会先执行捕获阶段。

从上往下，如有捕获事件，则执行；一直向下到目标元素后，从目标元素开始向上执行冒泡元素，即第三个参数为true表示捕获阶段调用事件处理程序，如果是false则是冒泡阶段调用事件处理程序。(在向上执行过程中，已经执行过的捕获事件不再执行，只执行冒泡事件。)

第三个参数

* `true` : 捕获
* `false` : 冒泡(默认)

如下代码

``` js
one.addEventListener('click', function() {
    alert('one');
}, true);
two.addEventListener('click', function() {
    alert('two');
}, false);
three.addEventListener('click', function() {
    alert('three');
}, true);
four.addEventListener('click', function() {
    alert('four');
}, false);
```

此时**点击four元素**，four元素为目标元素，one为根元素祖先，从one开始向下判断执行。

分析：

    

``` 
    one为捕获事件，输出one；
    two为冒泡事件，忽略；
    three为捕获时间，输出three；
    four为目标元素，开始向上冒泡执行，输出four；（从此处分为两部分理解较容易。）
    three为捕获已执行，忽略;
    two为冒泡事件，输出two；
    one为捕获已执行，忽略。
```

最终执行结果为： `one three four two`
例如，**three作为目标元素**，执行结果为：one three two(因为two是冒泡事件，在向下执行时没有执行到)。

执行次数：**绑定了几个事件便执行几次**。

> 如下代码，two元素绑定了两个不同事件，点击two都会执行这两个事件。而执行顺序有所差异。

``` js
one.addEventListener('click', function() {
    alert('one');
}, true);
two.addEventListener('click', function() {
    alert('two,bubble');
}, false);
two.addEventListener('click', function() {
    alert('two,capture');
}, true);
three.addEventListener('click', function() {
    alert('three,bubble');
}, true);
four.addEventListener('click', function() {
    alert('four');
}, true);
```

> 1、如果two为目标元素，目标元素的同类型事件按顺序执行，而其他元素根据W3C的标准执行，即先捕获后冒泡。

点击two执行结果：one(因为是two的父元素支持捕获事件所以先执行) `two, bubble`
two, capture(顺序执行，注意逗号不是间隔，是输出内容。)

> 2、如果目标元素不是two，则two的同类型事件按先捕获后冒泡触发执行，也就是跟前面讨论的执行过程是一样的，只不过两个事件都绑定在同一个DOM元素上。

## 总结

所以，看到这里，你就应该明白了：

> **绑定在被点击元素的事件是按照代码顺序发生**。

其他元素通过冒泡或者捕获“感知”的事件。
按照W3C的标准，先发生捕获事件，后发生冒泡事件。所有事件的顺序是：其他元素捕获阶段事件 -> 本元素代码顺序事件 -> 其他元素冒泡阶段事件 。

## 举个例子

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">

    </style>
</head>

<body>
    <div class="outer">
        <div class="inner">
            <button id="btn">click</button>
        </div>
    </div>

    <script>
        const inner = document.querySelector('.inner');
        const outer = document.querySelector('.outer');
        const body = document.body;

        function h(stopPropagation) {
            return function(e) {
                console.log( `${this.id||this.className||this.tagName}` );
                if (stopPropagation) {
                    e.stopPropagation();
                }
            }
        }
        body.addEventListener('click', h()); //冒泡阶段执行
        outer.addEventListener('click', h(), true); //捕获阶段执行
        inner.addEventListener('click', h(true)); //冒泡阶段执行，取消冒泡

        //解析：W3c执行顺序：其他元素的捕获事件，自身元素的顺序事件，其他元素的冒泡事件。
        //此处，
        //body的click事件为冒泡阶段，暂不执行；
        //outer的click事件为捕获阶段执行，触发。输出outer
        //inner的click事件为冒泡阶段执行，本身触发，输出inner。
        //但是因为inner在这里取消了冒泡，所以body的click冒泡事件也不能执行了。
    </script>
</body>

</html>
```

结果是：

``` 
outer
inner
```

改动，若此处：

``` js
inner.addEventListener('click', h()); //不取消冒泡
```

输出：

``` 
outer
inner
body
```

## 遇到的坑

### 坑一：新插入的子元素没有绑定点击事件

一个Ul元素中初始的状态有4个li元素，我们可以循环给li元素添加 `click` 事件，执行我们想要的动作。这个例子的坑就在于，新添加的li元素不会有我们绑定的 `click` 事件。

``` html
<ul class="container">

    <!-- 先循环给原有的4个li绑定click事件 -->
    <li class="item"></li>
    <li class="item"></li>
    <li class="item"></li>
    <li class="item"></li>

    <!-- 这是新添加的li元素，但是该元素没绑定click事件 -->
    <li class="item new"></li>
</ul>
```

### 利用事件委托(JQ)：

``` js
$('ul.container').click(function(event) {
    var target = event.target;
    if (target.className == 'item') {
        // dosomething
    }
})
```

### 事件委托有很多好处：

* 新增的li元素也可以有同样的事件
* 给父元素（ul）绑定事件，那子元素（li）在出现的时候就立即有适当的事件了，不必等到后续js绑定上才能触发
* 不必循环多次访问dom，不必有很多事件处理程序，节省内存和绑定的时间

### 坑二： 如果目标元素有子元素，那么怎么办？

``` html
<li class="item">
    <div class="title">xxx</title>
        <p class="desc">xxxxxxs</p>
</li>
```

**解决办法**：

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>事件委托-li元素有多个子元素</title>
</head>

<body>
    <ul id="list">
        <li>001</li>
        <li>
            <a>哈哈哈</a>li元素
        </li>
        <li>003</li>
        <li>004</li>
        <li>005</li>
    </ul>

    <script>
        var $list = document.querySelector('#list');
        $list.addEventListener('click', function(e) {
            var target = e.target || e.srcElement;
            //写法一
            // while(target.nodeName.toLowerCase() !=='li'){
            //  target = target.parentNode;
            // }
            // console.log(target.innerHTML);

            //写法二： 将获取指定的li元素提取为一个函数
            console.log(getNode(target).innerHTML);
        }, false);

        function getNode(node) {
            if (node.nodeName.toLowerCase() === 'li') {
                console.log("node", node);
                return node;
            } else {
                console.log('111');
                return getNode(node.parentNode);
            }
        }
    </script>
</body>

</html>
```

## 坑三：谈JavaScript中的移除空事件处理程序

> 可以采用事件委托技术，限制建立的连接数量。另外，在不需要时, 移除事件处理程序，也是解决这个问题的一种方案。

问题： 内存中留有那些过时不用的“空事件处理程序”，也是造成Web应用程序内存与性能问题的主要原因。

**在两种情况下，可能会造成”空事件处理程序”**:

第一种情况就是**从文档中移除带有事件处理程序的元素时**。

* 这可能是通过纯粹的DOM操作，例如使用 `removeChild()` 和 `replaceChild()` 方法
* 但更多地是发生在使用 `innerHTML` 替换页面中某一部分的时候。
* 如果带有事件处理程序的元素被 `innerHTML` 删除了，那么原来添加到元素中的事件处理程序极有可能无法被当作垃圾回收。

常用场景：一个按钮被包围在div元素中，为避免双击，单击这个按钮就将这个按钮移除并替换成一条消息。

但问题在于，当按钮被从页面中移除时，它还带着一个事件处理程序呢，在 `<div>` 元素中设置 `innerHTML` 可以把按钮移走，但事件处理各种仍然与按钮保持着引用联系。

有的浏览器（尤其是IE）在这种情况下不会作出恰当的处理，它们很有可能会将对元素和事件处理程序的引用都保存在内存中。**如果你想知道某个元即将被移除，那么最好手工移除事件处理程序**。

**DOM0事件**的移除方法如下

``` html
<div id="myDiv">
    <input type="button" value="Click Me" id="myBtn">
</div>
<script type="text/javascript">
    var btn = document.getElementById("myBtn");
    btn.onclick = function() {
        btn.onclick = null;
        document.getElementById("myDiv").innerHTML = "Processing…";
    }
</script>
```

### 第二种导致“空事件处理程序”的情况，就是卸载页面中的时候。

毫不奇怪，IE在这种情况下依然是问题最多的浏览器，尽管其他浏览器或多或少也有类似的问题。

如果在页面被卸载之前没有清理干净事件处理程序。那它们就会**滞留**在**内存**中。每次加载完页面再卸载页面时（可能是在两个页面间来加切换，也可以是单击了“刷新”按钮），**内存**中滞留的对象数目就会增加，因为事件处理程序占用的**内存**并没有被释放。

> 一般来说，最好的做法是在页面卸载之前，先通过 `onunload` 事件处理程序移除所有事件处理程序。在此，事件委托技术再次表现出它的优势——需要跟踪的事件程序越少，移除它们就越容易。

对这种类似的操作，我们可把它想象成：只要是通过 `onload` 事件处理程序添加的东西，最后都要通过 `onunload` 事件处理程序将它们移除。

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)~
