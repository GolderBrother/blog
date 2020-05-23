const seconds = 1000;
const minute = seconds * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;

function getTimer(stringTime) {
  const time1 = new Date().getTime(); //当前的时间戳
  console.log(time1);
  const time2 = Date.parse(new Date(stringTime)); //指定时间的时间戳
  console.log(time2);
  const time = time1 - time2;

  let result = null;
  if (time < 0) {
    alert('设置的时间不能早于当前时间！');
  } else if (time / month >= 1) {
    result = parseInt(time / month) + '月前！';
  } else if (time / week >= 1) {
    result = parseInt(time / week) + '周前！';
  } else if (time / day >= 1) {
    result = parseInt(time / day) + '天前！';
  } else if (time / hour >= 1) {
    result = parseInt(time / hour) + '小时前！';
  } else if (time / minute > 1) {
    result = parseInt(time / minute) + '分钟前！';
  } else if (time / seconds >= 1 && time / seconds <= 60) {
    result = parseInt(time / seconds) + '秒前！';
  } else {
    result = '刚刚发布！';
  }
  console.log(result);
}
getTimer('2020-05-23 11:27:12'); // 24秒前！

function thousandsSplit(num = 0) {
  if (num !== null) {
    return num.toLocaleString();
  } else {
    return '-';
  }
}
console.log(thousandsSplit(153812.7));


function micrometerLevel(value) {
  if (typeof value === 'undefined' || value === null || isNaN(value)) {
    return value;
  }
  const stringValue = value.toString();
  const [integer, decimal] = stringValue.split('.');
  if (integer.length <= 3) {
    return stringValue;
  }
  let total = '';
  for (let i = integer.length - 1, j = 1; i > -1; i--, j++) {
    const num = j % 3 === 0 ? `,${integer[i]}` : integer[i];
    total = num + total;
  }
  total = total.replace(/^,/, '') + (decimal ? `.${decimal}` : '');
  return total;
}

console.log(micrometerLevel(153812.7));

const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? (a + 1) : (a + 0)), 0);
console.log(countOccurrences([1, 1, 2, 3, 3, 3, 3, 4, 6, 6], 3));

function sum() {
  // 类数组转换成真正的数组，也可以用 [...arguments] or Array.from(arguments)
  // 接受第一次传入的参数
  const args = [].slice.call(arguments);

  const fn = function() {
    // 接受后面调用传入的参数
    const args2 = [].slice.call(arguments);
    return sum.apply(null, args.concat(args2));
  }

  fn.valueOf = function() {
    return args.reduce((a, b) => a + b);
  }
  return fn;
}

console.log(sum(1)(2)(3).valueOf()); // 6


const mapLimit = (list, limit, asyncHandle) => {
  // 然后，等每个异步请求执行完，执行下一个list项
  const recursion = arr => {
    return asyncHandle(arr.shift()).then(res => {
      console.log('data', res);
      if (arr.length > 0) {
        return recursion(arr);
      }
      return 'finish';
    });
  };
  let asyncList = [];
  let listCopy = [].concat(list);
  // 瞬发 limit 个异步请求，我们就得到了并发的 limit 个异步请求
  while (limit--) {
    asyncList.push(recursion(listCopy));
  }
  // 等list所有的项迭代完之后的回调
  return Promise.all(asyncList);
};

const dataLists = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 100, 123];
let count = 0;
mapLimit(dataLists, 3, curItem => {
  return new Promise(resolve => {
    count++;
    setTimeout(() => {
      console.log(curItem, '当前并发量:', count--);
      resolve();
    }, Math.random() * 5000);
  });
}).then(response => {
  console.log('finish', response);
});

// 2 '当前并发量:' 3
// data undefined
// ...
// 100 '当前并发量:' 1
// data undefined
// finish [ 'finish', 'finish', 'finish' ]

/**
 * @param {string} str
 * @return {string}
 */
const reverseWords = function(str) {
  let l = '';
  let l1 = '';
  for (let i = 0; i < str.length; i++) {
    // 没有遇到 空格 就继续反转字符串
    if (str[i] != ' ') {
      // 当前字符+上一个字符 => 反转字符串
      l = str[i] + l;
    } else {
      // 遇到空格：就把l 加到 l1 上 并加上空格
      l1 = l1 + l + ' ';
      l = '';
    }
  }
  // 最后一个 是没有空格的 所以最后一个 l 是没加上的 所以返回的时候在上最后一个 l
  return l1 + l;
  // return s.split("").reverse().join("").split(" ").reverse().join(" ")
};

console.log(reverseWords(`www.toutiao.com.cn`)); // nc.moc.oaituot.www

/* const dragDOM = document.getElementById('drag');
const body = document.body;

const mouseDown = Rx.Observable.fromEvent(dragDOM, 'mousedown');
const mouseUp = Rx.Observable.fromEvent(body, 'mouseup');
const mouseMove = Rx.Observable.fromEvent(body, 'mousemove');

mouseDown
  .map(event => mouseMove.takeUntil(mouseUp))
  .concatAll()
  .map(event => ({
    x: event.clientX,
    y: event.clientY
  }))
  .subscribe(pos => {
    dragDOM.style.left = pos.x + 'px';
    dragDOM.style.top = pos.y + 'px';
  }) */