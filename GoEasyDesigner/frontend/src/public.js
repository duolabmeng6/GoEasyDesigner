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
function __代码辅助(list, 组件) {
${code}
    return 组件
}
export default __代码辅助
    `
    return codeTpl
}

// const jsonData = require('./组件数据.json');
// console.log(生成辅助代码(jsonData[0].子组件))



export {getItemStyle, 生成辅助代码};