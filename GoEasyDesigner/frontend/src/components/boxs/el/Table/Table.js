export default {
    top: "150",
    left: "440",
    width: "300",
    height: "200",
    noPlace: true,
    visible: true,
    disable: false,
    zIndex: 0,
    stripe: false,
    border: false,
    select: false,
    value: [],
    tableLayout: "fixed",
    header:[
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
    data:[
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
