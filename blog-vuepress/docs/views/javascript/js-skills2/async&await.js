// 优雅的处理 async/await

async function errorCaptured(asyncFunc) {
  try {
    let res = await asyncFunc();
    return [null, res];
  } catch (error) {
    return [error, null];
  }
}

// 使用方法：
let [err, res] = await errorCaptured(asyncFunc);