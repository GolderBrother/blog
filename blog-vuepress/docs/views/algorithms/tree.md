# 二叉树相关算法

## 1. 剑指 Offer 07. 重建二叉树

[题目地址](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)

输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字

前序遍历 preorder = [3, 9, 20, 15, 7]
中序遍历 inorder = [9, 3, 15, 20, 7]

返回如下的二叉树：

   

``` 
     3
    / \
   9  20
  /     \
15       7
```

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

    if (!preorder.length || !inorder.length) return null;
    // 前序遍历：根 -> 左 -> 右
    // 中序遍历：左 -> 根 -> 右
    const rootValue = preorder[0];
    const node = new TreeNode(rootValue);

    // index有两个含义，一个是根节点在中序遍历结果中的下标，另一个是当前左子树的节点个数
    let index = 0,
        len = inorder.length;

    for (; index < len; i++) {
        if (inorder[index] === rootValue) {
            break;
        }
    }

    // 获取前序和中序所有的左节点
    node.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index));
    // 获取前序和中序所有的右节点
    node.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1));

    return node;

}
```

## 98. 验证二叉搜索树

给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。

示例 1:

输入:
  

``` 
    2
   / \
  1   3
  ```

输出: true

示例 1:

输入:
   

``` 
    2
   / \
  1   3
```

输出: true

``` js
var isValidBST = function(root) {

    function helper(root, min, max) {
        if (root == null) return true;
        // 在(min, max) 区间的数才是正常的
        if (root.val <= min || root.val >= max) return false;
        // 左子树节点的数范围应该在(min, root.val) 右子树节点的数范围应该在(root.val, max); 
        return helper(root.left, min, root.val) && helper(root.right, root.val, max);
    }
    // 输入的值应该在-Infinity~Infinity之间才算对
    return helper(root, -Infinity, Infinity);

}
```

## 剑指 Offer 28. 对称的二叉树

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

``` js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {

    function helper(root) {
        return root == null ? true : compare(root.left, root.right);
    }

    function compare(leftNode, rightNode) {
        if (leftNode === null && rightNode === null) return true;
        // 只要左右子树中，有一个空的节点，或者左右节点值不一样，那就不是对称的
        if (leftNode === null || rightNode === null || leftNode.val !== rightNode.val) return false;
        // 递归比较子节点
        return compare(leftNode.left, rightNode.right) && compare(leftNode.right, rightNode.left);
    }

    return helper(root);

};
```

## 剑指 Offer 55 - II. 平衡二叉树

输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

``` js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {

    function helper(root) {
        if (root == null) return true;
        // 左子树和右子树的深度不超过1，然后再判断左子树的子树和右子树的子树的深度不超过1
        return Math.abs(depth(root.left) - depth(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right);
    }

    function depth(root) {
        if (root === null) return 0;
        // 判断二叉树的深度在于左子树的深度和右子树深度，两个值的最大值，再+1
        return Math.max(depth(root.left), depth(root.right)) + 1;
    }

    return helper(root);

};
```

## 剑指 Offer 27. 二叉树的镜像

请完成一个函数，输入一个二叉树，该函数输出它的镜像。

例如输入：

``` 
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```

镜像输出：

``` 
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

``` js
// 方法一：递归
function mirrorTree(root) {

    // 1. 递归终结条件
    if (root == null) return root;
    // 2. 处理当前层逻辑
    const temp = root.left;
    // 3. 下探到下一层
    root.left = mirrorTree(root.right);
    root.right = mirrorTree(temp);
    return root;

}

// 方法二：借助栈来迭代
function mirrorTree(root) {

    if (root == null) return null;
    const stack = [root];
    while (stack.length) {
        // 1. 出栈
        const node = stack.pop();
        // 2. 添加子节点： 将 nodenode 左和右子节点入栈；
        if (node.left !== null) stack.push(node.left);
        if (node.right !== null) stack.push(node.right);
        // 3. 交换子元素
        const temp = node.left;
        node.left = node.right;
        node.right = temp;
    }
    return root;

}
```

## 剑指 Offer 55 - I. 二叉树的深度

输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

例如：

给定二叉树 [3, 9, 20, null, null, 15, 7]，

``` 
3
/ \
9  20
 /  \
15   7
```

返回它的最大深度 3 。

### 方法一：暴力递归

``` js
var maxDepth = function(root) {

    if (root == null) return 0;
    // 判断二叉树的深度在于左子树的深度和右子树深度，两个值的最大值，再+1
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;

}
```

### 方法二：层次遍历

``` js
var maxDepth = function(root) {

    if (root == null) return 0;
    let height = 0,
        queue = [root],
        len = 0;
    while (len = queue.length) {
        while (len--) {
            const node = queue.shift();
            node.left !== null && queue.push(node.left);
            node.right !== null && queue.push(node.right);
        }
        height++;
    }
    return height;

}
```

## 236. 二叉树的最近公共祖先

[传送门](https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof)

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉树:  root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]

