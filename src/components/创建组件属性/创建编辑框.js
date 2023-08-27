export function 创建编辑框(名称, left, top, width, height) {
    return {
        名称: 名称,
        组件名称: "编辑框",
        内容: 名称,
        style: {
            left: left,
            top: top,
            width: width,
            height: height
        },
        点击事件: ""
    }
}