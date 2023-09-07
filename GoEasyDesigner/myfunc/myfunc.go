package myfunc

import (
	"changeme/mymodel"
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	. "github.com/duolabmeng6/goefun/ehttp"
	"github.com/ncruces/zenity"
	"regexp"
	"runtime"
	"strings"
)

func InsertCode(jscode string, insertionCode string) string {
	// 获取函数名称 窗口.按钮3被点击 = function () { 截取 按钮3被点击
	函数名称 := insertionCode[strings.Index(insertionCode, ".")+1 : strings.Index(insertionCode, "=")]
	// 检查是否已经存在
	if strings.Contains(jscode, 函数名称) {
		return jscode
	}
	// Define the regular expression pattern
	pattern := `(//事件函数位置不要删除[^\n]*)`

	// Compile the regular expression
	re := regexp.MustCompile(pattern)

	// Replace the matching pattern with the insertion code
	result := re.ReplaceAllString(jscode, insertionCode+"$1")

	return result
}

func E发送跳转代码到ide(插件URL地址 string, 文件路径 string, 跳转位置 int) {
	文件名 := ecore.E文件取文件名(文件路径, true)
	文件名 = ecore.URL编码(文件名)
	跳转URL := 插件URL地址 + "/myserver?type=target&file=" + 文件名 + "&def=" + ecore.E到文本(跳转位置)
	ecore.E调试输出("调用pycharm代码跳转", 跳转URL)
	eh := NewHttp()
	返回文本, _ := eh.Get(跳转URL)
	println("调用pycharm代码跳转", 返回文本)

}

func E运行命令(执行目录 string, 执行命令 string, 回调函数 func(回显内容 string)) string {
	命令 := "cd " + 执行目录 + " && " + 执行命令
	println("执行命令", 命令)
	return ecore.E运行_mac(命令, true, func(line string) {
		//println(line)
		回调函数(line)
	})
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

func E检查更新() {
	if E是否为macOS系统() == false {
		zenity.Info("目前仅支持macos自动更新 其他系统需要适配")
		return
	}
	下载文件夹路径 := mymodel.E取用户下载文件夹路径()
	info := mymodel.E获取Github仓库Releases版本和更新内容()
	println(info.MacDownloadURL)
	println(下载文件夹路径)
	if info.Version == mymodel.Version {
		err := zenity.Info("当前已经是最新版本")
		if err != nil {
			return
		}
		return
	}

	err := zenity.Question("软件有新版本可用，是否更新？\n当前版本:"+
		mymodel.Version+
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

	err = mymodel.E下载带进度回调(info.MacDownloadURL, 下载文件夹路径+"/qoq_MacOS.zip", func(进度 float64) {
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
	flag, s := mymodel.E更新自己MacOS应用(下载文件夹路径+"/qoq_MacOS.zip", "qoq.app")
	println(flag, s)
}
