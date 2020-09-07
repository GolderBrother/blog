// 发布订阅 EventEmitter

class EventEmitter {
  constructor() {
    this.subs = {};
  }

  // on 方法注册事件
  on(event, cb) {
    (this.subs[event] || (this.subs[event] = [])).push(cb);
  }

  // trigger 方法触发事件
  trigger(event, ...args) {
    // 遍历监听者事件依次执行
    this.subs[event] && this.subs[event].forEach(cb => {
      cb(...args);
    });
  }

  // 注册只触发一次的事件
  once(event, onceCb) {
    const cb = (...args) => {
      onceCb(...args);
      // 执行完就注销这事件
      this.off(event, onceCb);
    }
    this.on(event, cb);
  }

  // 注销事件
  off(event, offCb) {
    if (this.subs[event]) {
      let index = this.subs[event].findIndex(cb => cb === offCb);
      this.subs[event].splice(index, 1);
      if (!this.subs[event].length) delete this.subs[event];
    }
  }
}

let dep = new EventEmitter()

let cb = function() {
  console.log('handleClick')
}

let cb2 = function() {
  console.log('handleMouseover')
}

console.group()
dep.on('click', cb)
dep.on('click', cb2)
dep.trigger('click')
console.groupEnd()

console.group()
dep.off('click', cb)
dep.trigger('click')
console.groupEnd()

console.group()
dep.once('mouseover', cb2)
dep.trigger('mouseover')
dep.trigger('mouseover')
console.groupEnd()

// handleClick
// handleMouseover
// handleMouseover
// handleMouseover