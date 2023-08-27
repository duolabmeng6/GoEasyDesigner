export function 创建按钮(名称, left, top, width, height) {
    return {
        名称: 名称,
        组件名称: "按钮",
        标题: 名称,
        可视: true,
        style: {
            left: left,
            top: top,
            width: width,
            height: height
        },
        点击事件: ""
    }
}