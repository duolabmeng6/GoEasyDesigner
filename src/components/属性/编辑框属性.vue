<template>
  <table>
    <tr>
      <th>名称</th>
      <td><el-input v-model="store.组件列表[store.当前组件索引].名称"/></td>
    </tr>
    <tr>
      <th>顶边</th>
      <td><el-input v-model="store.组件列表[store.当前组件索引].style.top"/></td>
    </tr>
    <tr>
      <th>左边</th>
      <td><el-input v-model="store.组件列表[store.当前组件索引].style.left"/></td>
    </tr>
    <tr>
      <th>宽度</th>
      <td><el-input v-model="store.组件列表[store.当前组件索引].style.width"/></td>
    </tr>
    <tr>
      <th>高度</th>
      <td><el-input v-model="store.组件列表[store.当前组件索引].style.height"/></td>
    </tr>
    <tr>
      <th>可视</th>
      <td>
        <el-switch v-model="store.组件列表[store.当前组件索引].可视"/>
      </td>
    </tr>
    <tr>
      <th>内容</th>
      <td><el-input v-model="store.组件列表[store.当前组件索引].内容"/></td>
    </tr>
    <tr>
      <th>内容被改变事件</th>
      <td><el-input v-model="store.组件列表[store.当前组件索引].内容被改变事件" type="textarea" /></td>
    </tr>
  </table>

</template>
<script setup>
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()




</script>