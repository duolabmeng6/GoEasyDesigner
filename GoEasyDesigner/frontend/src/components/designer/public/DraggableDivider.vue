<!-- DraggableDivider.vue -->
<template>
  <div :style="getPosStyle()"
       class="width-draggable-icon"
       @mousedown="startDrag"
  ></div>
</template>

<script setup>
import {ref, onMounted} from "vue";

let isDragging = false;
let startX, startY,startWidth,startHeight;
const targetElement = ref(null);
const props = defineProps({
  targetElementId: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    default: 'right',
  },
});
const left = ref(0)
const top = ref(0)
const right = ref(0)
const bottom = ref(0)

function getPosStyle() {

  let style = {
    height: '100%',
    backgroundColor: 'transparent',
    cursor: 'col-resize',
    position: 'absolute',
    width: '4px',
    zIndex: 99
  }
  if (props.direction == "top") {
    style.top = "-2px"
    style.left = 0
    style.width = "100%"
    style.height = "4px"
    style.cursor = "row-resize"
  }
  if (props.direction == "right") {
    style.top = 0
    style.right = "-2px"
  }
  if (props.direction == "left") {
    style.top = 0
    style.left = "-2px"
  }
  if (props.direction == "bottom") {
    style.left = 0
    style.buttom = "-2px"
    style.width = "100%"
    style.height = "4px"
    style.cursor = "row-resize"
  }
  // console.log("props.direction", props.direction,style)
  return style
}


onMounted(() => {
  targetElement.value = document.getElementById(props.targetElementId);
  if (!targetElement.value) {
    console.error(`Element with id '${props.targetElementId}' not found.`);
  }
});


const startDrag = function (e) {
  e.preventDefault();
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(targetElement.value.clientWidth);
  startHeight = parseInt(targetElement.value.clientHeight);

  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
}

const handleDrag = function (e) {
  if (isDragging) {
    if (props.direction == "right") {
      const newWidth = startWidth + e.clientX - startX;
      targetElement.value.style.width = newWidth + 'px';
    }
    if (props.direction == "left") {
      const newWidth = startWidth - (e.clientX - startX);
      targetElement.value.style.width = newWidth + 'px';
    }
    if (props.direction == "top") {
      const newHeight = startHeight - (e.clientY - startY);
      targetElement.value.style.height = newHeight + 'px';
    }
    if (props.direction == "bottom") {
      const newHeight = startHeight + (e.clientY - startY);
      targetElement.value.style.height = newHeight + 'px';
    }
    window.dispatchEvent(new Event('resize'));

  }
}

const stopDrag = function () {
  isDragging = false;
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
  //触发 resize

}
</script>
