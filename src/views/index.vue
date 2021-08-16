<template lang="pug">
main
  .a page1
    a-button(@click='$router.push("/page1")' type='primary') toPage2
</template>

<script setup lang="ts"></script>
