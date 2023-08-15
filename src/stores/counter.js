import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
        画布属性: {
            宽度: ref(600),
            高度: ref(400),
        },
        当前组件索引: ref(-1),
        组件列表: ref([]),
    }
  },
  actions: {
      取窗口样式() {
      const result = {}
      result['width'] = this.画布属性.宽度 + "px"
      result['height'] =  this.画布属性.高度 + "px"
      return result
    }
  },
})