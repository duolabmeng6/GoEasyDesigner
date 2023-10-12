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

const getItemStyle2 = (item) => {
    // console.log("??");
    let style = {
        top: parseDimension(item.top),
        left: parseDimension(item.left),
        width: parseDimension(item.width),
        height: parseDimension(item.height),
    };
    // const element窗口 = document.getElementById("窗口");
    // if (element窗口) {
    //     const rect = element窗口.getBoundingClientRect();
    //     // style.top = parseInt(style.top) + rect.top + "px";
    //     // style.left = parseInt(style.left) + rect.left + "px";
    // }

    const designer = document.getElementById("designer");
    let rect_designer = designer.getBoundingClientRect();
    if (designer) {
        rect_designer = designer.getBoundingClientRect();
        // style.top = parseInt(style.top) + rect_designer.top + "px";
        // style.left = parseInt(style.left) + rect_designer.left + "px";
    }
    const element = document.querySelector(`[data-id="${item.data_id}"]`);
    if (element) {
        //获取元素在浏览器中的绝对位置
        const rect = element.getBoundingClientRect();
        style.top = `${rect.top - rect_designer.top}px`;
        style.left = `${rect.left - rect_designer.left}px`;
        style.width = `${rect.width}px`;
        style.height = `${rect.height}px`;
    } else {
        style.display = "none"
        return style;
    }
    if (style.top == "0px" && style.left == "0px" && style.width == "0px" && style.height == "0px") {
        style.display = "none"
        return style;
    }
    style.display = "block"

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

function InsertCode(jscode, insertionCode) {
    // 获取函数名称 窗口.按钮3被点击 = function () { 截取 按钮3被点击
    const 函数名称 = insertionCode.substring(insertionCode.indexOf(".") + 1, insertionCode.indexOf("=")).trim();

    // 检查是否已经存在
    if (jscode.includes(函数名称)) {
        return jscode;
    }

    // Define the regular expression pattern
    const pattern = `(\\/\\/事件函数位置不要删除[^\\n]*)`;

    // Compile the regular expression
    const re = new RegExp(pattern);

    // Replace the matching pattern with the insertion code
    const result = jscode.replace(re, `${insertionCode}$1`);

    return result;
}

export {getItemStyle, getItemStyle2, getItemStyleShape, 生成辅助代码, 取父目录, InsertCode};