<template>
  <div :style="getItemStyle(item)">
    <el-tree
        ref="treeRef"
        :data="item.data"
        :default-checked-keys="item.defaultCheckedKeys"
        :default-expanded-keys="item.defaultExpandedKeys"
        :node-key="item.id"
        :props="defaultProps"
        :show-checkbox="item.select"
        style="width: 99%; height: 99%"
        @check-change="handleSelectionChange"
    />
  </div>
</template>

<script>
import {getItemStyle} from '@/public.js';
import {ref} from 'vue';

export default {
  setup(props) {
    const treeRef = ref(null);
    const defaultProps = {
      children: 'children',
      label: 'label',
    };

    const handleSelectionChange = (val) => {
      props.item.选中项 = treeRef.value.getCheckedNodes(false, false);
      console.log(props.item.选中项)
    };

    return {
      getItemStyle,
      treeRef,
      defaultProps,
      handleSelectionChange,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
