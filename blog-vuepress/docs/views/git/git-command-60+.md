# [吐血整理] 60+Git 常用命令行

`Git` 的命令实在是太多了，有的小伙伴就说了，我可以用客户端(`Source Tree`、`Gitkraken`、`tortoiseGit`)它们不香吗？

先不论 `GUI` 是否支持复杂的操作，当你在实际工作中遇到问题的时候，可能你无法找到 `GUI` 的解决方案，因为搜索引擎查出来的都是命令行。而且命令行的错误提示是非常详细的，你可以准确锁定你错误的原因以及正确的使用方法，孰能自然生巧。

本文整理了一些常用的 `Git` 操作，老司机可以温故知新，新手可以点赞收藏。文末提供了入门教程及学习资源，请自行下滑～

## 配置操作

### 全局配置

```bash
git config --global user.name '你的名字'
git config --global user.email '你的邮箱'
```

### 当前仓库配置

```bash
git config --local user.name '你的名字'
git config --local user.email '你的邮箱'
```

### 查看 global 配置

```bash
git config --global --list
```

### 查看当前仓库配置

```bash
git config --local --list
```

### 删除 global 配置

```bash
git config --unset --global 要删除的配置项
```

### 删除当前仓库配置

```bash
git config --unset --local 要删除的配置项
```

## 本地操作

```bash
git status
```

### 将当前目录及其子目录下所有变更都加入到暂存区

```bash
git add .
```

### 将仓库内所有变更都加入到暂存区

```bash
git add -A
```

### 将指定文件添加到暂存区

```bash
git add 文件1 文件2 文件3
```

### 比较工作区和暂存区的所有差异

```bash
git diff
```

### 比较某文件工作区和暂存区的差异

```bash
git diff 文件名
```

### 比较暂存区和 HEAD 的所有差异

```bash
git diff --cached
```

### 比较某文件暂存区和 HEAD 的差异

```bash
git diff --cached 文件名
```

### 比较某文件工作区和 HEAD 的差异

```bash
git diff HEAD 文件
```

### 创建 commit

```bash
git commit
```

### 将工作区指定文件恢复成和暂存区一致

```bash
git checkout 文件1 文件2 文件3
```

### 将暂存区指定文件恢复成和 HEAD 一致

```bash
git reset 文件1 文件2 文件3
```

### 将暂存区和工作区所有文件恢复成和 HEAD 一样

```bash
git reset --hard HEAD
```

### 用 difftool 比较任意两个 commit 的差异

```bash
git difftool 提交1 提交2
```

### 查看哪些文件没被 Git 管控

```bash
git ls-files --others
```

### 将未处理完的变更先保存到 stash 中

> 相当于是**临时**存放缓冲区，可用于**临时**保存和回复修改，可跨分支。在未`add`之前才能执行`stash`！！！

保存，`save` 为可选项，`message` 为本次保存的注释

```bash
git stash [save message]
```

### 临时任务处理完后继续之前的工作

- `pop` 不保留 `stash`
- `apply` 保留 `stash`

```bash
git stash pop
```

```bash
git stash apply
```

### 查看所有 stash

```bash
git stash list
```

### 取回某次 stash 的变更

恢复，`num`是可选项，通过`git stash list` 可查看具体值。**只能恢复一次**

```bash
git stash pop stash@{数字n}
```

恢复，`num`是可选项，通过`git stash list`可查看具体值。**可回复多次**

### 删除某个保存

num 是可选项，通过 git stash list 可查看具体值

```bash
git stash drop stash@{num}
```

### 删除所有保存

```bash
git stash clear
```

### 优雅修改最后一次 commit

```bash
git add .
git commit --amend
```

## 分支操作

### 查看当前工作分支及本地分支

```bash
git branch -v
```

### 查看本地和远程分支

```bash
git branch -av
```

### 查看远程分支

```bash
git branch -rv
```

### 切换到指定分支

```bash
git checkout 指定分支
```

### 基于当前分支创建新分支

```bash
git branch 新分支
```

