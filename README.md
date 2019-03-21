# gocronx



# 项目简介
基于gocron - 定时任务管理系统,使用Go语言开发的轻量级定时任务集中调度和管理系统, 用于替代Linux-crontab 

 

## 功能特性
* Web界面管理定时任务
* crontab时间表达式, 精确到秒
* 任务执行失败可重试
* 任务执行超时, 强制结束
* 任务依赖配置, A任务完成后再执行B任务
* 账户权限控制
* 任务类型
    * shell任务
    > 在任务节点上执行shell命令, 支持任务同时在多个节点上运行
    * HTTP任务
    > 访问指定的URL地址, 由调度器直接执行, 不依赖任务节点
* 查看任务执行结果日志
* 任务执行结果通知, 支持邮件、Slack、Webhook


    
### 支持平台
> Windows、Linux、Mac OS

### 环境要求
>  MySQL 
>  MongoDB (后续扩展)

## 安装

###  二进制安装
1. 解压压缩包   
2. `cd 解压目录`   
3. 启动        
* 调度器启动        
  * Windows: `gocronx.exe web`   
  * Linux、Mac OS:  `./gocronx web`
* 任务节点启动, 默认监听0.0.0.0:5921
  * Windows:  `gocronx-node.exe`
  * Linux、Mac OS:  `./gocronx-node`
4. 浏览器访问 http://localhost:5920

### 源码安装
- 安装Go 1.9+
- `go get -d github.com/sunny5156/gocronx`
- 编译 `make`
- 启动
    * gocronx `./bin/gocronx web`
    * gocronx-node `./bin/gocronx-node`


配置: /app/conf/app.ini

日志: /app/log/cron.log


### 开发

1. 安装Go1.9+, Node.js, Yarn
2. 安装前端依赖 `make install-vue`
3. 启动gocronx, gocronx-node `make run`
4. 启动node server `make run-vue`, 访问地址 http://localhost:8080

访问http://localhost:8080, API请求会转发给gocronx

`make` 编译

`make run` 编译并运行

`make package` 打包 
> 生成当前系统的压缩包 gocronx-v1.5-darwin-amd64.tar.gz gocronx-node-v1.5-darwin-amd64.tar.gz

`make package-all` 生成Windows、Linux、Mac的压缩包

### 命令

* gocronx
    * -v 查看版本

* gocronx web
    * --host 默认0.0.0.0
    * -p 端口, 指定端口, 默认5920
    * -e 指定运行环境, dev|test|prod, dev模式下可查看更多日志信息, 默认prod
    * -h 查看帮助
* gocronx-node
    * -allow-root *nix平台允许以root用户运行
    * -s ip:port 监听地址  
    * -enable-tls 开启TLS    
    * -ca-file   CA证书文件   
    * -cert-file 证书文件  
    * -key-file  私钥文件
    * -h 查看帮助
    * -v 查看版本

## 程序使用的组件
* Web框架 [Macaron](http://go-macaron.com/)
* 定时任务调度 [Cron](https://github.com/robfig/cron)
* ORM [Xorm](https://github.com/go-xorm/xorm)
* UI框架 [Element UI](https://github.com/ElemeFE/element)
* 依赖管理 [Govendor](https://github.com/kardianos/govendor)
* RPC框架 [gRPC](https://github.com/grpc/grpc)