示例 1:

输入: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
示例 2:

输入: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。

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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {

    // 如果root是null，说明我们在这条寻址线路没有找到，我们返回null表示没找到
    if (root === null) return null;
    // 最近公共祖先节点可以为节点本身
    if (root === p || root === q) return root;
    // 左子树
    const leftSubTree = lowestCommonAncestor(root.left, p, q);
    // 右子树
    const rightSubTree = lowestCommonAncestor(root.right, p, q);
    // 左子树找不到，就返回右子树
    if (leftSubTree === null) return rightSubTree;
    // 右子树找不到，就返回左子树
    if (rightSubTree === null) return leftSubTree;
    return root;

};
```

## 144. 二叉树的前序遍历

[传送门](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

给定一个二叉树，返回它的 前序 遍历。

 示例:

输入: [1, null, 2, 3]  

``` 
   1
    \
     2
    /
   3 
```

输出: [1, 2, 3]

### 方法一：递归法

``` js
var preorderTraversal = function(root) {

    if (root === null) return [];
    const res = [];

    function traverse(root) {
        // 前序遍历: 根 -> 左 -> 右
        if (root) {
            // 先处理根节点
            res.push(root.val);
            // 再递归处理左节点
            traverse(root.left);
            // 然后递归处理右节点
            traverse(root.right);
        }
    }
    traverse(root);
    return res;

}
```

### 方法二: 栈迭代法

``` js
var preorderTraversal = function(root) {

    if (root === null) return [];
    const res = [],
        stack = [root];
    while (stack.length) {
        // 出栈
        const node = stack.pop();
        node != null && res.push(node.val);
        // 栈是先进后出(后进先出)，因此为了保证顺序是左->右，因此应该先右后左
        node.right != null && stack.push(node.right);
        node.left != null && stack.push(node.left);
    }
    return res;

}
```

## 94. 二叉树的中序遍历

[传送门](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

给定一个二叉树，返回它的中序 遍历。

示例:

输入: [1, null, 2, 3]

``` 
   1
    \
     2
    /
   3
```

输出: [1, 3, 2]

### 方法一: 递归法

``` js
var inorderTraversal = function(root) {

    if (root == null) return [];
    const res = [];

    function inorderHelper(root) {
        if (root !== null) {
            // 左 -> 根 -> 右
            root.left !== null && inorderHelper(root.left);
            root.val !== null && res.push(root.val);
            root.right !== null && inorderHelper(root.right);
        }
    }
    inorderHelper(root);
    return res;

}
```

### 方法二：栈迭代法

``` js
var inorderTraversal = function(root) {

    if (root == null) return [];
    const stack = [],
        res = [];
    while (stack.length || root != null) {
        // 遍历左节点
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
        // 左节点遍历完毕，取值，再遍历右节点
        root = stack.pop();
        if (root.val != null) res.push(root.val);
        if (root != null) root = root.right;
    }
    return res;
}
```

## 145. 二叉树的后序遍历

给定一个二叉树，返回它的 后序 遍历。

示例:

输入: [1, null, 2, 3]  

``` 
   1
    \
     2
    /
   3 
```

输出: [3, 2, 1]

### 方法一： 递归法

``` js
var postorderTraversal = function(root) {

    if (root == null) return [];
    const res = [];

    function postorderHelper(root) {
        if (root) {
            // 左 -> 右 -> 中
            if (root.left != null) postorderHelper(root.left);
            if (root.right != null) postorderHelper(root.right);
            if (root.val != null) res.push(root.val);
        }
    }
    postorderHelper(root);
    return res;

}
```

### 方法二：迭代法

``` js
var postorderTraversal = function(root) {

    if (root == null) return [];
    const res = [],
        queue = [];
    while (queue.length || root != null) {
        if (root.val != null) res.unshift(root.val);
        // 左 -> 右 -> 中
        if (root.left != null) queue.push(root.left);
        if (root.right != null) queue.push(root.right);
        // 队列：先进先出
        root = queue.pop();
    }
    return res;

}
```

## 102. 二叉树的层序遍历

给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

``` js
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {

    if (root == null) return [];
    let res = [],
        queue = [root];
    while (queue && queue.length) {
        let cur = [],
            temp = [];
        while (queue && queue.length) {
            // 从左往右压栈(先入后出)
            const node = queue.shift();
            if (node.val != null) cur.push(node.val);
            if (node.left != null) temp.push(node.left);
            if (node.right != null) temp.push(node.right);
        }
        queue = temp;
        res.push(cur);
    }
    return res;

}
```

## 剑指 Offer 32 - I. 从上到下打印二叉树

从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

例如:
给定二叉树: [3, 9, 20, null, null, 15, 7], 

``` 
    3
   / \
  9  20
    /  \
   15   7
