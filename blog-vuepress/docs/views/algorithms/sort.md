# 十大经典算法

## 1. 前言

> 算法为王。
> 想学好前端，先练好内功，内功不行，就算招式练的再花哨，也终究成不了高手；只有内功深厚者，前端之路才会走得更远。

笔者写的 JavaScript **数据结构与算法之美** 系列用的语言是 JavaScript ，旨在入门数据结构与算法和方便以后复习。

文中包含了 `十大经典排序算法` 的思想、代码实现、一些例子、复杂度分析、动画、还有算法可视化工具。

这应该是目前比较全的 JavaScript `十大经典排序算法` 的讲解了吧。

我相信以下的代码里一定会有某些 bug 或错误或语法不规范等问题是我自己无法发现的，所以敬请各位大神能够指出错误，因为只有在不断改错的道路上我才能取得长久的进步。

名词解释：

- `n`: 数据规模
- `k`: "桶" 的个数
- `In-place`: 占用常数内存，不占用额外内存
- `Out-place`: 占用额外内存
- `稳定性`：排序后 2 个相等键值的顺序和排序之前它们的顺序相同

## 2. 如何分析一个排序算法

复杂度分析是整个算法学习的精髓。

- 时间复杂度: 一个算法执行所耗费的时间。
- 空间复杂度: 运行完一个程序所需内存的大小。

学习排序算法，我们除了学习它的算法原理、代码实现之外，更重要的是要学会如何评价、分析一个排序算法。

分析一个排序算法，要从 `执行效率、内存消耗、稳定性` 三方面入手。

### 2.1 执行效率

#### 1. 最好情况、最坏情况、平均情况时间复杂度

我们在分析排序算法的时间复杂度时，要分别给出最好情况、最坏情况、平均情况下的时间复杂度。
除此之外，你还要说出最好、最坏时间复杂度对应的要排序的原始数据是什么样的。

#### 2. 时间复杂度的系数、常数 、低阶

我们知道，时间复杂度反应的是数据规模 n 很大的时候的一个增长趋势，所以它表示的时候会忽略`系数、常数、低阶`。

但是实际的软件开发中，我们排序的可能是 10 个、100 个、1000 个这样规模很小的数据，所以，在对同一阶时间复杂度的排序算法性能对比的时候，我们就要把`系数、常数、低阶`也考虑进来。

#### 3. 比较次数和交换（或移动）次数

这一节和下一节讲的都是基于比较的排序算法。基于比较的排序算法的执行过程，会涉及两种操作，一种是元素比较大小，另一种是元素交换或移动。

所以，如果我们在分析排序算法的执行效率的时候，应该把**比较**次数和**交换（或移动）**次数也考虑进去。

### 2.2 内存消耗

也就是看空间复杂度。

还需要知道如下术语：

- **内排序**：所有排序操作都在内存中完成；
- **外排序**：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行；
- **原地排序**：原地排序算法，就是特指空间复杂度是 O(1) 的排序算法。

### 2.3 稳定性

- 稳定：如果待排序的序列中存在`值相等`的元素，经过排序之后，相等元素之间**原有的先后顺序不变**。
  比如： a 原本在 b 前面，而 a = b，排序之后，a 仍然在 b 的前面；

- 不稳定：如果待排序的序列中存在`值相等`的元素，经过排序之后，相等元素之间**原有的先后顺序改变**。
  比如：a 原本在 b 的前面，而 a = b，排序之后， a 在 b 的后面

## 3. 十大经典排序算法

### 3.1 冒泡排序（Bubble Sort）

**思想**:

- 冒泡排序只会操作相邻的两个数据。
- 每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。如果不满足就让它俩互换。
- 一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作。

> 冒泡排序还有一种优化算法，就是立一个`flag`，当在一趟序列遍历中元素**没有发生交换**，则证明该序列**已经有序**

#### 特点

- 优点：排序算法的基础，简单实用易于理解。
- 缺点：比较次数多，效率较低。

**实现**:

```js
// 冒泡排序（未优化）
const bubbleSort = arr => {
  console.time('改进前冒泡排序耗时');
  const length = arr.length;
  if (length <= 1) return;
  // i < length - 1 是因为外层只需要 length-1 次就排好了，第 length 次比较是多余的。
  for (let i = 0; i < length - 1; i++) {
    // j < length - i - 1, 这是因为内层的 length-i-1 到 length-1 的位置已经排好了，不需要再比较一次。
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  console.log('改进前 arr :', arr);
  console.timeEnd('改进前冒泡排序耗时');
};
```

优化：当某次冒泡操作已经没有数据交换时，说明已经达到完全有序，不用再继续执行后续的冒泡操作。

```js
const bubbleSort2 = (arr = []) => {
  console.time(`改进后冒泡排序耗时`);
  const len = arr.length;
  if (len <= 1) return;
  for (let i = 0; i < len - 1; i++) {
    let hasChange = false; // 是否提前退出冒泡循环的标志位
    // j < length - i - 1 是因为内层的 length-i-1 到 length-1 的位置已经排好了，不需要再比较一次。
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = arr[j];
        hasChange = true; // 表示有数据交换
      }
    }
    if (!hasChange) break; // 如果 false 说明所有元素已经到位，没有数据交换，提前退出
  }
  console.log('改进后 arr :', arr);
  console.timeEnd('改进后冒泡排序耗时');
};
```

**测试**:

```js
// 测试
const arr = [7, 8, 4, 5, 6, 3, 2, 1];
bubbleSort(arr);
// 改进前 arr : (8) [1, 2, 3, 4, 5, 6, 7, 8]
// 改进前冒泡排序耗时: 0.4599609375ms

const arr2 = [7, 8, 4, 5, 6, 3, 2, 1];
bubbleSort2(arr2);
// 改进后 arr : [1, 2, 3, 4, 5, 6, 7, 8]
// 改进后冒泡排序耗时: 0.318115234375ms
```

**分析**:

- 第一，冒泡排序是原地排序算法吗 ？
  冒泡的过程只涉及相邻数据的交换操作，只需要常量级的临时空间，所以它的空间复杂度为 O(1)，是一个原地排序算法。
- 第二，冒泡排序是稳定的排序算法吗 ？
  在冒泡排序中，只有交换才可以改变两个元素的前后顺序。
  为了保证冒泡排序算法的稳定性，当有相邻的两个元素大小相等的时候，我们不做交换，相同大小的数据在排序前后不会改变顺序。
  所以冒泡排序是稳定的排序算法。
