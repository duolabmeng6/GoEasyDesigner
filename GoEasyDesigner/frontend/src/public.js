const parseDimension = (value) => {
    //检查是否包含 vw vh % 等单位
    if (typeof value === 'string') {
        if(value === "inherit" || value === "auto"){
            return value;
        }
        if(value.includes('v') || value.includes('%')){
            return value;
        }
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
        zIndex: item.zIndex,
        color: item.corlor,
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
    let rect_designer = {}
    if (designer) {
        rect_designer = designer.getBoundingClientRect();
    } else {
        return style
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
        right: parseDimension(item.right),
        bottom: parseDimension(item.bottom),
        width: parseDimension(item.width),
        height: parseDimension(item.height),
        border: item.border,
        background: item.background,
        zIndex: item.zIndex,
        position: 'absolute',
        overflowY: item.overflowY || 'visible',
        overflowX: item.overflowX || 'visible'
    };



    if (item.position !== undefined) {
        style.position = item.position;
    }
    if (item.图片 !== undefined) {
        if (item.backgroundSize !== undefined) {
            style.backgroundSize = '100% 100%';
        }
        if (item.backgroundRepeat !== undefined) {
            style.backgroundRepeat = 'no-repeat';
        }
        if (item.backgroundPosition !== undefined) {
            style.backgroundPosition = 'center';
        }
        if (item.backgroundAttachment !== undefined) {
            style.backgroundAttachment = 'scroll';
        }
        style.backgroundImage = `url(${item.图片})`;
        style.backgroundSize = item.backgroundSize
        style.backgroundRepeat = item.backgroundRepeat
        style.backgroundPosition = item.backgroundPosition
        style.backgroundAttachment = item.backgroundAttachment
    }
    if (item.fontSize !== undefined) {
        item.fontSize = item.fontSize || 12;
    }

    return style;
};


/* 生成组件对应关系方便ide 提示 */

function generateComponentCode(components, parentPath = '') {
    const codeLines = [];
    let k = 0;
    let codeLine;
    for (const component of components) {
        let componentName = component["name"];
        const componentPath = `${parentPath}.childComponents[${k}]`;
        const componentPath2 = `${parentPath}`;
        k = k + 1;
        // componentName 如果带有空格 删除空格 并且把后面1个字母大写
        if (componentName) {
            if (componentName.includes(" ")) {
                const arr = componentName.split(" ");
                let newName = "";
                for (let i = 0; i < arr.length; i++) {
                    newName = newName + arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                }
                componentName = newName;
            }
        }


        codeLine = `${componentName} : designData[0]${componentPath}`;
        if (componentName == "" || componentName == undefined) {
        } else {
            codeLines.push(codeLine);
        }

        if (component["childComponents"] && component["childComponents"].length > 0) {
            const childCodeLines = generateComponentCode(component["childComponents"], componentPath);
            codeLines.push(...childCodeLines);
        }
    }

    return codeLines;
}

function 生成辅助代码(obj) {
    const codeLines = generateComponentCode(obj);
    let code = "        Win : designData[0],\r\n"
    for (const codeLine of codeLines) {
        code = code + "        " + codeLine + ",\r\n"
    }
    let codeTpl = `
import designData from './design.json';
    
function __aux_code() {
    return {
${code}
    }
}
export default __aux_code
    `
    return codeTpl
}

// const jsonData = require('./design.json');
// console.log(生成辅助代码(jsonData[0].childComponents))


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
    const pattern = `(\\/\\/Don't delete the event function flag[^\\n]*)`;

    // Compile the regular expression
    const re = new RegExp(pattern);

    // Replace the matching pattern with the insertion code
    const result = jscode.replace(re, `${insertionCode}$1`);

    return result;
}

export {getItemStyle, getItemStyle2, getItemStyleShape, 生成辅助代码, 取父目录, InsertCode};