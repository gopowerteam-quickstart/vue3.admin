<template lang="pug">
page-container(flex flex-direction='row')
  .background.flex-1(class='*flex-col-center' css:text='white')
    .card.p-20
      img(css:w='8/12' src='/images/login-box.svg')
      .title(
        css:font='bold'
        css:p='t-10 b-1'
        css:text='2xl') 企业后台管理系统
      .subtitle(css:text='sm') GoPowerTeam Admin
  .flex-1(class='*flex-center')
    .login-card(class='*flex-col-center')
      a-form.p-10(
        :labelCol='{ span: 4 }'
        :model='loginModel')
        a-form-item(label='用户名')
          a-input(v-model:value='loginModel.username')
        a-form-item(label='密码')
          a-input(
            type='password'
            v-model:value='loginModel.password')
        a-form-item.text-center
          a-button(
            @click='$router.push("/home")'
            type='primary') 登录
</template>

<script setup lang="ts">
const loginModel = ref({
  username: '',
  password: ''
})
</script>

<style lang="less" scoped>
.background {
  background-image: url('~/assets/images/login-bg.svg');
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: auto 100%;
}

.login-card {
  width: 400px;
  height: 300px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
}
</style>
