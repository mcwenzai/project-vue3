<template>
  <div :style="{ height: heightStyle }" class="vertical-divider"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    height?: string | number // 传数字或者字符串
  }>(),
  {
    height: undefined
  }
)

const heightStyle = computed(() => {
  if (props.height) {
    return typeof props.height === 'number' ? `${props.height}px` : props.height
  }
})
</script>

<style scoped>
.vertical-divider {
  display: inline-block;
  width: 1px;
  margin: 0 40px;
  position: relative;
  vertical-align: middle;
  background-color: #e3e3e3;
}
</style>
