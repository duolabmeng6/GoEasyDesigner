package Terminal

import (
	"testing"
	"time"
)

func TestNewTerminalWindow(t *testing.T) {
	terminal := NewTerminal()
	if terminal == nil {
		t.Error("NewTerminalWindow() failed")
	}
	//
	命令 := `
set PATH=%PATH%;C:\Users\l\go\bin
set PATH=%PATH%;C:\Users\l\go\go1.21.0\bin
set PATH=%PATH%;C:\Program Files\nodejs
set PATH=%PATH%;C:\Program Files\nodejs\node_modules\npm\bin
wails
`

	terminal.StartCommand(命令, func(output string, err error) {
		if err != nil {
			t.Error(err.Error())
		}
		println(output)
	})

	time.Sleep(3 * time.Second)
}
