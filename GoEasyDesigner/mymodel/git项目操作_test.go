package mymodel

import (
	"github.com/duolabmeng6/goefun/ecore"
	"testing"
)

func TestE下载github项目(t *testing.T) {
	E下载github项目("https://github.com/duolabmeng6/wails-template-vue-go-easy", "d:/test/app")
	//https://github.com/duolabmeng6/wails-template-vue-go-easy/archive/refs/heads/main.zip
}

func TestE搜索design文件(t *testing.T) {
	//func E文件枚举(欲寻找的目录 string, 欲寻找的文件名 string, files *[]string, 是否带路径 bool, 是否遍历子目录 bool) error {
	var files []string
	ecore.E文件枚举("C:\\eview\\project\\myporject", "design.json", &files, true, true)
	for _, v := range files {
		println(v)
	}
}
