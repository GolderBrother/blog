const kthLargest = function(root, k) {
  let arr = [];
  // 中序遍历二叉搜索树是有序的
  function dfs(root) {
    if (!root) return null;
    // 遍历顺序: 左 -> 中 -> 右
    dfs(root.left);
    arr.push(root.val);
    dfs(root.right);
  }
  dfs(root);
  // 返回第k大节点
  return arr[arr.length - k];
};
const root = {
  left: {
    left: null,
    right: 2,
    val: 1
  },
  right: {
    left: null,
    right: null,
    val: 4
  },
  val: 3
}, k = 1;
console.log(kthLargest(root, k));