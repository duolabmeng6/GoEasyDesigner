//go:build darwin
// +build darwin

package Terminal

import (
	"bufio"
	"errors"
	"fmt"
	"os/exec"
	"sync"
	"syscall"
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

	cmd := exec.Command("bash", "-c", command)
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Setpgid: true,
	}

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
		err := syscall.Kill(-t.cmd.Process.Pid, syscall.SIGKILL)
		if err != nil {
			return
		}
	}
}

func (t *Terminal) StopCommand2() {
	t.lock.Lock()
	defer t.lock.Unlock()
	//发送 ctrl + c 的信号 让程序平稳的退出

	// 向进程发送Ctrl+C信号
	process := t.cmd.Process
	if process != nil {
		//err := process.Signal(syscall.SIGHUP)
		err := syscall.Kill(-t.cmd.Process.Pid, syscall.SIGTERM)

		if err != nil {
			// 处理错误
		}
	}
}
func (t *Terminal) IsCommandDone() bool {
	t.lock.Lock()
	defer t.lock.Unlock()
	return t.isDone
}
