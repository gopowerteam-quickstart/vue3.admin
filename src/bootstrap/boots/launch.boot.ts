import { RequestParams } from '@gopowerteam/http-request'
import { lastValueFrom } from 'rxjs'
import { useRequest } from 'virtual:http-request'
import {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router
} from 'vue-router'
import { useStore } from '~/store'
import getAppLaunchTasks from '../launch/app.launch'
import getUserLaunchTasks from '../launch/user.launch'
/**
 * 业务启动逻辑
 */
export async function appLaunch() {
  const store = useStore(store => store.app)
  // 同步并获取应用
  await Promise.all(getAppLaunchTasks())
  // 更新系统状态
  store.setReady()
}

/**
 * 业务启动逻辑
 */
export async function userLaunch() {
  // 同步并获取应用
  await Promise.all(getUserLaunchTasks())
}

/**
 * 验证用户权限
 */
export function userAccess(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useStore(store => store.user)
  let redirect = ''

  if (to.name === 'login' && userStore.token) {
    redirect = '/home'
  }

  if (to.name !== 'login' && !userStore.token) {
    redirect = '/login'
  }

  if (redirect) {
    next(redirect)
  }

  return redirect
}

/**
 * 验证TOKEN有效性
 */
export function tokenAccess(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // const userStore = useStore(store => store.user)
  // if (
  //   to.name !== 'login' &&
  //   userStore.token &&
  //   !userStore.current
  // ) {
  //   return getUserData()
  //     .then(() => {
  //       return true
  //     })
  //     .catch(() => {
  //       userStore.updateToken('')
  //       userStore.updateCurrent(undefined)
  //       next('/login')
  //       return false
  //     })
  // }
}

/**
 * 获取用户信息
 * @returns
 */
function getUserData() {
  // const userStore = useStore(store => store.user)
  // const authService = useRequest(
  //   services => services.AuthService
  // )
  // return lastValueFrom(
  //   authService.queryEmployeeByToken(
  //     new RequestParams({
  //       append: {
  //         token: userStore.token
  //       }
  //     })
  //   )
  // ).then(data => {
  //   userStore.updateCurrent(data)
  // })
}

export default function (router: Router) {
  const appStore = useStore(store => store.app)

  router.beforeEach(async (to, from, next) => {
    // 系统初始化状态
    if (!appStore.ready) {
      await appLaunch()
    }

    // 用户验证检测
    if (userAccess(to, next)) {
      return
    }

    // 用户验证检测
    // switch (await tokenAccess(to, next)) {
    //   case true:
    //     await userLaunch()
    //     break
    //   case false:
    //     return
    // }

    next()
  })
}