- 第三，冒泡排序的时间复杂度是多少 ？
  最佳情况：`T(n) = O(n)`，当数据已经是`正序`时。
  最差情况：`T(n) = O(n2)`，当数据是`反序`时。
  平均情况：`T(n) = O(n2)`。

**动画**:

![img](https://camo.githubusercontent.com/9405fdc8f5e6482bd7f059f69fce12873d1f1291/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d363864353534363961633433396263362e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

![img](https://camo.githubusercontent.com/073caf95c2b9dca89a973dbc9a722f79441ae212/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d333934386465393664346132383533302e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

### 3.2 插入排序（Insertion Sort）

插入排序又为分为 **直接插入排序** 和优化后的 **拆半插入排序** 与 **希尔排序**，我们通常说的插入排序是指**直接插入排序**。

#### 一、直接插入

**思想**:

一般人打扑克牌，整理牌的时候，都是按牌的大小（从小到大或者从大到小）整理牌的，那每摸一张新牌，就扫描自己的牌，把新牌插入到相应的位置。

插入排序的工作原理：通过构建有序序列，对于未排序数据，在已排序序列中**从后向前**扫描，找到相应位置并插入。

**步骤**:

- 从第一个元素开始，该元素可以认为已经被排序；
- 取出下一个元素，在已经排序的元素序列中**从后向前**扫描；
- 如果该元素（已排序）大于新元素，将该元素移到下一位置；
- 重复步骤 3，直到找到已排序的元素**小于或者等于新元素**的位置；
- 将新元素插入到该位置后；
- 重复步骤 2 ~ 5。

**实现**:

第一种写法

```js
const insertionSort = (array = []) => {
  const len = array.length;
  if (len <= 1) return;
  let preIndex;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1; // 待比较元素的下标
    current = array[i];
    while (preIndex >= 0 && array[preIndex] > current) {
      //前置条件之一: 待比较元素比当前元素大
      array[preIndex + 1] = array[preIndex]; //将待比较元素后移一位
      preIndex--; //游标前移一位
    }
    if (preIndex + 1 != i) {
      //避免同一个元素赋值给自身
      array[preIndex + 1] = current; //将当前元素插入预留空位
      console.log(`array`, array);
    }
  }
  return array;
};
```

**测试**:

```js
const array = [5, 4, 3, 2, 1];
console.log('原始 array :', array);
insertionSort(array);
// 原始 array:[5, 4, 3, 2, 1]
// array: [4, 5, 3, 2, 1]
// array: [3, 4, 5, 2, 1]
// array: [2, 3, 4, 5, 1]
// array: [1, 2, 3, 4, 5]
```

第二种写法

```js
// 插入排序
const insertionSort2 = (array = []) => {
  const length = array.length;
  if (length <= 1) return;
  for (let i = 1; i < length; i++) {
    // 未排序区间(从第二个元素开始)
    const current = array[i]; // 未排序的当前元素
    // 查找要插入已排序区间的位置
    let preIndex = i - 1; // 待比较元素下标
    for (; preIndex >= 0 && array[preIndex] > current; preIndex--) {
      // 已排序区间
      // array[preIndex] > current 待比较元素 > 当前元素
      array[preIndex + 1] = array[preIndex]; // 待比较元素比当前元素大，就将元素往后移动一位
    }
    //避免同一个元素赋值给自身
    if (preIndex + 1 != i) {
      array[preIndex + 1] = current; // 待排序区间中找不到比当前元素大的，就将当前元素放到待排序区间最后面
    }
  }
  return array;
};
```

**测试**:

```js
const array = [5, 4, 3, 2, 1];
console.log('insertionSort2 原始 array :', array);
console.log('insertionSort2 排序后的 array :', JSON.stringify(insertionSort2(array)));

// insertionSort2 原始 array : [5, 4, 3, 2, 1]
// insertionSort2 排序后的 array : [1,2,3,4,5]
```

**分析**:

- 第一，插入排序是原地排序算法吗 ？
  插入排序算法的运行并不需要额外的存储空间，所以空间复杂度是 O(1)，所以，这是一个原地排序算法。
- 第二，插入排序是**稳定**的排序算法吗 ？
  在插入排序中，对于值相同的元素，我们可以选择将后面出现的元素，插入到前面出现元素的后面，这样就可以保持原有的前后顺序不变，所以插入排序是**稳定**的排序算法。
- 第三，插入排序的时间复杂度是多少 ？
  最佳情况：`T(n) = O(n)`，当数据已经是**正序**时。
  最差情况：`T(n) = O(n2)`，当数据是**反序**时。
  平均情况：`T(n) = O(n2)`。

**动画**:

![img](https://camo.githubusercontent.com/1414c9c319c61f45bc43222fcb3b734e0dd53770/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d386261313137353036333732653937652e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

#### 二、拆半插入

插入排序也有一种优化算法，叫做拆半插入。

**思想**:

折半插入排序是直接插入排序的**升级版**，鉴于插入排序第一部分为已排好序的数组，我们不必按顺序依次寻找插入点，只需比较它们的**中间值**与**待插入元素的大小**即可。

**步骤**:

- 取 `0 ~ i-1` 的中间点 ( `m = (i-1) >> 1` )，array[i] 与 array[m] 进行比较，若 array[i] < array[m]，则说明待插入的元素 array[i] 应该处于数组的 `0 ~ m` 索引之间；反之，则说明它应该处于数组的 `m ~ i-1` 索引之间。
- 重复步骤 1，每次缩小一半的查找范围，直至找到插入的位置。
- 将数组中插入位置之后的元素全部后移一位。
- 在指定位置插入第 i 个元素。

> 注：`x >> 1` 是位运算中的右移运算，表示右移一位，等同于 x 除以 2 再取整，即 `x >> 1 == Math.floor(x/2)` 。
> 因为计算机使用位运算符的效率比除法高

```js
// 折半插入排序

const binaryInsertionSort = (array = []) => {
  const len = array.length;
  if (len < 1) return;
  let current, i, j, low, high, m;
  for (let i = 1; i < len; i++) {
    low = 0;
    high = i - 1;
    current = array[i];
    // 步骤 1 & 2 : 折半查找
    // 重复步骤 1，每次缩小一半的查找范围，直至找到插入的位置。
    while (low <= high) {
      // 中间值的索引
      m = (low + high) >> 1; // 注: x>>1 是位运算中的右移运算, 表示右移一位, 等同于 x 除以 2 再取整, 即 x>>1 == Math.floor(x/2) .
      if (current >= array[m]) {
        //值相同时, 切换到高半区，保证稳定性
        low = m + 1; //插入点在高半区,更正最低点索引
      } else {
        high = m - 1; //插入点在低半区,更正最高点索引
      }
    }

    //步骤 3: 将数组中插入位置之后的元素全部后移一位。
    for (j = i; j > 0; j--) {
      array[j] = array[j - 1];
      // console.log('array :', JSON.parse(JSON.stringify(array)));
    }

    // 步骤 4: 在指定位置插入该元素。
    array[low] = current;
  }
  // console.log('array :', JSON.parse(JSON.stringify(array)));
  return array;
};
```

**测试**:

```js
const array = [5, 4, 3, 2, 1];
console.log('binaryInsertionSort 原始 array:', array);
console.log('binaryInsertionSort 排序后的 array :', JSON.stringify(binaryInsertionSort(array)));

// binaryInsertionSort 原始 array: (5) [5, 4, 3, 2, 1]
// binaryInsertionSort 排序后的 array : [1,2,3,4,5]
```

注意：和直接插入排序类似，折半插入排序每次交换的是相邻的且值为不同的元素，它并不会改变值相同的元素之间的顺序，因此它是**稳定**的。

#### 三、希尔排序

希尔排序是一个平均时间复杂度为 O(n log n) 的算法, 下节讲解

### 3.3 选择排序（Selection Sort）

#### 思路

选择排序算法的实现思路有点类似插入排序，也分**已排序区间**和**未排序区间**。但是选择排序每次会从**未排序区间**中找到最小的元素，将其放到**已排序区间**的**末尾**。

#### 步骤

1. 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
2. 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
3. 重复第二步，直到所有元素均排序完毕。

**实现**:

```js
const selectSort = (array = []) => {
  const len = array.length;
  for (let i = 0; i < len; i++) {
    // 未排序区间中的最小元素
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      // 寻找最小元素的索引
      minIndex = array[j] <= array[minIndex] ? j : minIndex;
    }
    // 交换最小元素位置
    if (minIndex !== i) {
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      console.log('array: ', array);
    }
  }
  return array;
};
```

**测试**:

```js
const array = [5, 4, 3, 2, 1];
console.log('selectSort 原始 array :', array);
console.log('selectSort 排序后的 array :', JSON.stringify(selectSort(array)));
// selectSort 原始 array: (5)[5, 4, 3, 2, 1]
// array: (5)[1, 4, 3, 2, 5]
// array: (5)[1, 2, 3, 4, 5]
// selectSort 排序后的 array: [1, 2, 3, 4, 5]
```

**分析**:

- 第一，选择排序是原地排序算法吗 ？
  选择排序空间复杂度为 O(1)，是一种原地排序算法。
- 第二，选择排序是稳定的排序算法吗 ？
  选择排序每次都要找剩余未排序元素中的最小值，并和前面的元素交换位置，这样破坏了稳定性。所以，选择排序是一种不稳定的排序算法。
- 第三，选择排序的时间复杂度是多少 ？
  无论是正序还是逆序，选择排序都会遍历 n2 / 2 次来排序，所以，最佳、最差和平均的复杂度是一样的。
  最佳情况：`T(n) = O(n2)`。
  最差情况：`T(n) = O(n2)`。
  平均情况：`T(n) = O(n2)`。

**动画**:

![img](https://camo.githubusercontent.com/da798ee9de6d9b3dfcdf112e87b87705da5897ce/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d323764646662363336656162666630332e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

### 3.4 归并排序（Merge Sort）

**思想**:

排序一个数组，我们先把数组从中间分成**前后两部分**，然后对前后两部分**分别排序**，再将排好序的两部分合并在一起，这样整个数组就都有序了。

归并排序采用的是**分治思想**。

分治，顾名思义，就是**分而治之**，将一个大问题分解成小的子问题来解决。小的子问题解决了，大问题也就解决了。

![img](https://camo.githubusercontent.com/1da5298669a2073326ecabbab244eb4fd2a52280/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d613138366265343162363264366636352e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

> 注：`x >> 1` 是位运算中的右移运算，表示右移一位，等同于 x 除以 2 再取整，即 `x >> 1 === Math.floor(x / 2)` 。

**实现**:

```js
const mergeSort = (arr = []) => {
  //采用自上而下的递归方法
  const len = arr.length;
  if (len < 2) return arr;
  // length >> 1 和 Math.floor(len / 2) 等价
  let middle = Math.floor(len / 2), // 获取中间元素的索引值
    left = arr.slice(0, middle), // 左边数组
    right = arr.slice(middle); // 右边数组
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left = [], right = []) => {
  const result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      // 弹出第一个元素
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) result.push(left.shift());
  while (right.length) result.push(right.shift());
  return result;
};
```

**测试**:

```js
// 测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.time('归并排序耗时');
console.log('arr :', mergeSort(arr));
console.timeEnd('归并排序耗时');
// arr : [2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
// 归并排序耗时: 0.68603515625ms
```

**分析**:

- 第一，归并排序是原地排序算法吗 ？
  这是因为归并排序的合并函数，在合并两个有序数组为一个有序数组时，需要借助额外的存储空间。
  实际上，尽管每次合并操作都需要申请额外的内存空间，但在合并完成之后，临时开辟的内存空间就被释放掉了。在任意时刻，CPU 只会有一个函数在执行，也就**只会有一个临时的内存空间在使用**。临时内存空间最大也不会超过 `n` 个数据的大小，所以**空间复杂度是 O(n)**。
  所以，**归并排序不是原地排序算法**。

- 第二，归并排序是稳定的排序算法吗 ？
  merge 方法里面的 `left[0] <= right[0]` ，保证了值相同的元素，在合并前后的先后顺序不变。归并排序是稳定的排序方法。

- 第三，归并排序的时间复杂度是多少 ？
  从效率上看，归并排序可算是排序算法中的佼佼者。假设数组长度为 `n`，那么拆分数组共需 `logn` 步，又每步都是一个普通的合并子数组的过程，时间复杂度为 O(n)，故其综合时间复杂度为 `O(nlogn)`。
  最佳情况：`T(n) = O(n*logn)`。
  最差情况：`T(n) = O(n*logn)`。
  平均情况：`T(n) = O(n*logn)`。

**动画**:

![img](https://camo.githubusercontent.com/187b5bf65fed1689a418e3798ef510d1a28fc76a/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d333233373236323539303664663361652e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

### 3.5 快速排序 （Quick Sort）

快速排序的特点就是快，而且效率高！它是处理大数据最快的排序算法之一。

**思想**:

- 先找到一个**基准点**（一般指数组的中部），然后数组被该**基准点**分为两部分，依次与该**基准点**数据比较，**如果比它小，放左边；反之，放右边**。
- 左右分别用一个`空数组`去存储比较后的数据。
- 最后递归执行上述操作，直到数组长度 `<= 1`;

**特点**：快速，常用。

**缺点**：需要另外声明两个数组，浪费了内存空间资源。

**实现**:

#### 方法一

```js
const quickSort = (array = []) => {
  //采用自上而下的递归方法
  const len = array.length;
  if (len <= 1) return array;
  //取基准点索引
  const midIndex = len >> 1; // 相当于 Math.floor(len / 2);
  // 取基准值(中间值)，splice(index,1) 则返回的是含有被删除的元素的数组。
  const midIndexValue = array.splice(midIndex, 1)[0];
  const left = [],
    right = []; // 用来存放比较后的值，小的放入左边，大的放入右边
  // 遍历数组，进行判断分配
  for (let index = 0; index < array.length; index++) {
    const current = array[index];
    if (current < midIndexValue) {
      left.push(current); //比基准点小的放在左边数组
    } else {
      right.push(current); //比基准点大的放在右边数组
    }
  }
  //递归执行以上操作，对左右两个数组进行操作，直到数组长度为 <= 1
  return quickSort(left).concat(midIndexValue, quickSort(right));
};
const array2 = [5, 4, 3, 2, 1];
console.log('quickSort ', quickSort(array2));
// quickSort: [1, 2, 3, 4, 5]
```

#### 方法二

```js
// 快速排序
const quickSort = (arr, left, right) => {
  let len = arr.length,
    partitionIndex;
  left = typeof left != 'number' ? 0 : left;
  right = typeof right != 'number' ? len - 1 : right;

  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
};

const partition = (arr, left, right) => {
  //分区操作
  let pivot = left, //设定基准值（pivot）
    index = pivot + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
};

// 交换两个数位置的方法
const swap = (arr = [], i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
```

**测试**:

```js
// 测试
const array = [5, 4, 3, 2, 1];
console.log('原始array:', array);
const newArr = quickSort(array);
console.log('newArr:', newArr);
// 原始 array:  [5, 4, 3, 2, 1]
// newArr:     [1, 4, 3, 2, 5]
```

**分析**:

- 第一，快速排序是原地排序算法吗 ？
  因为 `partition()` 函数进行分区时，不需要很多额外的内存空间，所以**快排是原地排序算法**。

- 第二，快速排序是稳定的排序算法吗 ？

和选择排序相似，快速排序每次交换的元素都有可能不是相邻的，因此它**有可能打破原来值为相同的元素之间的顺序**。因此，快速排序并不稳定。

- 第三，快速排序的时间复杂度是多少 ？

极端的例子：如果数组中的数据原来已经是有序的了，比如 1，3，5，6，8。如果我们每次选择最后一个元素作为 `pivot`，那每次分区得到的两个区间都是不均等的。我们需要进行大约 n 次分区操作，才能完成快排的整个过程。每次分区我们平均要扫描大约 `n / 2` 个元素，这种情况下，快排的时间复杂度就从 `O(nlogn)` 退化成了 `O(n2)`。

最佳情况：`T(n) = O(nlogn)`。
最差情况：`T(n) = O(n2)`。
平均情况：`T(n) = O(nlogn)`。

**动画**:

![img](https://camo.githubusercontent.com/b6a25e0ffc22377177c2dc8113e113bd34adc284/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d336532396239643264393336393035642e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

快排和归并用的都是**分治思想**，递推公式和递归代码也非常相似，那它们的区别在哪里呢

可以发现：

- 归并排序的处理过程是`由下而上`的，`先处理子问题`，然后再合并。
- 而快排正好相反，它的处理过程是`由上而下`的，`先分区`，然后再处理子问题。
- 归并排序虽然是**稳定的**、时间复杂度为 `O(nlogn)` 的排序算法，但是它是**非原地排序算法**。
- 归并之所以是**非原地排序算法**，主要原因是合并函数无法在原地执行。
- 快速排序通过设计巧妙的原地分区函数，可以实现原地排序，解决了归并排序占用太多内存的问题。

### 3.6 希尔排序（Shell Sort）

**思想**:

- 先将整个待排序的记录序列分割成为若干子序列。
- 分别进行直接插入排序。
- 待整个序列中的记录基本有序时，再对全体记录进行依次直接插入排序

#### 过程

1.举个易于理解的例子：[35, 33, 42, 10, 14, 19, 27, 44]，我们采取间隔 4。创建一个位于 4 个位置间隔的所有值的虚拟子列表。下面这些值是 { 35, 14 }，{ 33, 19 }，{ 42, 27 } 和 { 10, 44 }。

![img](https://camo.githubusercontent.com/422a14bf5da7680b7e588ed6591f59ef9f73b803/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d653538333130653363383935363164612e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

2.我们比较每个子列表中的值，并在原始数组中交换它们（如果需要）。完成此步骤后，新数组应如下所示。

![img](https://camo.githubusercontent.com/352360a68f6ddfabdd9b89f5cb18496faf78ed2d/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d346436623262353163613366303462642e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

3.然后，我们采用 2（4 / 2） 的间隔，这个间隙产生两个子列表：`{ 14, 27, 35, 42 }`， `{ 19, 10, 33, 44 }`。

![img](https://camo.githubusercontent.com/9fe589010e0c4ab3c0728b4f9e7ed027225f5d43/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d333864636333346361613361396432632e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

4.我们**比较并交换**原始数组中的值（如果需要）。完成此步骤后，数组变成：[14, 10, 27, 19, 35, 33, 42, 44]，图如下所示，10 与 19 的位置互换一下。

![img](https://camo.githubusercontent.com/c4c5b468349cc3073f43b198bffcb2ee720acc4a/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d346664633330313961386334656331312e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

5.最后，我们使用值间隔 1（2 / 2） 对数组的其余部分进行排序，`Shell sort` 使用**插入排序**对数组进行排序。

**实现**:

```js
const shellSort = (arr = []) => {
  let len = arr.length,
    temp,
    gap = 1;
  console.time('希尔排序耗时');
  while (gap < len / 3) {
    //动态定义间隔序列
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i];
      let j = i - gap;
      for (; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
      console.log('arr  :', arr);
    }
  }
  console.timeEnd('希尔排序耗时');
  return arr;
};
```

**测试**:

```js
// 测试
const array = [35, 33, 42, 10, 14, 19, 27, 44];
console.log('原始array:', array);
const newArr = shellSort(array);
console.log('newArr:', newArr);
// 原始 array:   [35, 33, 42, 10, 14, 19, 27, 44]
// arr      :   [14, 33, 42, 10, 35, 19, 27, 44]
// arr      :   [14, 19, 42, 10, 35, 33, 27, 44]
// arr      :   [14, 19, 27, 10, 35, 33, 42, 44]
// arr      :   [14, 19, 27, 10, 35, 33, 42, 44]
// arr      :   [14, 19, 27, 10, 35, 33, 42, 44]
// arr      :   [14, 19, 27, 10, 35, 33, 42, 44]
// arr      :   [10, 14, 19, 27, 35, 33, 42, 44]
// arr      :   [10, 14, 19, 27, 35, 33, 42, 44]
// arr      :   [10, 14, 19, 27, 33, 35, 42, 44]
// arr      :   [10, 14, 19, 27, 33, 35, 42, 44]
// arr      :   [10, 14, 19, 27, 33, 35, 42, 44]
// 希尔排序耗时: 4.22509765625ms
// newArr:     [10, 14, 19, 27, 33, 35, 42, 44]
```

**分析**:

- 第一，希尔排序是原地排序算法吗 ？

希尔排序过程中，只涉及相邻数据的交换操作，只需要常量级的临时空间，空间复杂度为`O(1)` 。所以，**希尔排序是原地排序算法**。

- 第二，希尔排序是稳定的排序算法吗 ？

我们知道，单次直接插入排序是稳定的，它不会改变相同元素之间的相对顺序，但在多次不同的插入排序过程中，**相同的元素可能在各自的插入排序中移动，可能导致相同元素相对顺序发生变化**。
因此，**希尔排序不稳定**。

- 第三，希尔排序的时间复杂度是多少 ？
  最佳情况：`T(n) = O(n log n)`。
  最差情况：`T(n) = O(n log2 n)`。
  平均情况：`T(n) = O(n log2 n)`。

**动画**:

![img](https://camo.githubusercontent.com/26472912c7d1024d5ad06bf08cabc2ae4101fe9d/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d636461633564616663353337613036612e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

### 3.7 堆排序（Heap Sort）

堆的定义

堆其实是一种特殊的树。只要满足这两点，它就是一个堆。

- **堆是一个完全二叉树**。
  完全二叉树：除了最后一层，其他层的节点个数都是满的，最后一层的节点都靠左排列。
- 堆中每一个节点的值都必须**大于等于**（或**小于等于**）其子树中每个节点的值。
  也可以说：堆中每个节点的值都**大于等于**（或**者小于等**于）其左右子节点的值。这两种表述是等价的。

对于每个节点的值都**大于等于子树中每个节点值**的堆，我们叫作**大顶堆**。
对于每个节点的值都**小于等于子树中每个节点值的堆**，我们叫作**小顶堆**。

![heapSort](https://upload-images.jianshu.io/upload_images/12890819-ba0004cfc2c4c8d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

其中图 1 和 图 2 是大顶堆，图 3 是小顶堆，图 4 不是堆(最后一层的节点没有靠左排列)。除此之外，从图中还可以看出来，对于同一组数据，我们可以构建多种不同形态的堆。

**思想**:

1. 将初始待排序关键字序列 `(R1, R2 .... Rn)` 构建成大顶堆，此堆为初始的无序区；
2. 将堆顶元素 `R[1]` 与最后一个元素 `R[n]` 交换，此时得到新的无序区 (R1, R2, ..... Rn-1) 和新的有序区 (Rn) ，且满足 `R[1, 2 ... n-1] <= R[n]`。
3. 由于交换后新的堆顶 `R[1]` 可能违反堆的性质，因此需要对当前无序区 (`R1, R2 ...... Rn-1`) 调整为新堆，然后再次将 R[1] 与无序区最后一个元素交换，得到新的无序区 (`R1, R2 .... Rn-2`) 和新的有序区 (`Rn-1, Rn`)。不断重复此过程，直到有序区的元素个数为 `n - 1`，则整个排序过程完成。

**实现**:

```js
// 堆排序
const heapSort = array => {
  console.time('堆排序耗时');
  // 初始化大顶堆，从第一个非叶子结点开始
  for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
    heapify(array, i, array.length);
  }
  // 排序，每一次 for 循环找出一个当前最大值，数组长度减一
  for (let i = Math.floor(array.length - 1); i > 0; i--) {
    // 根节点与最后一个节点交换
    swap(array, 0, i);
    // 从根节点开始调整，并且最后一个结点已经为当前最大值，不需要再参与比较，所以第三个参数为 i，即比较到最后一个结点前一个即可
    heapify(array, 0, i);
  }
  console.timeEnd('堆排序耗时');
  return array;
};

// 交换两个节点
const swap = (array, i, j) => {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

// 将 i 结点以下的堆整理为大顶堆，注意这一步实现的基础实际上是：
// 假设结点 i 以下的子堆已经是一个大顶堆，heapify 函数实现的
// 功能是实际上是：找到 结点 i 在包括结点 i 的堆中的正确位置。
// 后面将写一个 for 循环，从第一个非叶子结点开始，对每一个非叶子结点
// 都执行 heapify 操作，所以就满足了结点 i 以下的子堆已经是一大顶堆
const heapify = (array, i, length) => {
  let temp = array[i]; // 当前父节点
  // j < length 的目的是对结点 i 以下的结点全部做顺序调整
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    temp = array[i]; // 将 array[i] 取出，整个过程相当于找到 array[i] 应处于的位置
    if (j + 1 < length && array[j] < array[j + 1]) {
      j++; // 找到两个孩子中较大的一个，再与父节点比较
    }
    if (temp < array[j]) {
      swap(array, i, j); // 如果父节点小于子节点:交换；否则跳出
      i = j; // 交换后，temp 的下标变为 j
    } else {
      break;
    }
  }
};
```

**测试**:

```js
const array = [4, 6, 8, 5, 9, 1, 2, 5, 3, 2];
console.log('原始array:', array);
const newArr = heapSort(array);
console.log('newArr:', newArr);
// 原始 array:  [4, 6, 8, 5, 9, 1, 2, 5, 3, 2]
// 堆排序耗时: 0.15087890625ms
// newArr:     [1, 2, 2, 3, 4, 5, 5, 6, 8, 9]
```

**分析**:

- 第一，堆排序是原地排序算法吗 ？

整个堆排序的过程，都只需要极个别临时存储空间，所以**堆排序是原地排序算法**。

- 第二，堆排序是稳定的排序算法吗 ？
  因为在排序的过程，**存在将堆的最后一个节点跟堆顶节点互换的操作**，所以就有可能改变值相同数据的原始相对顺序。
  所以，**堆排序是不稳定的排序算法**。

- 第三，堆排序的时间复杂度是多少 ？
  堆排序包括建堆和排序两个操作，建堆过程的时间复杂度是 O(n)，排序过程的时间复杂度是 O(nlogn)，所以，堆排序整体的时间复杂度是 O(nlogn)。

- 最佳情况：`T(n) = O(nlogn)`。
- 最差情况：`T(n) = O(nlogn)`。
- 平均情况：`T(n) = O(nlogn)`。

**动画**:

![img](https://camo.githubusercontent.com/986c70f5110e500539802b19e0067d65b201f550/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d363263633863333563653434396530322e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

### 3.8 桶排序（Bucket Sort）

桶排序是计数排序的升级版，也采用了`分治`思想。

**思想**:

- 将要排序的数据分到**有限数量**的几个**有序**的桶里。
- 每个桶里的数据再**单独进行排序**（一般用**插入排序**或者**快速排序**）。
- 桶内排完序之后，再把每个桶里的数据**按照顺序依次取出**，组成的序列就是有序的了。

比如：

桶排序利用了**函数的映射**关系，高效与否的关键就在于这个**映射函数**的确定。

为了使桶排序更加高效，我们需要做到这两点：

- 在额外空间充足的情况下，尽量**增大桶的数量**。
- 使用的映射函数能够将输入的 N 个数据**均匀的分配**到 K 个桶中。

桶排序的核心：就在于怎么把元素**平均分配**到每个桶里，**合理的分配将大大提高排序的效率**。

**实现**:

```js
const bucketSort = (array, bucketSize) => {
  if (array.length === 0) {
    return array;
  }

  console.time('桶排序耗时');
  let i = 0;
  let minValue = array[0];
  let maxValue = array[0];
  for (i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i]; //输入数据的最小值
    } else if (array[i] > maxValue) {
      maxValue = array[i]; //输入数据的最大值
    }
  }

  //桶的初始化
  const DEFAULT_BUCKET_SIZE = 5; //设置桶的默认数量为 5
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = new Array(bucketCount);
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  //利用映射函数将数据分配到各个桶中
  for (i = 0; i < array.length; i++) {
    buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
  }

  array.length = 0;
  for (i = 0; i < buckets.length; i++) {
    quickSort(buckets[i]); //对每个桶进行排序，这里使用了快速排序
    for (var j = 0; j < buckets[i].length; j++) {
      array.push(buckets[i][j]);
    }
  }
  console.timeEnd('桶排序耗时');

  return array;
};

// 快速排序
const quickSort = (arr, left, right) => {
  let len = arr.length,
    partitionIndex;
  left = typeof left != 'number' ? 0 : left;
  right = typeof right != 'number' ? len - 1 : right;

  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
};

const partition = (arr, left, right) => {
  //分区操作
  let pivot = left, //设定基准值（pivot）
    index = pivot + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
};

const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
```

**测试**:

```js
const array = [4, 6, 8, 5, 9, 1, 2, 5, 3, 2];
console.log('原始array:', array);
const newArr = bucketSort(array);
console.log('newArr:', newArr);
// 原始 array:  [4, 6, 8, 5, 9, 1, 2, 5, 3, 2]
// 堆排序耗时:   0.133056640625ms
// newArr:  	 [1, 2, 2, 3, 4, 5, 5, 6, 8, 9]
```

**分析**:

- 第一，桶排序是原地排序算法吗 ？
  因为桶排序的空间复杂度，也即内存消耗为 O(n)，所以不是原地排序算法。

- 第二，桶排序是稳定的排序算法吗 ？
  取决于每个桶的排序方式，比如：快排就不稳定，归并就稳定。

- 第三，桶排序的时间复杂度是多少 ？
  因为桶内部的排序可以有多种方法，是会对桶排序的时间复杂度产生很重大的影响。所以，桶排序的时间复杂度可以是多种情况的。

**总的来说**:

- 最佳情况：当输入的数据可以均匀的分配到每一个桶中。
- 最差情况：当输入的数据被分配到了同一个桶中。

以下是桶的内部排序为快速排序的情况：
如果要排序的数据有 n 个，我们把它们均匀地划分到 m 个桶内，每个桶里就有 `k = n / m` 个元素。每个桶内部使用快速排序，时间复杂度为 `O(k * logk)`。
m 个桶排序的时间复杂度就是 `O(m * k * logk)`，因为 `k = n / m`，所以整个桶排序的时间复杂度就是 O(n\*log(n/m))。
当桶的个数 m 接近数据个数 n 时，log(n/m) 就是一个非常小的常量，这个时候桶排序的时间复杂度接近 O(n)。
最佳情况：`T(n) = O(n)`。当输入的数据可以均匀的分配到每一个桶中。
最差情况：`T(n) = O(nlogn)`。当输入的数据被分配到了同一个桶中。
平均情况：`T(n) = O(n)`。

桶排序最好情况下使用线性时间 `O(n)`，桶排序的时间复杂度，取决与对各个桶之间数据进行排序的时间复杂度，因为其它部分的时间复杂度都为 `O(n)`。
很显然，**桶划分的越小，各个桶之间的数据越少，排序所用的时间也会越少**。但相应的空间消耗就会增大。

#### 适用场景

- 桶排序比较适合用在**外部排序**中。
- 外部排序就是数据存储在**外部磁盘**且数据量大，但内存有限，无法将整个数据全部加载到内存中。

### 3.9 计数排序（Counting Sort）

**思想**:

- 找出待排序的数组中**最大**和**最小**的元素。
- 统计数组中每个值为 i 的元素**出现的次数**，存入新数组 countArr 的第 i 项。
- 对所有的计数累加（从 countArr 中的第一个元素开始，每一项和前一项相加）。
- 反向填充目标数组：将每个元素 i 放在新数组的第 countArr[i] 项，每放一个元素就将 countArr[i] 减去 1 。

关键在于理解最后反向填充时的操作。

#### 使用条件

- 只能用在**数据范围不大**的场景中，若数据范围 `k` 比要排序的数据 `n` 大很多，就不适合用计数排序。
- 计数排序只能给**非负整数排序**，其他类型需要在不改变相对大小情况下，转换为非负整数。
- 比如如果考试成绩精确到小数后一位，就需要将所有分数乘以 10，转换为整数。

**实现**:

方法一：

```js
const countSort = (array = []) => {
  let len = arr.length,
    result = [],
    countArr = [],
    min = (max = array[0]); // 默认数组第一项为最大和最小值
  console.time('计数排序耗时');
  for (let i = 0; i < len; i++) {
    min = min <= array[i] ? min : array[i];
    max = max >= array[i] ? max : array[i];
    countArr[array[i]] = countArr[array[i]] ? countArr[array[i]] + 1 : 1;
  }
  console.log('countArr :', countArr);
  // 从最小值 -> 最大值,将计数逐项相加
  for (let j = min; j < max; j++) {
    countArr[j + 1] = (countArr[j + 1] || 0) + (countArr[j] || 0);
  }
  console.log('countArr 2:', countArr);
  // countArr 中,下标为 array 数值，数据为 array 数值出现次数；反向填充数据进入 result 数据
  for (let k = len - 1; k >= 0; k--) {
    // result[位置] = array 数据
    result[countArr[array[k]] - 1] = array[k];
    // 减少 countArr 数组中保存的计数
    countArr[array[k]]--;
    // console.log("array[k]:", array[k], 'countArr[array[k]] :', countArr[array[k]],)
    console.log('result:', result);
  }
  console.timeEnd('计数排序耗时');
  return array;
};
```

**测试**:

```js
const array = [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2];
console.log('原始 array: ', array);
const newArr = countingSort(array);
console.log('newArr: ', newArr);
// 原始 array:  [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2]
// 计数排序耗时:   5.6708984375ms
// newArr: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 6, 7, 7, 8, 8, 9, 9]
```

方法二

```js
const countingSort2 = (array = [], maxValue) => {
  console.time('计数排序耗时');
  maxValue = maxValue || array.length;
  let bucket = new Array(maxValue + 1),
    sortedIndex = 0,
    arrLen = array.length,
    bucketLen = bucket.length;

  for (let i = 0; i < arrLen; i++) {
    if (!bucket[array[i]]) bucket[array[i]] = 0;
    bucket[array[i]]++;
  }

  for (let j = 0; j < bucketLen; j++) {
    while (bucket[j] > 0) {
      array[sortedIndex++] = j;
      bucket[j]--;
    }
  }
  console.timeEnd('计数排序耗时');
  return array;
};
```

**测试**:

```js
// TODO 这排序有点问题
const array2 = [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2];
console.log('原始 array2: ', array2);
const newArr2 = countingSort2(array2, 21);
console.log('newArr2: ', newArr2);
// 原始 array:  [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2]
// 计数排序耗时:   0.043212890625ms
// newArr:  	 [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 6, 7, 7, 8, 8, 9, 9]
```

#### 例子

可以认为，**计数排序其实是桶排序的一种特殊情况**。

当要排序的 n 个数据，所处的范围并不大的时候，比如最大值是 k，我们就可以把数据划分成 k 个桶。每个桶内的数据值都是相同的，省掉了桶内排序的时间。

我们都经历过高考，高考查分数系统你还记得吗？我们查分数的时候，系统会显示我们的成绩以及所在省的排名。如果你所在的省有 50 万考生，如何通过成绩快速排序得出名次呢？

- 考生的满分是 900 分，最小是 0 分，这个数据的范围很小，所以我们可以分成 901 个桶，对应分数从 0 分到 900 分。
- 根据考生的成绩，我们将这 50 万考生划分到这 901 个桶里。桶内的数据都是分数相同的考生，所以并不需要再进行排序。
- 我们只需要依次扫描每个桶，将桶内的考生依次输出到一个数组中，就实现了 50 万考生的排序。
- 因为只涉及扫描遍历操作，所以时间复杂度是 `O(n)`。

**分析**:

- 第一，计数排序是原地排序算法吗 ？
  因为计数排序的空间复杂度为 O(k)，k 桶的个数，所以**不是原地排序算法**。
- 第二，计数排序是稳定的排序算法吗 ？
  计数排序不改变相同元素之间原本相对的顺序，因此它**是稳定的排序算法**。
- 第三，计数排序的时间复杂度是多少 ？
  最佳情况：`T(n) = O(n + k)`
  最差情况：`T(n) = O(n + k)`
  平均情况：`T(n) = O(n + k)`
  `k` 是待排序列最大值。

![img](https://camo.githubusercontent.com/c790a7b85e33e7fd084086c4dd64b2a6245ee1c8/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d343362323666323630643930356337372e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

### 3.10 基数排序（Radix Sort）

**思想**:

基数排序是一种非比较型整数排序算法，其原理是**将整数按位数切割成不同的数字**，然后按**每个位数分别比较**。

**例子**:

假设我们有 10 万个手机号码，希望将这 10 万个手机号码从小到大排序，你有什么比较快速的排序方法呢 ？

这个问题里有这样的规律：假设要比较两个手机号码 a，b 的大小，如果在前面几位中，a 手机号码已经比 b 手机号码大了，那后面的几位就不用看了。所以是基于`位`来比较的。

桶排序、计数排序能派上用场吗 ？手机号码有 11 位，范围太大，显然不适合用这两种排序算法。针对这个排序问题，有没有时间复杂度是 `O(n)` 的算法呢 ？ 有，就是基数排序。

**使用条件**:

- 要求数据可以分割独立的`位`来比较；
- 位之间由递进关系，如果 a 数据的高位比 b 数据大，那么剩下的位就不用比较了；
- 每一位的数据范围不能太大，要可以用线性排序，否则基数排序的时间复杂度无法做到 O(n)。

**方案**:

按照优先从高位或低位来排序有两种实现方案:

- MSD：由**高位为基底**，先按 k1 排序分组，同一组中记录, 关键码 k1 相等，再对各组按 k2 排序分成子组, 之后，对后面的关键码继续这样的排序分组，直到按最次位关键码 kd 对各子组排序后，再将各组连接起来，便得到一个有序序列。MSD 方式适用于**位数多**的序列。
- LSD：由**低位为基底**，先从 kd 开始排序，再对 kd - 1 进行排序，依次重复，直到对 k1 排序后便得到一个有序序列。LSD 方式适用于**位数少**的序列。

**实现**:

```js
/**
 * name: 基数排序
 * @param  array 待排序数组
 * @param  max 最大位数
 */
const radixSort = (array = [], max = 0) => {
  console.time('基数排序耗时');
  const buckets = [];
  let unit = 10,
    base = 1;
  for (let i = 0; i < max; i++, base *= 10, unit *= 10) {
    for (let j = 0; j < array.length; j++) {
      let index = ~~((array % unit) / base); // 依次过滤出个位，十位等等数字; 等同于 parseInt((array % unit) / base)
      if (buckets[index] == null) buckets[index] = []; // 初始化桶
    }
    buckets[index].push(array[j]); //往不同桶里添加数据
  }
  let pos = 0;
  for (let k = 0, len = buckets.length; k < len; k++) {
    let value;
    if (buckets[k] != null && Array.isArray(buckets[k])) {
      while ((value = buckets[k].shift()) != null) {
        array[pos++] = value; // 将不同桶里数据挨个捞出来，为下一轮高位排序做准备，由于靠近桶底的元素排名靠前，因此从桶底先捞
      }
    }
  }
  console.timeEnd('基数排序耗时');
  return array;
};
```

**测试**:

```js
const array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log('原始array:', array);
const newArr = radixSort(array, 2);
console.log('newArr:', newArr);
// 原始 array:  [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
// 堆排序耗时:   0.064208984375ms
// newArr:  	 [2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

**分析**:

- 第一，基数排序是原地排序算法吗 ？
  因为计数排序的空间复杂度为 O(n + k)，所以**不是原地排序算法**。

- 第二，基数排序是稳定的排序算法吗 ？
  基数排序不改变相同元素之间的相对顺序，因此它**是稳定的排序算法**。

第三，基数排序的时间复杂度是多少 ？
最佳情况：`T(n) = O(n * k)`
最差情况：`T(n) = O(n * k)`
平均情况：`T(n) = O(n * k)`
其中，k 是待排序列最大值。

**动画**:

LSD 基数排序动图演示：

![img](https://camo.githubusercontent.com/36515deba54fce16f25ef846e41ca687c8fc3df3/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d616666303165663461316531396637342e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

## 4. 复杂度对比

十大经典排序算法的 **时间复杂度与空间复杂度** 比较。

| 名称     | 平均       | 最好        | 最坏        | 空间     | 稳定性 | 排序方式  |
| -------- | ---------- | ----------- | ----------- | -------- | ------ | --------- |
| 冒泡排序 | O(n2)      | O(n)        | O(n2)       | O(1)     | Yes    | In-place  |
| 插入排序 | O(n2)      | O(n)        | O(n2)       | O(1)     | Yes    | In-place  |
| 选择排序 | O(n2)      | O(n2)       | O(n2)       | O(1)     | No     | In-place  |
| 归并排序 | O(n log n) | O(n log n)  | O(n log n)  | O(n)     | Yes    | Out-place |
| 快速排序 | O(n log n) | O(n log n)  | O(n2)       | O(logn)  | No     | In-place  |
| 希尔排序 | O(n log n) | O(n log2 n) | O(n log2 n) | O(1)     | No     | In-place  |
| 堆排序   | O(n log n) | O(n log n)  | O(n log n)  | O(1)     | No     | In-place  |
| 桶排序   | O(n + k)   | O(n + k)    | O(n2)       | O(n + k) | Yes    | Out-place |
| 计数排序 | O(n + k)   | O(n + k)    | O(n + k)    | O(k)     | Yes    | Out-place |
| 基数排序 | O(n \* k)  | O(n \* k)   | O(n \* k)   | O(n + k) | Yes    | Out-place |

### 名词解释

- `n`：数据规模；
- `k`：桶的个数；
- `In-place`: 占用常数内存，不占用额外内存；
- `Out-place`: 占用额外内存。

## 5. 算法可视化工具

- 算法可视化工具 [algorithm-visualizer](https://github.com/algorithm-visualizer/algorithm-visualizer) 是一个交互式的在线平台，可以从代码中可视化算法，还可以看到代码执行的过程。旨在通过交互式可视化的执行来揭示算法背后的机制。
  效果如下图：

![algorithm-visualizer](https://camo.githubusercontent.com/25174f5f8e0a612345b0f12ab5af6376c8eafa2d/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d306166373739363135656537666332372e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

- [算法可视化动画网站](https://visualgo.net/en)

效果如下图：

![img](https://camo.githubusercontent.com/2ad05a53d5fc1ae2efd5aa9794c4d2b218747f1a/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d363631626637353734316466376339612e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

- [算法可视化动画网站](https://www.ee.ryerson.ca)

效果如下图：

![img](https://camo.githubusercontent.com/e5fa2e4f871a01f6de4d0d67ee82a08f7d36929a/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d323435336564633163313965313462382e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

- [illustrated-algorithms](https://github.com/skidding/illustrated-algorithms)
  变量和操作的可视化表示增强了控制流和实际源代码。您可以快速前进和后退执行，以密切观察算法的工作方式。
  效果如下图：

![img](https://camo.githubusercontent.com/53216c2a3204926e59df763218f643e2bd146f0e/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d323262643035643839613839616638632e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

## 6. 系列文章

JavaScript 数据结构与算法之美 系列文章，暂时写了如下的 11 篇文章，后续还有想写的内容，再补充。

所写的内容只是数据结构与算法内容的冰山一角，如果你还想学更多的内容，推荐学习王争老师的 数据结构与算法之美。

从时间和空间复杂度、基础数据结构到排序算法，文章的内容有一定的关联性，所以阅读时推荐按顺序来阅读，效果更佳。

> 如果有错误或者不严谨的地方，请务必给予指正，以免误人子弟，十分感谢。

## 7. 最后

文中所有的代码及测试事例都已经放到我的 [GitHub](https://github.com/GolderBrother/blog/tree/master/code/data-structures-and-algorithms) 上了。

笔者为了写好这系列的文章，花费了大量的业余时间，边学边写，边写边修改，前后历时差不多 1 个多月，入门级的文章总算是写完了。

如果你觉得有用或者喜欢，就点收藏，顺便点个赞吧，你的支持是我最大的鼓励 ！
