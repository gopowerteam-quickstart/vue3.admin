<template lang="pug">
.menu-container(css:text='white')
  .menu-group.py-2(
    :key='group'
    v-for='(pages, group) in menus')
    .header {{ group }}
    .content.flex
      .menu-item.cursor-pointer.p-2(
        :key='page.name'
        @click='$router.push(page.path)'
        v-for='page in pages')
        img.icon(:src='page.meta.menu.icon')
        .title(css:text='xs center') {{ page.meta.title }}
</template>

<style lang="less" scoped>
.menu-item {
  width: (1/3) * 100%;
  border: solid 1px rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin: 5px;
  .icon {
    margin: auto;
    width: 50px;
    height: 50px;
  }

  &:hover {
    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.3);
  }
}
</style>

<script setup lang="ts">
import routes from 'virtual:generated-pages'
import * as R from 'ramda'

type MenuItem = {
  name: string
  path: string
  meta: {
    title: string
    menu: {
      group: string
      icon: string
      index: number
    }
  }
}

let menus = ref<{ [key: string]: MenuItem[] }>({})

/**
 *  获取菜单列表
 */
function getMenus(pages: MenuItem[]) {
  const generate = R.pipe(
    R.filter<MenuItem, 'array'>(
      (x: MenuItem) => !!x?.meta?.menu
    ),
    R.sortBy(x => x.meta.menu.index),
    R.groupBy<MenuItem, string>(x => x.meta.menu.group)
  )

  return generate(pages)
}

onMounted(() => {
  set(menus, getMenus(routes as unknown as MenuItem[]))
})
</script>
