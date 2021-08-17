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
meta:
  layout: workspace
</route>
