export function 绑定窗口事件(窗口) {
    窗口.窗口创建完毕 = function () {
        console.log("窗口创建完毕")
    }


    窗口.按钮1_被单击 = function () {
        console.log("按钮1_被单击")
    }

    窗口.按钮2_被单击 = function () {
        console.log("按钮2_被单击")
    }
//事件函数位置不要删除
}

