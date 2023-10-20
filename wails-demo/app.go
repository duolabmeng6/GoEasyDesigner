package main

import (
	"context"
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
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
	println("收到js的调用信息")
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) E按钮1被点击() string {
	println("E按钮1被点击")
	return fmt.Sprintf("E按钮1被点击")
}

func (a *App) E获取系统时间() string {
	println("E获取系统时间")
	t := ecore.E取现行时间().E时间到文本("Y-m-d H:i:s")
	return t
}