### 基于指定分支创建新分支

```bash
git branch 新分支 指定分支
```

### 基于某个 commit 创建分支

```bash
git branch 新分支 某个 commit 的 id
```

### 创建并切换到该分支

方便快捷用的最多~

```bash
git checkout -b 新分支
```

### 安全删除本地某分支

```bash
git branch -d 要删除的分支
```

### 强行删除本地某分支

```bash
git branch -D 要删除的分支
```

### 删除已合并到 master 分支的所有本地分支

这个有点复杂，平常几乎没用到

```bash
git branch --merged master | grep -v '^\*\| master' | xargs -n 1 git branch -d 
```

### 删除远程 origin 已不存在的所有本地分支

```bash
git remote prune orign
```

### 将 A 分支合入到当前分支中且为 merge 创建 commit

```bash
git merge A分支
```

### 将 A 分支合入到 B 分支中且为 merge 创建 commit

```bash
git merge A分支 B分支
```

### 将当前分支基于 B 分支做 rebase，以便将 B 分支合入到当前分支

```bash
git rebase B分支
```

### 将 A 分支基于 B 分支做 rebase，以便将 B 分支合入到 A 分支

```bash
git rebase B分支 A分支
```

## 变更历史

### 当前分支各个 commit 用一行显示

```bash
git log --oneline
```

### 显示就近的 n 个 commit

```bash
git log -n

# 比如显示就近的 10 个 commit
git log -10
```

### 用图示显示所有分支的历史

```bash
git log --oneline --graph --all
```

提交记录像树状图一样，顿时好看多了~

### 查看涉及到某文件变更的所有 commit

```bash
git log 文件
```

### 某文件各行最后修改对应的 commit 以及作者

```bash
git blame 文件
```

## 标签(tag)操作

### 查看已有的所有标签

```bash
git tag
```

### 新建标签

```bash
git tag v1.0
```

### 新建带备注标签

```bash
git tag -a v1.0 -m '前端超神路'
```

### 给指定的 commit 打标签

```bash
git tag v1.0 commitid
```

### 推送一个本地标签

```bash
git push origin v1.0
```

### 推送全部未推送过的本地标签

```bash
git push origin --tags  
```

### 删除一个本地标签

```bash
git tag -d v1.0
```

### 删除一个远程标签

```bash
git push origin :refs/tags/v1.0
```

## 远端(远程)交互

### 查看所有的远端仓库地址

```bash
git remote -v

# 或者这样
git remote --verbose
```

### 添加远端仓库

```bash
git remote add origin url

# 比如
git remote add origin https://github.com/GolderBrother/blog.git
```

### 删除远端仓库

```bash
git remote remove origin remote的名称
# 比如
git remote remove origin https://github.com/GolderBrother/blog.git
```

### 重命名远端仓库

```bash
git remote rename 旧名称 新名称
```

### 将远端所有分支和标签的变更都拉到本地

```bash
git fetch remote
```

### 把远端分支的变更拉到本地，且 merge 到本地分支

这个平常工作和学习中用的挺多

```bash
git pull origin 分支名
```

### 将本地分支 push 到远端

这个平常工作和学习中用的挺多

```bash
git push origin 分支名
```

或者这样

```bash
git push remote :远端分支名
```

### 删除远端分支

```bash
git push remote --delete 远端分支名
```

## 学习资料

- [阮一峰-Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)
- [廖雪峰的 Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600/900937935629664)
- [17K star LearnGitBranching](https://github.com/pcottle/learnGitBranching)
- [Github 官方教程](https://lab.github.com/)
- [这才是真正的 Git——Git 内部原理揭秘！](https://zhuanlan.zhihu.com/p/96631135)
- [Git commit message 规范](https://juejin.im/post/5d0b3f8c6fb9a07ec07fc5d0)
- [awesome-git](https://github.com/dictcp/awesome-git)

## 参考资料

- [CS Visualized: Useful Git Commands](https://dev.to/lydiahallie/cs-visualized-useful-git-commands-37p1)

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)~
