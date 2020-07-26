# 数组串相关算法

## 剑指 offer 专题

### 剑指 Offer 42. 连续子数组的最大和

输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)。

``` js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一： 优化前缀和
var maxSubArray = function(nums) {
    let max = nums[0],
        min = 0,
        sum = 0;
    for (let i = 0, len = nums.length; i < len; i++) {
        sum += nums[i];
        max = Math.max(sum - min, max);
        min = Math.min(sum, min);
    }
    return max;
}

//  方法二： 动态规划
var maxSubArray = function(nums) {
    let max = nums[0];
    for (let i = 1, length = nums.length; i < length; i++) {
        // 取非负数
        nums[i] += Math.max(0, nums[i - 1]);
        // 更新max
        max = Math.max(nums[i], max);
    }
    return max;
};
```

### 剑指 Offer 40. 最小的k个数

输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

示例 1：

输入：arr = [3, 2, 1], k = 2
输出：[1, 2] 或者 [2, 1]
示例 2：

输入：arr = [0, 1, 2, 1], k = 1
输出：[0]

``` js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
// 方法一：借助数组原生的sort方法排序，然后截取前面k个数字
// var getLeastNumbers = function(arr, k) {
//     return arr.sort((a, b) => a - b).slice(0, k);
// };

// 方法二： 快排
var getLeastNumbers = function(arr, k) {
    function quickSort(arr = []) {
        const len = arr.length;
        if (len < 2) return arr;
        const midIndex = len >> 1;
        // 设置中间值为基准值，用来遍历每个元素作为比较值
        // 注意：基准值需要从数组中去掉
        const midValue = arr.splice(midIndex, 1)[0];
        const left = [],
            right = [];
        for (let i = 0, _len = arr.length; i < _len; i++) {
            const num = arr[i];
            // 小于基准值的元素放左边
            if (num < midValue) {
                left.push(num);
            } else {
                // 大于基准值的元素放右边
                right.push(num);
            }
        }
        return [...getLeastNumbers(left), midValue, ...getLeastNumbers(right)];
    }
    arr = quickSort(arr);
    return arr.slice(0, k);
}
```

### 剑指 Offer 10- I. 斐波那契数列

写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：

F(0) = 0,    F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

示例 1：

输入：n = 2
输出：1
示例 2：

输入：n = 5
输出：5

``` js
/**
 * @param {number} n
 * @return {number}
 */
// 方法一： 暴力递归(可能会超出时间限制)
// var fib = function (n) {
//     if (n <= 1) return n;
//     return (fib(n - 1) + fib(n - 2)) % 1000000007;
// }

// 方法二：循环
// 根据数学定义：f(n) = f(n - 1) + f(n - 2)。最初始情况是f(0) = 0和f(1) = 1。
// 因此直接循环更新即可。时间复杂度 O(N)，空间复杂度 O(1)。
// var fib = function (n) {
//     if (n <= 1) return n;
//     // prevTwo: 第n-2个数，prevOne: 第n-1个数
//     let prevTwo = 0, prevOne = 1;
//     for(let i = 1; i < n; i++) {
//         const curr = prevTwo + prevOne;
//         // 下一次的第一个数就是从上一次的第二个数开始
//         prevTwo = prevOne;
//         // 取模
//         prevOne = curr % 1000000007;
//     }
//     return prevOne;
// }

// 方法三：暴力递归加个缓存
var fib = function(n) {
    const cacheMap = new Map([
        [0, 0],
        [1, 1]
    ]);
    if (n <= 1) return n;

    function fibonacci(n) {
        if (cacheMap.has(n)) return cacheMap.get(n);
        const data = (fibonacci(n - 2) + fibonacci(n - 1)) % 1000000007;
        cacheMap.set(n, data);
        return data;
    }
    return fibonacci(n);
}
```

### 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面 

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。

示例：

输入：nums = [1, 2, 3, 4]
输出：[1, 3, 2, 4] 
注：[3, 1, 2, 4] 也是正确的答案之一。

``` js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 方法一：借助奇数数组和偶数数组
// var exchange = function(nums) {
//     if(nums.length < 2) return nums;
//     // 左数组用来存放，右数组用来存放偶数
//     const left = [], right = [];
//     for(let i = 0, len = nums.length; i < len; i++) {
//         const num = nums[i];
//         // 按位与：奇数返回1，偶数返回0
//         if(num & 1 === 1) left.push(num); // 奇数
//         else right.push(num); // 偶数
//     }
//     return [...left, ...right];
// };

// 方法二：双指针法，确保奇数在偶数前面
var exchange = function(nums) {
    const length = nums.length;
    if (length === 0) return [];

    let i = 0,
        j = length - 1;
    while (i < j) {
        // 确保是奇数,直到找到是偶数的就停止循环
        while (i < length && nums[i] % 2 === 1) i++;
        // 确保是偶数,直到找到是奇数的就停止循环
        while (j >= 0 && nums[j] % 2 === 0) j--;

        // 找到了就交换元素位置
        if (i < j) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            // 交换完毕,指针前进,继续循环
            i++;
            j--;
        }
    }

    return nums;
}
```

### 剑指 Offer 04. 二维数组中的查找

在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

``` js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    if (matrix.length === 0) return false;
    let flag = false;
    for (let i = 0, len = matrix.length; i < len; i++) {
        // 每一行的最后一个数(也是每一行中最大的)都比target小,那这一行就不用比较了,直接跳到下一行
        if (matrix[i][matrix[i].length - 1] < target) continue;
        for (let j = 0, _len = matrix[i].length; j < _len; j++) {
            if (matrix[i][j] === target) {
                flag = true;
                break;
            }
        }
    }
    return flag;
};
```

### 剑指 Offer 66. 构建乘积数组

给定一个数组 A[0,1,…,n-1]，请构建一个数组 B[0,1,…,n-1]，其中 B 中的元素 B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]。不能使用除法。

示例:

输入: [1,2,3,4,5]
输出: [120,60,40,30,24]

``` js
/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function(a) {
    const length = a.length;
    if (length === 0) return [];
    const result = [];
    const left = new Array(length).fill(1),
        right = new Array(length).fill(1);
    // 构建左边乘积结果数组
    for (let i = 1; i < a.length; i++) {
        left[i] = a[i - 1] * left[i - 1];
    }
    // 构建右边乘积结果数组
    for (let j = length - 2; j >= 0; j--) {
        right[j] = a[j + 1] * right[j + 1];
    }
    console.log(left);
    console.log(right);
    for (let k = 0; k < length; k++) {
        result[k] = left[k] * right[k];
    }
    return result;
};
```

### 把字符串转换成整数  

TODO

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~