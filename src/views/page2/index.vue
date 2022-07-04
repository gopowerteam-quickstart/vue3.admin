<script setup lang="ts"></script>

<template>
  <a-input placeholder="page2"></a-input>
</template>

<route lang="yaml">
name: page2
meta:
  layout: workspace
  auth:
    roles:
      - ADMIN
  menu:
    key: root2.test.page2
    icon: xxx
    title: Page2
</route>
