<script setup lang="ts"></script>

<template lang="pug">
page-container
  template(#action)
    a-button(type='primary') 删除
  a-input(placeholder='page1')
</template>

<route lang="yaml">
name: page1
meta:
  layout: workspace
  menu:
    key: root1.page1
    icon: image-1.png
    title: Page1
</route>
