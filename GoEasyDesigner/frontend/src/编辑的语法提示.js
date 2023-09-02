function createCustomProposal(range, insertText, label) {
    return {
        label: label,
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: "",
        insertText: insertText,
        range: range,
    };
}

monaco.languages.registerCompletionItemProvider("javascript", {
    provideCompletionItems: function (model, position) {
        var word = model.getWordUntilPosition(position);
        var range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
        };

        var keywordMappings = {
            "bjk": { insertText: "编辑框", label: "bjk编辑框" },
            "zj": { insertText: "组件", label: "zj组件" },
            "nr": { insertText: "内容", label: "nr内容" },
        };

        // 检查用户输入的关键词是否在映射中
        var suggestions = [];
        Object.keys(keywordMappings).forEach(function (keyword) {
            var regex = new RegExp("^" + word.word, "i");
            if (regex.test(keyword)) {
                var { insertText, label } = keywordMappings[keyword];
                suggestions.push(createCustomProposal(range, insertText, label));
            }
        });

        return { suggestions: suggestions };
    },
});

monaco.editor.create(document.getElementById("container"), {
    value: `export function 绑定窗口事件(c, 组件) {
    c.窗口创建完毕 = function () {
        console.log("窗口创建完毕")
    }

    c.按钮1被单击 = function () {
        console.log("按钮1被单击")
        组件.编辑框1.内容 = "祖国,您好!"
    }
//事件函数位置不要删除
}`,
    language: "javascript",
});