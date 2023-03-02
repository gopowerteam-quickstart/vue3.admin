<template>
  <template v-if="menu.isLeaf">
    <a-menu-item :key="menu.key">
      <template
        v-if="props.showIcon && menu.icon"
        #icon>
        <MenuIcon
          :name="menu.icon"
          :size="15"></MenuIcon>
      </template>
      {{ menu.title }}
    </a-menu-item>
  </template>
  <template v-else>
    <a-sub-menu :key="menu.key">
      <template
        v-if="props.showIcon && menu.icon"
        #icon>
        <MenuIcon
          :name="menu.icon"
          :size="15"></MenuIcon>
      </template>
      <template #title>
        {{ menu.title }}
      </template>
      <MenuItem
        v-for="child in menu.children"
        :key="child.key"
        :menu="child"></MenuItem>
    </a-sub-menu>
  </template>
</template>

<script setup lang="tsx">
import SvgIcon from '@/shared/components/svg-icon.vue'
import ImageIcon from '@/shared/components/image-icon.vue'
import type { Menu } from '~/types/workspace'

const props = withDefaults(
  defineProps<{
    menu: Menu
    showIcon?: boolean
  }>(),
  { showIcon: true },
)

const MenuIcon = defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
    return () => {
      switch (true) {
        case /\.svg$/.test(props.name):
          return (
            <SvgIcon
              name={props.name}
              size={20}
              color="#c7cadd"></SvgIcon>
          )
        case /\.(png|jpg)$/.test(props.name):
          return (
            <ImageIcon
              name={props.name}
              size={20}></ImageIcon>
          )
      }
    }
  },
})
</script>

<script lang="tsx">
export default defineComponent({
  name: 'MenuItem',
})
</script>
