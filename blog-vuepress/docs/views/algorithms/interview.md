# 面试必刷-《剑指 offer》刷题小结

《剑指 offer》剖析了 80 个典型的编程面试题，系统整理基础知识、代码质量、解题思路、优化效率和综合能力这 5 个面试要点。但是我刷题只有牛客网上的 66 题。

如果是单纯的面试需求，剑指 offer 的优先级肯定是在 Leetcode 之前，总的说它有三个优点：

- 1.很可能在面试中出现原题
- 2.约 66 题，题量少，但是涵盖的内容较全
- 3.能培养一个良好的刷题习惯

它的缺点是：

- 1.只有 66 题，刷着容易过拟合
- 2.动态规划的题比较少，因此需要在 Leetcode 上专项训练。

算法题主要分成**数据结构**和**具体算法**部分，简单归类如下。基本每道题都很精彩，所以这里就不一一洗写了，题解可以看看我的代码仓库或者讨论区的内容。

## 数据结构类题目

## 具体算法类题目

### 搜索算法

### 003. 数组中重复的数字

找出数组中重复的数字。

在一个长度为 n 的数组 nums 里的所有数字都在 0 ～ n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

```text
示例 1：

输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3
```

实现代码如下：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 查找数组中重复的数字，使用map记录当前项为true，下次遇到同样的key(重复项)，就是要查找的重复项
var findRepeatNumber = function(nums) {
  const map = new Map();
  for (const n of nums) {
    if (map.get(n)) return n;
    map.set(n, true);
  }
};

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3])); // 2
```

#### 004. 二维数组查找

在一个 `n * m` 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

[力扣（LeetCode）- 面试题 04. 二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof)

给定 `target = 5`，返回 `true`。

给定 `target = 20`，返回 `false`。

限制：

`0 <= n <= 1000`

`0 <= m <= 1000`

实现代码如下：

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
  let flag = false;
  for (let i = matrix.length; i > 0; i--) {
    if (matrix[i - 1][0] <= target) {
      if (matrix[i - 1].includes(target)) {
        flag = true;
        break;
      }
    }
  }
  return flag;
};
const matrix = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
];

console.log(findNumberIn2DArray(matrix, 5)); // false
console.log(findNumberIn2DArray(matrix, 20)); // true
```

## 011. 旋转数组的最小数字

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组  [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为 1。

```text
示例 1：

输入：[3,4,5,1,2]
输出：1

示例 2：

输入：[2,2,2,0,1]
输出：0
```

实现代码如下：

```js
// 实际上可以理解为寻找数组中的最小值
var minArray = function(numbers) {
  return Math.min(...numbers);
};

console.log(minArray([2, 2, 2, 0, 1])); // 0
```

### 056-1. 数组中数字出现的次数

一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是 O(n)，空间复杂度是 O(1)。

实现代码如下：

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
  const arr = [];
  const countArr = nums.reduce((accu, cur) => {
    accu[cur] ? accu[cur]++ : (accu[cur] = 1);
    return accu;
  }, {});
  console.log(countArr); // { '1': 1, '4': 2, '6': 1 }
  for (const [key, value] of Object.entries(countArr)) {
    if (value === 1) arr.push(Number(key));
  }
  return arr;
};

console.log(singleNumbers([4, 1, 4, 6])); // [ 1, 6 ]
```

时间复杂度：O(n)，我们只需要遍历数组 1 次 和 遍历对象 entries 一次。

空间复杂度：O(n)。

实际上不满足题目的空间复杂度 O(1)

[可以参考题解](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/solution/zhen-xin-kan-bu-dong-na-xie-wei-yun-suan-fu-de-hua/)

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~
