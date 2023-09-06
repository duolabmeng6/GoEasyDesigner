export function 绑定窗口事件(c, 组件) {
    c.窗口创建完毕 = function () {
        console.log("窗口创建完毕")
    }
    c.按钮1鼠标右键被按下 = function (e) {
        console.log("按钮1鼠标右键被按下")
        //阻止浏览器默认的事件 禁止弹出右键菜单
        e.preventDefault();

    }
    c.按钮1被单击 = function () {
        console.log("按钮1被单击")
        // 组件.编辑框1.内容 = "祖国,您好!"
    }
    c.按钮1鼠标位置被移动 = function (event) {
        let x;
        let y;
        x = event.clientX;
        y = event.clientY;
        console.log("按钮1鼠标位置被移动", x, y)
        // 组件.编辑框1.内容 = "祖国,您好!"
    }
//事件函数位置不要删除
}

