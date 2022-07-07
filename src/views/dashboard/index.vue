<script setup lang="ts"></script>

<template>
  <PageContainer title="仪表盘">
    <div>
      <a-button
        @click="() => $router.push({ name: 'page3', params: { id: 1 } })"
        >page3-1</a-button
      >
      <a-button
        @click="() => $router.push({ name: 'page3', params: { id: 2 } })"
        >page3-2</a-button
      >
      <div
        v-for="item in 1000"
        :key="item">
        dashboard {{ item }}
      </div>
    </div>
  </PageContainer>
</template>

<route lang="yaml">
name: dashboard
meta:
  layout: workspace
  requiresAuth: true
  menu:
    key: dashboard
    title: 仪表盘
    index: 0
</route>
