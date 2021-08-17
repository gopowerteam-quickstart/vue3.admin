// import { useGraphql } from '@/graphql'
// import store from '@/store'

import { Router } from 'vue-router'
import { useStore } from '~/store'

// /**
//  * 获取系统状态
//  * @returns
//  */
// function getSystemInfo() {
//     return useGraphql()
//         .query({
//             getSystemInfo: {
//                 administrator: true,
//                 apps: true
//             }
//         })
//         .then(({ getSystemInfo: data }) => {
//             store.commit('app/initialize', data.administrator)
//         })
// }

// /**
//  * 更新用户信息
//  **/
// function getUserInfo() {
//     return useGraphql()
//         .query({
//             getUserByToken: {
//                 id: true,
//                 username: true,
//                 nickname: true,
//                 role: true,
//                 desktop: {
//                     name: true
//                 }
//             }
//         })
//         .then(({ getUserByToken: data }) => {
//             const { desktop, ...user } = data
//             // 更新用户信息
//             store.commit('user/updateUser', user)
//             // 更新桌面应用
//             store.commit(
//                 'app/updateDesktopApps',
//                 desktop.map(x => x.name)
//             )
//         })
// }

// function getAppList() {
//     return useGraphql()
//         .query({
//             getAppList: {
//                 name: true,
//                 icon: true,
//                 title: true,
//                 maximize: true
//             }
//         })
//         .then(({ getAppList: apps }) => {
//             store.commit('app/updateAppList', apps)
//         })
// }

/**
 * 业务启动逻辑
 */
export async function appLaunch() {
  const store = useStore(store => store.app)
  // 同步并获取应用
  await Promise.all([])
  // 更新系统状态
  store.setReady()
}

/**
 * 业务启动逻辑
 */
export function userLaunch() {
  // 同步并获取应用
  return Promise.all([])
  // return getUserInfo()
  //   .then(() => Promise.all([getAppList()]))
  //   .then(() => true)
  //   .catch(() => {
  //     // 用户信息更新失败
  //     store.commit('user/clearUser')
  //     return '/login'
  //   })
}

export default function (router: Router) {
  const store = useStore(store => store.app)
  router.beforeEach(async (to, from, next) => {
    if (!store.ready) {
      await appLaunch()
    }
    next()
  })
}
