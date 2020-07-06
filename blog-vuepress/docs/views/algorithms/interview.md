# 面试必刷-《剑指 offer》刷题小结

《剑指 offer》剖析了 80 个典型的编程面试题，系统整理基础知识、代码质量、解题思路、优化效率和综合能力这 5 个面试要点。但是我刷题只有牛客网上的 66 题。

如果是单纯的面试需求，剑指 offer 的优先级肯定是在 Leetcode 之前，总的说它有三个优点：

* 1. 很可能在面试中出现原题
* 2. 约 66 题，题量少，但是涵盖的内容较全
* 3. 能培养一个良好的刷题习惯

它的缺点是：

* 1. 只有 66 题，刷着容易过拟合
* 2. 动态规划的题比较少，因此需要在 Leetcode 上专项训练。

算法题主要分成**数据结构**和**具体算法**部分，简单归类如下。基本每道题都很精彩，所以这里就不一一洗写了，题解可以看看我的代码仓库或者讨论区的内容。

## 数据结构类题目

### 链表

#### 06. 从尾到头打印链表

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

``` 
示例 1：

输入：head = [1,3,2]
输出：[2,3,1]
```

第一种方式： `reverse()` 输出

实现代码如下:

``` js
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

``` js
var reversePrint = function(head) {
    if (head == null || head.next == null) return head;
    const next = reversePrint(head.next);
    head.next.next = head; // 指针反转
    head.next = null;
    return next; // 返回反转后的扁头
};
```

#### 18. 删除链表的节点

给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

``` 
示例 1:

输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
示例 2:

输入: head = [4,5,1,9], val = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.

```

实现思路：

在链表问题中，通常借助**哨兵节点**，来简化代码。**哨兵节点**的用法灵活，一般是不保存任何数据的节点。

实现代码如下：

``` js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function(head, val) {
    // 创建个哨兵节点，不存储任何值
    let pre = new ListNode(-1);
    // 哨兵节点的下个节点指向头节点，为了最后返回头节点
    pre.next = head;
    let node = pre;
    while (node.next) {
        if (node.next.val === val) {
            // 直接将指向下个节点的指针移到下下个节点
            node.next = node.next.next;
            break;
        }
        // 否则，递归到下个节点
        node = node.next;
    }
    // 最终返回头节点，不能使用node变量，因为node变量一直在变化
    return pre.next;
};
```

#### 22. 链表中倒数第 k 个节点

输入一个链表，输出该链表中倒数第 k 个节点。为了符合大多数人的习惯，本题从 1 开始计数，即链表的尾节点是倒数第 1 个节点。例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。

``` 
示例：

给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.
```

实现思路：

声明两个节点，采用快慢指针方法。让第一个节点先走 k 步，然后第一个节点和第二个节点再同时走, 当第一个节点到达尾结点了，循环结束，第二个节点就到达了第 k 个节点位置

实现代码如下：

``` js
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

#### 24. 反转链表

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

``` 
示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

实现思路：

从头节点开始遍历链表，依次将每个节点指向下一个节点的指针改为指向上一个节点的指针，直到尾结点为止，这时候尾结点即新的头结点，直接返回

实现代码：

``` js
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

#### 25. 合并两个排序的链表

输入两个**递增排序**的链表，合并这两个链表并使新链表中的节点仍然是**递增排序**的。

