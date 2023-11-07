package main

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
)

func copyFile(src, dst string) error {
	sourceFile, err := os.Open(src)
	if err != nil {
		return err
	}
	defer sourceFile.Close()

	// Create destination directory if it doesn't exist
	if err := os.MkdirAll(filepath.Dir(dst), os.ModePerm); err != nil {
		return err
	}

	destinationFile, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer destinationFile.Close()

	_, err = io.Copy(destinationFile, sourceFile)
	return err
}

func copyFiles(sourcePath, destinationPath string, excludeFiles []string) error {
	err := filepath.Walk(sourcePath, func(path string, f os.FileInfo, err error) error {
		if err != nil {
			fmt.Println(err) // can't walk here,
			return nil       // ignore this error
		}
		if f.IsDir() {
			return nil // ignore directories
		}

		// 排除指定文件和后缀
		exclude := false
		for _, excludeFile := range excludeFiles {
			if strings.HasSuffix(path, excludeFile) {
				exclude = true
				break
			}
		}
		if exclude {
			return nil
		}

		// 构建目标路径，保持相同的目录结构
		relPath, err := filepath.Rel(sourcePath, path)
		if err != nil {
			fmt.Printf("Error getting relative path: %v\n", err)
			return err
		}
		destinationFilePath := filepath.Join(destinationPath, relPath)

		// 复制文件
		err = copyFile(path, destinationFilePath)
		if err != nil {
			fmt.Printf("Error copying file %s: %v\n", path, err)
			return err
		}

		fmt.Printf("Copied %s to %s\n", path, destinationFilePath)
		return nil
	})

	return err
}

func main() {
	sourcePath := "/Users/ll/Documents/GitHub/GoEasyDesigner/GoEasyDesigner/frontend/src/components/boxs"
	destinationPath := "/Users/ll/Documents/GitHub/GoEasyDesigner/go-easy-demo/frontend/src/components/boxs"
	excludeFiles := []string{"Attr.vue", ".js"}
	//删除 destinationPath 下的所有文件
	err := os.RemoveAll(destinationPath)
	if err != nil {
		return
	}
	err = copyFiles(sourcePath, destinationPath, excludeFiles)
	if err != nil {
		fmt.Printf("Error copying files: %v\n", err)
	}
}
