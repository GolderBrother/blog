# 字符串相关算法

## 剑指 offer 专题

### 剑指 Offer 58 - II. 左旋转字符串

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

方法一: 使用字符串的截取方法

``` js
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    return s.slice(n) + s.slice(0, n);
};
```

方法二: 循环拼接字符串

``` 
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    let str = '';
    for(let i = n, len = s.length + n; i < len; i++) {
        // 取余
        str += s.charAt(i % s.length);
    } 
    return str;
};
```

### 剑指 Offer 38. 字符串的排列

输入一个字符串，打印出该字符串中字符的所有排列。

你可以以任意顺序返回这个字符串数组，但里面不能有

示例:

输入：s = "abc"
输出：["abc", "acb", "bac", "bca", "cab", "cba"]

``` js
/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function(s) {
    // 因为数据不可重复，因此用Set结构来存储需要的数据  
    const set = new Set();

    function dhs(s, i, len) {
        // 1. 递归终止条件
        // 当递归函数到达最后一层，就直接返回，因为此时前面几个位置已经发生了交换
        if (i === s.length - 1) {
            set.add(s);
            return s;
        }
        // 2. 处理当前层逻辑
        for (let j = i, _len = s.length; j < _len; j++) {
            // 交换一次元素位置，并更新交换后拼接的字符串
            s = swap(s, i, j);
            // 3. 下探到下一层
            dhs(s, i + 1, len);
            // 返回时交换回来, 还原元素位置，可以正确进行下次递归，并更新交换后拼接的字符串
            s = swap(s, i, j);
        }
    }

    // 字符串特定位置交换字符
    function swap(str = '', i, j) {
        if (i === j) return str;
        return `${str.substring(0, i)}${str.charAt(j)}${str.substring(i + 1, j)}${str.charAt(i)}${str.substring(j+1)}` ;
    }

    // 执行函数
    dhs(s, 0, s.length);
    // set 转数组
    return Array.from(set);
}
```

### 剑指 Offer 48. 最长不含重复字符的子字符串

请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

``` js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s = '') {
    if (!s || !s.length) return 0;
    // i: 记录当前遍历到的开始位置
    let i = 0,
        max = 0,
        str = '';
    for (let j = 0; j < s.length; j++) {
        const index = s.slice(i, j).indexOf(s.charAt(j));
        if (index === -1) { // 没找到
            max = Math.max(max, j - i + 1);
            str = s.slice(i, j + 1);
        } else { // 找到了
            // 从下一位重新开始
            i += index + 1;
        }
    }
    // 最长字串
    console.log(str);
    // 最长字串的长度
    return max;
};
```

### 剑指 Offer 50. 第一个只出现一次的字符

在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

``` js
var firstUniqChar = function(s) {
    if (!s || !s.length) return ' ';
    const map = new Map(),
        len = s.length;
    let str = ' ';
    for (let i = 0; i < len; i++) {
        const char = s.charAt(i);
        if (map.has(char)) { // 已经有相同的,置为false
            map.set(char, false);
        } else { // 第一次出现,置为true
            map.set(char, true);
        }
    }
    for (let i = 0, len = s.length; i < len; i++) {
        const char = s.charAt(i);
        if (map.get(char)) {
            str = char;
            break;
        }
    }
    return str;
};
```

### 剑指 Offer 53 - II. 0～n-1中缺失的数字

一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

``` js
function missingNumber(nums = []) {
    let i = 0,
        j = nums.length - 1,
        mid;
    // 二分查找
    while (i <= j) {
        // 除以2并向下取整
        mid = (i + j) >> 1;
        // i 前进到 mid + 1, 缩小查找范围
        if (nums[mid] === mid) i = mid + 1;
        // j后退
        else j = mid - 1;
    }
    return i;
}
```

### 剑指 Offer 03. 数组中重复的数字

找出数组中重复的数字。

在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

示例 1：

输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3 

``` js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    const map = new Map();
    let repeatNum = nums[0];
    for (let i = 0, len = nums.length; i < len; i++) {
        const num = nums[i];
        if (map.has(num)) {
            repeatNum = num;
            break;
        }
        map.set(num, true);
    }
    return repeatNum;
};
```

### 剑指 Offer 11. 旋转数组的最小数字

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组 [3, 4, 5, 1, 2] 为 [1, 2, 3, 4, 5] 的一个旋转，该数组的最小值为1。  

示例 1：

输入：[3, 4, 5, 1, 2]
输出：1
示例 2：

输入：[2, 2, 2, 0, 1]
输出：0

``` js
/**
 * @param {number[]} numbers
 * @return {number}
 */
// 方法一: 使用数组原生自带的min方法
// var minArray = function(numbers) {
//     return Math.min(...numbers);
// };

// 方法二: 原数组递增排列，那么该数组的所有片段都是递增排列，第一个不符合递增排列的元素就是旋转截断点，也就是最小值点。如果没有，就返回第一个元素
// var minArray = function(numbers){
//     for(let i = 0, len = numbers.length; i < len; i++) {
//        if(numbers[i] < numbers[0]) return numbers[i]
//     }
//     return numbers[0];
// }

//  方法三: 二分法
var minArray = function(numbers) {
    let left = 0,
        right = numbers.length - 1;
    while (left < right) {
        // 左移一位: 求和除以2,然后再向下取整
        const temp = (left + right) >> 1;
        if (numbers[temp] > numbers[right]) {
            // 左指针前进
            left = temp + 1;
        } else if (numbers[temp] < numbers[right]) {
            right = temp;
        } else {
            right--;
        }
    }
    return numbers[left];
}
```