``` 
示例1：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

##### 第一种方法

实现思路：

依旧使用熟悉的**哨兵节点**，比对两个节点的值，较小的一方就放到哨兵节点的 `next` 上, 类似于**归并排序**中的合并过程。

实现代码如下：

``` js
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
var mergeTwoLists = function(l1, l2) {
    // 创建一个哨兵节点
    let current = new ListNode(-1);
    // 用来记录哨兵节点， next即为头节点
    const pre = current;

    // 递归l1和l2, 设置当前节点current的next节点
    while (l1 || l2) {
        if (!l1) {
            // l1为空值，就将下个节点指向l2
            current.next = l2;
            // 然后直接返回头节点
            return pre.next;
        } else if (!l2) {
            // l2为空值，就将下个节点指向l1
            current.next = l1;
            // 然后直接返回头节点
            return pre.next;
        }
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        // 当前指针往前移动
        current = current.next;
    }
    // 返回头节点
    return pre.next;
};
```

复杂度分析

* 时间复杂度： `O(N)` ，其中 `N` 为两个链表节点总数
* 空间复杂度：加上栈空间的话，空间复杂度为 `O(N)` ，其中 `N` 为两个链表节点总数

##### 第二种方法

实现思路：

使用**递归**

实现代码如下：

``` js
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
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    if (l1.val <= l2.val) {
        // 递归下个节点l1.next
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        // 递归下个节点l2.next
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};
```

复杂度分析

* 时间复杂度为 `O(N)` ，其中 `N` 为两个链表节点总数
* 空间复杂度为 O(1), 占用的内存空间为**常数级**

#### 52. 两个链表的第一个公共节点

输入两个链表，找出它们的第一个公共节点。

如下面的两个链表：

![link1](./interview/link1.png)

在节点 c1 开始相交。

![link2](./interview/link2.png)

##### 第一种方式

实现思路：

* 开辟哈希表 `map` 。 `key` 是节点， `value` 是 `boolean` ，代表节点是否出现过
* 对 `list1` 进行遍历，设置 `map[节点]=true`
* 对 `list2` 进行遍历，如果节点在 `map` 中出现过，那么说明这是两个链表的公共节点，返回

实现代码如下：

``` js
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
    // 使用哈希表Map来存储headA的值 map<节点, 是否出现过>
    const mapA = new Map();
    let node = headA;
    while (node) {
        mapA.set(node, true);
        node = node.next;
    }

    node = headB;
    //  公共节点
    let globalNode = null;
    // 遍历node，看是否在mapA中出现过，是就直接返回该节点，否则继续往后寻找
    while (node) {
        if (mapA.has(node)) {
            globalNode = node;
            break;
        }
        node = node.next;
    }

    return globalNode;
};
```

复杂度分析

* 时间复杂度是 `O(N)` ，两个 `N层` 循环
* 空间复杂度是 `O(N)` , 因为用到了 `Map` 结构来存储

##### 第二种方式

实现思路：

题目提示了，空间复杂度可以降低到 O(1)O(1)。这时候不能用哈希表，可以使用快慢指针的思路来处理。整体思路如下：

* 遍历得到两个链表的长度，以及长度差 `diff`
* 将慢指针 `slow` 指向较长链表，快指针 `fast` 指向较短链表
* `slow` 向前移动 `diff` 个距离(使得 A、B 到公共节点的距离一样)
* `slow` 和 `fast` **同时向前移动，每次移动一个距离(说明速度一样)**。若存在**公共节点**( `老地方偶遇` )，那么它们一定会遇上

实现代码如下：

``` js
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

### 树

#### 07. 重建二叉树

输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

``` 
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

``` js
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

``` 
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

``` 
示例 1：

输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
```

实现思路：

首先要搞清楚镜像的定义，简单来说就是：**从上到下，依次交换每个节点的左右节点**。

实现代码如下：

``` js
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

例如，二叉树 [1, 2, 2, 3, 4, 4, 3] 是对称的。

``` 
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个 [1, 2, 2, null, 3, null, 3] 则不是镜像对称的:

``` 
    1
   / \
  2   2
   \   \
   3    3
```

``` 
示例 1：

输入：root = [1,2,2,3,4,4,3]
输出：true
示例 2：

输入：root = [1,2,2,null,3,null,3]
输出：false
```

实现思路：

* 如果两个都为空，则是对称的
* 只要左节点或者右节点有一个为空，或者左节点值不等于右节点值 就是不对称
* 最后递归判断子节点是否对称的条件：左的左子节点值=右的右子节点值 && 左的右子节点值=右的左子节点值

实现代码如下：

``` js
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
给定二叉树: [3, 9, 20, null, null, 15, 7], 

