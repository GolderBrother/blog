// 函数防抖
/**
 * @description 函数防抖
 * @param {Function} func -需要函数防抖的函数
 * @param {Number} time -延迟时间
 * @param {Options} options -配置项
 * @return {Function} -经过防抖处理的函数
 **/

/**
 * @typedef {Object} Options -配置项
 * @property {Boolean} leading -开始是否需要立即触发一次
 * @property {Boolean} trailing -结束后是否需要额外触发一次
 * @property {this} context -上下文
 **/

function debounce(func, time = 17, options = {
  leading: true, // leading 为是否在进入时立即执行一次
  trailing: true, //  trailing 为是否在事件触发结束后额外再触发一次
  context: null
}) {
  let timer;
  const _debounce = function(...args) {
    // 如果有上次的定时器在进行，就先清除
    if (timer) clearTimeout(timer);
    if (options.leading && !timer) {
      timer = setTimeout(null, time);
      func.apply(options.context, args);
    } else if (options.trailing) {
      timer = setTimeout(() => {
        func.apply(options, args);
        timer = null;
      }, time);
    }
  }
  _debounce.cancel = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  return _debounce;
}