function 提取key(components) {
    const codeLines = [];
    for (const component of components) {
        // 遍历 component 所有的 key
        for (const key in component) {
            let name = component["名称"];
            if (name == "" || name == undefined) {
                continue
            }
            // console.log("name", name, key)
            // if (检查是否全部为数字或者字母(name)) {
            //     continue
            // }
            // if (检查是否全部为数字或者字母(key)) {
            //     continue
            // }
            codeLines.push(key);
            codeLines.push(name);
            console.log("加入自动补全列表",component,name)


        }
        if (component["子组件"] && component["子组件"].length > 0) {
            const childCodeLines = 提取key(component["子组件"]);
            codeLines.push(...childCodeLines);
        }
    }
    // console.log("提取的key", codeLines)
    return codeLines;
}

function 检查是否全部为数字或者字母(str) {
    var reg = /^[0-9a-zA-Z]+$/;
    return reg.test(str);
}
function 检查是否存在中文(str) {
    //检查str中是否包含中文字符 不含 数字字母 如果有汉字返回 真 如果没有汉字返回假
    var reg = /[\u4e00-\u9fa5]/;
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
            let newNmae = abbreviation
            console.log("abbreviation", abbreviation, key,检查是否存在中文(key))

            if (检查是否存在中文(key)) {
                newNmae = abbreviation + key

            }else{
                newNmae =  key

            }
            keywordMappings[abbreviation] = {
                insertText: key,
                label: newNmae,
            }
        }
        // console.log(keywordMappings)
        return keywordMappings
    }
}

const 生成提示辅助代码 = async (obj, fn) => {
    let kyes = 提取key(obj);
    console.log("提取key",JSON.stringify(kyes, null, 4))

    let 额外keys = ["组件"]
    kyes = [...kyes, ...额外keys]
    //过滤重复的值
    kyes = [...new Set(kyes)]
    kyes = await 生成提示词(kyes, fn)
    console.log("提取key2",JSON.stringify(kyes, null, 4))
    return JSON.stringify(kyes, null, 4);
}
// const jsonData = require('/Users/ll/Documents/GitHub/GoEasyDesigner/go-easy-demo/frontend/src/窗口/设计文件.json');
// const test = async () => {
//     let data = await 生成提示辅助代码(jsonData)
//     console.log('data', data)
// }
// test()

export {生成提示辅助代码}