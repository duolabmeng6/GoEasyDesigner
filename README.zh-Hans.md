<p align="center" style="text-align: center">

</p>

<p align="center">
</p>

<div align="center">
<strong>
<samp>

[English](README.md) · [简体中文](README.zh-Hans.md)

</samp>
</strong>
</div>

# 窗口设计师
![666](https://github.com/duolabmeng6/GoEasyDesigner/assets/59047063/a89d2ab9-9ba3-4efc-b0fa-0a7dcc3bcfc1)


这是一个简单易用的可视化界面设计工具，基于Go语言开发，使用Wails框架，支持Windows、MacOS、Linux等系统。

主仓库 https://github.com/duolabmeng6/GoEasyDesigner 

镜像仓库 https://gitee.com/duolabmeng666/go-easy-designer 

**项目进度：**

项目处于积极开发阶段 欢迎前端大佬pr

已完成任务：

- [x] 跨平台兼容性：支持Windows、MacOS和Linux系统。

- [x] 界面设计和功能开发：完成整体界面布局、功能流程设计、界面绘制、属性修改、组件拖拽、双击组件跳转到对应事件函数等核心功能的开发。

- [x] 智能代码编辑器：实现了代码编辑框的汉字首字母输入提醒功能，提高了编码效率。

- [x] [goefun库](https://pkg.go.dev/github.com/duolabmeng6/goefun#section-sourcefiles) 库中文函数库支持：在Golang中使用中文函数进行开发。

- [x] 组件库：已完成按钮、编辑框、标签、开关、单选框、多选框、常用布局、弹性布局、树形框、菜单、表格、进度条、选择夹、常用布局弹、性布局等组件的开发。

- [x] 自定义组件支持：允许创建自定义组件，例如登录框等模板，以便快速应用开发。

- [x] 集成开发环境：提供了一键配置环境压缩包，简化开发环境的搭建。

- [x] 多语言支持：应用支持中文和英文等多种语言。

待完成任务：

- [ ] jsefun库支持：计划中，等待开发中。

- [ ] 组件库完善：正在进行中， [element-plus](https://element-plus.org/zh-CN/component/button.html) 组件的进一步完善。

- [ ] 支持ElectronJS：计划中，将支持ElectronJS作为后端技术。

- [ ] 自定义云组件 用户可以自己上传模板供其他用户使用

# 在线体验

感谢朋友提供的服务器,可以愉快的在线体验了

国内地址: https://go.kenhong.com/

国外地址: https://g.yx24.me 

[下载窗口运行项目](https://github.com/duolabmeng6/wails-template-vue-go-easy),在线体验时在浏览器中画好界面保存,会下载2个文件 `design.json`,`__aux_code.js` 注意你的浏览器允许下载多个文件的权限,将设计文件放到指定位置即可.


[视频教程10分钟了入门](https://www.bilibili.com/video/BV1ou4y1r7WS)

[视频教程3分钟学会自定义组件封装](https://www.bilibili.com/video/BV1ar4y1f7Rq)

# 环境安装 
## 方式1
### 1.安装 node js语言开发环境

[node语言下载页面](https://nodejs.org/) 版本18以上

国内镜像 `npm install -g cnpm --registry=http://registry.npmmirror.com`

安装vite `npm install vite@latest`

### 2.安装 go 语言开发环境

[go语言下载页面](https://golang.org/dl/) 版本任意

安装 wails [wails框架文档](https://wails.io/zh-Hans/docs/gettingstarted/installation/)

国内镜像执行 `go env -w GOPROXY=https://goproxy.cn,direct`

```
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

安装成功后，运行 wails 命令，有内容输出即为安装成功。
## 方式2 Window可下载完整的运行环境包

[123云盘下载地址](https://www.123pan.com/s/KLRJjv-Jz8WH.html)

[小飞机网盘下载地址](https://share.feijipan.com/s/xcU4U9OU)

下载 `GoEasyDesigner.2023.11.16.包含运行环境.zip` 解压

`env_soft.7z` 运行环境包含 `go` 和 `node` 解压找到 `一键配置环境.bat` 以管理员身份运行  

如果安装成功你就可以直接打开 `GoEasyDesigner.exe`

没有配置成功的话，自己添加环境变量到 系统的 `PATH` 添加后运行  `一键配置环境.bat`  即可

```
C:\GoEasyDesigner\env_soft\go1.21.4\bin
C:\GoEasyDesigner\env_soft\go1.21.4\AppData\bin
C:\GoEasyDesigner\env_soft\node-v20.9.0-win-x64
```

`go-easy-demo`  文件夹是示例项目

窗口设计师打开 `go-easy-demo\frontend\src\win\design.json` 就可以设计界面或者运行编译项目了

用 goland ide 打开 `go-easy-demo` 文件夹 就可以开始编写代码了


# 项目创建

## 创建窗口运行项目
该项目为窗口运行的环境你的代码也将在这里编写

创建项目

```
wails init -n "go-easy-demo" -t https://github.com/duolabmeng6/wails-template-vue-go-easy
```

运行窗口

```
cd go-easy-demo
wails dev
```

编译为可执行文件

```
cd go-easy-demo
wails build
```

仅调试前端

```
cd go-easy-demo/frontend
npm run dev
```

# 使用说明

### 下载 GoEasyDesigner

下载最新版本: https://github.com/duolabmeng6/GoEasyDesigner/releases

界面设计文件在这里

```
go-easy-demo/frontend/src/win/design.json
```

### webstorm IDE代码跳转插件

想体验双击组件在ide中自动跳转到对应函数 请在webstorm中安装 QtEasyDesigner 插件,在本项目的文件中，

安装后在IDE编辑器中右键看到 `配置 QtEasyDesigner ` 

macos填写路径
```
/Applications/GoEasyDesigner.app/Contents/MacOS/GoEasyDesigner
```

window填写exe的路径
```
C:\GoEasyDesigner\GoEasyDesigner.exe
```

后续使用的话 打开 `design.json` 在编辑器中右键  `打开 QtEasyDesigner ` 界面就出来了

js代码使用 webstorm ide 绝大部分编写代码都应该在 js中编写,如果js无法实现的再调用go代码
go代码使用 goland IDE 编写 一般情况下代码写在 app.go 中

### 开发窗口设计师请看

在ide中调试需要以下配置

构建软件包 `changeme` 

工作目录 `/Users/ll/Documents/GitHub/GoEasyDesigner/GoEasyDesigner` 改成你的路径

环境变量 `CGO_LDFLAGS=-framework UniformTypeIdentifiers` 这个macos需要 window不需要

go工具实参 `-tags dev -gcflags "all=-N -l"`

程序实参(可选) `文件路径=/Users/ll/Documents/GitHub/GoEasyDesigner/go-easy-demo/frontend/src/win/design.json port=8080` 这是配合ide插件的port是插件的端口 

现在可以在 app.go 中下断点调试了.

#### go-easy-demo 为模板项目

界面数据在这里

```
go-easy-demo/frontend/src/win/design.json
```

运行 就可以看到效果了

```
cd go-easy-demo
wails dev
```

# 窗口设计师开发案例

[多多投屏](https://gitee.com/duolabmeng666/projection_screen_tv) 轻轻松松在MacOS和Window中将视频文件投屏到电视上,跟手机的投屏功能一致,无需nas等繁琐操作.直接文件投屏.

# 贡献

贡献者列表对于自述文件来说太大了！ 所有为这个项目做出贡献的杰出人士在这里 [贡献列表](https://github.com/duolabmeng6/GoEasyDesigner/graphs/contributors)
后面我们会制作页面


# 许可证

本项目采用 [GNU Lesser General Public License (LGPL) 版本 3](LICENSE) 进行许可。详细信息请参阅许可证文件。

# 学习交流

QQ群: 927427009