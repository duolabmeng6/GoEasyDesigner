# GoEasyDesigner 窗口设计师
![image-20230828083413650](README.assets/image-20230828083413650.png)
![image-20230828084834120](README.assets/image-20230828084834120.png)

项目处于积极开发阶段 欢迎前端大佬pr

基于 go 语言 使用 wails框架, 支持 window macos linux 等系统. 

# 项目地址

主仓库 https://github.com/duolabmeng6/GoEasyDesigner 

镜像仓库 https://gitee.com/duolabmeng666/go-easy-designer 

# 在线体验

没钱买服务器所以都是白嫖 pages 国内打不开就换一个地址呗

https://g.yx24.me

https://gg.yx24.me

https://ggg.yx24.me

https://goeasy.onrender.com

https://go-easy-designer.vercel.app


画好界面点保存,会下载2个文件 设计文件.json`,`辅助代码.js`

注意你的浏览器允许下载多个文件的权限

下载本项目的代码找到 wails-demo复制出来.

`wails-demo/frontend/src/窗口/设计文件.json`

`wails-demo/frontend/src/窗口/辅助代码.js`

运行项目 就可以看到你设计好的界面了.

```
cd wails-demo
wails dev
```

想要更好的无缝使用体验下载客户端程序.

### 项目进度
- [x] 兼容 window  macos  linux 
- [x] 完成整体界面布局以及整体功能流程，界面绘制，属性修改，组件拖拽、双击组件跳转到对应的事件函数
- [ ] 组件库完善中
- [ ] 绘制布局容器体验完善中
- [ ] 集成go语言开发环境完善中



# 运行环境

请按顺序安装好

### 1.安装 go 语言

https://golang.org/dl/

### 2.安装 node 环境

https://nodejs.org/zh-cn/download/

### 3.安装 wails
https://wails.io/zh-Hans/docs/gettingstarted/installation/

```
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

安装成功后，运行 wails 命令，有内容输出即为安装成功。


### 4.下载本项目

该目录为设计好的界面最终运行的环境你的代码也将在这里编写

将这个目录复制出来 `GoEasyDesigner/wails-demo`

wails 同时调试前端和后端

```
cd wails-demo
wails dev
```

### 5.下载 GoEasyDesigner

下载最新版本: https://github.com/duolabmeng6/GoEasyDesigner/releases

直接运行即可

设计好的界面数据保存在这里

```
wails-demo/frontend/src/窗口/设计文件.json
```
### 6. webstorm IDE代码跳转插件

想体验双击按钮自动跳转到点击事件的函数

需要配置ide插件 请安装 QtEasyDesigner 插件,在本项目的文件中，

重启ide就可以看到端口号 , 然后在软件的项目配置填写插件的端口

例如
```
http://127.0.0.1:13403
```

go代码使用 goland ide

js代码使用 webstorm ide 绝大部分编写代码都应该在 js中编写,如果js无法实现的可以调用go代码

### 开发请看
#### 运行 GoEasyDesigner

wails 同时调试前端和后端

```
cd GoEasyDesigner
wails dev
```

如果调试前端可以这样

```
cd GoEasyDesigner\frontend
vite 
```

#### wails-demo 为模板项目

保存界面数据到这里

```
wails-demo/frontend/src/窗口/设计文件.json
```

运行 就可以看到效果了

```
cd wails-demo
wails dev
```


