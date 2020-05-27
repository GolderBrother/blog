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
  // 先取出受控空格，然后通过替换多个空格为一个，再桶改过空格分割成数组，最后反转再通过空格连接还原
  return s
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .reverse()
    .join(' ');
};
```
