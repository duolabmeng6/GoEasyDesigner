//go:build windows
// +build windows

package Terminal

import (
	"bufio"
	"errors"
	"fmt"
	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
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
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		fn("", err)
		return false
	}

	stderr, err := cmd.StderrPipe()
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
	gbkDecoder := simplifiedchinese.GBK.NewDecoder()

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
		// 读取命令的错误输出并传递给回调函数
		errScanner := bufio.NewScanner(stderr)
		for errScanner.Scan() {
			errOutput := errScanner.Text()
			errOutput, _, _ = transform.String(gbkDecoder, errOutput)

			fn("", errors.New(errOutput))
		}

		cmd.Wait()
		t.lock.Lock()
		t.isRunning = false
		t.lock.Unlock()
		fmt.Println("命令已完成")
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
