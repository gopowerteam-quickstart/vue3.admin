<template lang="pug">
PageContainer(space)
  // 字典转换
  .display 当前选择: {{ TabActionDict.get(current) }}
  a-select(v-model='current' placeholder='字典转换示例')
    a-option(
      v-for='key of TabAction'
      :key='key'
      :value='key'
      :label='TabActionDict.get(key)')
</template>

<script setup lang="ts">
import { TabActionDict } from '@/config/dict.config'
import { TabAction } from '@/config/enum.config'

let current = $ref(TabAction.CLOSE_OTHER)
</script>

<route lang="yaml">
name: dict-demo
meta:
  layout: workspace
  requireAuth: true
  title: dict示例
  menu:
    key: demo.dict-demo
    icon: image-1.png
    title: Dict
</route>