### 剑指 Offer 56 - I. 数组中数字出现的次数

一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。

示例 1：

输入：nums = [4, 1, 4, 6]
输出：[1, 6] 或 [6, 1]
示例 2：

输入：nums = [1, 2, 10, 4, 1, 4, 3, 3]
输出：[2, 10] 或 [10, 2]

``` js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
    const res = [],
        map = new Map();
    for (let i = 0, len = nums.length; i < len; i++) {
        const num = nums[i];
        if (map.has(num)) {
            map.set(num, map.get(num) + 1);
        } else {
            map.set(num, 1);
        }
    }
    Array.from(map.entries()).forEach(([key, value]) => {
        if (value === 1) res.push(key);
    });
    return res;
};
```

### 剑指 Offer 57. 和为s的两个数字

输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。

示例 1：

输入：nums = [2, 7, 11, 15], target = 9
输出：[2, 7] 或者 [7, 2]
示例 2：

输入：nums = [10, 26, 30, 31, 47, 60], target = 40
输出：[10, 30] 或者 [30, 10]

``` js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 双指针
var twoSum = function(nums, target) {
    if (nums.length < 2) return [];

    let res = [],
        i = 0,
        j = nums.length - 1;
    while (i < j) {
        const num = nums[i] + nums[j];
        // 头指针前进
        if (num < target) i++;
        // 尾指针后退
        else if (num > target) j--;
        else {
            res.push(nums[i], nums[j]);
            break;
        }
    }
    return res;
};
```

### 剑指 Offer 56 - II. 数组中数字出现的次数 II

在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。

``` js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    const map = new Map(),
        len = nums.length;
    let num = -1;
    for (let i = 0; i < len; i++) {
        const n = nums[i];
        if (map.has(n)) {
            map.set(n, false);
        } else {
            map.set(n, true);
        }
    }
    for (let j = 0; j < len; j++) {
        const m = nums[j];
        if (map.get(m)) {
            num = m;
            break;
        }
    }
    return num;
};
```

### 在排序数组中查找数字 I  

统计一个数字在排序数组中出现的次数。

示例 1:

输入: nums = [5, 7, 7, 8, 8, 10], target = 8
输出: 2
示例 2:

输入: nums = [5, 7, 7, 8, 8, 10], target = 6
输出: 0

``` js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 方法一：万能方法hash表
var search = function(nums, target) {
    let len = nums.length;
    if (len === 0) return 0;
    let count = 0,
        map = new Map();
    while (len--) {
        const num = nums[len];
        map.set(num, map.has(num) ? map.get(num) + 1 : 1);
    }
    return map.get(target) || 0;
};

// 方法二：双指针+二分法
var search = function(nums, target) {
    function helper(nums, target) {
        let i = 0,
            j = nums.length - 1;
        while (i <= j) {
            const m = (i + j) >> 1;
            if (nums[m] <= target) i = m + 1;
            else j = m - 1;
        }
        return i;
    }
    // target右边界(比如下面的9) - (target-1)右边界(比如下面的7)
    // 7 888 9
    return helper(nums, target) - helper(nums, target - 1);
}
```

### 剑指 Offer 62. 圆圈中最后剩下的数字

0, 1, , n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字。

例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。

找规律题目

``` js
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function(n, m) {
    let num = 0;
    for (let i = 2; i <= n; i++) {
        num = (num + m) % i;
    }
    return num;
};
```

### 剑指 Offer 39. 数组中出现次数超过一半的数字  

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

示例 1:

输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
输出: 2

``` js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一： for循环+hashMap存储(num, count)
var majorityElement = function(nums) {
    const len = nums.length;
    if (len === 1) return nums[0];
    const map = new Map();
    let num = 0;
    for (let i = 0; i < len; i++) {
        const n = nums[i];
        if (map.has(n)) {
            map.set(n, map.get(n) + 1);
        } else {
            map.set(n, 1);
        }
        if (map.get(n) > (len >> 1)) {
            num = n;
            break;
        }
    }
    return num;
};

// 方法二： reduce+hashMap存储(num, count)
var majorityElement = function(nums) {
    const len = nums.length;
    if (len === 1) return nums[0];
    const map = nums.reduce((accu, cur) => {
        return accu.set(cur, accu.has(cur) ? accu.get(cur) + 1 : 1);
    }, new Map());
    const minCount = len >> 1;
    for (const [num, count] of Array.from(map.entries())) {
        if (count > minCount) return num;
    }
}
```

### 剑指 Offer 44. 数字序列中某一位的数字

数字以0123456789101112131415…的格式序列化到一个字符序列中。在这个序列中，第5位（从下标0开始计数）是5，第13位是1，第19位是4，等等。

请写一个函数，求任意第n位对应的数字。

示例 1：

输入：n = 3
输出：3
示例 2：

输入：n = 11
输出：0

``` js
/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function(n) {
    for (let bit = 1; bit < 32; ++bit) {
        const startNum = Math.pow(10, bit - 1);
        const bitSum = 9 * startNum * bit;
        if (n > bitSum) {
            n -= bitSum;
        } else {
            // 计算要找的数字 num：num = 10 + int(4/2) - 1 = 11
            const num = startNum + Math.ceil(n / bit) - 1;
            // 计算结果在 num 中的位置：pos = 4 - 2 * (11 - 10) - 1 = 1
            const position = n - bit * (num - startNum) - 1;
            return num.toString(10)[position];
        }
    }
}
```

<!-- ## 腾讯

https://leetcode-cn.com/explore/interview/card/tencent/221/array-and-strings/ -->

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~