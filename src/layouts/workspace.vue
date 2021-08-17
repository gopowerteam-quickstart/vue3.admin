<template lang="pug">
.a(css:bg='blue-500' css:text='yellow-500 5xl') header
icon-mdi-account
icon-mdi-account-clock-outline(css:text='gray-200')

router-view
//- router-view(v-slot='{ Component, route }')
  //- transition(name='slide')
    //- component(:is='Component' :key='route')
</template>

<style lang="less">
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
