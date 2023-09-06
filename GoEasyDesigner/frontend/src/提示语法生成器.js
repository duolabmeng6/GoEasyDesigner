function 提取key(components) {
    const codeLines = [];
    for (const component of components) {
        // 遍历 component 所有的 key
        for (const key in component) {
            let name = component["名称"];
            if (name == "" || name == undefined) {
                continue
            }

            if (检查是否全部为数字或者字母(name)) {
                continue
            }
            if (检查是否全部为数字或者字母(key)) {
                continue
            }
            codeLines.push(key);
            codeLines.push(name);


        }
        if (component["子组件"] && component["子组件"].length > 0) {
            const childCodeLines = 提取key(component["子组件"]);
            codeLines.push(...childCodeLines);
        }
    }
    return codeLines;
}

function 检查是否全部为数字或者字母(str) {
    var reg = /^[A-Za-z0-9]+$/;
    return reg.test(str);
}


const 生成提示词 = async (keys, fn) => {
    // const pinyin = require('pinyin-pro')
    return import('pinyin-pro').then((exports) => {
        // exports.pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
        // console.log(exports.pinyin('汉语拼音'))
        let res = 查询返回(exports)
        if (fn !== undefined) {
            fn(res)
        }
        return res
    });
    // import { pinyin } from 'pinyin-pro';
    // const { pinyin } = require('pinyin-pro');
    function 查询返回(pinyin) {
        const keywordMappings = {
            // "bjk": { insertText: "编辑框", label: "bjk编辑框" },
        };
        for (const key of keys) {
            const pinyinArray = pinyin.pinyin(key, {
                toneType: 'none', type: 'array', pattern: 'first',
            });
            const abbreviation = pinyinArray.join('').toLowerCase();
            keywordMappings[abbreviation] = {
                insertText: key,
                label: abbreviation + key,
            }
        }
        // console.log(keywordMappings)
        return keywordMappings
    }
}

const 生成提示辅助代码 = async (obj, fn) => {
    let kyes = 提取key(obj);
    let 额外keys = ["组件"]
    kyes = [...kyes, ...额外keys]
    //过滤重复的值
    kyes = [...new Set(kyes)]
    kyes = await 生成提示词(kyes, fn)
    // console.log(JSON.stringify(kyes, null, 4))
    return JSON.stringify(kyes, null, 4);
}
// const jsonData = require('/Users/ll/Documents/GitHub/GoEasyDesigner/wails-demo/frontend/src/窗口/设计文件.json');
//
// 生成辅助代码(jsonData)
export {生成提示辅助代码}