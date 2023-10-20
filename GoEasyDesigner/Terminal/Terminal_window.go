//go:build windows
// +build windows

package Terminal

import (
	"bufio"
	"errors"
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	"os/exec"
	"sync"
)

type Terminal struct {
	cmd       *exec.Cmd
	stdout    *bufio.Scanner
	isRunning bool
	isDone    bool
	lock      sync.Mutex
}

func NewTerminal() *Terminal {
	return &Terminal{}
}

func (t *Terminal) StartCommand(command string, fn func(string, error)) bool {
	t.lock.Lock()
	defer t.lock.Unlock()

	if t.isRunning {
		fn("", fmt.Errorf("已有命令在运行"))
		return false
	}

	cmd := exec.Command("cmd", "/C", command)
	// 隐藏黑色窗口
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		fn("", err)
		return false
	}

	if err := cmd.Start(); err != nil {
		fn("", err)
		return false
	}
	t.cmd = cmd
	t.stdout = bufio.NewScanner(stdout)
	t.isRunning = true

	go func() {
		for t.stdout.Scan() {
			output := t.stdout.Text()
			output = ecore.E文本编码转换(output, "", "utf8")
			fn(output, nil)
		}

		if err := t.stdout.Err(); err != nil {
			fn("", err)
		}

		t.lock.Lock()
		t.isRunning = false
		t.isDone = true
		t.lock.Unlock()
	}()

	go func() {
		cmd.Wait()
		t.lock.Lock()
		t.isRunning = false
		t.lock.Unlock()
		println("命令已完成")
		fn("", errors.New("命令已完成"))

	}()
	return true

}

func (t *Terminal) StopCommand() {
	t.lock.Lock()
	defer t.lock.Unlock()

	if t.isRunning {
		if err := t.cmd.Process.Kill(); err != nil {
			fmt.Println("无法终止命令:", err)
		}
	}
}

func (t *Terminal) IsCommandDone() bool {
	t.lock.Lock()
	defer t.lock.Unlock()
	return t.isDone
}
