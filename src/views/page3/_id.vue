<script setup lang="ts">
const route = useRoute()

const { id } = route.params
</script>

<template>
  <PageContainer :title="`测试也-${id}`">
    <a-input placeholder="page3"></a-input>
  </PageContainer>
</template>

<route lang="yaml">
name: page3
meta:
  layout: workspace
  auth:
    roles:
      - ADMIN
</route>
