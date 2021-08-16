<template lang="pug">
.a(css:bg='blue-500' css:text='yellow-500 5xl') header
icon-mdi-account
icon-mdi-account-clock-outline(css:text='gray-200')
router-view(v-slot='{ Component, route }')
  transition(name='fade')
    component(:is='Component' :key='route')
</template>
