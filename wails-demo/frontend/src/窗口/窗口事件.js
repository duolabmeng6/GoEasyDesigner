export function 绑定窗口事件(c, 组件) {
    c.窗口创建完毕 = function () {
        console.log("窗口创建完毕")
    }

    c.按钮1被单击 = function () {
        console.log("按钮1被单击")
    }
//事件函数位置不要删除
}

