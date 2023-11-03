function registerBoxComponentNames(app, uiName, meta) {
    let ComponentNames = []
    const componentsContext = meta;

    const keys = Object.keys(componentsContext).map((path) => {
        const name = path.split('/').pop().replace(/\.\w+$/, '');
        const module = componentsContext[path];
        //如果名称后面是 属性 或者是 Attr 就不要加入
        if (!(name.endsWith("属性") || name.endsWith("Attr"))) {
            ComponentNames.push(name)
        }
        // console.log("注册组件", uiName, name)
        app.component(uiName + name, module.default);
        // app.component(name, module.default);
        return name;
    });

    return ComponentNames;

}

function registerBoxComponentDefaultValue(app, uiName, meta) {
    let ComponentDefaultValue = {}
    const componentsContext = meta;

    const keys = Object.keys(componentsContext).map((path) => {
        const name = path.split('/').pop().replace(/\.\w+$/, '');
        const module = componentsContext[path];
        ComponentDefaultValue[name] = module.default;
        return name;
    });

    return ComponentDefaultValue;
}

export default {
    registerBoxComponentNames,
    registerBoxComponentDefaultValue
}