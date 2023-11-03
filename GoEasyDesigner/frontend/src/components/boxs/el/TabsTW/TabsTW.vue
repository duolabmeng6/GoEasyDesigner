<template>


  <div class=" overflow-hidden"
       :style="getItemStyle(item)"

  >
    <form class="flex h-full flex-col">

      <div class="nav h-auto text-white">
        <div class="flex justify-center border-b-2 border-gray-200 p-4 py-4"
             style="width:100%;background:rgb(251, 251, 251);">
          <template
              v-for="(tabItem, tabItemIndex) in item.childComponents"
              :key="tabItemIndex"
              :label="tabItem.text"
          >
            <input type="radio" v-model="item.value" :value="tabItemIndex" name="tab" :id="'mytab-'+tabItemIndex"
                   class="hidden"/>
            <label :for="'mytab-'+tabItemIndex">
              <div class="toolbar-item" :class="{
                'active': item.value == tabItemIndex,
              }">
                <i :class="tabItem.图标"></i>
                <span>{{ tabItem.text}}</span>
              </div>
            </label>
          </template>
        </div>
      </div>
      <div class="nav-content flex-1 overflow-y-auto bg-gray-50" style="position: relative">
        <template
            v-for="(tabItem, tabItemIndex) in item.childComponents"
            :key="tabItemIndex"
            :label="tabItem.text"
        >

          <div class="tab w-full" v-show="item.value == tabItemIndex" style="background:rgb(246, 246, 246); ">
            <component is="RenderDesignComponent" v-for="(tabItem2, tabItemIndex2) in [tabItem]" :key="tabItemIndex2"
                       :item="tabItem2"/>

          </div>

        </template>
      </div>
    </form>
  </div>


  <link rel="stylesheet" href="/font-awesome.css"/>

</template>


<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.active {
  background-color: rgb(238, 238, 238);
}


.tab {
}

.toolbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 64px; /* 正方形宽度 */
  height: 64px; /* 正方形高度 */
  background-color: rgb(251, 251, 251);
  border-radius: 4px;
}

.toolbar-item i {
  font-size: 24px; /* 调整图标大小 */
  line-height: 1; /* 减少行高 */
  margin-bottom: 0.25rem;
  color: rgb(69, 148, 213); /* 浅蓝色 */
}

.toolbar-item span {
  font-size: 12px; /* 调整文字大小 */
  text-align: center;
  color: rgb(113, 113, 113);
  line-height: 1; /* 减少行高 */
}

.toolbar-item.active {
  background-color: rgb(238, 238, 238);
}


</style>

<script>
import {getItemStyle} from '@/public.js';

export default {
  data() {
    return {}
  },
  methods: {getItemStyle},
  props: {
    item: {
      type: Object,
      default: '',
    }
  },
}
// 在线编辑 https://play.tailwindcss.com/3eNn1IfsFH?file=css
</script>