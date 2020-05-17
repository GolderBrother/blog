// 洗牌算法

// 早前的 chrome 对于元素小于 10 的数组会采用插入排序，这会导致对数组进行的乱序并不是真正的乱序，即使最新的版本 chrome 采用了原地算法使得排序变成了一个稳定的算法，对于乱序的问题仍没有解决

//旧版本的chrome对于10个元素内的数组使用插入算法进行排序(最新版已经修改了排序算法)
function originSort(arr) {
  arr = arr.sort(() => Math.random() - 0.5)
  return arr
}

function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 生成随机索引
    const randomIndex = i + Math.floor(Math.random() * (arr.length - 1));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}

function shuffle2(arr) {
  let _arr = [];
  while (arr.length) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    _arr.push(arr.splice(randomIndex)[0]);
  }
  return _arr;
}

// 分析概率的函数
function statistics(fn, arr) {
  let times = 100000;
  let res = {};
  for (let i = 0; i < times; i++) {
    //每次循环声明一次防止引用同一数组
    let _arr = [...arr]
    let key = JSON.stringify(fn(_arr));
    res[key] ? res[key]++ : res[key] = 1;
  }

  // 为了方便展示，转换成百分比
  Object.keys(res).forEach(key => {
    res[key] = res[key] / times * 100 + '%'
  })

  console.log(fn.name, res)
}

statistics(originSort, [1, 2, 3])
statistics(shuffle, [1, 2, 3])
statistics(shuffle2, [1, 2, 3])

// originSort { '[2,1,3]': '25.069000000000003%',
//   '[1,2,3]': '25.085%',
//   '[1,3,2]': '12.612000000000002%',
//   '[2,3,1]': '12.519%',
//   '[3,1,2]': '12.325%',
//   '[3,2,1]': '12.389999999999999%' }