```

返回：

 `[3,9,20,15,7]`

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

    if (root == null) return [];
    const res = [],
        queue = [root];
    while (queue.length && root != null) {
        root = queue.shift();
        if (root.val != null) res.push(root.val);
        if (root.left != null) queue.push(root.left);
        if (root.right != null) queue.push(root.right);
    }
    return res;

};
```

## 剑指 Offer 32 - II. 从上到下打印二叉树 II

从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

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
  [9,20],
  [15,7]
]
```

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
var levelOrder = function(root) {

    if (root == null) return [];
    let res = [],
        queue = [root];
    while (queue && queue.length) {
        const curr = [], // 用来保存本轮循环的结果
            temp = []; // 用来缓存本轮循环后queue的结果
        while (queue && queue.length) {
            const node = queue.shift();
            if (node.val != null) curr.push(node.val);
            if (node.left != null) temp.push(node.left);
            if (node.right != null) temp.push(node.right);
        }
        // 更新本轮循环后的queue
        queue = temp;
        // curr(数组)入栈
        res.push(curr);
    }
    return res;

};
```

## 剑指 Offer 32 - III. 从上到下打印二叉树 III

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
var levelOrder = function(root) {

    if (root == null) return [];
    let res = [],
        queue = [root];
    while (queue && queue.length) {
        const curr = [], // 用来存放每一轮循环后的结果
            temp = []; // 用来缓存每一轮循环后的队列
        while (queue && queue.length) {
            const node = queue.shift();
            if (node.val != null) curr.push(node.val);
            if (node.right != null) temp.unshift(node.right);
            if (node.left != null) temp.unshift(node.left);
        }
        console.log(temp);
        queue = temp; // 更新每轮循环后的结果给队列
        res.push(curr); // 每轮循环后的结果入栈
    }
    return res;

};
```

## 剑指 Offer 54. 二叉搜索树的第k大节点

给定一棵二叉搜索树，请找出其中第k大的节点。

示例 1:

``` 
输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 4
示例 2:
```

``` 
输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 4
```

### 方法一：栈遍历

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
 * @param {number} k
 * @return {number}
 */

var kthLargest = function(root, k) {
    if (root == null) return null;
    const res = [],
        queue = [root];
    while (queue && queue.length) {
        const node = queue.pop();
        if (node.val != null) res.push(node.val);
        if (node.left != null) queue.push(node.left);
        if (node.right != null) queue.push(node.right);
    }
    const arr = res.sort((a, b) => a - b);
    return arr[arr.length - k];
};
```

### 方法二：中序遍历

``` js
var kthLargest = function(root, k) {

    if (root == null) return null;
    const res = [];

    function inorder(root) {
        if (root != null) {
            // 左 -> 根 -> 右
            root.left != null && inorder(root.left);
            root.val != null && res.push(root.val);
            root.right != null && inorder(root.right);
        }
    }
    inorder(root);
    // 二叉搜素树中序排列后的结果就是有序的,第K大元素即为倒数res.length - k(索引)项
    return res[res.length - k];

}
```

## 剑指 Offer 33. 二叉搜索树的后序遍历序列

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。

参考以下这颗二叉搜索树：

``` 
     5
    / \
   2   6
  / \
 1   3
```

示例 1：

``` 
输入: [1,6,3,2,5]
输出: false
```

示例 2：

``` 
输入: [1,3,2,6,5]
输出: true
```

