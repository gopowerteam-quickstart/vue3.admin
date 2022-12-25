/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HTTP_GATEWAY: string
}

// typings.d.ts or router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    layout: 'workspace' | 'blank'
    title: string
    menu?: {
      key: string
      title: string
      icon?: string
    }

    // 每个路由都必须声明
    requireAuth?: boolean
    requireRoles?: Array<string | number>
  }
}
