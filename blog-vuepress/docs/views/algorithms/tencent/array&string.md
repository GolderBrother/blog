# 腾讯算法题-数组与字符串

[传送门](https://leetcode-cn.com/leetbook/read/tencent/xxk4s2/)


## 1. 两数之和

给定一个整数数组 nums  和一个目标值 target，请你在该数组中找出和为目标值的那   两个   整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例:

``` 
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

```

``` js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// hash表
var twoSum = function(nums, target) {
    let res = [];
    const map = new Map();
    for (let i = 0, len = nums.length; i < len; i++) {
        const result = target - nums[i];
        if (map.has(result)) {
            // 存入索引
            res.push(i, map.get(result));
            break;
        }
        map.set(nums[i], i);
    }
    return res;
};
```

## 寻找两个正序数组的中位数

给定两个大小为 m 和 n 的正序（从小到大）数组  nums1 和  nums2。

请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为  O(log(m + n))。

你可以假设  nums1  和  nums2  不会同时为空。

``` 
示例 1:

nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0
```

``` 
示例 2:

nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5
```

``` js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const arr = nums1.concat(nums2).sort((a, b) => a - b);
    const len = arr.length;
    // 找出中间索引
    const midIndex = len >> 1;
    // 获取中位数，根据奇数就取中间数，偶数就中间的两个数就取和，然后取对半
    const midValue =
        len & (1 === 1) ?
        arr[midIndex] :
        ((arr[midIndex - 1] + arr[midIndex]) / 2).toFixed(1);
    return midValue;
};
```

## 最长回文子串

给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

``` 
示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
```

``` 
示例 2：

输入: "cbbd"
输出: "bb"
```

``` js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const n = s.length;
    let res = "";
    const dp = Array.from(new Array(n), () => new Array(n).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            dp[i][j] = s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1]);
            // 找出最长的回文字符串
            if (dp[i][j] && j - i + 1 > res.length) {
                res = s.substring(i, j + 1);
            }
        }
    }
    return res;
};
```

## 字符串转换整数 (atoi)

请你来实现一个  atoi  函数，使其能将字符串转换成整数。

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。接下来的转化规则如下：

如果第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成一个整数。
该字符串在有效的整数部分之后也可能会存在多余的字符，那么这些字符可以被忽略，它们对函数不应该造成影响。
注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换，即无法进行有效转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0 。

提示：

本题中的空白字符只包括空格字符 ' ' 。
假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为  [−231,   231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或  INT_MIN (−231) 。

``` 
示例 1:

输入: "42"
输出: 42
示例 2:

输入: "   -42"
输出: -42
解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
示例 3:

输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
示例 4:

输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。
示例 5:

输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。
     因此返回 INT_MIN (−231) 。

```

``` js
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    // 去除前后空格
    str = str.trim();
    // 匹配以数字、+、-号开头的字符
    const reg = /^(\d|\-|\+)\d*/;
    const temp = reg.exec(str);
    // 匹配不到 返回0
    if (!temp || ) return 0;
    const num = temp[0] ? Number(temp[0]) : 0;
    if (!num) return 0;
    // 限定值在[-(2 ** 31), 2 ** 31 - 1]之间
    const result = Math.min(2 ** 31 - 1, Math.max(-(2 ** 31), num));
    return result;
};
```

## 最长公共前缀

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

``` 
示例 1:

输入: ["flower","flow","flight"]
输出: "fl"
```

``` 
示例 2:

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

``` js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (!strs || !strs.length) return "";
    // 先初始化为第一个字符串
    let res = strs[0];
    for (let i = 0, len = strs.length; i < len; i++) {
        const str = strs[i];
        let j = 0;
        while (j < str.length && j < res.length) {
            if (str[j] === res[j]) j++;
            // 有一个不相同，则不用循环
            else break;
        }
        res = res.substring(0, j);
        // 第一个字符串比较完毕，找不到公共前缀，那就是没有公共前缀，不用找了，直接返回空串
        if (res === "") return "";
    }
    return res;
};
```

## 15. 三数之和

给你一个包含 n 个整数的数组  nums，判断  nums  中是否存在三个元素 a，b，c ，使得  a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

示例：

``` 
给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

```

``` js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const res = [];
    if (!nums || nums.length < 3) return [];
    // 先从小到大排序
    nums.sort((a, b) => a - b);
    for (let i = 0, len = nums.length; i < len; i++) {
        // 如果第一个数>0, 那么三数之和以及后面的数字一定>0，直接退出
        if (nums[i] > 0) break;
        // 去重
        if (i > 0 && nums[i - 1] === nums[i]) continue;
        // 借助双指针
        let L = i + 1,
            R = len - 1;
        while (L < R) {
            const sum = nums[i] + nums[L] + nums[R];
            if (sum === 0) {
                res.push([nums[i], nums[L], nums[R]]);
                while (L < R && nums[L] === nums[L + 1]) L++; // 去重,直接跳到后一个
                while (L < R && nums[R] === nums[R - 1]) R--; // 去重,直接跳到前一个
                // 指针往中间移动
                L++;
                R--;
            } else if (sum > 0) R--;
            else L++; // sum < 0
        }
    }
    return res;
};
```

## 最接近的三数之和

给定一个包括  n 个整数的数组  nums  和 一个目标值  target。找出  nums  中的三个整数，使得它们的和与  target  最接近。返回这三个数的和。假定每组输入只存在唯一答案。

示例：

``` 
输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
```

``` js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    if (!nums || nums.length < 3) return null;
    // 先从小到大排序
    nums.sort((a, b) => a - b);
    let res = nums[0] + nums[1] + nums[2];
    for (let i = 0, len = nums.length; i < len; i++) {
        // 借助双指针
        let L = i + 1,
            R = len - 1;
        while (L < R) {
            const sum = nums[i] + nums[L] + nums[R];
            // 计算相减结果， 得出最接近target的值,使用Math.abs得出到target的“距离”
            if (Math.abs(sum - target) < Math.abs(res - target)) res = sum;
            if (sum < target) L++;
            else if (sum > target) R--;
            else return sum;
        }
    }
    return res;
};
```

## 20. 有效的括号

给定一个只包括 '('，')'，'{'，'}'，'['，']'  的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:

``` 
输入: "()"
输出: true
```

``` js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const map = {
        "(": ")",
        "[": "]",
        "{": "}",
    };
    const stack = [];
    for (let index = 0, len = s.length; index < len; index++) {
        const char = s.charAt(index);
        if (map[char]) {
            stack.push(char);
        } else if (char !== map[stack.pop()]) {
            return false;
        }
    }
    return stack.length === 0;
};
```

## 删除排序数组中的重复项

给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

示例  1:

``` 
给定数组 nums = [1,1,2],

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。

