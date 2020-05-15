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

### 链表

#### 06. 从尾到头打印链表

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

```txt
示例 1：

输入：head = [1,3,2]
输出：[2,3,1]
```

第一种方式：`reverse()` 输出

实现代码如下:

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
 * @return {number[]}
 */
var reversePrint = function(head) {
  if (head == null) return [];
  const reverseList = [];
  while (head) {
    reverseList.push(head.val);
    head = head.next;
  }
  return reverseList.reverse();
};
```

第二种方式：递归反转链表

实现代码如下：

```js
var reversePrint = function(head) {
  if (head == null || head.next == null) return head;
  const next = reversePrint(head.next);
  head.next.next = head; // 指针反转
  head.next = null;
  return next; // 返回反转后的扁头
};
```

#### 24. 反转链表

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

```txt
示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

实现思路：

从头节点开始遍历链表，依次将每个节点指向下一个节点的指针改为指向上一个节点的指针，直到尾结点为止，这时候尾结点即新的头结点，直接返回

实现代码：

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
  if (head === null || head.next === null) return head;
  let prev = null,
    curr = head;
  while (curr !== null) {
    const cNext = curr.next; // 记录下一个指针
    curr.next = prev === null ? null : prev;
    prev = curr; // 上一个指针往后移
    curr = cNext; // 当前指针往后移
  }
  return prev; // 尾结点即为新的头结点
};

reverseList([1, 2, 3, 4, 5]); // [5,4,3,2,1]
```

#### 22. 链表中倒数第 k 个节点

输入一个链表，输出该链表中倒数第 k 个节点。为了符合大多数人的习惯，本题从 1 开始计数，即链表的尾节点是倒数第 1 个节点。例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。

```txt
示例：

给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.
```

实现思路：

声明两个节点，采用快慢指针方法。让第一个节点先走 k 步，然后第一个节点和第二个节点再同时走, 当第一个节点到达尾结点了，循环结束，第二个节点就到达了第 k 个节点位置

实现代码如下：

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
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
  // 声明两个节点，采用快慢指针方法
  let first = (second = head);
  // 从1开始计数，让第一个节点先走k步
  while (k > 0) {
    first = first.next;
    k--;
  }
  // 然后第一个节点和第二个节点再同时走, 当第一个节点到达尾结点了，循环结束，第二个节点就到达了第k个节点位置
  while (first) {
    first = first.next;
    second = second.next;
  }
  return second;
};

getKthFromEnd([1, 2, 3, 4, 5], 2); // [4,5]
```

### 树

#### 07. 重建二叉树

输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

```txt
例如，给出

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]

返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7

```

实现代码如下：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  // 前序和中序遍历的结果，有一个为空，直接返回
  if (!preorder.length || !inorder.length) return null;
  // 从前序遍历的结果中找出根节点
  const root = preorder[0];
  const node = new TreeNode(root);

  // 这边的index有两个含义：一个是找出根节点在中序遍历结果中的索引；另一个是前序遍历结果的左子树节点个数
  let index = 0;
  for (; index < inorder.length; index++) {
    if (inorder[index] === root) break;
  }

  // 递归构建左右子树
  node.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index));
  node.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1));
  return node;
};
```

#### 27. 二叉树的镜像

请完成一个函数，输入一个二叉树，该函数输出它的镜像。

```txt
例如输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
镜像输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1

```

```txt
示例 1：

输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
```

实现思路：

首先要搞清楚镜像的定义，简单来说就是：**从上到下，依次交换每个节点的左右节点**。

实现代码如下：

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
 * @return {TreeNode}
 */
var mirrorTree = function(root) {
  if (!root) return null;
  // 可以使用ES6的数组结构来交换两个值
  // [root.left, root.right] = [root.right, root.left];
  // 或者通过中间变量来交换两个值
  const temp = root.left;
  (root.left = root.right), (root.right = temp);
  mirrorTree(root.left);
  mirrorTree(root.right);
  return root;
};
```

#### 28. 对称的二叉树

请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

```txt

    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

```txt
    1
   / \
  2   2
   \   \
   3    3
```

```txt
示例 1：

输入：root = [1,2,2,3,4,4,3]
输出：true
示例 2：

输入：root = [1,2,2,null,3,null,3]
输出：false
```

实现思路：

- 如果两个都为空，则是对称的
- 只要左节点或者右节点有一个为空，或者左节点值不等于右节点值 就是不对称
- 最后递归判断子节点是否对称的条件：左的左子节点值=右的右子节点值 && 左的右子节点值=右的左子节点值

实现代码如下：

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
 * @return {boolean}
 */
var isSymmetric = function(root) {
  function isMirror(root1, root2) {
    //    如果两个都为空，则是对称的
    if (root1 == null && root2 == null) return true;
    //    只要左节点或者右节点有一个为空，或者左节点值不等于右节点值 就是不对称
    else if (root1 == null || root2 == null || root1.val !== root2.val) return false;
    //    递归子级继续判断，此时父节点都有值，并且相等，就判断 左的左子节点值=右的右子节点值 && 左的右子节点值=右的左子节点值
    else return Boolean(isMirror(root1.left, root2.right) && isMirror(root1.right, root2.left));
  }
  return isMirror(root, root);
};
```

#### 32-I. 从上到下打印二叉树

从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

例如:
给定二叉树: [3,9,20,null,null,15,7],

```txt
    3
   / \
  9  20
    /  \
   15   7
```

返回：

```js
[3, 9, 20, 15, 7];
```

实现思路:

这个是典型的**先序遍历**(本节点 -> 左子节点 -> 右子节点)，也是 **广度优先**思想
需要使用一个队列来存储有用的节点。

- 将 root 放入队列
- 取出队首元素，将 val 放入返回的数组中
- 检查队首元素的子节点，若不为空，则将子节点放入队列
- 检查队列是否为空，为空，结束并返回数组；不为空，回到第二步

时间复杂度和空间复杂度是 `O(N)`

实现代码如下：

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
 * @return {number[]}
 */
var levelOrder = function(root) {
  if (!root) return [];
  // 利用队列先进先出的特性，来存储遍历到的每个节点，然后依次推入data中
  const data = [],
    queue = [root];
  while (queue.length) {
    // 从队首取出元素(出队)
    const firstNode = queue.shift();
    // 节点取值
    data.push(firstNode.val);
    // 左、右子节点入队
    firstNode.left && queue.push(firstNode.left);
    firstNode.right && queue.push(firstNode.right);
  }
  return data;
};
```

在 Js 中没有专门的**队列**，都使用**数组**来实现。**队列**的常用操作：

- 入队：`array.push(val)`
- 出队：`array.shift()`
- 查看队首元素：`array[0]`
- 检查是否为空：`!array.length`

### 栈 & 队列

#### 09. 用两个栈实现队列

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead  操作返回 -1 )

```txt
示例 1：

输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
示例 2：

输入：
["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
输出：[null,-1,null,null,5,2]

```

实现思路：

可以利用栈的特性：后入先出。根据题目提示，使用 2 个栈即可。一个栈 `inStack` 用来**存储插入队列的数据**，一个栈 `outStack` 用来**从队列中取出数据**。

算法分为**入队**和**出队**过程。

入队过程(`压栈`)：将元素放入 `inStack` 中。

出队过程(`弹栈`)：

- `outStack` 不为空：弹出元素
- `outStack` 为空：将 inStack 元素依次弹出，放入到 `outStack` 中（在数据转移过程中，顺序已经从**后入先出**(栈)变成了**先入先出**(队列)）

  时间复杂度是 `O(N)`，空间复杂度是 `O(N)`。

实现代码如下:

```js
var CQueue = function() {
  // 用来存储入栈元素(先进后出)
  this.inStack = [];
  // 用来存储出栈元素(先进先出)
  this.outStack = [];
};

/**
 * 在队列尾部插入整数(入栈 push)
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
  this.inStack.push(value);
};

/**
 * 在队列头部删除整数(弹栈 pop)
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
  const { inStack = [], outStack = [] } = this;
  // 出栈元素弹栈(先进先出)
  if (outStack.length) return outStack.pop();
  while (inStack.length) {
    // 栈转成队列：先进后出(栈) -> 先进先出(队列)
    outStack.push(inStack.pop());
  }
  // 若队列中没有元素，deleteHead 操作返回 -1
  return outStack.length ? outStack.pop() : -1;
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```

## 具体算法类题目

### 斐波那契数列

#### 10-I. 斐波那契数列

写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：

```txt
F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
```

斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

实现代码如下：

```js
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  // curr = prevOne + prevTwo
  // f(3) = f(2) + f(1) = (f(1) + f(0)) + f(1)
  let prevTwo = 0, // 前两个数 F(N - 2)
    prevOne = 1; // 前一个数 F(N - 1)
  for (let i = 1; i < n; i++) {
    const current = prevTwo;
    // 下一次的第一个数就是从上一次的第二个数开始
    prevTwo = prevOne;
    // 取模
    prevOne = (current + prevOne) % 1000000007;
  }
  return prevOne;
};
```

#### 10- II. 青蛙跳台阶问题

一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级台阶。求该青蛙跳上一个 n  级的台阶总共有多少种跳法。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

```txt
示例 1：

输入：n = 2
输出：2
示例 2：

输入：n = 7
输出：21
```

这个可以找出归类，递推公式类似 `斐波那契数列`

实现代码如下：

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

### 搜索算法

#### 03. 数组中重复的数字

找出数组中重复的数字。

在一个长度为 n 的数组 nums 里的所有数字都在 0 ～ n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

```txt
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

#### 04. 二维数组查找

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

#### 11. 旋转数组的最小数字

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组  [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为 1。

```txt
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

#### 56-1. 数组中数字出现的次数

一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是 O(n)，空间复杂度是 O(1)。

第一种方式

计算元素出现次数，过滤出只出现一次的元素，然后转数组

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

第二种方式

使用 `Map` 来存储只出现一次的元素，然后转数组

实现代码如下：

```js
var singleNumbers2 = function(nums) {
  const map = new Map();
  for (const num of nums) {
    if (map.get(num)) map.delete(num);
    else map.set(num, true);
  }
  console.log('map', map); // Map { 1 => true, 6 => true }
  return [...map.keys()];
};
console.log(singleNumbers2([4, 1, 4, 6])); // [ 1, 6 ]
```

[可以参考题解](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/solution/zhen-xin-kan-bu-dong-na-xie-wei-yun-suan-fu-de-hua/)

### 其他算法

#### 05. 替换空格

请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

```txt
示例 1：

输入：s = "We are happy."
输出："We%20are%20happy."
```

直接使用**正则匹配替换**即可

实现代码如下：

```js
var replaceSpace = function(s) {
  const str = s.replace(/\s/g, '%20');
  return str;
};

const s = 'We are happy.';
console.log(replaceSpace(s)); // We%20are%20happy.
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~

 <comment/>