``` 
    3
   / \
  9  20
    /  \
   15   7
```

返回：

``` js
[3, 9, 20, 15, 7];
```

实现思路:

这个是典型的**先序遍历**(本节点 -> 左子节点 -> 右子节点)，也是 **广度优先**思想
需要使用一个队列来存储有用的节点。

* 将 root 放入队列
* 取出队首元素，将 val 放入返回的数组中
* 检查队首元素的子节点，若不为空，则将子节点放入队列
* 检查队列是否为空，为空，结束并返回数组；不为空，回到第二步

时间复杂度和空间复杂度是 `O(N)`
实现代码如下：

``` js
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

* 入队： `array.push(val)`
* 出队： `array.shift()`
* 查看队首元素： `array[0]`
* 检查是否为空： `!array.length`

#### 32-I. 从上到下打印二叉树 II

从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

例如:
给定二叉树: [3, 9, 20, null, null, 15, 7]

``` 
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

``` 
[
  [3],
  [9,20],
  [15,7]
]
```

实现思路：

从题目中可以看到，本题考察的是二叉树的层序遍历，并且在结果中要体现出“层次”。

稍微改变一下对队列的使用，就可以在遍历过程中体现出层次，大致过程如下：

* 初始化 queue，用于存储当前层的节点
* 检查 queue 是否为空
  + 如果不为空：依次遍历当前 queue 内的所有节点，检查每个节点的左右子节点，将不为空的子节点放入 queue，继续循环
  + 如果为空：跳出循环

实现代码如下：

``` js
const levelOrder = function(root) {
    if (!root) return [];
    // 将根元素先放进去
    const queue = [root];
    // 存放遍历结果
    const res = [];
    // 代表当前遍历层数
    let level = 0;
    while (queue.length) {
        // 用来存放第level层的遍历结果
        res[level] = [];
        // 第level层的遍历数量
        let levelNum = queue.length;
        while (levelNum--) {
            const front = queue.shift();
            // 将值依次推入对应的层级数组里
            res[level].push(front.val);
            // 然后获取左右子节点
            if (front.left) queue.push(front.left);
            if (front.right) queue.push(front.right);
        }
        // 继续到下一个层级
        level++;
    }
    return res;
};
```

#### 32 - III. 从上到下打印二叉树 III

请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

例如:
给定二叉树: [3, 9, 20, null, null, 15, 7], 

