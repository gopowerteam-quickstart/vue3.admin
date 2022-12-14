<template lang="pug">
.form-container.w-400px.border.border-gray-500.p-20px.rounded
  .title.text-center.text-xl.py-5 用户登录
  a-form(:model='formModel' label-width='120px' label-position='top')
    a-form-item(label='用户名')
      a-input(v-model='formModel.username')
    a-form-item(label='密码')
      a-input(v-model='formModel.password' type='password')
    a-form-item
      a-checkbox 记住我
    a-form-item
      a-button.w-full(type='primary' @click='onLogin') 登录
</template>

<script lang="ts" setup>
import { useStore } from '@/store'

const router = useRouter()
const store = useStore()

const formModel = $ref({
  username: '',
  password: '',
})

// console.log(useRequest)

/**
 *
 */
function onLogin() {
  store.user.updateToken('USER_TOKEN')

  // 进入默认应用
  router.push('/dashboard')
}
</script>