你不需要考虑数组中超出新长度后面的元素。
```

示例  2:

``` 
给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
```

``` js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (!nums || !nums.length) return 0;
    const length = nums.length;
    let i = 0;
    for (let j = 1; j < length; j++) {
        // 跳过重复项，i递增，并更新nums[i]
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    // i是最后的索引值，求长度需要+1
    return i + 1;
};
```

## 盛最多水的容器

``` js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    if (!height || !height.length) return 0;
    let left = 0,
        right = height.length - 1;
    let res = 0;
    while (left < right) {
        // 容器高度(木桶效应取最短木板)
        const h = Math.min(height[left], height[right]);
        //容器面积
        const area = (right - left) * h;
        // 求最大值
        res = Math.max(res, area);
        // 更新左右指针
        if (height[left] <= height[right]) left++;
        else right--;
    }
    return res;
};
```

## 字符串相乘

给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

示例 1:

``` 
输入: num1 = "2", num2 = "3"
输出: "6"
```

示例 2:

``` 
输入: num1 = "123", num2 = "456"
输出: "56088"
```

说明：

num1 和 num2 的长度小于110。
num1 和 num2 只包含数字 0-9。
num1 和 num2 均不以零开头，除非是数字 0 本身。
不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。

``` js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    if (num1 === 0 || num2 === 0) return "0";
    const res = [];
    for (let i = 0, len1 = num1.length; i < len1; i++) {
        const n1 = num1[len1 - 1 - i] // 获取当前数的最后一位
        for (let j = 0, len2 = num2.length; j < len2; j++) {
            const n2 = num2[len2 - 1 - i]; // 获取当前数的最后一位
            // 计算当前位的乘积，需要加上上一位的进位
            const multiple = res[i + j] ? res[i + j] + Number(n1) * Number(n2) : Number(n1) * Number(n2);
            // 取余
            res[i + j] = multiple % 10;
            // 需要进位
            if (multiple >= 10) {
                res[i + j + 1] = res[i + j + 1] ? res[i + j + 1] + Math.floor(multiple / 10) : Math.floor(multiple / 10);
            }
        }
    }
    // 最后需要犯乎反转再连接成字符串
    return res.reverse().join('');
};
```

## 反转字符串

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

示例 1：

``` 
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

