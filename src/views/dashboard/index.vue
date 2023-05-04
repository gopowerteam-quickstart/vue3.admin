<template>
  <PageContainer absolute layout="flex-center" title="仪表盘">
    <div class="text-3xl">
      Welcome To Use The QuickStart Project Template
    </div>
  </PageContainer>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
name: dashboard
meta:
  layout: workspace
  requireAuth: true
  menu:
    key: dashboard
    title: 仪表盘
    index: 0
</route>
