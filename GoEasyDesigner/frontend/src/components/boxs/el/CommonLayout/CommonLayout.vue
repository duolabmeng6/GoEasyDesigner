<template>
  <template v-if="item.布局方式 == 'header-main'">
    <el-container :style="getItemStyle(item)">
      <el-header>
        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in getSubComponents('header')"
                   :key="subIndex" :item="subItem"/>
      </el-header>
      <el-main>
        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in getSubComponents('main')"
                   :key="subIndex" :item="subItem"/>
      </el-main>
    </el-container>
  </template>
  <template v-if="item.布局方式 == 'header-main-footer'">
    <el-container :style="getItemStyle(item)">
      <el-header>
        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in  getSubComponents('header')"
                   :key="subIndex" :item="subItem"/>
      </el-header>
      <el-main>
        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in getSubComponents('main')"
                   :key="subIndex" :item="subItem"/>
      </el-main>
      <el-footer>
        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in getSubComponents('footer')"
                   :key="subIndex" :item="subItem"/>
      </el-footer>
    </el-container>
  </template>
  <template v-if="item.布局方式 == 'aside-main'">
    <el-container :style="getItemStyle(item)">
      <el-aside :width="getSubComponents('aside')[0].width">

        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in  getSubComponents('aside')"
                   :key="subIndex" :item="subItem"/>
      </el-aside>
      <el-main>
        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in getSubComponents('main')"
                   :key="subIndex" :item="subItem"/>
      </el-main>
    </el-container>
  </template>
  <template v-if="item.布局方式 == 'header-aside-main'">
    <el-container :style="getItemStyle(item)">
      <el-header>
        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in  getSubComponents('header')"
                   :key="subIndex" :item="subItem"/>
      </el-header>
      <el-container>
        <el-aside :width="getSubComponents('aside')[0].width">
          <component is="RenderDesignComponent" v-for="(subItem, subIndex) in  getSubComponents('aside')"
                     :key="subIndex" :item="subItem"/>
        </el-aside>
        <el-main>
          <component is="RenderDesignComponent" v-for="(subItem, subIndex) in getSubComponents('main')"
                     :key="subIndex" :item="subItem"/>
        </el-main>
      </el-container>
    </el-container>
  </template>
  <template v-if="item.布局方式 == 'header-aside-main-footer'">
    <el-container :style="getItemStyle(item)">
      <el-header>
        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in  getSubComponents('header')"
                   :key="subIndex" :item="subItem"/>
      </el-header>
      <el-container>
        <el-aside :width="getSubComponents('aside')[0].width">

          <component is="RenderDesignComponent" v-for="(subItem, subIndex) in  getSubComponents('aside')"
                     :key="subIndex" :item="subItem"/>
        </el-aside>
        <el-container>

          <el-main>
            <component is="RenderDesignComponent" v-for="(subItem, subIndex) in getSubComponents('main')"
                       :key="subIndex" :item="subItem"/>
          </el-main>
          <el-footer>
            <component is="RenderDesignComponent" v-for="(subItem, subIndex) in getSubComponents('footer')"
                       :key="subIndex" :item="subItem"/>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </template>
  <template v-if="item.布局方式 == 'aside-header-main'">
    <el-container :style="getItemStyle(item)">
      <el-aside :width="getSubComponents('aside')[0].width">

        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in  getSubComponents('aside')"
                   :key="subIndex" :item="subItem"/>
      </el-aside>
      <el-container>
        <el-header>
          <component is="RenderDesignComponent" v-for="(subItem, subIndex) in  getSubComponents('header')"
                     :key="subIndex" :item="subItem"/>
        </el-header>
        <el-main>
          <component is="RenderDesignComponent" v-for="(subItem, subIndex) in getSubComponents('main')"
                     :key="subIndex" :item="subItem"/>
        </el-main>

      </el-container>
    </el-container>
  </template>
  <template v-if="item.布局方式 == 'aside-header-main-footer'">
    <el-container :style="getItemStyle(item)">
      <el-aside :width="getSubComponents('aside')[0].width">

        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in  getSubComponents('aside')"
                   :key="subIndex" :item="subItem"/>
      </el-aside>
      <el-container>
        <el-header>
          <component is="RenderDesignComponent" v-for="(subItem, subIndex) in  getSubComponents('header')"
                     :key="subIndex" :item="subItem"/>
        </el-header>
        <el-main>
          <component is="RenderDesignComponent" v-for="(subItem, subIndex) in getSubComponents('main')"
                     :key="subIndex" :item="subItem"/>
        </el-main>
        <el-footer>
          <component is="RenderDesignComponent" v-for="(subItem, subIndex) in getSubComponents('footer')"
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
      let index;
      for (let i = 0; i < this.item.子组件.length; i++) {
        if (this.item.子组件[i].名称.includes(area)) {
          index = i;
          break;
        }
      }
      console.log("index", index)
      return [this.item.子组件[index]];
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
<style scoped>
.el-header {
  --el-header-padding: 0px;
  height: auto;
}

.el-main {
  --el-main-padding: 0px;
  height: auto;

}

.el-footer {
  --el-footer-padding: 0px;
  height: auto;

}

.el-aside {
  --el-aside-padding: 0px;
  height: auto;

}

</style>