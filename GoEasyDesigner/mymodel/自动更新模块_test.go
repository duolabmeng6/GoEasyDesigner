package mymodel

import (
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	"os/user"
	"path/filepath"
	"testing"
)

func TestE获取Github仓库Releases版本和更新内容(t *testing.T) {
	info := E获取Github仓库Releases版本和更新内容()
	ecore.E调试输出(info)

}

func Test下载(t *testing.T) {
	err := E下载带进度回调("https://github.com/duolabmeng6/GoEasyDesigner/releases/download/v1.0.7/qoq_MacOS.zip", "./mactest.zip", func(进度 float64) {
		// 进度回调函数
		fmt.Println("正在下载...", 进度)
	})
	if err != nil {
		fmt.Println("下载出错:", err)
	} else {
		fmt.Println("下载完成")
	}

}
func Test系统版本(t *testing.T) {
	fmt.Println("系统是否为Windows:", E系统是否为window系统())
	fmt.Println("系统是否为Linux:", E系统是否为linux系统())
	fmt.Println("系统是否为Mac:", E系统是否为mac系统())
	fmt.Println("是否为调试模式:", E是否为调试模式())

}

func Test解压缩(t *testing.T) {
	//info := E获取Github仓库Releases版本和更新内容()

	//os.Setenv("DEBUG", "1")
	压缩包的路径 := "/Users/ll/Desktop/goproject/v3fanyi/mymodel/mactest.zip"
	//解压目录 := "/Users/ll/Desktop/goproject/v3fanyi/mymodel/testzip/"
	//允许解压路径前缀 := []string{"qoq.app/Contents/"}
	//
	//println(zip解压2(压缩包的路径, 解压目录, 允许解压路径前缀))
	E更新自己MacOS应用(压缩包的路径, "qoq.app")
}
func Test更新流程MacOS(t *testing.T) {

	usr, err := user.Current()
	if err != nil {
		panic(err)
	}
	下载文件夹路径 := filepath.Join(usr.HomeDir, "Downloads")

	println(下载文件夹路径)
	info := E获取Github仓库Releases版本和更新内容()

	err = E下载带进度回调(info.MacDownloadURL, 下载文件夹路径+"/mactest.zip", func(进度 float64) {
		// 进度回调函数
		fmt.Println("正在下载...", 进度)
	})
	if err != nil {
		fmt.Println("下载出错:", err)
		return
	}

	flag, s := E更新自己MacOS应用(下载文件夹路径+"/mactest.zip", "qoq.app")
	println(flag, s)

}

func Test更新流程Window(t *testing.T) {
	//
	usr, err := user.Current()
	if err != nil {
		panic(err)
	}
	下载文件夹路径 := filepath.Join(usr.HomeDir, "Downloads")

	//println(下载文件夹路径)
	//info := E获取Github仓库Releases版本和更新内容()
	//
	//err = E下载带进度回调(info.WinDownloadURL, 下载文件夹路径+"/GoEasyDesigner.exe", func(进度 float64) {
	//	// 进度回调函数
	//	fmt.Println("正在下载...", 进度)
	//})
	//if err != nil {
	//	fmt.Println("下载出错:", err)
	//	return
	//}

	flag, s := E更新自己Window应用(下载文件夹路径 + "/GoEasyDesigner.exe")
	println(flag, s)

}
