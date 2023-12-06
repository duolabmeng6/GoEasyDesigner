
<p align="center" style="text-align: center">
<img src="GoEasyDesigner/build/appicon.png" width=256  height=256 />
</p>

<p align="center">
</p>

<div align="center">
<strong>
<samp>

[English](README.md) · [Simplified Chinese](README.zh-Hans.md)

</samp>
</strong>
</div>

# Window Designer
![666](https://github.com/duolabmeng6/GoEasyDesigner/assets/59047063/a89d2ab9-9ba3-4efc-b0fa-0a7dcc3bcfc1)

This is a simple and easy-to-use visual interface design tool, developed in Go language using the Wails framework, supporting systems like Windows, MacOS, Linux, etc.

Main Repository: https://github.com/duolabmeng6/GoEasyDesigner

Mirror Repository: https://gitee.com/duolabmeng666/go-easy-designer

**Project Progress:**

The project is in active development. Front-end experts are welcome to contribute PRs.

Completed tasks:

- [x] Cross-platform compatibility: Supports Windows, MacOS, and Linux systems.
- [x] Interface design and functionality development: Completed overall layout design, functional process design, interface drawing, property modification, component dragging, double-clicking components to jump to corresponding event functions, and other core features.
- [x] Intelligent code editor: Implemented the Chinese character initial letter input reminder function for the code editing box, enhancing coding efficiency.
- [x] [goefun library](https://pkg.go.dev/github.com/duolabmeng6/goefun#section-sourcefiles) Chinese function library support: Developing using Chinese functions in Golang.
- [x] Component library: Completed development of components like buttons, text boxes, labels, switches, radio buttons, checkboxes, common layouts, flex layouts, tree boxes, menus, tables, progress bars, file selectors, and more.
- [x] Custom component support: Allows the creation of custom components, such as login boxes, for rapid application development.
- [x] Integrated development environment: Provided a one-click environment setup package, simplifying the construction of the development environment.
- [x] Multilingual support: The application supports multiple languages including Chinese and English.

Tasks to be completed:

- [ ] jsefun library support: Planned and awaiting development.
- [ ] Component library enhancement: Ongoing, further improvement of [element-plus](https://element-plus.org/zh-CN/component/button.html) components.
- [ ] Support for ElectronJS: Planned, will support ElectronJS as backend technology.
- [ ] Custom cloud components: Users will be able to upload their templates for others to use.

# Online Experience

Thanks to a friend's server, you can now enjoy an online experience.

Domestic address: https://go.kenhong.com/

International address: https://g.yx24.me

[Download Window Running Project](https://github.com/duolabmeng6/wails-template-vue-go-easy), during online experience, design the interface in the browser and save. Two files will be downloaded: `design.json`, `__aux_code.js`. Make sure your browser allows downloading multiple files, and place the design files in the specified location.

[Video Tutorial: 10 Minutes to Get Started](https://www.bilibili.com/video/BV1ou4y1r7WS)

[Video Tutorial: 3 Minutes to Learn Custom Component Packaging](https://www.bilibili.com/video/BV1ar4y1f7Rq)

# Environment Installation
## Method 1
### 1. Install Node.js Development Environment

[Node.js Download Page](https://nodejs.org/) Version 18 or above

Domestic mirror: `npm install -g cnpm --registry=http://registry.npmmirror.com`

Install Vite: `npm install vite@latest`

### 2. Install Go Language Development Environment

[Go Language Download Page](https://golang.org/dl/) Any version

Install Wails [Wails Framework Documentation](https://wails.io/zh-Hans/docs/gettingstarted/installation/)

Domestic mirror execution: `go env -w GOPROXY=https://goproxy.cn,direct`

```
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

After successful installation, run the Wails command. If there is content output, it means successful installation.
## Method 2: Windows Complete Running Environment Package Download

[Xiaofeiji Cloud Disk Download Address, No Login Required](https://share.feijipan.com/s/4wU6lASg)

Download `GoEasyDesigner.2023.12.6.Including Running Environment.zip` and unzip.

`env_soft.

7z` Running environment package includes `go` and `node`. Unzip and find `One-Click Environment Configuration.exe`, run as administrator.

If installation is successful, you can directly open `GoEasyDesigner.exe`.

If not configured successfully, add environment variables to the system's `PATH`. After adding, run `One-Click Environment Configuration.exe`.

```
C:\GoEasyDesigner\env_soft\go1.21.4\bin
C:\GoEasyDesigner\env_soft\go1.21.4\AppData\bin
C:\GoEasyDesigner\env_soft\node-v20.9.0-win-x64
```

`go-easy-demo` folder is a sample project.

Open `go-easy-demo\frontend\src\win\design.json` with Window Designer to design the interface or run and compile the project.

Open the `go-easy-demo` folder with Goland IDE to start coding.

# Project Creation

## Create Window Running Project
This project is for window running, your code will also be written here.

Create a project:

```
wails init -n "go-easy-demo" -t https://github.com/duolabmeng6/wails-template-vue-go-easy
```

Run window:

```
cd go-easy-demo
wails dev
```

Compile into executable file:

```
cd go-easy-demo
wails build
```

Front-end only debugging:

```
cd go-easy-demo/frontend
npm run dev
```

# Usage Instructions

### Download GoEasyDesigner

Download the latest version: https://github.com/duolabmeng6/GoEasyDesigner/releases

Interface design file location:

```
go-easy-demo/frontend/src/win/design.json
```

### Webstorm IDE Code Jump Plugin

To experience double-clicking components in the IDE to automatically jump to the corresponding function, install the QtEasyDesigner plugin in Webstorm. In this project's files,

After installation, right-click in the IDE editor and select `Configure QtEasyDesigner`.

macOS path:
```
/Applications/GoEasyDesigner.app/Contents/MacOS/GoEasyDesigner
```

Windows path:
```
C:\GoEasyDesigner\GoEasyDesigner.exe
```

For subsequent use, open `design.json` in the editor, right-click and select `Open QtEasyDesigner`. The interface will appear.

JS code uses Webstorm IDE. Most coding should be done in JS. Use Go code only if JS cannot achieve the desired functionality.
Go code is written in Goland IDE, typically in app.go.

### For Window Designer Development

For debugging in the IDE, you need the following configuration:

Build package `changeme`.

Working directory `/Users/ll/Documents/GitHub/GoEasyDesigner/GoEasyDesigner` change to your path.

Environment variable `CGO_LDFLAGS=-framework UniformTypeIdentifiers` is needed for macOS, not for Windows.

Go tool arguments `-tags dev -gcflags "all=-N -l"`.

Program arguments (optional) `File Path=/Users/ll/Documents/GitHub/GoEasyDesigner/go-easy-demo/frontend/src/win/design.json port=8080` This is to work with the IDE plugin, where port is the plugin's port.

Now you can debug with breakpoints in app.go.

#### go-easy-demo is a template project

Interface data location:

```
go-easy-demo/frontend/src/win/design.json
```

Run to see the effects:

```
cd go-easy-demo
wails dev
```

# Window Designer Development Cases

[Duoduo Projection Screen](https://gitee.com/duolabmeng666/projection_screen_tv) Easily project video files from MacOS and Windows to TV, similar to mobile phone screen projection, no need for NAS or other cumbersome operations. Direct file projection.

# Contribution

The contributor list is too large for the README file! All the outstanding individuals who have contributed to this project can be found here [Contributor List](https://github.com/duolabmeng6/GoEasyDesigner/graphs/contributors).
We will create a page later.

# License

This project is licensed under the [GNU Lesser General Public License (LGPL) Version 3](LICENSE). For detailed information, please refer to the license file.

# Learning and Exchange

QQ Group: 927427009
