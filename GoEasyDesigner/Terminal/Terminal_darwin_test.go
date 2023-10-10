package Terminal

import (
	"testing"
	"time"
)

func TestNewTerminalMac(t *testing.T) {
	terminal := NewTerminal()
	if terminal == nil {
		t.Error("NewTerminalWindow() failed")
	}
	//
	命令 := `
cd /Users/ll/Documents/GitHub/GoEasyDesigner/wails-demo/frontend
npm run dev
`

	terminal.StartCommand(命令, func(output string, err error) {
		if err != nil {
			print("err:", output)
			print("err2:", err.Error())
			//t.Error(err.Error())
		}
		println(output)
	})

	time.Sleep(3 * time.Second)
	terminal.StopCommand2()
	println("停止命令2")
	time.Sleep(10 * time.Second)
	terminal.StopCommand()
	println("停止命令1")

}
