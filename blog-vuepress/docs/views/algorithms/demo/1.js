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