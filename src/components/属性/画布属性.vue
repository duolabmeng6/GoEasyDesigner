<template>
  <table>
    <tr>
      <th>名称</th>
      <td><el-input v-model="store.画布属性.名称"/></td>
    </tr>
    <tr>
      <th>顶边</th>
      <td><el-input v-model="store.画布属性.top"/></td>
    </tr>
    <tr>
      <th>左边</th>
      <td><el-input v-model="store.画布属性.left"/></td>
    </tr>
    <tr>
      <th>宽度</th>
      <td><el-input v-model="store.画布属性.width"/></td>
    </tr>
    <tr>
      <th>高度</th>
      <td><el-input v-model="store.画布属性.height"/></td>
    </tr>
    <tr>
      <th>可视</th>
      <td>
        <el-switch v-model="store.画布属性.可视"/>
      </td>
    </tr>
    <tr>
      <th>标题</th>
      <td>
        <td><el-input v-model="store.画布属性.标题"/></td>

      </td>
    </tr>
  </table>


</template>
<script setup>
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()




</script>