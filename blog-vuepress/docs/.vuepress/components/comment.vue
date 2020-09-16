<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script>
export default {
  name: "comment",
  data() {
    return {};
  },
  mounted() {
    let body = document.querySelector(".gitalk-container");
    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js";
    body.appendChild(script);
    script.onload = () => {
      const commentConfig = {
        // clientID: "c50e77b1ca610a5e634c",
        // clientSecret: "fb025b029d1426973a66801f8c02f40d15fba5ec",
        clientID: "a22e42a566f59f9ef99ec51f87a3e23a3036cf8a7329490cc471e438a6bee361",
        clientSecret: "081b7836b0b9474aeb634892c9ad01cb4bb397ea9aff1b6d178b5e3b6f8a4d96",
        repo: "blog",
        owner: "GolderBrother",
        // 这里接受一个数组，可以添加多个管理员，可以是你自己
        admin: ["GolderBrother"],
        // id 用于当前页面的唯一标识，一般来讲 pathname 足够了，
        // 但是如果你的 pathname 超过 50 个字符，GitHub 将不会成功创建 issue，此情况可以考虑给每个页面生成 hash 值的方法.
        id: location.pathname,
        distractionFreeMode: false
      };
      const gitalk = new Gitalk(commentConfig);
      gitalk.render("gitalk-container");
    };
  }
};
</script>
<style>
@import "../css/gittalk.css";
</style>
