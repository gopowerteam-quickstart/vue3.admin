import { App } from 'vue'
import PageContainer from '@/shared/components/page-container.vue'
import DataTable from '~/shared/components/data-table'
import FileUpload from '@/shared/components/file-upload.vue'
import Switch from '~/shared/components/switch-template.vue'
import ImagePreview from '~/shared/components/image-preview.vue'

export default function (app: App<Element>) {
  app.component('page-container', PageContainer)
  app.component('data-table', DataTable)
  app.component('file-upload', FileUpload)
  app.component('switch-template', Switch)
  app.component('image-preview', ImagePreview)
}

declare global {
  interface __VLS_GlobalComponents {
    PageContainer: typeof PageContainer
    DateTable: typeof DataTable
    FileUpload: typeof FileUpload
    Switch: typeof Switch
    ImagePreview: typeof ImagePreview
  }
}
