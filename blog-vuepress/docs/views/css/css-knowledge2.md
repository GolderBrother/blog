# 你未必知道的 49 个 CSS 知识点二~

## 下边列举的每一条都是亲测有效的~

### 01.🍧focus-within 是为数不多的一个，可以由子操作父选择器

![16db4441c0ff2741](./knowledge2/16db4441c0ff2741.png)

实现代码是这样的：

```html
<style>
  .container {
    display: flex;
    justify-content: center;
  }
  .container:focus-within {
    transform: scale(1.5);
  }
  .container:focus-within button {
    transform: rotate(1turn);
    transition: 1.5s cubic-bezier(0.24, 1.82, 0.53, 1.65);
  }
</style>
<div class="container">
  <input />
  <button>login</button>
</div>
```

### 2.♐ 容易被忽视的 target 选择器

![16db44433839e942](./knowledge2/16db44433839e942.png)

实现代码是这样的

```html
<style>
  .container {
    width: 80%;
    margin: auto;
  }

  .container div {
    width: 100px;
    height: 100px;
    margin: 5px;
    background-color: aqua;
    transition: flex 1s;
  }

  .container main {
    display: flex;
  }

  .container div:target {
    flex: 1;
    background-color: purple;
  }
</style>
<div class="container">
  <a href="#1">1</a>
  <a href="#2">2</a>
  <a href="#3">3</a>
  <main>
    <div id="1"></div>
    <div id="2"></div>
    <div id="3"></div>
  </main>
</div>
```

### 3.👓 只用 background 就能实现简单滤镜效果

![16db45ce7f240ba0](./knowledge2/16db45ce7f240ba0.png)

实现代码是这样的

```html
<style>
  .container {
    width: 300px;
    height: 120px;
    --c: aqua;
    background: linear-gradient(var(--c), var(--c)),
      url('./knowledge2/fengjing.jpg') no-repeat center/cover;
  }
</style>
<div class="container"></div>
```

### 4.🐍 蛇形边框特效原理

![16db45d042d2c6d8](./knowledge2/16db45d042d2c6d8.png)

实现代码是这样的

```html
<style>
  div {
    width: 190px;
    height: 190px;
    background: aqua;
    position: relative;
  }

  div:before

    /* ,div:after  */
 {
    position: absolute;
    content: '';
    left: -5px;
    right: -5px;
    top: -5px;
    bottom: -5px;
    border: 5px solid #ff00ff88;
  }

  div:before {
    animation: move 5s linear infinite;
  }

  /* div:after {
      border-color: #ff000088;
      animation: move 3s linear infinite alternate -2.5s;
    } */

  @keyframes move {
    0%,
    100% {
      clip: rect(0, 200px, 5px, 0);
    }

    25% {
      clip: rect(0, 200px, 200px, 195px);
    }

    50% {
      border-color: #00ff0088;
      clip: rect(195px, 200px, 200px, 0);
    }

    75% {
      clip: rect(0, 5px, 200px, 0px);
    }
  }
</style>
<div>content</div>
```
