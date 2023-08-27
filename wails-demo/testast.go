package main

import (
	"github.com/tdewolff/parse/v2"
	"github.com/tdewolff/parse/v2/js"
	"strings"
)

func E插入函数(jscode string, 插入代码 string) string {
	l := js.NewLexer(parse.NewInputString(jscode))
	var buffer strings.Builder
	for {
		tt, text := l.Next()
		println(tt.String(), string(text))
		switch tt {
		case js.ErrorToken:
			return buffer.String()
		case js.LineTerminatorToken:
			// Reset the tracking after a line terminator
			buffer.WriteString(string(text))
		case js.CommentToken:
			if strings.HasPrefix(string(text), "//事件函数") {
				buffer.WriteString(插入代码)
			}
		default:
			buffer.WriteString(string(text))
		}

	}
	return buffer.String()
}
func main() {
	jscode := `
export function 绑定窗口事件(窗口) {
    窗口.窗口创建完毕 = function () {
        console.log("窗口创建完毕")
    }
    窗口.按钮1被点击 = function () {
        console.log("按钮1被点击了")
        窗口.组件.按钮1.标题 = "祖国你好222"
    }
    //事件函数
    窗口.按钮1被点击xxx = function () {
        console.log("按钮1被点击了")
        窗口.组件.按钮1.标题 = "祖国你好222"
    }
}
`
	插入代码 := `
    窗口.按钮2被点击 = function () {
        console.log("按钮2被点击")
    }
    //事件函数
	`
	njs := E插入函数(jscode, 插入代码)
	println(njs)

}
