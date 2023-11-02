# GoEasyDesigner

<samp>

[English](README.md) · [Simplified Chinese](README.zh-Hans.md)

</samp>

! [666](https://github.com/duolabmeng6/GoEasyDesigner/assets/59047063/a89d2ab9-9ba3-4efc-b0fa-0a7dcc3bcfc1)

! [image-20230828083413650](README.assets/image-20230828083413650.png)

! [image-20230828084834120](README.assets/image-20230828084834120.png)

wails framework based on go language to support Windows Macos Linux and other systems.

The main warehouse https://github.com/duolabmeng6/GoEasyDesigner

Mirror warehouse https://gitee.com/duolabmeng666/go-easy-designer

** Project progress: **

The project is in the active development stage. Welcome the front end big guy pr

Completed tasks:

- [x] Cross-platform compatibility: Windows MacOS Linux

- [x] Interface design and function development: Completed the development of core functions such as overall interface layout, functional flow design, interface drawing, property modification, component drag and drop, and double-click component to jump to corresponding event functions.

- [x] Intelligent code editor: realizes the function of Chinese character first letter input reminder in the code editing box, and improves the coding efficiency.

- [x] goefun library Chinese function library support: Goefun library (https://pkg.go.dev/github.com/duolabmeng6/goefun#section-sourcefiles), allowing the use of Chinese in Golang function development.

- [x] Layout container: Includes common layout and elastic layout

- [x] Completed component library: Button Edit Box Label switch Option Frame Multiple options Common Layout Elastic Layout Tree frame menu table Progress bar Select clip

- [x] User-defined dynamic components Support rapid application development using templates such as login boxes

Tasks to be completed:

- [] jsefun library support: planned, pending development.
- [] Component library refinement: Further refinement of the [element-plus](https://element-plus.org/zh-CN/component/button.html) component is in progress.

- [] Integrated Development Environment: In the plan, it will realize the direct development environment without complicated configuration.

- [] Multi-language support: In the plan, multiple languages such as Chinese and English will be supported.

- [] Support ElectronJS: In the plan, ElectronJS will be supported as a back-end technology.

- [] User-defined Cloud components Users can upload templates for other users

We will continue to work hard to ensure that the project goes as planned and provides more powerful features and support. Stay tuned for our progress!

# Online Experience

Thanks to the server provided by friends, you can have a happy online experience

Domestic address: https://go.kenhong.com/

Foreign address: https://g.yx24.me

Download window to run a project (https://github.com/duolabmeng6/wails-template-vue-go-easy), good in the picture online experience in the browser interface, will download 2 ` design file. Json `, ` auxiliary code. Js ` Note that your browser allows you to download multiple files. Just place the design file in the specified location.

# Get Started quickly

Please install them in order

[10 minutes the introductory video tutorial] (https://www.bilibili.com/video/BV1ou4y1r7WS)

[video tutorial 3 minutes to learn custom components encapsulation] (https://www.bilibili.com/video/BV1ar4y1f7Rq)

### 1. Install the node js development environment

[node Language Download page](https://nodejs.org/zh-cn/download/) Version 18 or later

Domestic mirror ` NPM install - g ` CNPM - registry=http://registry.npmmirror.com

Install vite 'npm create vite@latest'

### 2. Install go development environment

[go Download page](https://golang.org/dl/) Any version is required

Install wails [wails framework document] (https://wails.io/zh-Hans/docs/gettingstarted/installation/)
Domestic mirror execution ` go env - w GOPROXY = https://goproxy.cn, direct `

` ` `

go install github.com/wailsapp/wails/v2/cmd/wails@latest

` ` `

After the installation is successful, run the wails command. If any information is displayed, the installation is successful.

#### Create a window to run the project

The project for the window running environment your code will also be written here

Create project

` ` `

wails init -n "go-easy-demo" -t https://github.com/duolabmeng6/wails-template-vue-go-easy

` ` `

Run window

` ` `

cd go-easy-demo

wails dev

` ` `

Compile to an executable file

` ` `

cd go-easy-demo

wails build

` ` `

Debug front-end only

` ` `

cd go-easy-demo/frontend

npm run dev

` ` `

### 3. Download GoEasyDesigner

Download the latest version: https://github.com/duolabmeng6/GoEasyDesigner/releases

Run directly

The interface design file is here

` ` `

go-easy-demo/frontend/src/ window/design file. json

` ` `

### 4. webstorm IDE code jump plug-in

Please install the QtEasyDesigner plug-in in webstorm. In the project file,

Right-click in the IDE editor and see 'Configure your TeasyDesigner'

macos Enter the path

` ` `

/Applications/GoEasyDesigner.app/Contents/MacOS/GoEasyDesigner

` ` `

window Enter the exe path

` ` `

C:\GoEasyDesigner\GoEasyDesigner.exe

` ` `

To use it later, open the 'design file.json', right-click in the editor, open the 'QtEasyDesigner' screen and it will appear
js code using webstorm ide most of the code should be written in js, if js can not achieve then call go code

go code is written in goland IDE and in general code is written in app.go

### Develop components see

Debugging in the ide requires the following configuration

Build the package 'changeme'

Working directory ` / Users/ll/Documents/lot/GoEasyDesigner GoEasyDesigner ` into your path

Environment variable 'CGO_LDFLAGS=-framework UniformTypeIdentifiers' This is required by macos and Windows is not required

go tool argument '-tags dev-gcflags "all=-N -l"'

Program arguments (optional) ` file path = / Users/ll/Documents/lot/GoEasyDesigner/go - easy - demo/frontend/SRC/window/design file. Json ` port = 8080 This is the port for the ide plug-in

You can now debug breakpoints in app.go.

#### go-easy-demo is a template project

The interface data is here

` ` `

go-easy-demo/frontend/src/ window/design file. json

` ` `

Run it and you'll see the effect

` ` `

cd go-easy-demo

wails dev

` ` `

# Contribute

The list of contributors is too big for a readme file! All contribute to the project of outstanding people here [contribution list] (https://github.com/duolabmeng6/GoEasyDesigner/graphs/contributors)

We'll make the page later

# License

This project is licensed under [GNU Lesser General Public License (LGPL) Version 3](LICENSE). See the license file for details.

# Learning Communication

QQ group: 927427009