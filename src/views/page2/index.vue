<template lang="pug">
main
  .a asdasd
    a-button(
      @click='$router.push("/page1")'
      type='primary') 222
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.a {
  color: @primary-color;
}
</style>

<route lang="yaml">
name: page2
meta:
  title: 页面2
  layout: workspace
  menu:
    group: 测试
    index: 3
    icon: /icons/app.svg
</route>
