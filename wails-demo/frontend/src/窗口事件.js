// 用于绑定窗口事件
export function 绑定窗口事件(窗口) {
    窗口.窗口创建完毕 = function (){
        console.log("窗口创建完毕")
    }
    窗口.按钮1被点击 = function () {
        console.log("按钮1被点击了")
        窗口.组件.按钮1.标题 = "祖国你好222"
    }

}