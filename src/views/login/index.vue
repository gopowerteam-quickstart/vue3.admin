<template lang="pug">
.login-container.absolute.inset-0.flex.overflow-hidden
  .flex-auto.flex-center.bg-gray-500.bg-opacity-20(class='lt-xl:hidden')
    transition-group(appear tag='div' name='left')
      img.w-350px(key='1' :src='loginIcon')
      .space-y-4(key='2')
        .welcome.text-3xl 欢迎使用本系统
        .description.text-14px 后台管理
  .flex-auto.flex-center
    transition-group(appear tag='div' name='right')
      LoginFrom(key='1')
</template>

<script lang="ts" setup>
import loginIcon from '@/assets/svg/login-icon.svg?url'
import LoginFrom from './components/login-form.vue'
</script>

<style lang="less" scoped>
.login-container {
  color: #ffffff;
  background-color: #293146;
}
.left-enter-active,
.left-leave-active {
  transition: all 0.5s ease;
}
.left-enter-from,
.left-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}
.right-enter-active,
.right-leave-active {
  transition: all 0.5s ease;
}
.right-enter-from,
.right-leave-to {
  opacity: 0;
  transform: translateX(+300px);
}
</style>

<route lang="yaml">
name: login
meta:
  layout: blank
  requireAuth: false
</route>
