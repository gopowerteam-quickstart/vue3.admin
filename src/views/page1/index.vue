<script setup lang="ts"></script>

<template lang="pug">
a-input(placeholder='page1')
</template>

<route lang="yaml">
name: page1
meta:
  layout: workspace
  auth:
    roles:
      - ADMIN
  menu:
    key: root1.page1
    icon: xxx
    title: Page1
</route>