示例 2：

``` 
输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

## 反转字符串中的单词 III

给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

示例 1:

``` 
输入: "Let's take LeetCode contest"
输出: "s'teL ekat edoCteeL tsetnoc" 
注意：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
```

## 除自身以外数组的乘积

给你一个长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 output ，其中 output[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。

示例:

``` 
输入: [1,2,3,4]
输出: [24,12,8,6]
```

``` js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 方法一: 暴力破解
// var productExceptSelf = function(nums) {
//     const res = [];
//     for(let i = 0, len = nums.length; i < len; i++) {
//         const result = nums.filter((_, index) => index !== i).reduce((a, b) => a * b, 1);
//         res.push(result);
//     }
//     return res;
// };

// 方法二:双循环
var productExceptSelf = function(nums) {
    const res = [];
    const length = nums.length;
    // 正向循环
    for (let i = 0, temp = 1; i < length; i++) {
        res[i] = temp;
        temp *= nums[i];
    }
    // 反向循环
    for (let j = length - 1, temp = 1; j >= 0; j--) {
        res[j] *= temp;
        temp *= nums[j];
    }
    return res;
}
```

## 存在重复元素

给定一个整数数组， 判断是否存在重复元素。

如果任意一值在数组中出现至少两次， 函数返回 true。 如果数组中每个元素都不相同， 则返回 false。

示例 1:

``` 
输入: [1,2,3,1]
输出: true
```

示例 2:

``` 
输入: [1,2,3,4]
输出: false
```

示例 3:

``` 
输入: [1,1,1,3,3,4,3,2,4,2]
输出: true
```

``` js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    if (!nums || !nums.length) return false;
    const result = false;
    const map = new Map();
    for (let i = 0, len = nums.length; i < len; i++) {
        if (map.has(nums[i])) return true;
        map.set(nums[i], i);
    }
    return result;
};
```

## 螺旋矩阵

给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

示例 1:

``` 
输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
```

``` js
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const order = [];
    if (matrix == null || matrix.length === 0 || matrix[0].length === 0) return order;
    const rows = matrix,
        columns = matrix[0];
    let left = 0,
        right = columns.length - 1,
        top = 0,
        bottom = rows.length - 1;
    while (left <= right && top <= bottom) {
        // 1. 第top行:从左到右
        for (let column = left; column <= right; column++) {
            order.push(matrix[top][column]);
        }
        // 2. 第right列:从上到下
        for (let row = top + 1; row <= bottom; row++) {
            order.push(matrix[row][right]);
        }
        // 循环
        if (left < right && top < bottom) {
            // 3. 第bottom行: 从右到左
            for (let column = right - 1; column > left; column--) {
                order.push(matrix[bottom][column]);
            }
            // 4. 第left列: 从下到上
            for (let row = bottom; row > top; row--) {
                order.push(matrix[row][left]);
            }
        }
        // 更新指针,往中心靠拢
        top++;
        bottom--;
        left++;
        right--;
    }
    return order;
};
```

## 螺旋矩阵 II

给定一个正整数 n，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

## 合并两个有序数组

给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明:

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

示例:

``` 
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
```

``` js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // nums1最后一个元素的索引
    let index1 = m - 1,
        // nums2最后一个元素的索引
        index2 = n - 1,
        // 大值的索引
        maxIndex = m + n - 1;
    // 取最小
    while (index2 >= 0) {
        // 从后往前比较,先比较大的数
        if (nums1[index1] > nums2[index2]) {
            // 大值放最后
            nums1[maxIndex] = nums1[index1];
            // 指针往前移动
            index1--;
            maxIndex--;
        } else {
            nums1[maxIndex] = nums2[index2];
            index2--;
            maxIndex--;
        }
    }
    return nums1;
};
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~