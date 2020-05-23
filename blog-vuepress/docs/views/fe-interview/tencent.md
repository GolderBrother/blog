# 微信面试题

## 笔试

### 1. 数组交集，编写一个函数，输入两个数组，输出它们的交集。输出数组中不含重复的元素，元素排列顺序可随意。

[原题地址](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/)

### 2. 二叉树的搜索，输入一个普通二叉树的根节点，实现一个调度器，调用调度器的 next()方法，将返回二叉树中下一个最小的数；调用迭代器的 hasNext()方法，将返回是否存在下一个数。二叉树节点是整数，无序。

[原题地址](https://leetcode-cn.com/problems/binary-search-tree-iterator/)

### 3. 三角形个数，输入一个非负整数的数组，如果将数组元素选作三角形的边长，编写一个函数，输出这个数组可构成的三角形数量。

[原题地址](https://leetcode-cn.com/problems/valid-triangle-number/)

### 4. 数组切分问题，输入一个正序排列的整型数组，如果它可以被切分为 1 个或多个子序列，输出 True，反之 False。子序列需为连续的整型数组，并且长度至少为 3。

```
例1：
输入： [1,2,3,3,4,5]
输出：True
解释：可以切分为2个各自连续的子序列：
1, 2, 3
3, 4, 5
例2：
输入： [1,2,3,3,4,4,5,5]
输出：True
解释：可以切分为2个各自连续的子序列：
1, 2, 3, 4, 5
3, 4, 5
例3：
输入： [1,2,3,4,4,5]
输出：False
解释：无法切分出长度至少为3的子序列。
```

[原题地址](https://leetcode-cn.com/problems/split-array-into-consecutive-subsequences/)

### 5. 一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法.

```js
/**
 * @param {number} n
 * @return {number}
 */
var numWays = function(n) {
  // 就1种跳法
  if (n <= 0) return 1;
  // 2级台阶就2种跳法：1,1 2
  if (n <= 2) return n;

  let pre = 1,
    cur = 2,
    i = 2, // 从第3级开始通过循环累加
    res = 0; // 有多少种跳法
  while (i++ < n) {
    res = (pre + cur) % 1000000007;
    pre = cur; // 更新pre指向下一个值(cur)
    cur = res; // 更新cur指向下一个值(res)
  }
  return res;
};
```

### 6. 求下面代码的输出

```js
function test(a, b) {
  console.log(b);
  return {
    test: function(c) {
      return test(c, a);
    }
  };
}

const retA = test(0);
retA.test(2);
retA.test(4);
retA.test(8);
const retB = test(0)
  .test(2)
  .test(4)
  .test(8);
const retC = test('good').test('bad');
retC.test('good');
retC.test('bad');
```

### 7. top k

[原题地址](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

### 闭包问题及优化

```js
for (var i = 0; i < 4; i++) {
  setTimeout(
    function(i) {
      console.log(i);
    },
    300,
    i
  );
}
```

## 与项目关系不大的问答题

- [节流防抖(实现/场景/源码，如 lodash 实现原理)](https://www.cnblogs.com/LuckyWinty/p/5949970.html#4564734)
- [事件循环(浏览器/node/版本差异)](https://mp.weixin.qq.com/s/QgfE5Km1xiEkQqADMLmj-Q)
- [setTimeout 实现原理](https://mp.weixin.qq.com/s/7qTRSMqaqG8XZ9rpEBhYNQ)
- [react 和 vue 的区别](https://juejin.im/post/5b8b56e3f265da434c1f5f76)
- [Promise 原理](https://juejin.im/post/5d6f7c83e51d4561c541a712)
- [前端错误监控及容灾](https://mp.weixin.qq.com/s/prf-mXexBh1Ie-ctq9FnzA)
- 性能优化
  - [1](https://mp.weixin.qq.com/s/qXFd3f7CkEzz4u_1zl-TSw)
  - [2](https://mp.weixin.qq.com/s/dy1u2g9TeCoq2WOdPLqAXw)
  - [3](https://mp.weixin.qq.com/s/DJ8Fdq1_cIoW0_NYekZwFw)
  - [4](https://mp.weixin.qq.com/s/azeUIx0EA86EFQrtIRUKwQ)
  - [5](https://mp.weixin.qq.com/s/wDKKj5R8SYm-_75Zn1y30A)
  - [6](https://mp.weixin.qq.com/s/BOdnCYbMQfmCpUC3w3KZqw)
  - [7](https://mp.weixin.qq.com/s/FdG7uVIDXltNyskL3qh8Cw)
- [谈谈 node 的内存泄漏](https://zhuanlan.zhihu.com/p/25736931)
- [浏览器的渲染机制是怎样的](https://mp.weixin.qq.com/s/wcw30EUb2ds3AoW176WGeg)
- [SSR 作用及优缺点(seo/首屏快/开发成本高等)](https://zhuanlan.zhihu.com/p/35871344)
- `webpack`
  - [Webpack 深入浅出](https://mp.weixin.qq.com/s/1FySzmVrNjS6wjgqALC96g)
  - [Chrome 页面呈现原理与性能优化](https://mp.weixin.qq.com/s/wcw30EUb2ds3AoW176WGeg)
- [如何进行项目重构](https://www.itzhai.com/refactoring/refactoring-principle.html)
- [进程与线程的区别](https://www.zhihu.com/question/25532384)
- [CI/CD](https://mp.weixin.qq.com/s/MbeW8UNZ1fPekWcaNqmsCQ)

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~
