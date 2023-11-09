package mymodel

import (
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	"github.com/ncruces/zenity"
	"os/user"
	"path/filepath"
	"runtime"
	"testing"
)

func Test简单(t *testing.T) {
	if E是否为macOS系统() {
		E检查更新_Mac()
	}
	if E是否为window系统() {
		E检查更新_window()
	}
}
func TestE获取Github仓库Releases版本和更新内容(t *testing.T) {
	info := E获取Github仓库Releases版本和更新内容()
	ecore.E调试输出(info)

}

func Test下载(t *testing.T) {
	err := E下载带进度回调("https://github.com/duolabmeng6/GoEasyDesigner/releases/download/v0.2.4/GoEasyDesigner_MacOS.zip",
		"/Users/ll/Downloads/GoEasyDesigner_MacOS.zip", func(进度 float64) {
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
	压缩包的路径 := "/Users/ll/Downloads/GoEasyDesigner_MacOS.zip"
	//解压目录 := "/Users/ll/Desktop/goproject/v3fanyi/mymodel/testzip/"
	//允许解压路径前缀 := []string{"qoq.app/Contents/"}
	//println(zip解压2(压缩包的路径, 解压目录, 允许解压路径前缀))
	E更新自己MacOS应用(压缩包的路径, "GoEasyDesigner.app")
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

func Test整个流程(t *testing.T) {

	下载文件夹路径 := E取用户下载文件夹路径()
	info := E获取Github仓库Releases版本和更新内容()
	println(info.MacDownloadURL)
	println(下载文件夹路径)
	if info.Version == Version {
		err := zenity.Info("当前已经是最新版本")
		if err != nil {
			return
		}
		return
	}

	err := zenity.Question("软件有新版本可用，是否更新？\n当前版本:"+
		Version+
		"\n最新版本:"+info.Version,
		zenity.Title("更新提示"),
		zenity.Icon(zenity.QuestionIcon),
		zenity.OKLabel("更新"),
		zenity.CancelLabel("取消"))
	ecore.E调试输出(err)
	println("更新", err)
	if err != nil {
		return
	}
	progress, _ := zenity.Progress(
		zenity.Title("软件更新"),
		zenity.MaxValue(100), // 设置最大进度值为100
	)

	progress.Text("正在下载...")

	err = E下载带进度回调(info.MacDownloadURL, 下载文件夹路径+"/"+应用名称+"_MacOS.zip", func(进度 float64) {
		fmt.Println("正在下载...", 进度)
		progress.Text("正在下载..." + fmt.Sprintf("%.2f", 进度) + "%")
		progress.Value(int(进度))
	})
	if err != nil {
		fmt.Println("下载出错:", err)
		zenity.Info("下载错误,检查你的网络")
		progress.Close()
		return
	}
	progress.Text("下载完成 即将完成更新")
	if progress.Close() != nil {
		fmt.Println("点击了取消")
		return
	}
	fmt.Println("下载完成了")
	flag, s := E更新自己MacOS应用(下载文件夹路径+"/"+应用名称+"_MacOS.zip", 应用名称+".app")
	println(flag, s)
}

func E是否为window系统() bool {
	return runtime.GOOS == "windows"
}

func E是否为macOS系统() bool {
	return runtime.GOOS == "darwin"
}

func E是否为UbuntuLinux系统() bool {
	return runtime.GOOS == "linux"
}
