# 字节跳动算法题

## 算法准备

如果需要了解了解算法以及没有很大把握的同学，建议把面试时间约在一周或者两周后，期间好好准备

另外面试时间可以调整，至少提前一天修改时间

面试可以现场可以视频，如果时间不方便可以约视频面试

面试共计四轮：
第一轮笔试或直接面试，重基础，细节
第二轮面试技术问题更深入一些
第三轮着重项目经验和技术广都和深度
第四轮 HR 面试，看稳定性，意向性，性价比，了解薪资
最后是 offer 沟通，定级、出薪资方案、入职时间等等
技术面试要知其然并知其所以然，每一轮面试或多或少都有算法，请做一些准备

### 1.二叉树搜寻算法

[二叉树](https://golderbrother.github.io/blog/views/algorithms/interview.html#%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%B1%BB%E9%A2%98%E7%9B%AE)

### 2.算法：前端做并发请求控制

```js
const mapLimit = (list, limit, asyncHandle) => {
  // 然后，等每个异步请求执行完，执行下一个list项
  const recursion = arr => {
    return asyncHandle(arr.shift()).then(res => {
      console.log('data', res);
      if (arr.length > 0) {
        return recursion(arr);
      }
      return 'finish';
    });
  };
  let asyncList = [];
  let listCopy = [].concat(list);
  // 瞬发 limit 个异步请求，我们就得到了并发的 limit 个异步请求
  while (limit--) {
    asyncList.push(recursion(listCopy));
  }
  // 等list所有的项迭代完之后的回调
  return Promise.all(asyncList);
};

const dataLists = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 100, 123];
let count = 0;
mapLimit(dataLists, 3, curItem => {
  return new Promise(resolve => {
    count++;
    setTimeout(() => {
      console.log(curItem, '当前并发量:', count--);
      resolve();
    }, Math.random() * 5000);
  });
}).then(response => {
  console.log('finish', response);
});

// 2 '当前并发量:' 3
// data undefined
// ...
// 100 '当前并发量:' 1
// data undefined
// finish [ 'finish', 'finish', 'finish' ]
```

### 3.两个链表的第一个公共节点（编写一个程序，找到两个单链表相交的起始节点）

[力扣原题](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  // 获取链表headA的长度
  let node = headA,
    lengthA = 0;
  while (node) {
    ++lengthA;
    node = node.next;
  }
  // 空链表，没有公共节点
  if (!lengthA) return null;

  // 获取链表headB的长度
  node = headB;
  let lengthB = 0;
  while (node) {
    ++lengthB;
    node = node.next;
  }
  if (!lengthB) return null;

  // 计算快慢指针的长度差 diff
  let diff = 0,
    slow, // 慢指针
    fast; // 快指针
  // 将慢指针 slow 指向较长链表，快指针 fast 指向较短链表
  if (lengthA < lengthB) {
    diff = lengthB - lengthA;
    slow = headB;
    fast = headA;
  } else {
    diff = lengthA - lengthB;
    slow = headA;
    fast = headB;
  }

  // slow 向前移动 diff 个距离(使得A、B到公共节点的距离一样)
  while (diff--) {
    slow = slow.next;
  }

  // slow 和 fast **同时向前移动，每次移动一个距离(说明速度一样)，直到相遇
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  // 这边返回慢或者快指针都可以，因为都是一样的节点了
  return slow;
};
```

### 4.1000 杯水，1 杯是毒药，给你小白鼠，怎么最快可以找到毒药。

使用二分法查找

### 5. 两数之和

给定一个整数数组 nums  和一个目标值 target，请你在该数组中找出和为目标值的那   两个   整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例:

```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0, len = nums.length; i < len; i++) {
    const diff = target - nums[i];
    // 判断是否存在于map中，有的话返回索引值
    if (map.has(diff)) return [map.get(diff), i];
    // 记录索引值 值 -> 索引
    map.set(nums[i], i);
  }
  return [];
};
```

## 挑战字符串

### 6.无重复字符的最长子串

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例  1:

```
输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

