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

### 3.两个链表的第一个公共节点

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
