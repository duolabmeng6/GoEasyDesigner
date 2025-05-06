<template>

  <div
      :style="getItemStyleShape(item)"
  >
    <div
        v-show="item.visible || item.visible"
        :id="item.name"
        :class="{ 'disabled': item.disable || item.disable }"
        :style="{
              overflowY: item.overflowY || 'visible',
              overflowX: item.overflowX || 'visible'
        }"
        class="子组件"
    >
      <template v-if="item.componentName == 'Window'">
        <component is="RenderDesignComponentWin" v-for="(subItem, subIndex) in item.childComponents" :key="subIndex"
                   :item="subItem"/>
      </template>

      <template v-if="item.componentName=='elContainer'">
        <template v-if="item.childComponents.length === 0">
          <div style="width: 100%;
                       background: rgba(10,19,37,.05);
                      border: 1px dashed #ced0d3;
                      color: rgb(184, 186, 191);
                      height: 100%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      pointer-events: none;
">
            {{ item.name ? item.name : 'ContentArea' }}
          </div>
        </template>
        <component is="RenderDesignComponentWin" v-for="(subItem, subIndex) in item.childComponents" :key="subIndex"
                   :item="subItem"/>
      </template>
      <template v-else>
        <component :is="item.componentName" :item="item"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';
import {useAppStore} from '@/stores/appStore'
import {getItemStyle2, getItemStyleShape} from "@/public";
const {item} = defineProps(['item']);

const store = useAppStore()

</script>

<style>
.子组件 {
  position: relative;
  width: 100%;
  height: 100%;
}

.custom-input {
  border: 1px dashed #409EFF;
}

.el-tabs {
  overflow: visible !important;
  width: auto !important;
}

.disabled {
  pointer-events: none;
  opacity: 0.6;
}

.子组件.高亮 {
  background-color: rgba(0, 166, 255, 0.3);
}
</style>