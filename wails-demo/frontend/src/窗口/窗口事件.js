export function 绑定窗口事件(c, 组件) {


    c.按钮1被单击 = function () {
        console.log("按钮1被单击")
        组件.编辑框1.内容="祖国你好!"
    }

    c.编辑框1被单击 = function () {
        console.log("编辑框1被单击")
    }

    c.按钮2被单击 = function () {
        console.log("按钮2被单击")
    }

    c.按钮3被单击 = function () {
        console.log("按钮3被单击")
    }
//事件函数位置不要删除
}

