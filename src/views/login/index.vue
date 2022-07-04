<script setup lang="ts">
import { useStore } from '~/shared/hooks/use-store'
import { userQuery, userAction } from '~/store/user.store'

const router = useRouter()

const token = useStore(userQuery, (state) => state.token)
const length = useStore(userQuery.isLogin)

function login() {
  userAction.updateToken(token.value + 'a')
}
</script>

<template>
  <div
    css:bg-gray-500
    css:m="t-10 l-20">
    <a-button
      type="primary"
      @click="login"
      >Userb: {{ token }} - {{ length }}</a-button
    >
    <a-button type="primary">Primary</a-button>
    <a-button>Secondary</a-button>
    <a-button
      type="dashed"
      @click="() => router.push({ name: 'dashboard' })"
      >Dashed</a-button
    >
    <a-button type="outline">Outline</a-button>
    <a-button type="text">Text</a-button>
    <a-space>
      <a-button type="primary">
        <template #icon>
          <icon-park:home />

          <!-- <icon-park-abdominal></icon-park-abdominal> -->
        </template>
      </a-button>
      <a-button type="primary">
        <template #icon>
          <!-- <icon-park-abdominal></icon-park-abdominal> -->
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>Delete</template>
      </a-button>
    </a-space>
    <p>
      Edit<code>components/HelloWorld.vue</code>to test hot module replacement.
    </p>
  </div>
</template>

<style lang="less" scoped>
a {
  color: #42b983;
}

label {
  width: 100px;
  height: 100px;
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  padding: 2px 4px;
  color: #304455;
  background-color: #eee;
  border-radius: 4px;
}
</style>

<route lang="yaml">
name: login
meta:
  requiresAuth: false
  menu:
    key: root1.page1
    icon: xxx
    title: Page1
</route>
