<script setup lang="ts"></script>

<template lang="pug">
page-container
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
    icon: image-1.png
    title: Page1
</route>
