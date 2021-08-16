import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  attributify: {
    prefix: 'css:'
  },
  alias: {
    'flex-center': 'flex items-center justify-center',
    'flex-v-center': 'flex flex-col justify-center',
    'flex-h-center': 'flex flex-row justify-center'
  }
})
