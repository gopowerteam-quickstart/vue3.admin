import { AppConfig } from '~/types/app.config'

export const appConfig: AppConfig = {
  app: 'vue-web-template',
  title: 'VueAdmin',
  logo: '/logo.png',
  http: {
    gateway: '',
    timeout: 3000,
  },
  workspace: {
    navigation: 'side',
    tabs: false,
    headerFixed: true,
    sideFixed: true,
    tabsFixed: true,
    contentWidth: 'auto',
    sideWidth: 200,
    sideCollapsedWidth: 60,
    sideMode: 'pop',
    headerHeight: 60,
  },
  theme: {
    style: 'auto',
  },
}
