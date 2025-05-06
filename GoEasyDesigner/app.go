package main

import (
	"changeme/Terminal"
	"changeme/myfunc"
	"changeme/mymodel"
	"context"
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"log"
	"os"
	"regexp"
)

// App struct
type App struct {
	ctx context.Context
	//terminal *TerminalWin.TerminalWin

	terminal *Terminal.Terminal
	IDE插件端口号 string
	S设计文件路径  string
	文件监视     *mymodel.E文件监视模块
}

// NewApp creates a new App application struct
func NewApp() *App {
	a := &App{}
	a.文件监视, _ = mymodel.New文件监视模块()
	go func() {
		a.文件监视.E开始()
	}()

	return a
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
func (a *App) E取配置信息() string {
	data := map[string]string{
		"IDE插件端口号": a.IDE插件端口号,
		"设计文件路径":   a.S设计文件路径,
		"Version":  mymodel.Version,
	}
	return ecore.E到文本(data)
}

func (a *App) E保存(设计文件路径 string, 保存内容 string) string {
	// 	println("保存", 设计文件路径, 保存内容)
	// 把文件保存到指定路径
	os.WriteFile(设计文件路径, []byte(保存内容), 0644)

	return "保存成功"
}
func (a *App) E创建函数(窗口事件文件路径 string, 插入函数 string, 插件URL地址 string) string {
	println("保存", 窗口事件文件路径, 插入函数)
	// 把文件保存到指定路径
	//os.WriteFile(设计文件路径, []byte(保存内容), 0644)
	//读入文件
	data, err := os.ReadFile(窗口事件文件路径)
	if err != nil {
		return "读入文件失败"
	}
	新内容 := myfunc.InsertCode(string(data), 插入函数)
	os.WriteFile(窗口事件文件路径, []byte(新内容), 0644)

	if 插件URL地址 == "" {
		return "保存成功"
	}
	//插件URL地址 := "http://127.0.0.1:13403"
	跳转位置 := ecore.E寻找文本(新内容, 插入函数, 0, false)
	println("新内容", 新内容)
	println("插入函数", 插入函数)
	println("跳转位置", 跳转位置)
	myfunc.E发送跳转代码到ide(插件URL地址, 窗口事件文件路径, 跳转位置)
	return "保存成功"
}
func (a *App) E发送跳转代码到ide(插件URL地址 string, 窗口事件文件路径 string, 跳转位置 int) bool {
	return myfunc.E发送跳转代码到ide(插件URL地址, 窗口事件文件路径, 跳转位置)
}
func (a *App) E发送跳转代码到ide_命令行方式(ide string, 文件路径 string, 跳转字符串 string) bool {
	return myfunc.E发送跳转代码到ide_命令行方式(ide, 文件路径, 跳转字符串)
}
func (a *App) E打开文件对话框() string {
	println("E打开文件对话框")
	result, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "打开文件",
	})
	if err != nil {
		return ""
	}
	return result
}
func (a *App) E保存件对话框() string {
	println("E保存件对话框")
	result, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title:           "保存文件",
		DefaultFilename: "design.json",
	})
	if err != nil {
		return ""
	}
	return result
}
func (a *App) E读入文件(文件路径 string) string {
	return ecore.E读入文本(文件路径)
}

func (a *App) E文件枚举(目录 string) []string {
	var files []string
	_ = ecore.E文件枚举(目录, ".js|.json", &files, true, false)
	return files
}

func (a *App) E运行命令(项目根目录 string, 执行命令 string) string {
	//项目根目录 := "/Users/ll/Documents/GitHub/GoEasyDesigner/wails-demo"
	//执行命令 := "wails dev"
	// 	命令 := "cd " + 项目根目录 + " && " + 执行命令
	// 	runtime.EventsEmit(a.ctx, "运行命令", "开始运行 "+命令)
	// 	result := myfunc.E运行命令(项目根目录, 执行命令, func(回显内容 string) {
	// 		println("回显内容", 回显内容)
	// 		regex := regexp.MustCompile("\x1b\\[[0-9;]*m")
	// 		cleaned := regex.ReplaceAllString(回显内容, "")
	// 		runtime.EventsEmit(a.ctx, "运行命令", cleaned)
	// 	})

	//a.terminal = TerminalWin.NewTerminalWin()
	a.terminal = Terminal.NewTerminal()

	命令 := "cd " + 项目根目录 + " && " + 执行命令
	runtime.EventsEmit(a.ctx, "运行命令", "开始运行 "+命令)
	a.terminal.StartCommand(命令, func(output string, err error) {
		if err != nil {
			log.Println("命令执行错误:", err)
			if err.Error() == "命令已完成" {
				runtime.EventsEmit(a.ctx, "运行命令", err.Error())
			} else {
				runtime.EventsEmit(a.ctx, "运行命令", "报错:"+err.Error())
			}
		} else {
			println("回显内容", output)
			regex := regexp.MustCompile("\x1b\\[[0-9;]*m")
			cleaned := regex.ReplaceAllString(output, "")
			runtime.EventsEmit(a.ctx, "运行命令", cleaned)
		}
	})

	return "运行命令成功"
}

func (a *App) E停止命令() string {
	a.terminal.StopCommand()
	return "停止命令成功"
}

func (a *App) E检查更新() string {
	if myfunc.E是否为macOS系统() {
		mymodel.E检查更新_Mac()
	}
	if myfunc.E是否为window系统() {
		mymodel.E检查更新_window()
	}
	return "检查更新"
}

func (a *App) E取文件修改时间(文件路径 string) string {
	// 获取文件最新的修改时间
	文件信息, err := os.Stat(文件路径)
	if err != nil {
		return ""
	}
	//转换为时间戳
	时间戳 := 文件信息.ModTime().Unix()
	return fmt.Sprintf("%d", 时间戳)
}

func (a *App) E添加文件监视(文件路径 string) string {
	a.文件监视.E添加监视文件(文件路径, func(文件路径 string) {
		println("文件被修改，触发处理函数:", 文件路径)
		// 在这里可以添加通知你的程序的逻辑
		runtime.EventsEmit(a.ctx, "文件被修改", 文件路径)
	})
	return "添加文件监视"
}
func (a *App) E清空文件监视() string {
	a.文件监视.E清空()
	return "清空文件监视"
}

func (a *App) E打开选择文件夹对话框() string {
	println("E打开选择文件夹对话框")
	result, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "选择文件夹",
	})
	if err != nil {
		return ""
	}
	return result
}
func (a *App) E取当前目录() string {
	return ecore.E取当前目录()
}

func (a *App) E下载github项目(github项目地址 string, 保存目录 string) string {
	err := mymodel.E下载github项目(github项目地址, 保存目录)
	if err != nil {
		return err.Error()
	}

	return "success"
}

func (a *App) E文件是否存在(路径 string) bool {
	return ecore.E文件是否存在(路径)
}

func (a *App) E搜索文件(路径 string, 文件名 string) []string {
	//func E文件枚举(欲寻找的目录 string, 欲寻找的文件名 string, files *[]string, 是否带路径 bool, 是否遍历子目录 bool) error {
	var files []string
	ecore.E文件枚举(路径, 文件名, &files, true, true)
	//for _, v := range files {
	//	println(v)
	//}
	return files
}

func (a *App) E取运行目录() string {
	return ecore.E取运行目录()
}
