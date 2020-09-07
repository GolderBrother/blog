// 图片懒加载
// getBoundingClientRect 实现懒加载
const imgList1 = [...document.querySelectorAll(".get_bounding_rect")];
let num = imgList1.length;

let lazyload1 = (() => {
  // 记录图片加载完成个数
  let count = 0;
  return () => {
    imgList1.forEach(img => {
      const imgRect = img.getBoundingClientRect();
      // 判断图片是否在视口中了
      const isInViewPort = imgRect.top < window.innerHeight;
      if (isInViewPort) {
        // 加载图片：将假的src替换到真正的src
        img.src = img.dataset.src;
        count++;
        // 当所有图片加载完毕，解绑scroll事件
        if (count === num) {
          document.removeEventListener('scroll', lazyload1);
        }
      }
    })
  }
})();

// 这里引用了 throttle.js 的节流函数
lazyLoad1 = proxy(lazyLoad1, 100);

document.addEventListener('scroll', lazyload1);
// 手动加载一次，否则首屏的图片不触发滚动无法加载
lazyload1();

// intersectionObserver 实现懒加载
let imgList2 = Array.from(document.querySelectorAll(".intersection_observer"));

let lazyload2 = function() {
  // 实例化observer
  // 可以用来监听可见区域的特定变化值
  // MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
  let observer = new IntersectionObserver(entries => {
    //entries存储着所有观察被元素的intersectionObserverEntry配置
    entries.forEach(entry => {
      // 大于0表示进入视口
      if (entry.intersectionRatio > 0) {
        // 加载图片：将假的src替换到真正的src
        entry.target.src = entry.target.dataset.src;
        // 取消观察
        observer.unobserve(entry.target);
      }
    });
  });
  imgList2.forEach(img => {
    // 观察img
    observer.observe(img);
  });
}

lazyLoad2()