<template>
  <slot></slot>
</template>

<script lang="ts" setup>
onMounted(() => {
  const node = getCurrentInstance()?.parent as any
  console.log(node.parent.__v_cache)
})
</script>

<script lang="ts">
export default {
  name: 'PageContainer',
  inheritAttrs: false,
}
</script>
