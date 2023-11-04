package main

import (
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	"os/exec"
	"strings"
	"time"
)

func main() {
	cmdStr := "git log --pretty=format:\"%an|%s|%h|%ad|%H\" --date=format:\"%Y-%m-%d %H:%M\" $(git describe --tags --abbrev=0)^..HEAD"
	cmd := exec.Command("sh", "-c", cmdStr)
	out, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Command failed with error: %v\n", err)
		fmt.Printf("Combined Output:\n%s\n", out)
		panic(out)
	}
	// 输出结果
	//println(string(out))
	//
	//	out := `多啦b梦 | 发布,全新组件 | d702663 | 2023-11-04 15:19 | d7026633c52915df92517ef1838cb0ea5f478080
	//多啦b梦 | 优化,删除无用的文件s.yaml | d702663 | 2023-11-04 15:19 | d7026633c52915df92517ef1838cb0ea5f478080
	//多啦b梦 | 优化,删除代码中无用的nginx.conf | df63adf | 2023-11-04 15:18 | df63adf6161f45c564fd7835a8a8a4dfaa0b6621
	//多啦b梦 | 发布样式调整 | 9cecae4 | 2023-11-04 11:10 | 9cecae45ccaf88985bf4c05d28bcda781de24d90`
	//分割处理 out 得到 []map[string]string 然后依次读取 author,commit,hash,date

	outArr := strings.Split(string(out), "\n")
	var outArr2 []map[string]string
	for _, v := range outArr {
		if v != "" {
			vArr := strings.Split(v, "|")
			outArr2 = append(outArr2, map[string]string{
				"author": vArr[0],
				"commit": vArr[1],
				"hashs":  vArr[2],
				"date":   vArr[3],
				"hash":   vArr[4],
			})
		}
	}
	//fmt.Println(outArr2)

	友好时间 := FriendlyTime(ecore.E到时间(outArr2[0]["date"]).Time.Time, ecore.E到时间(outArr2[len(outArr2)-1]["date"]).Time.Time)
	//fmt.Println(友好时间)
	//删除最后一个
	outArr2 = outArr2[:len(outArr2)-1]

	//声明变量 kyes 为 bug, 优化, 新增, 发布的文本数组 检查commit的内容前缀是否匹配 如果匹配则加入到对应的数组中
	var bug []string
	var 优化 []string
	var 新增 []string
	var 发布 []string
	for _, v := range outArr2 {
		//把前面关键字比如 bug去掉
		//追加 ([hashs](https://github.com/duolabmeng6/GoEasyDesigner/commit/{hashs}))
		strLink := ` [{{author}} {{hashs}}](https://github.com/duolabmeng6/GoEasyDesigner/commit/{{hash}}) {{time}} `
		strLink = strings.Replace(strLink, "{{hashs}}", v["hashs"], -1)
		strLink = strings.Replace(strLink, "{{hash}}", v["hash"], -1)
		strLink = strings.Replace(strLink, "{{time}}", v["date"], -1)
		strLink = strings.Replace(strLink, "{{author}}", v["author"], -1)
		v["commit"] += strLink

		if strings.HasPrefix(v["commit"], "bug") {
			v["commit"] = strings.Replace(v["commit"], "bug,", "", -1)

			bug = append(bug, v["commit"])

		}
		if strings.HasPrefix(v["commit"], "优化") {
			v["commit"] = strings.Replace(v["commit"], "优化,", "", -1)

			优化 = append(优化, v["commit"])
		}
		if strings.HasPrefix(v["commit"], "新增") {
			v["commit"] = strings.Replace(v["commit"], "新增,", "", -1)

			新增 = append(新增, v["commit"])
		}
		if strings.HasPrefix(v["commit"], "发布") {
			v["commit"] = strings.Replace(v["commit"], "发布,", "", -1)

			发布 = append(发布, v["commit"])
		}

	}
	// 生成格式为
	// # 修复Bug
	// - commit内容 ([hashs](https://github.com/duolabmeng6/GoEasyDesigner/commit/{hashs}))

	发布Content := ""
	newContent := ""
	//检查 bug是否有成员
	if len(bug) > 0 {
		newContent += "# 修复Bug\n"
		for _, v := range bug {
			newContent += "- " + v + "\n"
		}
	}
	//检查 优化是否有成员
	if len(优化) > 0 {
		newContent += "# 优化\n"
		for _, v := range 优化 {
			newContent += "- " + v + "\n"
		}
	}
	//检查 新增是否有成员
	if len(新增) > 0 {
		newContent += "# 新增\n"
		for _, v := range 新增 {
			newContent += "- " + v + "\n"
		}
	}
	//检查 发布是否有成员
	if len(发布) > 0 {
		发布Content = 发布[0]
	}

	content := `# GoEasyDesigner 窗口设计师

奋斗了{{FriendlyTime}}，本次更新内容如下：

{{发布Content}}

{{newContent}}
`
	content = strings.Replace(content, "{{FriendlyTime}}", 友好时间, -1)
	content = strings.Replace(content, "{{newContent}}", newContent, -1)
	content = strings.Replace(content, "{{发布Content}}", 发布Content, -1)

	fmt.Println(content)

}

func FriendlyTime(t time.Time, now time.Time) string {
	//t := this.Time.Time
	//now := time.Now()
	duration := now.Sub(t)
	if duration < 0 {
		duration = -duration
		if duration < time.Minute {
			return fmt.Sprintf("%d 秒后", int(duration.Seconds()))
		} else if duration < time.Hour {
			return fmt.Sprintf("%d 分钟后", int(duration.Minutes()))
		} else if duration < time.Hour*24 {
			return fmt.Sprintf("%d 小时后", int(duration.Hours()))
		} else if duration < time.Hour*24*30 {
			return fmt.Sprintf("%d 天后", int(duration.Hours()/24))
		} else if duration < time.Hour*24*365 {
			return fmt.Sprintf("%d 个月后", int(duration.Hours()/24/30))
		} else {
			return "很久以后"
		}
	} else {
		if duration < time.Minute {
			return fmt.Sprintf("%d 秒前", int(duration.Seconds()))
		} else if duration < time.Hour {
			return fmt.Sprintf("%d 分钟前", int(duration.Minutes()))
		} else if duration < time.Hour*24 {
			return fmt.Sprintf("%d 小时前", int(duration.Hours()))
		} else if duration < time.Hour*24*30 {
			return fmt.Sprintf("%d 天前", int(duration.Hours()/24))
		} else if duration < time.Hour*24*365 {
			return fmt.Sprintf("%d 个月前", int(duration.Hours()/24/30))
		} else {
			return "很久以前"
		}
	}
}
