export function 创建标签(名称, left, top, width, height) {
    return {
        名称: 名称,
        组件名称: "标签",
        标题: 名称,
        style: {
            left: left,
            top: top,
            width: width,
            height: height
        },
        点击事件: ""
    }
}