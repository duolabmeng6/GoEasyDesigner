package main

import (
	"changeme/myfunc"
	"context"
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
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
func (a *App) E保存(设计文件路径 string, 保存内容 string) string {
	println("保存", 设计文件路径, 保存内容)
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
	println("跳转位置", 跳转位置)
	myfunc.E发送跳转代码到ide(插件URL地址, 窗口事件文件路径, 跳转位置)
	return "保存成功"
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
func (a *App) E读入文件(文件路径 string) string {
	return ecore.E读入文本(文件路径)
}
