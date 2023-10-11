<template>
  <template v-if="item.布局方式 == 'header-main'">
    <el-container :style="getItemStyle(item)">
      <el-header>
        <component is="渲染组件" v-for="(subItem, subIndex) in  item.子组件[getSubComponents('header')].子组件"
                   :key="subIndex" :item="subItem"/>
      </el-header>
      <el-main>
        <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件[getSubComponents('main')].子组件"
                   :key="subIndex" :item="subItem"/>
      </el-main>
    </el-container>
  </template>
  <template v-if="item.布局方式 == 'header-main-footer'">
    <el-container :style="getItemStyle(item)">
      <el-header>
        <component is="渲染组件" v-for="(subItem, subIndex) in  item.子组件[getSubComponents('header')].子组件"
                   :key="subIndex" :item="subItem"/>
      </el-header>
      <el-main>
        <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件[getSubComponents('main')].子组件"
                   :key="subIndex" :item="subItem"/>
      </el-main>
      <el-footer>
        <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件[getSubComponents('footer')].子组件"
                   :key="subIndex" :item="subItem"/>
      </el-footer>
    </el-container>
  </template>

  <template v-if="item.布局方式 == 'aside-main'">
    <el-container :style="getItemStyle(item)">
      <el-aside :width="item.子组件[getSubComponents('aside')].子组件[0].width">

        <component is="渲染组件" v-for="(subItem, subIndex) in  item.子组件[getSubComponents('aside')].子组件"
                   :key="subIndex" :item="subItem"/>
      </el-aside>
      <el-main>
        <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件[getSubComponents('main')].子组件"
                   :key="subIndex" :item="subItem"/>
      </el-main>
    </el-container>
  </template>


  <template v-if="item.布局方式 == 'header-aside-main'">
    <el-container :style="getItemStyle(item)">
      <el-header>
        <component is="渲染组件" v-for="(subItem, subIndex) in  item.子组件[getSubComponents('header')].子组件"
                   :key="subIndex" :item="subItem"/>
      </el-header>
      <el-container>
        <el-aside :width="item.子组件[getSubComponents('aside')].子组件[0].width">
          <component is="渲染组件" v-for="(subItem, subIndex) in  item.子组件[getSubComponents('aside')].子组件"
                     :key="subIndex" :item="subItem"/>
        </el-aside>
        <el-main>
          <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件[getSubComponents('main')].子组件"
                     :key="subIndex" :item="subItem"/>
        </el-main>
      </el-container>
    </el-container>
  </template>


  <template v-if="item.布局方式 == 'header-aside-main-footer'">
    <el-container :style="getItemStyle(item)">
      <el-header>
        <component is="渲染组件" v-for="(subItem, subIndex) in  item.子组件[getSubComponents('header')].子组件"
                   :key="subIndex" :item="subItem"/>
      </el-header>
      <el-container>
        <el-aside :width="item.子组件[getSubComponents('aside')].子组件[0].width">

          <component is="渲染组件" v-for="(subItem, subIndex) in  item.子组件[getSubComponents('aside')].子组件"
                     :key="subIndex" :item="subItem"/>
        </el-aside>
        <el-container>

          <el-main>
            <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件[getSubComponents('main')].子组件"
                       :key="subIndex" :item="subItem"/>
          </el-main>
          <el-footer>
            <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件[getSubComponents('footer')].子组件"
                       :key="subIndex" :item="subItem"/>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </template>


  <template v-if="item.布局方式 == 'aside-header-main'">
    <el-container :style="getItemStyle(item)">
      <el-aside :width="item.子组件[getSubComponents('aside')].子组件[0].width">

        <component is="渲染组件" v-for="(subItem, subIndex) in  item.子组件[getSubComponents('aside')].子组件"
                   :key="subIndex" :item="subItem"/>
      </el-aside>
      <el-container>
        <el-header>
          <component is="渲染组件" v-for="(subItem, subIndex) in  item.子组件[getSubComponents('header')].子组件"
                     :key="subIndex" :item="subItem"/>
        </el-header>
        <el-main>
          <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件[getSubComponents('main')].子组件"
                     :key="subIndex" :item="subItem"/>
        </el-main>

      </el-container>
    </el-container>
  </template>

  <template v-if="item.布局方式 == 'aside-header-main-footer'">
    <el-container :style="getItemStyle(item)">
      <el-aside :width="item.子组件[getSubComponents('aside')].子组件[0].width">

        <component is="渲染组件" v-for="(subItem, subIndex) in  item.子组件[getSubComponents('aside')].子组件"
                   :key="subIndex" :item="subItem"/>
      </el-aside>
      <el-container>
        <el-header>
          <component is="渲染组件" v-for="(subItem, subIndex) in  item.子组件[getSubComponents('header')].子组件"
                     :key="subIndex" :item="subItem"/>
        </el-header>
        <el-main>
          <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件[getSubComponents('main')].子组件"
                     :key="subIndex" :item="subItem"/>
        </el-main>
        <el-footer>
          <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件[getSubComponents('footer')].子组件"
                     :key="subIndex" :item="subItem"/>
        </el-footer>
      </el-container>
    </el-container>
  </template>

</template>

<script>
import {getItemStyle} from "@/public";

export default {
  methods: {
    getItemStyle,
    getSubComponents(area) {
      // Assuming item.子组件 is an array of objects with a '标题' property 返回索引
      let index;
      for (let i = 0; i < this.item.子组件.length; i++) {
        if (this.item.子组件[i].标题.includes(area)) {
          index = i;
          break;
        }
      }
      console.log("index", index)
      return index;
    },
  },
  props: {
    item: {
      type: Object,
      default: '',
    }
  },
}
</script>
<script setup>


</script>
<style>
.el-header {
  --el-header-padding: 0px !important;
}
.el-main{
  --el-main-padding: 0px !important;
}
.el-footer{
  --el-footer-padding: 0px !important;
}
.el-aside{
  --el-aside-padding: 0px !important;
}

</style>