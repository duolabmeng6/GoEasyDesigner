package myfunc

import (
	"changeme/mymodel"
	"fmt"
	"regexp"
	"testing"
)

func TestInsertCode(t *testing.T) {
	jscode := `
export function 绑定窗口事件(窗口) {
    窗口.窗口创建完毕 = function () {
        console.log("窗口创建完毕")
    }
    窗口.按钮1被点击 = function () {
        console.log("按钮1被点击了")
        窗口.组件.按钮1.标题 = "祖国你好222"
    }

	
	//事件函数位置不要删除

    窗口.按钮1被点击xxx = function () {
        console.log("按钮1被点击了")
        窗口.组件.按钮1.标题 = "祖国你好222"
    }
}
`
	insertionCode := `
    窗口.按钮2被点击 = function () {
        console.log("按钮2被点击")
    }
	`
	result := InsertCode(jscode, insertionCode)
	fmt.Println(result)
	insertionCode2 := `
    窗口.按钮3被点击 = function () {
        console.log("按钮3被点击")
    }
	`
	result2 := InsertCode(result, insertionCode2)
	fmt.Println(result2)
}

func TestE发送跳转代码到ide(t *testing.T) {
	插件URL地址 := "http://127.0.0.1:13403"
	文件路径 := "C:\\eview\\v2\\wails-demo\\frontend\\src\\窗口事件.js"
	跳转位置 := 1
	E发送跳转代码到ide(插件URL地址, 文件路径, 跳转位置)
}

func TestE运行命令(t *testing.T) {
	项目根目录 := "/Users/ll/Documents/GitHub/GoEasyDesigner/wails-demo"
	执行命令 := "wails dev"
	E运行命令(项目根目录, 执行命令, func(回显内容 string) {
		regex := regexp.MustCompile("\x1b\\[[0-9;]*m")
		cleaned := regex.ReplaceAllString(回显内容, "")
		println("回显内容", cleaned)
	})
}
func TestE运行命令2(t *testing.T) {
	mymodel.E检查更新()
}
