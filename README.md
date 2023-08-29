# GoEasyDesigner 窗口设计器

项目处于积极开发阶段

基于 go 语言 使用 wails框架, 支持 window macos linux 等系统.

### 项目进度
- [x] 兼容 window  macos  linux 
- [x] 完成整体界面布局以及整体功能流程，界面绘制，属性修改，组件拖拽、双击组件跳转到对应的事件函数
- [ ] 组件库完善中
- [ ] 绘制布局容器体验完善中
- [ ] 集成go语言开发环境完善中

欢迎前端大佬pr

# 运行环境

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

### 目前没有编译版本，所以下载项目后自行玩耍

# 运行 GoEasyDesigner

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

# wails-demo 为模板项目

保存界面数据到这里

```
wails-demo/frontend/src/stores/组件数据.json
```

运行 就可以看到效果了

```
cd wails-demo
wails dev
```

# IDE代码跳转插件
想体验双击按钮自动跳转到点击事件的函数

需要配置ide插件 请安装 QtEasyDesigner 插件，重启ide就可以看到端口号

然后在软件的项目配置填写插件的端口
例如
```
http://127.0.0.1:13403
```

![image-20230828083413650](README.assets/image-20230828083413650.png)



![image-20230828084834120](README.assets/image-20230828084834120.png)