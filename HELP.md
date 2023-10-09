# 网站建立过程

## 一. 在github上准备仓库
* 新建仓库
* 在项目下运行命令`git init`初始化仓库
* 将项目连接到github上的远程仓库，运行`git remote add origin <server>`将本地仓库和Github上一个仓库关联
* 通过`git push origin master`将改动提交到远端的master分支
* 提交时报错,使用`git config --global --unset http.proxy`可以解决这个问题
>> Failed to connect to github.com port 443 after 21062 ms: Couldn't connect to server

* 遇到问题，远程仓库默认分支为main，而我们推送的是master
* 使用命令`git branch`可以查看本地的分支，本地只有一个master分支
* 使用`git brach -d 分支名`可以删除本地分支
* 使用`git push origin --delete 分支名`可以删除远程分支
* 删除分支的时候报以下错误，我的原因是Git的默认分支是master，而Github上的默认分支是main分支是默认分支，需要先将默认分支改成其他分支，我是在Github项目中Setting修改
>> ! [remote rejected] main (refusing to delete the current branch: refs/heads/main)

* 如果一些分支在远程仓库存在而本地不存在可以通过`git fetch -p`来同步远程分支
## 开始项目的编写
