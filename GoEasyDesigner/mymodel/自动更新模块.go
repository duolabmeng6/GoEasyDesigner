package mymodel

import (
	"archive/zip"
	"encoding/json"
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	"github.com/ncruces/zenity"
	"io"
	"net/http"
	"os"
	"os/exec"
	"os/user"
	"path/filepath"
	"runtime"
	"strings"
	"time"
)

type GithubJSONData []struct {
	URL       string `json:"url"`
	AssetsURL string `json:"assets_url"`
	UploadURL string `json:"upload_url"`
	HTMLURL   string `json:"html_url"`
	ID        int    `json:"id"`
	Author    struct {
		Login             string `json:"login"`
		ID                int    `json:"id"`
		NodeID            string `json:"node_id"`
		AvatarURL         string `json:"avatar_url"`
		GravatarID        string `json:"gravatar_id"`
		URL               string `json:"url"`
		HTMLURL           string `json:"html_url"`
		FollowersURL      string `json:"followers_url"`
		FollowingURL      string `json:"following_url"`
		GistsURL          string `json:"gists_url"`
		StarredURL        string `json:"starred_url"`
		SubscriptionsURL  string `json:"subscriptions_url"`
		OrganizationsURL  string `json:"organizations_url"`
		ReposURL          string `json:"repos_url"`
		EventsURL         string `json:"events_url"`
		ReceivedEventsURL string `json:"received_events_url"`
		Type              string `json:"type"`
		SiteAdmin         bool   `json:"site_admin"`
	} `json:"author"`
	NodeID          string    `json:"node_id"`
	TagName         string    `json:"tag_name"`
	TargetCommitish string    `json:"target_commitish"`
	Name            string    `json:"name"`
	Draft           bool      `json:"draft"`
	Prerelease      bool      `json:"prerelease"`
	CreatedAt       time.Time `json:"created_at"`
	PublishedAt     time.Time `json:"published_at"`
	Assets          []struct {
		URL      string `json:"url"`
		ID       int    `json:"id"`
		NodeID   string `json:"node_id"`
		Name     string `json:"name"`
		Label    string `json:"label"`
		Uploader struct {
			Login             string `json:"login"`
			ID                int    `json:"id"`
			NodeID            string `json:"node_id"`
			AvatarURL         string `json:"avatar_url"`
			GravatarID        string `json:"gravatar_id"`
			URL               string `json:"url"`
			HTMLURL           string `json:"html_url"`
			FollowersURL      string `json:"followers_url"`
			FollowingURL      string `json:"following_url"`
			GistsURL          string `json:"gists_url"`
			StarredURL        string `json:"starred_url"`
			SubscriptionsURL  string `json:"subscriptions_url"`
			OrganizationsURL  string `json:"organizations_url"`
			ReposURL          string `json:"repos_url"`
			EventsURL         string `json:"events_url"`
			ReceivedEventsURL string `json:"received_events_url"`
			Type              string `json:"type"`
			SiteAdmin         bool   `json:"site_admin"`
		} `json:"uploader"`
		ContentType        string    `json:"content_type"`
		State              string    `json:"state"`
		Size               int       `json:"size"`
		DownloadCount      int       `json:"download_count"`
		CreatedAt          time.Time `json:"created_at"`
		UpdatedAt          time.Time `json:"updated_at"`
		BrowserDownloadURL string    `json:"browser_download_url"`
	} `json:"assets"`
	TarballURL string `json:"tarball_url"`
	ZipballURL string `json:"zipball_url"`
	Body       string `json:"body"`
}
type ReleaseInfo struct {
	Version        string   `json:"版本号"`
	DownloadURLs   []string `json:"下载地址列表"`
	MacDownloadURL string   `json:"mac下载地址"`
	WinDownloadURL string   `json:"win下载地址"`
	Changelog      string   `json:"更新内容"`
	ReleaseTime    string   `json:"发布时间"`
}

func E获取Github仓库Releases版本和更新内容() *ReleaseInfo {
	owner := "duolabmeng6"   // GitHub 仓库的所有者
	repo := "GoEasyDesigner" // GitHub 仓库的名称
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/releases", owner, repo)
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("请求失败:", err, url)
		return nil
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		fmt.Println("请求失败:", resp.Status, url)
		return nil
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("读取响应失败:", err)
		return nil
	}
	//var err error
	//body := ecore.E读入文件("/Users/chensuilong/Desktop/goproject/v3fanyi/mymodel/githubdata.json")

	var releases GithubJSONData

	err = json.Unmarshal(body, &releases)
	if err != nil {
		fmt.Println("解析响应失败:", err)
		return nil
	}
	if len(releases) < 0 {
		return nil
	}

	//latestRelease := releases[0]
	//version := latestRelease.TagName
	//fmt.Println("最新的 Release 版本号:", version)
	//fmt.Println("最新的 Release 版本号:", latestRelease.Body)
	//// 循环获取 文件名和下载地址
	//for _, asset := range latestRelease.Assets {
	//	fmt.Println(asset.Name, asset.BrowserDownloadURL)
	//}

	latestRelease := releases[0]
	version := latestRelease.TagName
	downloadURLs := make([]string, 0)
	macDownloadURL := ""
	winDownloadURL := ""

	// 获取文件名和下载地址
	for _, asset := range latestRelease.Assets {
		downloadURLs = append(downloadURLs, asset.BrowserDownloadURL)
		//查找文本是否包含  macos.zip 和 .exe 不区分大小写
		if strings.Contains(strings.ToLower(asset.Name), "macos.zip") {
			macDownloadURL = asset.BrowserDownloadURL
		}
		if strings.Contains(strings.ToLower(asset.Name), ".exe") {
			winDownloadURL = asset.BrowserDownloadURL
		}

	}

	releaseInfo := &ReleaseInfo{
		Version:        version,
		DownloadURLs:   downloadURLs,
		MacDownloadURL: macDownloadURL,
		WinDownloadURL: winDownloadURL,
		Changelog:      latestRelease.Body,
		ReleaseTime:    ecore.E到时间(latestRelease.CreatedAt.String()).E时间到文本("Y-m-d H:i:s"),
	}

	return releaseInfo
}