示例 2:

````
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。```
````

示例 3:

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters)

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if (!s || !s.length) return 0;
  let i = 0,
    index = 0,
    res = '';
  for (let j = 0, len = s.length; j < len; j++) {
    index = s.slice(i, j).indexOf(s[j]);
    if (index === -1) {
      // 没找到，就获取长度最大值(尾 - 头 + 1)
      res = Math.max(res, j - i + 1);
    } else {
      // 找到了，就从下一位重新开始
      i += index + 1;
    }
  }
  return res;
};
```

### 14. 最长公共前缀

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例  1:

```
输入: ["flower","flow","flight"]
输出: "fl"
```

示例  2:

```
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

思路：

- 标签：链表
- 当字符串数组长度为 0 时则公共前缀为空，直接返回
- 令最长公共前缀 res 的值为第一个字符串，进行初始化
- 遍历后面的字符串，依次将其与 res 进行比较，两两找出公共前缀，最终结果即为最长公共前缀
- 如果查找过程中出现了 res 为空的情况，则公共前缀不存在直接返回
- 时间复杂度：O(s)O(s)，s 为所有字符串的长度之和

实现代码

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  // 当字符串数组长度为 0 时则公共前缀为空，直接返回
  if (!strs || !strs.length) return '';
  // 令最长公共前缀 res 的值为第一个字符串，进行初始化
  let res = strs[0];
  for (let i = 1, len = strs.length; i < len; i++) {
    let j = 0;
    const str = strs[i];
    while (j < str.length && j < res.length) {
      // 遍历后面的字符串，依次将其与 res 进行比较，两两找出公共前缀，最终结果即为最长公共前缀
      if (res[j] !== str[j]) break;
      j++;
    }
    res = res.substring(0, j);
    // 如果查找过程中出现了 res 为空的情况，则公共前缀不存在直接返回
    if (!res) return '';
  }
  return res;
};
```

### 字符串的排列

给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。

换句话说，第一个字符串的排列之一是第二个字符串的子串。

示例 1:

```
输入: s1 = "ab" s2 = "eidbaooo"
输出: True
解释: s2 包含 s1 的排列之一 ("ba").
```

示例 2:

```
输入: s1= "ab" s2 = "eidboaoo"
输出: False
```

思路

代码

```js
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  var permutation = function(s) {
    // 数据不可重复，因此用Set结构来存储需要的数据
    const res = new Set();
    function dhs(s, i, len) {
      //当递归函数到达最后一层，就直接返回，因为此时前面几个位置已经发生了交换
      if (i === s.length - 1) {
        res.add(s);
        return;
      }
      // 遍历元素并交换插入
      for (let j = i, _len = s.length; j < _len; j++) {
        // 交换一次元素位置，并更新交换后拼接的字符串
        s = swap(s, i, j);
        //进入下一层递归
        dhs(s, i + 1, len);
        // 返回时交换回来, 还原元素位置，并更新交换后拼接的字符串
        s = swap(s, i, j);
      }
    }
    // 交换元素位置
    function swap(str, i, j) {
      if (i === j) return str;
      return str.substring(0, i) + str[j] + str.substring(i + 1, j) + str[i] + str.substring(j + 1);
    }
    dhs(s, 0, s.length);
    // Set转换成数组
    return Array.from(res);
  };
  const allStr = permutation(s1);
  // 查看第一个字符串的排列之一是第二个字符串的子串
  return allStr.some(_str => s2.includes(_str));
};
```

### 字符串相乘

给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

示例 1:

```
输入: num1 = "2", num2 = "3"
输出: "6"
```

示例  2:

```
输入: num1 = "123", num2 = "456"
输出: "56088"
```

说明：

