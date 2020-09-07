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

// 实际上可以理解为寻找数组中的最小值
var minArray = function(numbers) {
  return Math.min(...numbers);
};

console.log(minArray([2, 2, 2, 0, 1])); // 0

// 查找数组中重复的数字，使用map记录当前项为true，下次遇到同样的key(重复项)，就是要查找的重复项
var findRepeatNumber = function(nums) {
  const map = new Map();
  for (const n of nums) {
    if (map.get(n)) return n;
    map.set(n, true);
  }
};

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3])); // 2

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
  const arr = [];
  const countArr = nums.reduce((accu, cur) => {
    accu[cur] ? accu[cur]++ : accu[cur] = 1;
    return accu;
  }, {});
  console.log(countArr); // { '1': 1, '4': 2, '6': 1 }
  for (const [key, value] of Object.entries(countArr)) {
    if (value === 1) arr.push(Number(key))
  }
  return arr;
};

console.log(singleNumbers([4, 1, 4, 6])); // [ 1, 6 ]

var singleNumbers2 = function(nums) {
  const map = new Map();
  for (const num of nums) {
    if (map.get(num)) map.delete(num);
    else map.set(num, true);
  }
  console.log('map', map);
  return [...map.keys()];
}
console.log(singleNumbers2([4, 1, 4, 6])); // [ 1, 6 ]

var replaceSpace = function(s) {
  const str = s.replace(/\s/g, "%20");
  return str;
};

const s = "We are happy.";
console.log(replaceSpace(s)); // We%20are%20happy.

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
  while (curr) {
    const cNext = curr.next; // 记录下一个指针
    curr.next = prev === null ? null : prev;
    prev = curr; // 上一个指针往前移
    curr = cNext; // 当前指针往前移
  }
  return prev;
};

console.log(reverseList([1, 2, 3, 4, 5]));