<template lang="pug">
main
  .a asdasd
    a-button(
      @click='$router.push("/page2")'
      type='primary') 1111111111
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.a {
  color: @primary-color;
}
</style>

<route lang="yaml">
name: page1
meta:
  title: 页面1
  layout: workspace
  menu:
    group: 测试
    index: 2
    icon: /icons/app.svg
</route>
