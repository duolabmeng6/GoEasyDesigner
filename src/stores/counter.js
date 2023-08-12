import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      当前等待绘制的组件: "",
      当前组件id:"",
      当前组件名称:"",
      当前组件:{},
      绘制组件信息: [
        {
          id: "id1",
          组件名称: "按钮",
          style:{
            top: 0,
            left: 0,
            width: 120,
            height: 40,
          },
          标题: "按钮1"
        },
      ],
      调整方向角标按下: false

    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {


  },
})