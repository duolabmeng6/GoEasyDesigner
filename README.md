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



# GoEasyDesigner

![666](https://github.com/duolabmeng6/GoEasyDesigner/assets/59047063/a89d2ab9-9ba3-4efc-b0fa-0a7dcc3bcfc1)
![image-20230828083413650](README.assets/image-20230828083413650.png)
![image-20230828084834120](README.assets/image-20230828084834120.png)

Based on the Go language and using the Wails framework, GoEasyDesigner supports Windows, MacOS, Linux, and other systems.

Main repository: https://github.com/duolabmeng6/GoEasyDesigner

Mirror repository: https://gitee.com/duolabmeng666/go-easy-designer

**Project Progress:**

The project is in active development. Front-end experts are welcome to contribute.

Completed tasks:
- [x] Cross-platform compatibility: Windows MacOS Linux
- [x] Interface design and feature development: Completed the development of core features such as overall interface layout, function flow design, interface drawing, attribute modification, component dragging, and double-clicking on components to jump to corresponding event functions.
- [x] Smart code editor: Implemented Hanzi initial input reminder in the code editor, improving coding efficiency.
- [x] Support for the goefun library: [goefun library](https://pkg.go.dev/github.com/duolabmeng6/goefun#section-sourcefiles), allowing the use of Chinese functions in Golang development.
- [x] Layout containers: Including common layouts, flex layouts.
- [x] Completed component library: Buttons, text editors, labels, switches, radio buttons, checkboxes, common layouts, flex layouts, tree boxes, menus, tables, progress bars, and tabs.
- [x] Custom dynamic components support: Enables the development of templates like login boxes for quick application development.

To-do tasks:
- [ ] Support for the jsefun library: Planned, under development.
- [ ] Component library refinement: In progress, further refinement of [element-plus](https://element-plus.org/zh-CN/component/button.html) components.
- [ ] Integrated development environment: Planned, will implement an environment for development without cumbersome configurations.
- [ ] Multilingual support: Planned, will support multiple languages such as Chinese and English.
- [ ] Support for ElectronJS: Planned, will support ElectronJS as a backend technology.
- [ ] Custom cloud components: Users can upload their own templates for others to use.

We will continue to work hard to ensure that the project progresses as planned and provide more powerful features and support. Please stay tuned for our updates!

# Online Experience

Thanks to a friend for providing a server, you can now experience it online.

Domestic address: https://go.kenhong.com/
Overseas address: https://g.yx24.me

[Download and run the project](https://github.com/duolabmeng6/wails-template-vue-go-easy), when experiencing online, design the interface in the browser and save it. It will download two files, `Design file.json`, `Auxiliary code.js`. Make sure your browser allows downloading multiple files, and place the design file in the specified location.

# Quick Start

Please install in order.

[10-minute video tutorial for beginners](https://www.bilibili.com/video/BV1ou4y1r7WS)

[3-minute video tutorial to learn how to customize components](https://www.bilibili.com/video/BV1ar4y1f7Rq)

### 1. Install Node.js development environment

[Node.js download page](https://nodejs.org/zh-cn/download/) Version 18 and above

Domestic mirror `npm install -g cnpm --registry=http://registry.npmmirror.com`

Install Vite `npm create vite@latest`

### 2. Install Go language development environment

[Go language download page](https://golang.org/dl/) Any version

Install Wails [Wails framework documentation](https://wails.io/zh-Hans/docs/gettingstarted/installation/)

Execute the domestic mirror `go env -w GOPROXY=https://goproxy.cn,direct`



After successful installation, run the `wails` command, and if there is output, it is installed successfully.

#### Create and run the project window
This project is for window running environment; your code will be written here.

Create a project

```
wails init -n "go-easy-demo" -t https://github.com/duolabmeng6/wails-template-vue-go-easy
```

Run the window

```
cd go-easy-demo
wails dev
```

Compile to an executable file

```
cd go-easy-demo
wails build
```

Debug front-end only

```
cd go-easy-demo/frontend
npm run dev
```

### 3. Download GoEasyDesigner

Download the latest version: https://github.com/duolabmeng6/GoEasyDesigner/releases

Run directly

The interface design file is here

```
go-easy-demo/frontend/src/窗口/设计文件.json
```

### 4. WebStorm IDE Code Navigation Plugin

To experience automatic jumping to the corresponding function in the IDE when double-clicking on a component, please install the QtEasyDesigner plugin in WebStorm. In the project files,

After installation, right-click in the IDE editor and see `Configure QtEasyDesigner`

For macOS, fill in the path

```
/Applications/GoEasyDesigner.app/Contents/MacOS/GoEasyDesigner
```


For Windows, fill in the exe path
```
C:\GoEasyDesigner\GoEasyDesigner.exe
```
For subsequent use, open `Design file.json` in the editor, right-click, and open `QtEasyDesigner`. The interface will appear.

Write JavaScript code in the WebStorm IDE for most code writing. If JavaScript cannot achieve something, then call Go code.
Go code uses Goland IDE for writing. In general, code should be written in `app.go`.

### Developing Components, Please See

To debug in the IDE, the following configuration is needed

Build the package `changeme`

Working directory `/Users/ll/Documents/GitHub/GoEasyDesigner/GoEasyDesigner` Change it to your path

Environment variable `CGO_LDFLAGS=-framework UniformTypeIdentifiers` This is required for macOS, not for Windows.

Go tool arguments `-tags dev -gcflags "all=-N -l"`

Program arguments (optional) `文件路径=/Users/ll/Documents/GitHub/GoEasyDesigner/go-easy-demo/frontend/src/窗口/设计文件.json port=8080` This is the port of the plugin, which works with the IDE plugin.

Now you can debug with breakpoints in `app.go`.

#### `go-easy-demo` is a Template Project

Interface data is here

```
go-easy-demo/frontend/src/窗口/设计文件.json
```

Run, and you can see the effect

```
cd go-easy-demo
wails dev
```




# Contribution

The list of contributors is too large for this readme file! All outstanding individuals who have contributed to this project are listed here [Contribution List](https://github.com/duolabmeng6/GoEasyDesigner/graphs/contributors) We will create a page later.

# License

This project is licensed under the [GNU Lesser General Public License (LGPL) version 3](LICENSE). For detailed information, please refer to the license file.

# Learning and Communication

QQ Group: 927427009