``` js
/**
 * @param {number[]} postorder
 * @return {boolean}
 */
// 终止条件： 当 i >= j ，说明此子树节点数量 <= 1 ，无需判别正确性，因此直接返回 true ；
// 递推工作：
// 划分左右子树： 遍历后序遍历的 [i, j][i, j] 区间元素，寻找 第一个大于根节点 的节点，索引记为 mm 。此时，可划分出左子树区间 [i, m-1][i, m−1] 、右子树区间 [m, j - 1][m, j−1] 、根节点索引 jj 。
// 判断是否为二叉搜索树：
// 左子树区间 [i, m - 1][i, m−1] 内的所有节点都应 < postorder[j] 。而第 1. 划分左右子树 步骤已经保证左子树区间的正确性，因此只需要判断右子树区间即可。
// 右子树区间 [m, j-1][m, j−1] 内的所有节点都应 > postorder[j] 。实现方式为遍历，当遇到 <= postorder[j] 的节点则跳出；则可通过 p = j判断是否为二叉搜索树。

function verifyPostorder(postorder) {

    return traverse(postorder, 0, postorder.length - 1);

}

function traverse(postorder, i, j) {

    // 说明此子树节点数量 <= 1 ，无需判别正确性，因此直接返回 true
    if (i >= j) return true;
    // 记录左子树指针
    let leftIdx = i;
    while (postorder[leftIdx] < postorder[j]) leftIdx++;
    // 记录中间节点的指针
    let middleIdx = leftIdx;
    // 找出中间节点指针
    while (postorder[leftIdx] > postorder[j]) leftIdx++;
    return leftIdx === j && traverse(postorder, i, middleIdx - 1) && traverse(postorder, middleIdx, j - 1);

}
```

## 剑指 Offer 34. 二叉树中和为某一值的路径

输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。

示例:
给定如下二叉树，以及目标和 sum = 22，
```
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
```
返回:

```
[
   [5,4,11,2],
   [5,8,4,5]
]
```

``` js
var pathSum = function(root, sum) {

    const res = [];
    if (root == null) return res;

    function helper(node, target, path) {
        // 初始化path
        path.push(node.val);
        // 1. 递归终止条件
        if (node.left == null && node.right == null && target === node.val) {
            res.push(path);
        }
        // 2. 处理当前层逻辑
        if (node.left != null) {
            // 3. 下探到下一层
            // 更新target, path浅拷贝
            helper(node.left, target - node.val, path.slice());
        }
        if (node.right != null) {
            helper(node.right, target - node.val, path.slice());
        }
    }
    helper(root, sum, []);
    return res;
}
```

## 559. N叉树的最大深度

### 1. 深度优先

``` js
// 即递归求出每个子树的最大深度，再加上根节点
var maxDepth = function(root) {
    if (root == null) return 0;
    if (root.children == null) return 1;
    let max = 0;
    for (let i = 0; i < root.children.length; i++) {
        let childDepth = maxDepth(root.children[i]);
        // 对比之前的最大深度和现在的, 取最大值
        max = Math.max(max, childDepth);
    }
    // 最后需要记得加上根节点
    return max + 1;
}
```

### 2. 广度优先

给定一个 N 叉树，找到其最大深度。

最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。

例如，给定一个 3叉树 :

我们应返回其最大深度，3。

``` 
       1
    /  |  \
   3   2   4
  / \
 5   6
```

``` js
// 算出总共有几层即可
var maxDepth = function(root) {
    if (root == null) return 0;
    let queue = [root],
        level = 0,
        length = 0;
    while (length = queue.length) {
        while (length--) {
            // 队列出队
            const node = queue.shift();
            if (node.children) {
                queue = queue.concat(node.children);
            }
        }
        level++;
    }
    return level;
}
```

## 590. N叉树的后序遍历

给定一个 N 叉树，返回其节点值的后序遍历。

例如，给定一个 3叉树 :

``` 
       1
    /  |  \
   3   2   4
  / \
 5   6
```

返回其后序遍历: [5, 6, 3, 2, 4, 1].

	

``` js
/**
 * @param {Node} root
 * @return {number[]}
 */
// 队列迭代法
var postorder = function(root) {
    if (root == null) return [];
    const res = [root.val],
        queue = root.children;
    while (queue.length) {
        // 队列: 先进先出
        const child = queue.pop();
        if (child == null) continue;
        if (child.val != null) res.unshift(child.val);
        // 有儿子节点，那就全部放到队列中
        if (child.children != null) queue.push(...child.children);

    }
    return res;
};
```

## 429. N叉树的层序遍历

给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。

例如，给定一个 3叉树 :

``` 
       1
    /  |  \
   3   2   4
  / \
 5   6
```

返回其层序遍历:

``` 
[
     [1],
     [3,2,4],
     [5,6]
]

```

``` js
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {

    if (root == null) return [];
    let res = [],
        queue = [root];
    while (queue && queue.length) {
        let cur = [],
            temp = [];
        while (queue && queue.length) {
            // 从左往右压栈(先入后出)
            const node = queue.shift();
            if (node.val != null) cur.push(node.val);
            if (node.children != null) temp.push(...node.children);
        }
        queue = temp;
        res.push(cur);
    }
    return res;

}
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~