func E下载带进度回调(下载地址 string, 文件保存路径 string, fc func(进度 float64)) error {
	resp, err := http.Get(下载地址)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	out, err := os.Create(文件保存路径)
	if err != nil {
		return err
	}
	defer out.Close()

	下载文件大小 := resp.ContentLength
	已下载大小 := int64(0)
	buf := make([]byte, 1024)

	进度Ticker := time.Tick(time.Millisecond * 50) //降低刷新的频率

	for {
		n, err := resp.Body.Read(buf)
		if n > 0 {
			_, err := out.Write(buf[:n])
			if err != nil {
				return err
			}

			已下载大小 += int64(n)
			进度 := float64(已下载大小) / float64(下载文件大小) * 100

			select {
			case <-进度Ticker:
				if fc != nil {
					fc(进度) // 调用进度回调函数
				}
			default:
				// 不触发进度回调
			}
		}

		if err != nil {
			if err != io.EOF {
				return err
			}
			break
		}
	}
	fc(100) // 调用进度回调函数

	return nil
}

func E系统是否为window系统() bool {
	return strings.ToLower(runtime.GOOS) == "windows"
}

func E系统是否为linux系统() bool {
	return strings.ToLower(runtime.GOOS) == "linux"
}

func E系统是否为mac系统() bool {
	return strings.ToLower(runtime.GOOS) == "darwin"
}

// E是否为调试模式
// 判断当前的环境是否为编译后的程序
// 真为调试模式
// 假为编译后的程序
func E是否为调试模式() bool {
	debugMode := false
	if os.Getenv("DEBUG") != "" {
		debugMode = true
	}

	return debugMode
}

func 取自身MacOs应用路径() string {
	// 如果不处于编译状态反馈空
	编译后路径, err := os.Executable()
	//println("编译后路径", 编译后路径)
	if err != nil {
		return ""
	}
	// 调试模式下的路径
	//编译后路径 = "/Users/chensuilong/Desktop/goproject/v3fanyi/bin/qoq.app/Contents/MacOS/qoq"
	// 编译后路径 取父目录
	编译后路径 = 编译后路径[:strings.LastIndex(编译后路径, "/")]

	app目录 := 编译后路径[:strings.LastIndex(编译后路径, "/")]
	app目录 = app目录[:strings.LastIndex(app目录, "/")]
	父目录名称 := 编译后路径[strings.LastIndex(编译后路径, "/")+1:]
	if 父目录名称 == "MacOS" {
		return app目录
	} else {
		return ""
	}
}

func E更新自己MacOS应用(资源压缩包 string, 应用名称 string) (bool, string) {
	// 资源压缩包 := "/Users/chensuilong/Desktop/pythonproject/autotest/dist/my_app.2.0.zip"
	// 应用名称 := "my_app.app"
	MacOs应用路径 := 取自身MacOs应用路径()
	fmt.Println("MacOs应用路径", MacOs应用路径)
	//MacOs应用路径 = "/Users/chensuilong/Downloads/qoq.app"
	if MacOs应用路径 != "" {
		app目录父目录 := MacOs应用路径[:strings.LastIndex(MacOs应用路径, "/")]
		fmt.Printf("资源压缩包 %s app目录父目录%s MacOs应用路径%s\n", 资源压缩包, app目录父目录, MacOs应用路径)
		if MacOs应用路径 != "" {
			zip解压2(资源压缩包, app目录父目录, []string{应用名称 + "/Contents/"})
			// 解压完成后删除压缩包
			//os.Remove(资源压缩包)
			MacOs应用路径 = filepath.Join(app目录父目录, 应用名称)
			// QApplication.quit()
			应用名称 = 应用名称[:strings.LastIndex(应用名称, ".")]
			运行命令 := fmt.Sprintf("killall %s && open -n -a %s", 应用名称, MacOs应用路径)
			cmd := exec.Command("sh", "-c", 运行命令)
			err := cmd.Run()
			if err != nil {
				fmt.Println(err)
				return false, "killall失败 请自己重启应用"
			}
			return true, MacOs应用路径
		}
	} else {
		fmt.Println("非MacOS编译环境")
		return false, "非MacOS编译环境"
	}
	fmt.Println("应用路径为空")
	return false, "应用路径为空"
}

