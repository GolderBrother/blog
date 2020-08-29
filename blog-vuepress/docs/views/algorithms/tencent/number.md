# 腾讯算法题-数学与数字

职者不仅可以做好数学运算的准备，也要巩固一下位运算相关的知识。

Let's play with numbers! 

## 只出现一次的数字

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

``` 
示例 1:

输入: [2, 2, 1]
输出: 1

```

``` 
示例 2:

输入: [4, 1, 2, 1, 2]
输出: 4```

``` js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    // 一个数字跟0异或的结果是本身，跟本身异或的结果是0
    let res = 0;
    for (let i = 0, len = nums.length; i < len; i++) {
        res ^= nums[i];
    }
    return res;
};
```

## 回文数

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

``` 
示例 1:

输入: 121
输出: true
```

``` 
示例 2:

输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```

``` 
示例 3:

输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
```

``` js
/**
 * @param {number} x
 * @return {boolean}
 */
// 方法一： 双指针向中间移动比较法
var isPalindrome = function(x) {
    if (x < 0) return false;
    const arr = String(x).split('');
    let i = 0,
        j = arr.length - 1;
    while (i < j) {
        if (arr[i] !== arr[j]) return false;
        i++;
        j--;
    }
    return true;
};
// 方法二：字符串反转法
var isPalindrome = function(x) {
    if (x < 0 || ((x % 10) === 0 && x !== 0)) return false;
    else if (String(x).split('').reverse().join('') !== String(x)) return false;
    return true;
}
```

## 7. 整数反转

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

``` 
示例 1:

输入: 123
输出: 321
```

``` 
 示例 2:

输入: -123
输出: -321
```

``` 
示例 3:

输入: 120
输出: 21
```

注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2 ^ 31,  2 ^ 31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

``` js
/**
 * @param {number} x
 * @return {number}
 */
// 方法一: js数组的反转api
// var reverse = function(x) {
//     const result = Number(String.prototype.split.call(x, '').reverse().join(''));
//     return result;
// };

/**
 * @param {number} x
 * @return {number}
 */
// 方法二：双指针
// var reverse = function(x) {
//     let arr = String.prototype.split.call(x, '');
//     if(x < 0) arr = arr.slice(1);
//     let i = 0, j = arr.length - 1;
//     while(i < j) {
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//         i++;
//         j--;
//     }
//     const result = (x < 0 ? -1 : 1) * Number(arr.join(''));
//     if(result <= ((-2) ** 31) || result >= (2 ** 31 - 1)) return 0;
//     return result;
// };

// 方法三：纯粹的位运算
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let result = 0;
    while (x !== 0) {
        // 构建反转后的数
        // result * 10 + x % 10 取出末位 x % 10（负数结果还是负数，无需关心正负），拼接到 result 中。
        result = result * 10 + x % 10;
        // 正数向下取整，负数向上取整
        // x / 10 去除末位，| 0 强制转换为32位有符号整数。
        x = (x / 10) | 0;
    }
    // 
    // 通过 | 0 取整，无论正负，只移除小数点部分（正数向下取整，负数向上取整）。
    // result | 0 可以用来检测是否为32位有符号整数, 超过32位的整数转换结果不等于自身，可用作溢出判断。
    return (result | 0) === result ? result : 0;
}
```

## 多数元素

给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

``` 
示例 1:

输入: [3,2,3]
输出: 3
```

``` 
示例 2:

输入: [2,2,1,1,1,2,2]
输出: 2
```

``` js
/**
 * @param {number[]} nums
 * @return {number}
 */
// var majorityElement = function(nums) {
//     const len = nums.length;
//     const map = {};
//     for(let i = 0; i < len; i++) {
//         const num = nums[i];
//         map[num] = map[num] ? map[num] + 1 : 1;
//         // 找到了，就提前退出
//         if(map[num] > (len >> 1)) return num;
//     }
// }

var majorityElement = function(nums) {
    let x = 0,
        m = 0;
    for (const num of nums) {
        // 相同的加1, 不相同的减1, 因为是大于一半, 所以最后肯定剩下大于一半的那个
        if (m === 0) x = num;
        m += num === x ? 1 : -1;
    }
    return x;
}
```

## 2的幂

给定一个整数，编写一个函数来判断它是否是 2 的幂次方。

``` 
示例 1:

输入: 1
输出: true
解释: 20 = 1
```

``` 
示例 2:

输入: 16
输出: true
解释: 24 = 16
```

``` 
示例 3:

输入: 218
输出: false

```

``` js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    if(n<=0) return false;
    // x & (x - 1) 操作会将 2 的幂设置为 0，因此判断是否为 2 的幂是：判断 x & (x - 1) == 0。
    return (n & (n - 1)) === 0;
};
```

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)，一起学习呀~~