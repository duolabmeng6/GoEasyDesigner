export default {
    top: "150",
    left: "440",
    width: "300",
    height: "200",
    noPlace: true,
    visible: true,
    disable: false,
    zIndex: 0,

    select: false,
    选中项: [],

    data:[
        {
            label: 'Level one 1',
            children: [
                {
                    label: 'Level two 1-1',
                    children: [
                        {
                            label: 'Level three 1-1-1',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Level one 2',
            children: [
                {
                    label: 'Level two 2-1',
                    children: [
                        {
                            label: 'Level three 2-1-1',
                        },
                    ],
                },
                {
                    label: 'Level two 2-2',
                    children: [
                        {
                            label: 'Level three 2-2-1',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Level one 3',
            children: [
                {
                    label: 'Level two 3-1',
                    children: [
                        {
                            label: 'Level three 3-1-1',
                        },
                    ],
                },
                {
                    label: 'Level two 3-2',
                    children: [
                        {
                            label: 'Level three 3-2-1',
                        },
                    ],
                },
            ],
        },
    ]

}
