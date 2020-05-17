// 斐波那契数列及其优化

// 函数执行耗时分析
const speed = (fn, num) => {
  console.time(`${fn.name} time`);
  const value = fn(num);
  console.timeEnd(`${fn.name} time`);
  console.log(`返回值：${value}`);
}

/**
 * 斐波那契数列
 * @param {number} n -第几个位置
 */
let fibonacci1 = (n) => {
  if (n < 1) throw new Error('参数有误');
  if (n === 1 || n === 2) return 1;
  return fibonacci1(n - 1) + fibonacci1(n - 2);
}

speed(fibonacci1, 35);
// fibonacci1 time: 65.419ms
// 返回值：9227465

// 函数记忆
const memory = function(fn) {
  const obj = {};
  return function(n) {
    if (obj[n] === undefined) obj[n] = fn(n);
    return obj[n];
  }
}

fibonacci1 = memory(fibonacci1);
speed(fibonacci1, 35);
// time: 0.109ms
// 返回值：9227465

/**
 * @description 斐波那契动态规划版本（最优解）
 **/
function fibonacci_DP(n) {
  let res = 1;
  if (n === 1 || n === 2) return res;
  n -= 2;
  let cur = 1,
    pre = 1;
  while (n--) {
    res = pre + cur;
    pre = cur; // 更新pre，往前移动
    cur = res; // 更新cur，往前移动
  }
  return res;
}

speed(fibonacci_DP, 35)
// fibonacci_DP time: 0.033ms
// 返回值：9227465