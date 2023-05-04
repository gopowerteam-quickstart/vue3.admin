<template>
  <div class="login-container absolute inset-0 flex overflow-hidden">
    <div class="flex-auto flex-center bg-gray-500 bg-opacity-20 lt-xl:hidden">
      <transition-group appear name="left" tag="div">
        <img key="1" class="w-350px" :src="loginIcon">
        <div key="2" class="space-y-4">
          <div class="welcome text-3xl">
            欢迎使用本系统
          </div>
          <div class="description text-14px">
            后台管理
          </div>
        </div>
      </transition-group>
    </div>
    <div class="flex-auto flex-center">
      <transition-group appear name="right" tag="div">
        <LoginFrom key="1" />
      </transition-group>
    </div>
  </div>
</template>

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

<script lang="ts" setup>
import LoginFrom from './components/login-form.vue'
import loginIcon from '@/assets/svg/login-icon.svg?url'
</script>

<route lang="yaml">
name: login
meta:
  layout: blank
  requireAuth: false
</route>
