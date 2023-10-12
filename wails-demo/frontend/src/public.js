const parseDimension = (value) => {
    if (typeof value === 'string') {
        return value.includes('%') ? value : `${parseInt(value)}px`;
    }
    return `${parseInt(value)}px`;
};

const getItemStyle = (item) => {
    const style = {
        top: parseDimension(item.top),
        left: parseDimension(item.left),
        width: parseDimension(item.width),
        height: parseDimension(item.height),
        border: item.border,
        background: item.background,
        zIndex: item.层级,
        color: item.文字颜色,
    };

    return style;
};
const getItemStyleShape = (item) => {
    const style = {
        top: parseDimension(item.top),
        left: parseDimension(item.left),
        width: parseDimension(item.width),
        height: parseDimension(item.height),
        border: item.border,
        background: item.background,
        zIndex: item.层级,
        position: 'absolute',
    };
    if (item.position !== undefined) {
        style.position = item.position;
    }

    return style;
};


function 取父目录(path) {
    // 将所有的反斜杠 \ 替换为斜杠 /
    var convertedPath = path.replace(/\\/g, '/');

    // 使用正则表达式获取父目录
    var parentDirectory = convertedPath.replace(/\/[^/]*$/, '');

    return parentDirectory;
}

export {getItemStyle,
    getItemStyleShape,
};