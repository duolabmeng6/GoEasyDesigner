export function 绑定窗口事件(c, 组件) {
    c.窗口创建完毕 = function () {
        console.log("窗口创建完毕")
    }

    c.按钮1_被单击 = function () {
        console.log("按钮1_被单击")
        组件.编辑框1.内容 = "祖国,您好!"
    }

    c.按钮2被单击 = function () {
        console.log("按钮2_被单击")
        组件.窗口.width = 1000
        组件.编辑框1.内容 = "祖国,您好!"
        组件.按钮2.标题 = "abc"
        组件.按钮2.标题 = "abc"
        console.log(组件)

    }

    c.按钮2_鼠标左键被按下 = function () {
        console.log("按钮2_鼠标左键被按下")
    }
//事件函数位置不要删除
}

