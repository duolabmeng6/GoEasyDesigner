export default {
    top: "150",
    left: "440",
    width: "300",
    height: "300",
    value: "0",
    noPlace: true,
    visible: true,
    disable: false,
    zIndex: 0,
    overflowY: "hidden",
    overflowX: "hidden",
    type: "border-card",
    tagPosition: "top",


    childComponents: [
        {
            componentName: "elContainer",
            name: "ContentArea",
            text: "tab",
            图标: "fa fa-server",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            noPlace: false,
            noDrag: true,
            visible: true,
            disable: false,
            pid: 0,
            zIndex: 0,
            childComponents: []
        },
        {
            componentName: "elContainer",
            name: "ContentArea",
            text: "tab",
            图标: "fa fa-cog",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            noPlace: false,
            noDrag: true,
            visible: true,
            disable: false,
            pid: 0,
            zIndex: 0,
            childComponents: []
        },
    ]
}
