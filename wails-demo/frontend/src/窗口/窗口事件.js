import * as goFc from "../../wailsjs/go/main/App";

export function 绑定窗口事件(c, 组件) {
    const 程序集变量 = {
        time: null
    }
    c.按钮2被单击 = function () {
        console.log("按钮2被单击")
        组件.编辑框1.内容 = "祖国你好!"
    }

    c.按钮_获取时间被单击 = async () => {
        console.log("按钮_获取时间被单击")
        //js
        //组件.编辑框_时间.内容 = new Date().toLocaleString()
        //go
        组件.编辑框_时间.内容 = await goFc.E获取系统时间()

        clearInterval(程序集变量.time)
        程序集变量.time = setInterval(async () => { (
            组件.编辑框_时间.内容 = await goFc.E获取系统时间()
        ) }, 1000)

    }
//事件函数位置不要删除
}