<script setup lang="ts">
const route = useRoute()

const { id } = route.query
</script>

<template>
  <PageContainer>
    <a-input
      v-model="id"
      placeholder="page3"></a-input>
  </PageContainer>
</template>

<route lang="yaml">
name: page3
meta:
  layout: workspace
  auth:
    roles:
      - ADMIN
  multiple: true
  menu:
    key: root2.test.page3
    icon: xxx
    title: Page3
</route>
