<template>
  <el-menu
      class=""
      :mode="item.mode"
      :collapse="item.collapse"
      @select="handleSelect"
  >
    <template v-for="menu in item.menuOption" :key="menu.id">
      <el-menu-item v-if="!menu.children || menu.children.length===0" :index="menu.id.toString()">
        {{ menu.label }}
      </el-menu-item>
      <el-sub-menu v-if="menu.children && menu.children.length !==0" :index="menu.id.toString()">
        <template #title>{{ menu.label }}</template>
        <template v-for="child in menu.children" :key="child.id">
          <el-menu-item v-if="!child.children || child.children.length===0" :index="child.id.toString()">
            {{ menu.label }}
          </el-menu-item>
          <el-sub-menu v-if="child.children && child.children.length !==0" :index="child.id.toString() + '-sub'">
            <template #title>{{ child.label }}</template>
            <template v-for="grandChild in child.children" :key="grandChild.id">
              <el-menu-item :index="grandChild.id.toString()">{{ grandChild.label }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script>
import {getItemStyle} from '@/public.js';

export default {
  methods: {getItemStyle},
  props: {
    item: {
      type: Object,
      default: '',
    }
  },
}
</script>
<style>
.el-tabs__content {
  height: 100%;
  padding: 0 !important;
}

.el-tabs__header.is-bottom {
  position: relative;
  top: -50px;
}
</style>