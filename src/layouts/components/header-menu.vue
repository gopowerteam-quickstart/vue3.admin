<template lang="pug">
a-menu(
  @click='onSelect'
  mode='horizontal'
  v-model:selectedKeys='selectedKeys')
  MenuItem(
    :key='menuItem.id'
    :menu='menuItem'
    v-for='menuItem in menus')
</template>

<script setup lang="tsx">
import type { PropType } from 'vue'
import type { MenuItemConfig } from '~/config/menu.config'
import { getCurrentMenuByPath } from '~/shared/utils/common.util'
import { useStore } from '~/store'

const rotuer = useRouter()
const route = useRoute()

const store = useStore(store => store.menu)

const menus = computed<MenuItemConfig[]>(
  () => store.headerMenus
)
const selectedKeys = ref([])

function onSelect({ path }: { path?: string }) {
  if (path) {
    rotuer.push(path)
  }
}

const MenuItem = defineComponent({
  props: {
    menu: {
      type: Object as PropType<MenuItemConfig>,
      required: true
    }
  },
  setup(props) {
    const renderTitle = (menu: MenuItemConfig) => () =>
      <span>{menu.title}</span>

    const renderSubMenu = (menu: MenuItemConfig) => (
      <a-sub-menu
        key={menu.id}
        v-slots={{ title: renderTitle(menu) }}
      >
        {menu.children?.map(item => renderMenuItem(item))}
      </a-sub-menu>
    )

    const renderMenuItem = (menu: MenuItemConfig) => (
      <a-menu-item key={menu.id}>{menu.title}</a-menu-item>
    )

    return () =>
      props.menu?.children && props.menu?.children?.length
        ? renderSubMenu(props.menu)
        : renderMenuItem(props.menu)
  }
})

onMounted(() => {
  set(
    selectedKeys,
    getCurrentMenuByPath(get(menus), route.path).map(
      x => x.id
    )
  )
})
</script>
