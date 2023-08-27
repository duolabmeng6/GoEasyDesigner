export function 创建开关(名称, left, top, width, height) {
    return {
        名称: 名称,
        组件名称: "开关",
        选中: false,
        style: {
            left: left,
            top: top,
            width: width,
            height: height
        },
        点击事件: ""
    }
}