1. num1  和  num2  的长度小于 110。
2. num1 和  num2 只包含数字  0-9。
3. num1 和  num2  均不以零开头，除非是数字 0 本身。
4. 不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。

代码

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  const numsArr = num2.split('').reverse();
  let multiply = 0;
  for (let i = 0, len = numsArr.length; i < len; i++) {
    let _multiply = Number(num1) * Number(numsArr[i]);
    // 除了第一位，其他位需要进位补0，也就是乘上10的幂方
    if (i > 0) _multiply *= 10 ** i;
    multiply += _multiply;
  }
  return String(multiply);
};
```

### 字符串相加

给定两个字符串形式的非负整数  num1 和 num2 ，计算它们的和。

注意：

num1 和 num2  的长度都小于 5100.
num1 和 num2 都只包含数字  0-9.
num1 和 num2 都不包含任何前导零。
你不能使用任何內建 BigInteger 库，  也不能直接将输入的字符串转换为整数形式。

实现思路：

- 从最后一位开始，模拟加法运算，如果两个数之和超过 10 就将余数加到前面一位，并且需要进 1
- 如果最后还有值，那说明需要再进 1

实现代码如下：

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  let a = num1.length,
    b = num2.length,
    // 每位数相加的结果
    temp = 0,
    result = '';
  while (a || b) {
    // 从最后一位开始计算，模拟加法运算，将计算结果保存到temp中
    a && (temp += Number(num1[--a]));
    b && (temp += Number(num2[--b]));
    // 超过10的就需要将余数加到前面一位
    result = (temp % 10) + result;
    // 大于9的就进1,否则从0开始
    temp = temp > 9 ? 1 : 0;
  }
  // 如果还有值，那说明需要进1
  if (temp) result = 1 + result;
  return result;
};
```

### 155. 最小栈

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

- push(x) —— 将元素 x 推入栈中。
- pop() —— 删除栈顶的元素。
- top() —— 获取栈顶元素。
- getMin() —— 检索栈中的最小元素。

```
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.

```

实现思路：

可以直接使用一个数组来存放每次操作的数据，然后还要根据每次操作后的数据，记录一个最小值`min`

实现代码：

```js
/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = [];
  this.min = null;
};

/**
 * 压栈
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  if (!this.stack.length) this.min = x;
  this.stack.push(x);
  this.min = Math.min(this.min, x);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  const val = this.stack.pop();
  this.min = Math.min(...this.stack);
  return val;
};

/**
 * 返回栈顶元素
 * @return {number}
 */
MinStack.prototype.top = function() {
  if (!this.stack.length) return null;
  return this.stack[this.stack.length - 1];
};

/**
 * 获取最小值
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

### 107. 二叉树的层次遍历 II

给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

例如：
给定二叉树 [3,9,20,null,null,15,7],

```
  3
   / \
  9  20
    /  \
   15   7
```

返回其自底向上的层次遍历为：

```
[
  [15,7],
  [9,20],
  [3]
]
```

#### 方法一：BFS（广度优先遍历）

BFS 是按层层推进的方式，遍历每一层的节点。题目要求的是返回每一层的节点值，所以这题用 BFS 来做非常合适。
BFS 需要用队列作为辅助结构，我们先将根节点放到队列中，然后不断遍历队列

实现代码：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
  if (!root) return [];
  let res = [],
    queue = [root];
  while (queue && queue.length) {
    let curr = [],
      temp = [];
    while (queue && queue.length) {
      const node = queue.shift();
      curr.push(node.val);
      // 从左往右压栈(先入后出)
      if (node.left) temp.push(node.left);
      if (node.right) temp.push(node.right);
    }
    queue = temp;
    res.push(curr);
  }
  // 从左往右压栈(先入后出)，所以最后需要反转
  return res.reverse();
};
```

#### 方法二:DFS（深度优先遍历）

DFS 是沿着树的深度遍历树的节点，尽可能深地搜索树的分支

