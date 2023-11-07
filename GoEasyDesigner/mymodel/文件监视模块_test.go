package mymodel

import (
	"fmt"
	"testing"
	"time"
)

func TestE文件监视模块(t *testing.T) {
	文件监视, _ := New文件监视模块()
	go func() {
		文件监视.E开始()
	}()

	文件监视.E添加监视文件("/Users/ll/Documents/GitHub/projection_screen_tv/easyToTV/frontend/src/win/event.js", func(文件路径 string) {
		fmt.Println("文件被修改，触发处理函数:", 文件路径)
		// 在这里可以添加通知你的程序的逻辑
	})

	文件监视.E添加监视文件("/Users/ll/Documents/GitHub/projection_screen_tv/easyToTV/frontend/src/App.vue", func(文件路径 string) {
		fmt.Println("文件被修改，触发处理函数:", 文件路径)
	})

	time.Sleep(10 * time.Second)
	println("删除监视")

	文件监视.E删除监视文件("/Users/ll/Documents/GitHub/projection_screen_tv/easyToTV/frontend/src/App.vue")

	time.Sleep(60 * time.Second)

}
