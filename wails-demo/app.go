package main

import (
	"context"
	"fmt"
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