DFS 做本题的主要问题是： DFS 不是按照层次遍历的。为了让递归的过程中同一层的节点放到同一个列表中，在递归时要记录每个节点的深度 depth 。递归到新节点要把该节点放入 depth 对应列表的末尾。

当遍历到一个新的深度 depth ，而最终结果 res 中还没有创建 depth 对应的列表时，应该在 res 中新建一个列表用来保存该 depth 的所有节点。

实现代码如下

```js
/**
 * 方法二：深度优先遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
  let res = [];
  function deep(node, depth = 0) {
    if (!node) return;
    // 栈 -> 先入后出
    (res[depth] || (res[depth] = [])).push(node.val);
    deep(node.left, depth + 1);
    deep(node.right, depth + 1);
  }
  deep(root, 0);
  // 因此最后需要反转
  return res.reverse();
};
```

### 112. 路径总和

给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

说明:  叶子节点是指没有子节点的节点。

示例: 
给定如下二叉树，以及目标和 sum = 22，

```
        5
      / \
    4   8
    /   / \
  11  13  4
  /  \      \
7    2      1
```

返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。

解决思路：

- 如果根节点为空，直接返回 false
- 如果左节点和右节点都为空，就直接比较根节点值
- 将总和减去当前值得到差值，不断递归来找是否等于这个差值的值，左节点找不到就找右节点

