<template lang="pug">
page-container
  fs-crud(ref='crudRef' v-bind='crudBinding')
</template>

<script setup lang="ts">
import { useExpose, useCrud } from '@fast-crud/fast-crud'
import createCrudOptions from './curd'

// crud组件的ref
const crudRef = ref()
const crudBinding = ref()
// 暴露的方法
const { expose: exposeRef } = useExpose({
  crudRef,
  crudBinding
})
// 初始化crud配置
useCrud({
  expose: exposeRef,
  crudOptions: createCrudOptions()
})

async function aa() {
  await exposeRef.openAdd({})
}
// 你可以调用此方法，重新初始化crud配置
// resetCrudOptions(options)
// 页面打开后获取列表数据
onMounted(async () => {
  await exposeRef.doRefresh()
})
</script>

<route lang="yaml">
meta:
  layout: workspace
</route>
