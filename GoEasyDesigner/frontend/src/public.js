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
        zIndex: item.层级
    };

    return style;
};


/* 生成组件对应关系方便ide 提示 */

function generateComponentCode(components, parentPath = '') {
    const codeLines = [];
    let k = 0;
    let codeLine;
    for (const component of components) {
        const componentName = component["名称"];
        const componentPath = `${parentPath}.子组件[${k}]`;
        const componentPath2 = `${parentPath}`;
        k = k + 1;
        codeLine = `组件.${componentName} = list[0]${componentPath}`;
        if (componentName == "" || componentName == undefined) {
        } else {
            codeLines.push(codeLine);
        }

        if (component["子组件"] && component["子组件"].length > 0) {
            const childCodeLines = generateComponentCode(component["子组件"], componentPath);
            codeLines.push(...childCodeLines);
        }
    }

    return codeLines;
}

function 生成辅助代码(obj) {
    const codeLines = generateComponentCode(obj);
    let code = "    组件.窗口 = list[0]\r\n"
    for (const codeLine of codeLines) {
        code = code + "    " + codeLine + "\r\n"
    }
    let codeTpl = `
function __辅助代码(list, 组件) {
${code}
    return 组件
}
export default __辅助代码
    `
    return codeTpl
}

// const jsonData = require('./设计文件.json');
// console.log(生成辅助代码(jsonData[0].子组件))


function 取父目录(path) {
    // 将所有的反斜杠 \ 替换为斜杠 /
    var convertedPath = path.replace(/\\/g, '/');

    // 使用正则表达式获取父目录
    var parentDirectory = convertedPath.replace(/\/[^/]*$/, '');

    return parentDirectory;
}

export {getItemStyle, 生成辅助代码, 取父目录};