实现代码如下

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
  // 根节点为空，直接返回false
  if (root == null) return false;
  // 左节点和右节点都为空，就直接比较根接点值
  if (root.left == null && root.right == null) return root.val === sum;
  // 将总和减去当前值得到差值，不断递归来找是否等于这个差值的值，左节点找不到就找右节点
  sum = sum - root.val;
  return hasPathSum(root.left, sum) || hasPathSum(root.right, sum);
};
```

### 151. 翻转字符串里的单词

给定一个字符串，逐个翻转字符串中的每个单词。

示例 1：

```
输入: "the sky is blue"
输出: "blue is sky the"
```

示例 2：

```
输入: "  hello world!  "
输出: "world! hello"
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
```

方法一:

先去除头尾空格后，再用空格分隔成数组，并过滤去除每一项中的空格，最后将数组反转，并通过之前分隔的空格来连接每一项

```js
/**
 * 方法一：先去除头尾空格后，再用空格分隔成数组，并过滤去除每一项中的空格，最后将数组反转，并通过之前分隔的空格来连接每一项
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  const arr = s
    .trim()
    .split(' ')
    .filter(i => i && i.trim());
  return arr.reverse().join(' ');
};
```

方法二：

正则根据空格分组，并且每组会自动去空格，然后反转，最后再用空格连接

```js
var reverseWords = function(s) {
  // 先去除前后空格，然后将中间的多个空格串替换为一个，根据空格分隔成数组，反转，然后空格拼接回来
  return s
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .reverse()
    .join(' ');
};
```

### 复原 IP 地址

给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

有效的 IP 地址正好由四个整数（每个整数位于 0 到 255 之间组成），整数之间用 '.' 分隔。

示例:

```
输入: "25525511135"
输出: ["255.255.11.135", "255.255.111.35"]
```

代码：

```js
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  let result = [];
  function handler(s, last, segments) {
    if (segments == 3) {
      if (s.length <= 3 && parseInt(s.slice(0, 3)) <= 255) {
        if (s.length >= 2 && s.charAt(0) == '0') {
          return;
        }
        let item = last.concat(s);
        result.push(item);
        return;
      }
    }
    if (segments < 3) {
      let item = last.concat(s.slice(0, 1)).concat('.');
      handler(s.slice(1), item, segments + 1);
      if (s.charAt(0) != '0') {
        item = last.concat(s.slice(0, 2)).concat('.');
        handler(s.slice(2), item, segments + 1);
        if (parseInt(s.slice(0, 3)) <= 255) {
          item = last.concat(s.slice(0, 3)).concat('.');
          handler(s.slice(3), item, segments + 1);
        }
      }
    }
  }
  handler(s, '', 0);
  return result;
};
```

### 合并两个有序链表

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例：

```
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

思路：

递归思想

代码：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  if (l1 == null) return l2;
  if (l2 == null) return l1;
  if (l1.val <= l2.val) {
    // 递归下个节点l1.next合并l2
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    // 递归下个节点l2.next合并l1
    l2.next = mergeTwoLists(l2.next, l1);
    return l2;
  }
};
```

### 反转链表

反转一个单链表。

示例:

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  if (head == null || head.next === null) return head;
  let prev = null,
    curr = head;
  while (curr != null) {
    // 缓存下个节点
    const cNext = curr.next;
    // 将下个节点指向上个节点
    curr.next = prev === null ? null : prev;
    prev = curr;
    // 更新当前节点为下个节点
    curr = cNext;
  }
  // 尾结点即为新的头结点
  return prev;
};
```

### 两数相加

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

```
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

思路

因为是逆序，所以需要 +10 向后进位

代码

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  // 借助哨兵节点作为头节点
  let node = new ListNode('empty');
  // temp从哨兵节点头节点开始
  let temp = node,
    sum = 0,
    n = 0;
  while (l1 || l2) {
    const n1 = l1 ? l1.val : 0;
    const n2 = l2 ? l2.val : 0;
    // 需要加上进位
    sum = n1 + n2 + n;
    // 求余数
    temp.next = new ListNode(sum % 10);
    temp = temp.next;
    // 求模(进位),下一位相加需要加上进位
    n = parseInt(sum / 10);
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  // 需要进位
  if (n > 0) temp.next = new ListNode(n);
  return node.next;
};
```

### 排序链表

在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。

示例 1:

```
输入: 4->2->1->3
输出: 1->2->3->4
```

示例 2:

```
输入: -1->5->3->4->0
输出: -1->0->3->4->5
```

思路

归并排序 - 递归

- 1、把长度为 n 的输入序列分成两个长度为 n/2 的子序列
- 2、对这两个子序列分别采用归并排序
- 3、将两个排序好的子序列合并成一个最终的排序序列

代码

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  const mergeList = (leftList, rightList) => {
    // 借助哨兵节点作为头节点
    let res = new ListNode(0);
    let pre = res;
    while (leftList && rightList) {
      if (leftList.val <= rightList.val) {
        // 取小的数
        pre.next = leftList;
        // 指针前进
        leftList = leftList.next;
      } else {
        // 取小的数
        pre.next = rightList;
        // 指针前进
        rightList = rightList.next;
      }
      // 指针前进
      pre = pre.next;
    }
    pre.next = leftList || rightList;
    return res.next;
  };

  const mergeSort = node => {
    if (node == null || node.next == null) return node;
    let mid = node,
      // 快节点
      fastNode = node.next;
    // 递归指向下个节点
    while (fastNode && fastNode.next) {
      mid = mid.next;
      fastNode = fastNode.next.next;
    }
    let rightList = mid.next;
    mid.next = null;
    let left = node,
      right = rightList;
    // 递归左右节点排序
    return mergeList(mergeSort(left), mergeSort(right));
  };
  return mergeSort(head);
};
```

### 相交链表

编写一个程序，找到两个单链表相交的起始节点。

如下面的两个链表：

- 如果两个链表没有交点，返回 null.
- 在返回结果后，两个链表仍须保持原有的结构。
- 可假定整个链表结构中没有循环。
- 程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。

代码

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  if (headA == null || headB == null) return null;
  let pA = headA,
    pB = headB;
  while (pA || pB) {
    if (pA === pB) return pA;
    // 遍历 A、B 链表 pA 、 pB ，直到遍历完其中一个链表（短链表）
    // 遍历完链表 pA
    pA = pA === null ? headB : pA.next;
    // 遍历完链表 pB
    pB = pB === null ? headA : pB.next;
  }
  return null;
};
```

### 合并 K 个排序链表

合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

> 贼难，号称是 leetcode 目前最难的链表题，所以我是直接拷贝过来的 emmmm~~

代码

```js
/*
 * @lc app=leetcode id=23 lang=javascript
 *
 * [23] Merge k Sorted Lists
 *
 * https://leetcode.com/problems/merge-k-sorted-lists/description/
 *
 */
