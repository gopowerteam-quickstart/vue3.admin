<script setup lang="ts"></script>

<template>
  <div>
    <div
      v-for="item in 1000"
      :key="item">
      dashboard {{ item }}
    </div>
  </div>
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
