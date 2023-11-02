export default {
    top: "150",
    left: "440",
    width: "300",
    height: "200",
    禁止放置: true,
    可视: true,
    禁止: false,
    层级: 0,
    斑马纹表格: false,
    边框表格: false,
    可选: false,
    表格选中项: [],
    表格布局: "fixed",
    表头:[
        {
            "label":"日期","prop":"date","width":"180","fixed":true
        },
        {
            "label":"名称","prop":"name","width":"180","fixed":false
        },
        {
            "label":"地址","prop":"address","width":"180","fixed":false
        },
    ],
    表格项目:[
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]

}