function mergeTwoLists(l1, l2) {
  const dummyHead = {};
  let current = dummyHead;
  // l1: 1 -> 3 -> 5
  // l2: 2 -> 4 -> 6
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      current.next = l1; // 把小的添加到结果链表
      current = current.next; // 移动结果链表的指针
      l1 = l1.next; // 移动小的那个链表的指针
    } else {
      current.next = l2;
      current = current.next;
      l2 = l2.next;
    }
  }

  if (l1 === null) {
    current.next = l2;
  } else {
    current.next = l1;
  }
  return dummyHead.next;
}
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];
  if (lists.length === 2) {
    return mergeTwoLists(lists[0], lists[1]);
  }

  const mid = lists.length >> 1;
  const l1 = [];
  for (let i = 0; i < mid; i++) {
    l1[i] = lists[i];
  }

  const l2 = [];
  for (let i = mid, j = 0; i < lists.length; i++, j++) {
    l2[j] = lists[i];
  }

  return mergeTwoLists(mergeKLists(l1), mergeKLists(l2));
};
```

### 二叉树的最近公共祖先

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉树: root = [3,5,1,6,2,0,8,null,null,7,4]

![binarytree](./bytedance-algorithms/img/binarytree.png)

代码

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  // 如果root是None，说明我们在这条寻址线路没有找到，我们返回None表示没找到
  if (root == null) return null;
  // 如果左子树和右子树分别找到一个，我们就返回root
  if (root == p || root == q) return root;
  // 左子树
  const leftSubTree = lowestCommonAncestor(root.left, p, q);
  // 右子树
  const rightSubTree = lowestCommonAncestor(root.right, p, q);
  // 如果左子树找不到，那就从右子树上找
  if (!leftSubTree) return rightSubTree;
  // 同理，如果右子树找不到，那就从左子树上找
  if (!rightSubTree) return leftSubTree;
  return root;
};
```

### 二叉树的锯齿形层次遍历

给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

例如：
给定二叉树 [3,9,20,null,null,15,7],

```
    3
   / \
  9  20
    /  \
   15   7
```

返回锯齿形层次遍历如下：

```
[
  [3],
  [20,9],
  [15,7]
]
```

思路

广度优先通过队列处理 【深度优先用栈】

- 将一层记录在数组中 并记录数组长度
- 找下一行所有数据
- 将数组首位弹出 将首位的左右节点追在数组后
- 按照记录的数组长度 将上层的结点全部弹出后 此时数组只剩下下一行结点了 此时就完成了一层的遍历

代码

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  if (root == null) return [];
  let arr = [root];
  let res = [];
  let flag = true;
  while (arr.length > 0) {
    let len = arr.length;
    let temp = [];
    if (flag) {
      // 从左到右
      while (len-- > 0) {
        // 从第一个元素出栈
        const node = arr.shift();
        temp.push(node.val);
        // 从左到右 取出放到尾部
        if (node.left != null) arr.push(node.left);
        if (node.right != null) arr.push(node.right);
      }
      res.push(temp);
    } else {
      // 从右到左
      while (len-- > 0) {
        // 最后一个元素出栈
        const node = arr.pop();
        temp.push(node.val);
        // 从右到左 取出放到头部
        if (node.right != null) arr.unshift(node.right);
        if (node.left != null) arr.unshift(node.left);
      }
      res.push(temp);
    }
    // 判断当前元素个数是否为奇数
    flag = !flag;
  }
  return res;
};
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)~
