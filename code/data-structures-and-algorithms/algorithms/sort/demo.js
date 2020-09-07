const radixSort = (array = [], max = 0) => {
  console.time('基数排序耗时');
  const buckets = [];
  let unit = 10,
    base = 1;
  for (let i = 0; i < max; i++, base *= 10, unit *= 10) {
    for (let j = 0; j < array.length; j++) {
      let index = ~~((array % unit) / base); // 等同于 parseInt((array % unit) / base)
      if (buckets[index] == null) buckets[index] = []; // 初始化桶
    }
    buckets[index].push(array[j]);
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

const array = [5, 4, 3, 2, 1];
console.log('radixSort 原始 array :', JSON.stringify(array));
console.log('radixSort 排序后的 array :', JSON.stringify(radixSort(array)));