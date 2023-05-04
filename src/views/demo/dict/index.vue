<template>
  <PageContainer space>
    <!-- 字典转换 -->
    <div class="display">
      当前选择: {{ TabActionDict.get(current) }}
    </div>
    <a-select v-model="current" placeholder="字典转换示例">
      <a-option
        v-for="key of TabAction"
        :key="key"
        :label="TabActionDict.get(key)"
        :value="key"
      />
    </a-select>
  </PageContainer>
</template>

<script setup lang="ts">
import { TabActionDict } from '@/config/dict.config'
import { TabAction } from '@/config/enum.config'

const current = $ref(TabAction.CLOSE_OTHER)
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