``` 
 3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

``` 
[
  [3],
  [20,9],
  [15,7]
]
```

实现思路：

奇数行的入队( `unshift` )，偶数行的入栈( `push` )

实现代码如下

``` js
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
const levelOrder = function(root) {
    if (!root) return [];
    // 将根元素先放进去
    const queue = [root];
    // 存放遍历结果
    const res = [];
    // 代表当前遍历层数
    let level = 0;
    while (queue.length) {
        // 用来存放第level层的遍历结果
        res[level] = [];
        // 第level层的遍历数量
        let levelNum = queue.length;
        while (levelNum--) {
            const front = queue.shift();
            // 将值依次推入对应的层级数组里
            // 然后获取左右子节点
            if (level & (1 === 1)) {
                // 奇数行;
                res[level].unshift(front.val);
            } else {
                // 偶数行
                res[level].push(front.val);
            }
            front.left && queue.push(front.left);
            front.right && queue.push(front.right);
        }
        // 继续到下一个层级
        level++;
    }
    return res;
};
```

第二种方法：

奇数行的直接将当前行结果反转 `reverse()` 即可

实现代码如下：

``` js
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
const levelOrder = function(root) {
    if (!root) return [];
    // 将根元素先放进去
    const queue = [root];
    // 存放遍历结果
    const res = [];
    // 代表当前遍历层数
    let level = 0;
    while (queue.length) {
        // 用来存放第level层的遍历结果
        res[level] = [];
        // 第level层的遍历数量
        let levelNum = queue.length;
        while (levelNum--) {
            const front = queue.shift();
            // 将值依次推入对应的层级数组里
            res[level].push(front.val);
            // 然后获取左右子节点
            front.left && queue.push(front.left);
            front.right && queue.push(front.right);
        }
        if (level & (1 === 1)) {
            // 奇数行;
            res[level].reverse();
        }
        // 继续到下一个层级
        level++;
    }
    return res;
};
```

#### 二叉树的前、中、后序遍历

先来看张图

![traversal](./interview/traversal.jpg)

各种遍历实现方式

##### 1. 二叉树的前序遍历

遍历顺序是： `左 -> 中 -> 右`
方法一：简单粗暴的递归方法

``` js
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
var preorderTraversal = function(root) {
    return root ? [root.val, ...preorderTraversal(root.left), ...preorderTraversal(root.right)] : [];
};
```

方法二：老老实实用迭代法

``` js
/**
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let res = [],
        arr = [];
    root && arr.push(root);
    while (arr && arr.length) {
        const current = arr.pop();
        res.push(current.val);
        // 栈结构是先进后出,因此先将右节点压栈、再将左节点压栈(右 -> 左)，最后弹栈的顺序是左->右
        current.right !== null && arr.push(current.right);
        current.left !== null && arr.push(current.left);
    }
    return res;
};
```

##### 2. 二叉树的中序遍历

遍历顺序是： `中 -> 左 -> 右`
方法一：递归大法好

``` js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = root => {
    const res = [];
    const pushValue = node => {
        if (node != null) {
            node.left && pushValue(node.left);
            res.push(node.val);
            node.right && pushValue(node.right);
        }
    };
    pushValue(root);
    return res;
};
```

方法二：老老实实用迭代法一

``` js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = root => {
    let res = [];
    if (root == null) return res;
    const stack = [];
    let curr = root;
    while (curr != null || stack.length > 0) {
        if (curr) {
            stack.push(curr);
            curr = curr.left;
        } else {
            const node = stack.pop();
            res.push(node.val);
            curr = curr.right;
        }
    }
    return res;
};
```

方法二：老老实实用迭代法二

``` js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 如果 left 节点存在, 就入栈, 然后跳 left
// 如果 left 和 right 都不存在, 则保存当前节点, 然后出栈, 并让 left 等于 null
// 如果 right 节点存在, 并且 left 为 null, 则保存当前节点, 然后跳 right
const inorderTraversal = root => {
    // 用来保存节点
    let res = [],
        // 存放根节点
        stack = [];
    while (root || stack.length) {
        if (root.left) {
            // 如果 left 节点存在, 就入栈
            stack.push(root);
            // 跳到 left
            root = root.left;
        } else if (!root.left && !root.right) {
            // 如果 left 和 right 都不存在, 则保存当前节点
            res.push(root.val);
            // 出栈
            root = stack.pop();
            // 让 left 等于 null
            root && (root.left = null);
        } else if (root.right) {
            // 如果 right 节点存在, 并且 left 为 null, 则保存当前节点
            res.push(root.val);
            // 跳 right
            root = root.right;
        }
    }
    return res;
};
```

##### 3. 二叉树的后序遍历

遍历顺序是： `左 -> 右 -> 中`
方法一：递归大法好

``` js
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
var postorderTraversal = function(root) {
    let res = [];
    const pushNode = node => {
        if (node != null) {
            // 利用栈的特点：先进后出
            node.left != null && pushNode(node.left);
            node.right != null && pushNode(node.right);
            // 一个个压栈
            res.push(node.val);
        }
    };
    pushNode(root);
    return res;
};
```

方法二：使用迭代

``` js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    let res = [],
        stack = [];
    while (root || stack.length) {
        // 每次都把值插入到最前面
        res.unshift(root.val);
        // 先入左节点，再入右节点(利用栈的特点：先进后出)
        if (root.left) stack.push(root.left);
        if (root.right) stack.push(root.right);
        root = stack.pop();
    }
    return res;
};
```

### 栈( `Stack` ) & 队列( `Queue` )

#### 09. 用两个栈实现队列

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead  操作返回 -1 )

``` 
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

入队过程( `压栈` )：将元素放入 `inStack` 中。

出队过程( `弹栈` )：

* `outStack` 不为空：弹出元素
* `outStack` 为空：将 inStack 元素依次弹出，放入到 `outStack` 中（在数据转移过程中，顺序已经从**后入先出**(栈)变成了**先入先出**(队列)）

  时间复杂度是 `O(N)` ，空间复杂度是 `O(N)` 。

实现代码如下:

``` js
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
    const {
        inStack = [], outStack = []
    } = this;
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

### 堆(Heap)

#### 40. 最小的 k 个数

输入整数数组 arr ，找出其中最小的 k 个数。例如，输入 4、5、1、6、2、7、3、8 这 8 个数字，则最小的 4 个数字是 1、2、3、4。

``` 
示例 1：

输入：arr = [3,2,1], k = 2
输出：[1,2] 或者 [2,1]
示例 2：

输入：arr = [0,1,2,1], k = 1
输出：[0]

```

##### 第一种方法

这个是最简单、最直观的做法：直接排序。

实现思路：

直接将数组通过 `sort` 方法 按照**从小到大**的顺序排序，并且返回前 `k` 个数字。

实现代码如下：

``` js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
const getLeastNumbers = function(arr, k) {
    return arr.sort((a, b) => a - b).slice(0, k);
};
```

##### 第二种方法

实现思路：

其实并需要对全部元素进行排序，题目只需要前 k 个元素。

回顾快速排序中的 partition 操作，可以将元素 arr[0]放入排序后的正确位置，并且返回这个位置 index。利用 partition 的特点，算法流程如下：

* 如果 `index = k` ，说明第 k 个元素已经放入正确位置，返回前 k 个元素
* 如果 `k < index` ，前 k 个元素在 `[left, index - 1]` 之间，缩小查找范围，继续查找
* 如果 `index < k` ，前 k 个元素在 `[index + 1, right]` 之间，缩小查找范围，继续查找

为了方便理解，可以使用 `2, 8, 1, 1, 0, 11, -1, 0` 这个例子在纸上画一下过程。

实现代码如下：

``` js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
// var getLeastNumbers = function(arr, k) {
//     return arr.sort((a, b) => a - b).slice(0, k);
// };
// 交换元素位置
// 这边要注意，函数中的参数如果基本类型，则是值的拷贝，如果是引用类型，则拷贝地址，因此这边要传入数组才能真正的改变元素值
function swap(arr, a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
}
// 快速排序
function partiton(arr, start, end) {
    const k = arr[start];
    let left = start + 1,
        right = end;
    while (1) {
        while (left <= end && arr[left] <= k) ++left;
        while (right >= start + 1 && arr[right] >= k) --right;
        if (left >= right) break;
        //  [arr[left], arr[right]] = [arr[right], arr[left]];
        swap(arr, left, right);
        ++left;
        --right;
    }
    //   [arr[right], arr[start]] = [arr[start], arr[right]];
    swap(arr, right, start);
    return right;
}
var getLeastNumbers = function(arr, k) {
    const length = arr.length;
    if (k >= length) return arr;
    let left = 0,
        right = length - 1;
    let index = partiton(arr, left, right);
    while (index !== k) {
        if (index < k) {
            left = index + 1; // 往右移
            index = partiton(arr, left, right);
        } else if (index > k) {
            right = index - 1; // 往左移
            index = partiton(arr, left, right);
        }
    }
    // 从小到大排序完毕，截取前面k个数即为最小的k个数
    return arr.slice(0, k);
};
```

## 具体算法类题目

### 斐波那契数列

#### 10-I. 斐波那契数列

写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：

``` 
F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
```

斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

实现代码如下：

``` js
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

``` 
示例 1：

输入：n = 2
输出：2
示例 2：

输入：n = 7
输出：21
```

这个可以找出归类，递推公式类似 `斐波那契数列`
实现代码如下：

``` js
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

``` 
示例 1：

输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3
```

实现代码如下：

``` js
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

给定 `target = 5` ，返回 `true` 。

给定 `target = 20` ，返回 `false` 。

限制：

 `0 <= n <= 1000`
 `0 <= m <= 1000`
实现代码如下：

``` js
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

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组  [3, 4, 5, 1, 2] 为 [1, 2, 3, 4, 5] 的一个旋转，该数组的最小值为 1。

``` 
示例 1：

输入：[3,4,5,1,2]
输出：1

示例 2：

输入：[2,2,2,0,1]
输出：0
```

实现代码如下：

``` js
// 实际上可以理解为寻找数组中的最小值
var minArray = function(numbers) {
    return Math.min(...numbers);
};

console.log(minArray([2, 2, 2, 0, 1])); // 0
```

#### 53-I. [在排序数组中查找数字 I](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)

统计一个数字在排序数组中出现的次数。

示例 1:

``` 
输入: nums = [5,7,7,8,8,10], target = 8
输出: 2
```

示例  2:

``` 
输入: nums = [5,7,7,8,8,10], target = 6
输出: 0
```

##### 方法一 使用 hash 结构来存储元素出现次数

``` js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    const map = new Map();
    for (const n of nums) {
        let hasNum = map.get(n);
        hasNum ? map.set(n, ++hasNum) : map.set(n, 1);
    }
    return map.get(target) || 0;
};
```

##### 方法二 二分查找 思路清晰

解题思路

* 1. 二分查找到等于当前值的索引，把索引赋值给 left，或者直到左指针大于等于右指针停下
* 2. 判断 nums[left] 是否等于 target，不等，返回 0
* 3. 从 left 指针的位置往两边找，看看这个数重复几次，返回

实现代码如下

``` js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/*
  二分查找
*/
var search = function(nums, target) {
    let count = 0,
        n = nums.length,
        left = 0,
        right = n - 1;

    while (left < right) {
        let mid = (left + right) >> 1;
        if (nums[mid] === target) {
            left = mid;
            break;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if (nums[left] !== target) return 0;

    // 找到起始位置, 从当前位置往两边找，看看重复几次
    let copy = left - 1;
    while (copy >= 0 && nums[copy] === target) {
        copy--;
        count++;
    }

    while (nums[left] === target && left < n) {
        left++;
        count++;
    }

    return count;
};
```

#### 56-1. 数组中数字出现的次数

一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是 O(n)，空间复杂度是 O(1)。

第一种方式

计算元素出现次数，过滤出只出现一次的元素，然后转数组

实现代码如下：

``` js
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

``` js
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

### 全排列

#### 38. 字符串的排列

输入一个字符串，打印出该字符串中字符的所有排列。
你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

示例:

``` 
输入：s = "abc"
输出：["abc","acb","bac","bca","cab","cba"]
```

实现思路：

* 排列方案数量： 对于一个长度为 n 的字符串（假设字符互不重复），其排列共有 n x (n-1) x (n-2) … x 2 x 1n×(n−1)×(n−2)…×2×1 种方案。
* 排列方案的生成方法： 根据字符串排列的特点，考虑深度优先搜索所有排列方案。即通过字符交换，先固定第 11 位字符（ n 种情况）、再固定第 22 位字符（ n-1 种情况）、... 、最后固定第 n 位字符（ 1 种情况）。

实现代码如下：

``` js
/**
 * @param {string} s
 * @return {string[]}
 */
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
        for (let j = i; j < s.length; j++) {
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
```

### 其他算法

#### 05. 替换空格

请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

``` 
示例 1：

输入：s = "We are happy."
输出："We%20are%20happy."
```

直接使用**正则匹配替换**即可

实现代码如下：

``` js
var replaceSpace = function(s) {
    const str = s.replace(/\s/g, '%20');
    return str;
};

const s = 'We are happy.';
console.log(replaceSpace(s)); // We%20are%20happy.
```

#### 15. 二进制中 1 的个数

请实现一个函数，输入一个整数，输出该数二进制表示中 1 的个数。例如，把 9  表示成二进制是 1001，有 2 位是 1。因此，如果输入 9，则该函数输出 2。

实现思路：

使用位运算

实现代码如下：

``` 
示例 1：

输入：00000000000000000000000000001011
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。

```

``` js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let count = 0;
    while (n) {
        n = n & (n - 1);
        count++;
    }
    return count;
};
```

### 50. 第一个只出现一次的字符

在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

示例:

``` 
s = "abaccdeff"
返回 "b"

s = ""
返回 " "
```

实现思路:

* 使用 map 结构来记录元素出现的次数
* 查找第一次出现一次的 key, 找到了直接返回
* 否则返回单个空格的字符串

实现代码如下：

``` js
/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function(s) {
    if (!s) return ' ';
    const arr = s.split('');
    // 使用map结构来记录元素出现的次数
    const map = new Map();
    for (const n of arr) {
        const count = map.has(n) ? map.get(n) + 1 : 1;
        map.set(n, count);
    }
    for (const key of map.keys()) {
        // 查找第一次出现一次的key,找到了直接返回
        if (map.get(key) === 1) return key;
    }
    // 否则返回单个空格的字符串
    return ' ';
};
```

### 42. 连续子数组的最大和

输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为 O(n)。

示例 1:

``` 
输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

实现思路

[参考力扣第 22 题](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)

实现代码如下

``` js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let max = nums[0];
    for (let i = 0, len = nums.length; i < len - 1; i++) {
        // 排除相加到负数的干扰
        nums[i + 1] += Math.max(nums[i], 0);
        max = Math.max(max, nums[i + 1]);
    }
    return max;
};
```

### 11. 盛最多水的容器

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i,  ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i,  ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

![question_11](./interview/question_11.jpg)

示例：

``` 
输入：[1,8,6,2,5,4,8,3,7]
输出：49
```

思路

双指针+木桶效应

代码

``` js
/**
 * @param {number[]} height
 * @return {number}
 */
// 双指针+木桶效应
// 时间复杂度: O(n) 
// 空间复杂度: O(1)
var maxArea = function(height) {
    // 使用双指针
    let i = 0,
        j = height.length - 1,
        res = 0;
    while (i + 1 <= j) {
        // 借鉴木桶效应,一个木桶能装多少水,取决于最短的木板
        // 因此遇到短板，就往中间继续找
        // 计算能装多少水 长方形面积 = 长 x 宽(高) 
        // 然后跟之前的记录值求最大值
        res = height[i] < height[j] ? Math.max(res, (j - i) * height[i++]) : Math.max(res, (j - i) * height[j--]);
    }
    return res;
};
```

### 26. 删除排序数组中的重复项

给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

示例 1:

``` 
给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

```

示例 2:

``` 
给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
```

你不需要考虑数组中超出新长度后面的元素。

#### 方法一

思路

map结构来记录唯一值, 过滤重复项

代码

``` js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一,map结构来记录唯一值,过滤重复项
// 时间复杂度: O(n)
// 空间复杂度: O(1)
var removeDuplicates = function(nums) {
    if (!nums || !nums.length) return 0;
    const map = new Map();
    for (let i = 0, len = nums.length; i < len; i++) {
        if (map.has(nums[i])) {
            nums.splice(i, 1);
            i--;
            len--;
            continue;
        }
        map.set(nums[i], nums[i]);
    }
    return nums.length;
};
```

#### 方法二

思路

快慢双指针

代码

``` js
// 方法二: 快慢双指针
// 时间复杂度: O(n)
// 空间复杂度: O(1)
var removeDuplicates = function(nums) {
    if (!nums || !nums.length) return 0;
    let i = 0;
    for (let j = 1; j < nums.length; j++) {
        // 如果与当前项不相同,则慢指针前进,同时将当前快指针的值放到慢指针位置
        if (nums[i] !== nums[j]) {
            i++;
            nums[i] = nums[j];
        }
    }
    // 长度值需要索引+1
    return i + 1;
}
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~
