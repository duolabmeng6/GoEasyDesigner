package myfunc

import (
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	. "github.com/duolabmeng6/goefun/ehttp"
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

func E发送跳转代码到ide(插件URL地址 string, 文件路径 string, 跳转位置 int) bool {
	文件名 := ecore.E文件取文件名(文件路径, true)
	文件名 = ecore.URL编码(文件名)
	跳转URL := 插件URL地址 + "/myserver?type=target&file=" + 文件名 + "&def=" + ecore.E到文本(跳转位置)
	ecore.E调试输出("调用pycharm代码跳转", 跳转URL)
	eh := NewHttp()
	返回文本, err := eh.Get(跳转URL)
	println("调用pycharm代码跳转", 返回文本)
	if err != nil {
		println("调用pycharm代码跳转", err.Error())
		return false
	}
	return true
}

// 计算跳转位置
func 计算跳转位置(文件内容 string, 跳转字符串 string) (int, int, bool) {
	跳转位置行 := 0
	跳转位置列 := 0

	if 文件内容 != "" && 跳转字符串 != "" {
		index := strings.Index(文件内容, 跳转字符串)
		if index != -1 {
			lines := strings.Split(文件内容, "\n")
			current := 0
			for i, line := range lines {
				lineLength := len(line) + 1 // 加 1 是为了算上换行符
				if current+lineLength > index {
					跳转位置行 = i + 1           // 行号从 1 开始
					跳转位置列 = index - current // 列号从 0 开始
					return 跳转位置行, 跳转位置列, true
				}
				current += lineLength
			}
		} else {
			ecore.E调试输出("未找到跳转字符串", 跳转字符串)
			return 0, 0, false
		}
	} else {
		ecore.E调试输出("文件内容或跳转字符串为空", 跳转字符串)
		return 0, 0, false
	}

	return 0, 0, false
}

func E发送跳转代码到ide_命令行方式(ide string, 文件路径 string, 跳转字符串 string) bool {
	文件内容 := ecore.E读入文本(文件路径)
	跳转位置行, 跳转位置列, 成功 := 计算跳转位置(文件内容, 跳转字符串)
	if !成功 {
		return false
	}
	跳转URL := ""
	if ide == "vscode" {
		跳转URL = fmt.Sprintf("code -g %s:%d:%d", 文件路径, 跳转位置行, 跳转位置列)
	} else if ide == "goland" {
		跳转URL = fmt.Sprintf("goland --line %d %s", 跳转位置行, 文件路径)
	} else if ide == "webstorm" {
		跳转URL = fmt.Sprintf("webstorm --line %d %s", 跳转位置行, 文件路径)
	} else if ide == "cursor" {
		跳转URL = fmt.Sprintf("cursor -g %s:%d:%d", 文件路径, 跳转位置行, 跳转位置列)
	} else {
		ecore.E调试输出("未知的IDE", ide)
	}
	ecore.E调试输出("调用代码跳转", 跳转URL)
	ecore.E运行_mac(跳转URL, true, func(line string) {
		println(line)
	})
	return true
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
