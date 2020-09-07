// 函数节流
/**
 * @description 函数节流
 * @param {Function} func -需要函数节流的函数
 * @param {Number} time -延迟时间
 * @param {Options} options -配置项
 * @return {Function} -经过节流处理的函数
 **/

/**
 * @typedef {Object} Options -配置项
 * @property {Boolean} leading -开始是否需要立即触发一次
 * @property {Boolean} trailing -结束后是否需要额外触发一次
 * @property {this} context -上下文
 **/
const throttle = (
  func,
  time = 17,
  options = {
    leading: true,
    trailing: false,
    context: null
  }
) => {
  let previous = new Date(0).getTime()
  let timer;
  const _throttle = function(...args) {
    let now = new Date().getTime();
    if (!options.leading) { // 开始不需要立即触发一次
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        func.apply(options.context, args);
      });
    } else if (now - previous > time) { // 如果差时超过了定时时间，则立即执行函数
      func.apply(options.context, args);
      // 更新previous
      previous = now;
    } else if (options.trailing) { // 结束后需要额外触发一次
      // 先清除定时器后重新开启
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(options.context, args);
      }, time);
    }
  }
  _throttle.cancel = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  return _throttle;
}