func zip解压2(压缩包的路径 string, 解压目录 string, 允许解压路径前缀 []string) bool {
	// 保持权限和软连接解压
	// 允许解压路径前缀 例如 ["my_app.app/Contents/"] 不填则全部解压

	文件, err := zip.OpenReader(压缩包的路径)
	if err != nil {
		fmt.Println(err)
		return false
	}
	defer 文件.Close()

	for _, info := range 文件.File {
		// 检查目标文件路径是否在允许解压路径前缀中
		if len(允许解压路径前缀) > 0 {
			允许解压 := false
			for _, 路径 := range 允许解压路径前缀 {
				if strings.HasPrefix(info.Name, 路径) {
					允许解压 = true
				}
			}
			if !允许解压 {
				continue
			}
		}

		文件名 := info.Name

		目标文件路径 := filepath.Join(解压目录, 文件名)

		权限 := info.Mode().Perm()
		if info.Mode()&os.ModeSymlink != 0 { // 检查是否为软连接
			软连接位置, err := readLink(info)
			if err != nil {
				fmt.Println(err)
				continue
			}
			// 检查目标文件路径是否存在，如果存在就删除，防止创建失败
			if _, err := os.Lstat(目标文件路径); err == nil {
				os.Remove(目标文件路径)
			}
			err = os.Symlink(软连接位置, 目标文件路径)
			if err != nil {
				fmt.Println(err)
			}
		} else {
			// 删除文件重新解压
			if _, err := os.Lstat(目标文件路径); err == nil {
				// 检查是否为文件
				if !info.Mode().IsDir() {
					os.Remove(目标文件路径)
				}
			}
			err = extractFile(info, 目标文件路径)
			if err != nil {
				fmt.Println(err)
			}

			// 修改文件权限
			if _, err := os.Lstat(目标文件路径); err == nil {
				err = os.Chmod(目标文件路径, 权限)
				if err != nil {
					fmt.Println(err)
				}
			}
		}
	}

	return true
}

func readLink(info *zip.File) (string, error) {
	file, err := info.Open()
	if err != nil {
		return "", err
	}
	defer file.Close()

	linkName := make([]byte, info.FileInfo().Size())
	_, err = io.ReadFull(file, linkName)
	if err != nil {
		return "", err
	}

	return string(linkName), nil
}
func extractFile(info *zip.File, 目标文件路径 string) error {
	file, err := info.Open()
	if err != nil {
		return err
	}
	defer file.Close()

	if info.FileInfo().IsDir() {
		err = os.MkdirAll(目标文件路径, info.Mode())
		if err != nil {
			return err
		}
	} else {
		writer, err := os.OpenFile(目标文件路径, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, info.Mode())
		if err != nil {
			return err
		}
		defer writer.Close()

		_, err = io.Copy(writer, file)
		if err != nil {
			return err
		}
	}

	return nil
}

func E取用户下载文件夹路径() string {
	usr, err := user.Current()
	if err != nil {
		fmt.Println("pull:", err)
		return ""
	}
	下载文件夹路径 := filepath.Join(usr.HomeDir, "Downloads")
	return 下载文件夹路径
}

func 取自身路径Window() (string, error) {
	exe, err := os.Executable()
	if err != nil {
		return "", err
	}
	return exe, nil
}

func E更新自己Window应用(exe资源文件路径 string) (bool, string) {
	// window更新方法
	自身路径Window, _ := 取自身路径Window()

	//文件名 := filepath.Base(自身路径Window)
	// 检查文件是否存在
	旧的文件名 := 自身路径Window + ".old.bak"
	if _, err := os.Stat(旧的文件名); err == nil {
		// 删除文件
		os.Remove(旧的文件名)
	}

	os.Rename(自身路径Window, 旧的文件名)
	os.Rename(exe资源文件路径, 自身路径Window)

	// 结束自身运行然后重启自己
	cmd := exec.Command(自身路径Window)
	cmd.Args = append(cmd.Args, os.Args[1:]...)
	cmd.Start()

	os.Exit(0) // 此处退出当前进程
	return true, ""
}

func E检查更新() {

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

	err = E下载带进度回调(info.MacDownloadURL, 下载文件夹路径+"/GoEasyDesigner_MacOS.zip", func(进度 float64) {
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
	flag, s := E更新自己MacOS应用(下载文件夹路径+"/GoEasyDesigner_MacOS.zip", "qoq.app")
	println(flag, s)
}

func E检查更新_window() {
	下载文件夹路径 := E取用户下载文件夹路径()
	info := E获取Github仓库Releases版本和更新内容()
	if info == nil {
		zenity.Info("网络原因无法获取更新信息")
		return
	}
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

	err = E下载带进度回调(info.WinDownloadURL, 下载文件夹路径+"/GoEasyDesigner.exe", func(进度 float64) {
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
	flag, s := E更新自己Window应用(下载文件夹路径 + "/GoEasyDesigner.exe")
	println(flag, s)
}
