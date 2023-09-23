export default {
    top: "150",
    left: "440",
    width: "600",
    height: "100",
    禁止放置: true,
    可视: true,
    禁止: false,
    层级: 0,
    展示模式: "horizontal",
    是否折叠 : false,

    菜单项目:[
        {
            id: 1,
            label: '菜单 1',
            children: [
                {
                    id: 4,
                    label: '二级菜单 1-1',
                    children: [
                        {
                            id: 9,
                            label: '三级菜单 1-1-1',
                        },
                        {
                            id: 10,
                            label: '三级菜单 1-1-2',
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            label: '菜单 2',
            children: [
                {
                    id: 5,
                    label: '二级菜单 2-1',
                },
                {
                    id: 6,
                    label: '二级菜单 2-2',
                },
            ],
        },
        {
            id: 3,
            label: '菜单 3',
            children: [
                {
                    id: 7,
                    label: '二级菜单 3-1',
                },
                {
                    id: 8,
                    label: '二级菜单 3-2',
                },
            ],
        },
        {
            id: 4,
            label: '菜单 4',
        },
    ]

}
