package main

import (
	"changeme/mymodel"
	"embed"
	"fmt"
	"os"
	"strings"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	//获取传入的命令行参数
	args := os.Args
	// Create an instance of the app structure
	app := NewApp()
	if len(args) > 2 {
		设计文件路径 := args[1]
		插件端口号 := args[2]
		app.S设计文件路径 = strings.Replace(设计文件路径, "文件路径=", "", 1)
		app.IDE插件端口号 = strings.Replace(插件端口号, "port=", "", 1)
		fmt.Println("设计文件路径", 设计文件路径)
		fmt.Println("插件端口号", 插件端口号)
	}

	version := mymodel.Version
	// Create application with options
	err := wails.Run(&options.App{
		Title:  "GoEasyDesigner 窗口设计师 " + version,
		Width:  1280,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
