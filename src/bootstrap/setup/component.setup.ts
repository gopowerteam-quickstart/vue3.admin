import type { App } from 'vue'
import PageContainer from '@/shared/components/page-container.vue'

export default function (app: App) {
  app.component('PageContainer', PageContainer)
}
