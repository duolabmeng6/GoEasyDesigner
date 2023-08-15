<template>
  <table>
    <tr>
      <th>宽度</th>
      <td>
        <el-input v-model="store.画布属性.宽度"/>
      </td>
    </tr>
    <tr>
      <th>高度</th>
      <td>
        <el-input v-model="store.画布属性.高度"/>
      </td>
    </tr>
  </table>


</template>
<script setup>
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()




</script>