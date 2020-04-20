# 你未必知道的 49 个 CSS 知识点二~

## 下边列举的每一条都是亲测有效的~

### 01.【`负边距`】💘 负边距的效果。注意左右负边距表现并不一致。左为**负**时，是**左移**，右为**负**时，是**左拉**。上下与左右类似

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

 <comment/>
