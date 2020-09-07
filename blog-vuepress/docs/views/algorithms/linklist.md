# 链表相关算法题

## 剑指 Offer 24. 反转链表

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL

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
    let prev = null,
        cur = head;
    while (cur != null) {
        const next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    // 反转后的头节点就是prev
    return prev;
}
```

## 反转从位置 m 到 n 的链表

说明: `1 ≤ m ≤ n ≤ ` 链表长度。

示例:

输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL

``` js
var reverseBetween = function(head, m, n) {

    // 判空
    if (head == null) return null;

    // 移动两个指针prev, cur到n的位置
    let prev = null,
        cur = head;
    while (m > 1) {
        prev = cur;
        cur = cur.next;
        // 索引矫正
        m--;
        n--;
    }

    // 更新前两个指针
    const con = prev,
        tail = cur;
    // 两个指针位置调整好了，所以现在就相当于已经将0, n-m范围的链表反转了
    let temp = null;
    while (n > 0 && cur != null) {
        temp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = temp;
        n--;
    }

    // 调整最终的链接
    if (con != null) {
        con.next = prev;
    } else {
        // 反转过后,prev就是头节点
        head = prev;
    }
    tail.next = cur;
    return head;

}
```

## 剑指 Offer 18. 删除链表的节点

给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

示例 1:

输入: head = [4, 5, 1, 9], val = 5
输出: [4, 1, 9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.

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

    // 哨兵节点
    const pre = new ListNode(-1);
    pre.next = head;
    let temp = pre;
    while (temp.next != null) {
        // 找出要删除的节点
        if (temp.next.val === val) {
            // 将下个节点的指针指向下下个节点
            temp.next = temp.next.next;
            break;
        }
        // 指针前进
        temp = temp.next;
    }
    return pre.next;
}
```

## 剑指 Offer 06. 从尾到头打印链表

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
示例 1：

输入：head = [1, 3, 2]
输出：[2, 3, 1]

### 方法一：反转链表后压栈

``` js
var reversePrint = function(head) {

    if (head == null) return [];
    // 反转链表
    head = reverseList(head);
    // 存放每个链表节点元素
    const res = [];
    while (head != null) {
        head.val != null && res.push(head.val);
        // 指针前进
        head = head.next;
    }
    return res;

}
// 反转链表
var reverseList = function(head) {

    let prev = null,
        curr = head;
    while (curr != null) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;

}
```

### 方法二： 使用数组的unshift方法, 实现从尾到头反过来返回每个节点的值

``` js
var reversePrint = function(head) {

    if (head == null) return [];
    const res = [];
    while (head != null) {
        // 头部插入
        head.val != null && res.unshift(head.val);
        // 指针前进
        head = head.next;
    }
    return res;

}
```

## 剑指 Offer 25. 合并两个排序的链表 

输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

示例1：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4

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

    // 哨兵节点
    const pre = new ListNode(-1);
    let temp = pre;
    while (l1 != null && l2 != null) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        if (val1 < val2) {
            // l1的节点值比l2小，下个节点的指针指向l1
            temp.next = l1;
            // l1指针前进
            l1 = l1.next;
        } else {
            // 同上
            temp.next = l2;
            l2 = l2.next;
        }
        // temp指针前进到下一步
        temp = temp.next;
    }
    // 循环完毕后，l1或者l2还有剩余的节点，直接 接在下个节点的指针就可以
    temp.next = l1 != null ? l1 : l2;
    return pre.next;

}
```

## 剑指 Offer 22. 链表中倒数第k个节点

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

    if (head == null) return null;
    // 存放链表的每个节点
    const result = [];
    let node = null;
    while (head != null) {
        result.push(head);
        // 指针前进
        head = head.next;
    }
    while (k--) {
        // 倒数第k个节点，就是对应从后往前第k个
        node = result.pop();
    }
    return node;

}
```

## 剑指 Offer 52. 两个链表的第一个公共节点

输入两个链表，找出它们的第一个公共节点。

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

    // 只要有一个空节点，那就是没有公共节点，直接返回空
    if (headA == null || headB == null) return null;
    let temp = headA,
        lengthA = 0,
        lengthB = 0;
    // 1. 计算链表headA的长度
    while (temp != null) {
        lengthA++;
        temp = temp.next;
    }

    temp = headB;
    while (temp != null) {
        lengthB++;
        temp = temp.next;
    }

    // 2. 计算两个链表的长度差，声明快慢两个指针, 当两个指针相遇了(一样)，就是公共节点
    let diff = Math.abs(lengthA - lengthB),
        slow = null,
        fast = null;
    if (lengthA < lengthB) {
        // 链表长度长，说明要走更多的路，就是慢指针，反之就是快指针
        slow = headB;
        fast = headA;
    } else {
        slow = headA;
        fast = headB;
    }

    // 3. 慢指针前进diff步，保证由相遇的可能性
    while (diff--) {
        slow = slow.next;
    }

    // 4. 两个指针再一起前进, 直到相遇
    while (slow !== fast) {
        slow && (slow = slow.next);
        fast && (fast = fast.next);
    }

    // while循环后，说明相遇了，随便一个就是公共节点
    return slow;

}
```

## [剑指 Offer 35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)

请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

``` js
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val; 
 *    this.next = next; 
 *    this.random = random; 
 * }; 
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {

    if (head == null) return null;
    let node = head; // 表示当前节点
    const newHead = new Node(head.val);
    const map = new Map();
    let newNode = newHead;
    // 当前节点到新节点的映射关系
    map.set(node, newNode);

    // 1. 复制next指针
    while (node.next != null) {
        newNode.next = new Node(node.next.val);
        // 当前节点指针前进
        node && (node = node.next);
        // 新节点指针前进
        newNode = newNode.next;
        // 继续存入当前节点到新节点的映射
        map.set(node, newNode);
    }

    // 2. 全部回到头节点
    newNode = newHead;
    node = head;

    // 3. 复制random指针
    while (newNode != null) {
        newNode.random = map.get(node.random);
        // 指着前进
        newNode = newNode.next;
        node && (node = node.next);
    }

    // 返回新的链表
    return newHead;

};
```

// ac地址：https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/
// 原文地址：https://xxoo521.com/2020-02-06-btree-link/

## [剑指 Offer 36. 二叉搜索树与双向链表](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/)

输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。要求不能创建任何新的节点，只能调整树中节点指针的指向。

``` js
/**
 * // Definition for a Node.
 * function Node(val, left, right) {
 *    this.val = val; 
 *    this.left = left; 
 *    this.right = right; 
 * }; 
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function(root) {

    if (root == null) return;
    let head = null,
        pre = head;
    // 中序遍历
    function inorder(node) {
        if (node == null) return;
        // 遍历左子树
        inorder(node.left);
        if (pre != null) pre.right = node; // 指向下个节点
        else head = node; // 说明是头节点(遍历到最左边节点，此时节点就是双向链表的head)
        node.left = pre;
        // 指针前进
        pre = node;
        // 遍历右子树
        inorder(node.right);
    }
    // 中序遍历后, pre指向了最后一个节点
    inorder(root);
    head.left = pre;
    // 最后一个节点的后继指针指向头节点，这样就形成了环链表
    pre.right = head;
    return head;
}
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~