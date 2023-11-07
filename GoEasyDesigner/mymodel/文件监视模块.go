package mymodel

import (
	"fmt"
	"github.com/fsnotify/fsnotify"
	"sync"
)

type E文件监视模块接口 interface {
	开始() error
	停止() error
	清空() error
	添加监视文件(文件路径 string, 处理函数 func(文件路径 string)) error
	删除监视文件(文件路径 string) error
}

type E文件监视模块 struct {
	watcher *fsnotify.Watcher
	监视文件列表  map[string]func(文件路径 string)
	mutex   sync.Mutex
}

func New文件监视模块() (*E文件监视模块, error) {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		return nil, err
	}

	m := &E文件监视模块{
		watcher: watcher,
		监视文件列表:  make(map[string]func(文件路径 string)),
	}

	return m, nil
}

func (m *E文件监视模块) E开始() error {
	done := make(chan bool)

	go func() {
		for {
			select {
			case event, ok := <-m.watcher.Events:
				if !ok {
					return
				}
				if event.Op&fsnotify.Write == fsnotify.Write {
					m.mutex.Lock()
					处理函数, 存在 := m.监视文件列表[event.Name]
					m.mutex.Unlock()

					if 存在 {
						fmt.Println("文件被修改:", event.Name)
						处理函数(event.Name)
					}
				}
			case err, ok := <-m.watcher.Errors:
				if !ok {
					return
				}
				fmt.Println("错误:", err)
			}
		}
	}()

	//err := m.watcher.Add("/path/to/default/file.txt") // 可以添加默认监视的文件路径
	//if err != nil {
	//	return err
	//}

	<-done
	return nil
}

func (m *E文件监视模块) E停止() error {
	return m.watcher.Close()
}
func (m *E文件监视模块) E清空() error {
	m.mutex.Lock()
	defer m.mutex.Unlock()

	for 文件路径 := range m.监视文件列表 {
		err := m.watcher.Remove(文件路径)
		if err != nil {
			return err
		}
	}

	m.监视文件列表 = make(map[string]func(文件路径 string))
	return nil
}

func (m *E文件监视模块) E添加监视文件(文件路径 string, 处理函数 func(文件路径 string)) error {
	m.mutex.Lock()
	defer m.mutex.Unlock()
	//检查是否已经添加过
	_, 存在 := m.监视文件列表[文件路径]
	if 存在 {
		return nil
	}
	err := m.watcher.Add(文件路径)
	if err != nil {
		return err
	}

	m.监视文件列表[文件路径] = 处理函数
	return nil
}

func (m *E文件监视模块) E删除监视文件(文件路径 string) error {
	m.mutex.Lock()
	defer m.mutex.Unlock()

	err := m.watcher.Remove(文件路径)
	if err != nil {
		return err
	}

	delete(m.监视文件列表, 文件路径)
	return nil
}
