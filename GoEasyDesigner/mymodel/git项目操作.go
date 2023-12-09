package mymodel

import (
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	"github.com/ncruces/zenity"
)

func E下载github项目(github项目地址, 保存目录 string) error {
	// github项目地址 = https://github.com/duolabmeng6/wails-template-vue-go-easy
	// 保存目录 = d:/test
	// 我希望通过https下载github的项目到指定的目录上
	//修改 GitHub 项目地址以指向 ZIP 压缩包
	//检查github项目地址 是否包含https://
	fmt.Println("下载URL", github项目地址)

	name := ecore.E文件取文件名(github项目地址, false)
	savePath := 保存目录 + "/" + name + "_project.zip"
	删除文件 := false
	if ecore.E判断文本(github项目地址, "https://") {
		zipURL := github项目地址 + "/archive/refs/heads/main.zip"
		progress, _ := zenity.Progress(
			zenity.Title("下载项目中..."),
			zenity.MaxValue(100), // 设置最大进度值为100
		)

		progress.Text("正在下载...")

		err := E下载带进度回调(zipURL, savePath, func(进度 float64) {
			fmt.Println("正在下载...", 进度)
			progress.Text("正在下载..." + fmt.Sprintf("%.2f", 进度) + "%")
			progress.Value(int(进度))
		})
		if err != nil {
			fmt.Println("下载出错:", err)
			zenity.Info("下载错误,检查你的网络")
			progress.Close()
			return err
		}
		progress.Text("下载完成 即将完成更新")
		if progress.Close() != nil {
			fmt.Println("点击了取消")
			return nil
		}
		fmt.Println("下载完成了")
		删除文件 = true
	} else {
		//检查文件是否存在
		if !ecore.E文件是否存在(github项目地址) {
			fmt.Println("文件不存在")
			return nil
		}
		savePath = github项目地址
	}

	if !zip解压2(savePath, 保存目录, nil, func(解压路径 string) string {
		println("解压路径", 解压路径)
		//wails-template-vue-go-easy-main/.gitignore
		// 删除前面的文件夹
		解压路径 = ecore.StrCut(解压路径, "/$")

		return 解压路径
	}) {
		fmt.Println("解压失败")
		return nil
	}
	if 删除文件 {
		ecore.E删除文件(savePath)
	}

	return nil
}
