<template lang="pug">
router-view(v-slot='{ Component, route }')
  component(:is='Component' :key='route')
</template>
