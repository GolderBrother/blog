// 简易的 CO 模块

function run(generatorFunc) {
  const it = generatorFunc();
  const result = it.next();
  return new Promise((resolve, reject) => {
    const next = function(result) {
      if (result.done) {
        resolve(result.value);
      }
      // 包装成成功态的Promise
      result.value = Promise.resolve(result.value);
      result.value.then(res => {
        const result = it.next(res);
        next(result);
      }).catch(err => reject(err));
    }
  });
}

function* func(data) {
  const res = yield api1(data);
  console.log('res', res);
  const res2 = yield api2(data);
  console.log('res2', res2);
  const res3 = yield api3(data);
  console.log('res3', res3);
}
run(func);