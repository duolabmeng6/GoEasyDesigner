package TerminalWin

import (
	"bufio"
	"errors"
	"fmt"
	"os/exec"
	"sync"
)

type TerminalWin struct {
	cmd       *exec.Cmd
	stdout    *bufio.Scanner
	isRunning bool
	isDone    bool
	lock      sync.Mutex
}

func NewTerminalWin() *TerminalWin {
	return &TerminalWin{}
}

func (t *TerminalWin) StartCommand(command string, fn func(string, error)) bool {
	t.lock.Lock()
	defer t.lock.Unlock()

	if t.isRunning {
		fn("", fmt.Errorf("已有命令在运行"))
		return false
	}

	cmd := exec.Command("cmd", "/C", command) // 使用 "cmd" 来执行命令
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
		fmt.Println("命令已完成")
		fn("", errors.New("命令已完成"))
	}()
	return true
}

func (t *TerminalWin) StopCommand() {
	t.lock.Lock()
	defer t.lock.Unlock()

	if t.isRunning {
		if err := t.cmd.Process.Kill(); err != nil {
			fmt.Println("无法终止命令:", err)
		}
	}
}

func (t *TerminalWin) IsCommandDone() bool {
	t.lock.Lock()
	defer t.lock.Unlock()
	return t.isDone
}
