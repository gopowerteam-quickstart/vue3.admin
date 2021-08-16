<template lang="pug">
router-view(v-slot='{ Component, route }')
  transition(name='fade')
    component(:is='Component' :key='route')
</template>
