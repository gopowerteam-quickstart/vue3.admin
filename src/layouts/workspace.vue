<template lang="pug">
.a(css:bg='blue-500' css:text='yellow-500 5xl') header
icon-mdi-account
icon-mdi-account-clock-outline(css:text='gray-200')
router-view(v-slot='{ Component, route }')
  transition(name='fade')
    component(:is='Component' :key='route')
</template>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
