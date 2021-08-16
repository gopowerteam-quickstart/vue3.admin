import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

const MODULE_ID = 'virtual:http-request'
let generatedServices: string[]

type Option = {
  path: string
}

export const plugin = (option: Option): Plugin => {
  return {
    name: 'vite-plugin-http-request',
    enforce: 'pre',
    resolveId(id: string) {
      if (id === MODULE_ID) {
        return MODULE_ID
      }
    },
    load(id: string) {
      if (id !== MODULE_ID) return
      console.log(33333)
      if (!generatedServices) {
        generatedServices = []
        generatedServices = generateServices(option.path)
      }

      const clientCode = generateServiceCode(
        generatedServices
      )

      console.log(clientCode)

      return 'export default {}'
    }
  }
}

function generateServices(servicePath: string) {
  const serviceList: string[] = []
  const walk = (dir: string) => {
    fs.readdirSync(dir).forEach(function (file) {
      // 修正windows路径符号问题
      const fullpath = path
        .join(dir, file)
        .replace(/\\/g, '/')
      const stat = fs.statSync(fullpath)

      if (
        stat.isFile() &&
        fullpath.endsWith('.service.ts')
      ) {
        serviceList.push(fullpath)
      } else if (stat.isDirectory()) {
        const subdir = path.join(dir, file)
        walk(subdir)
      }
    })
  }

  walk(path.join(servicePath))
  return serviceList
}

function generateServiceCode(services: string[]) {
  const imports = services.map(service => {
    const [name] =
      /[^\\]+(?=\.service\.ts$)/.exec(
        path
          .basename(service)
          .replace(/-(\w)/g, ($, $1: string) =>
            $1.toUpperCase()
          )
          .replace(/^\S/, s => s.toUpperCase())
      ) || []

    return `import ${name} from "${service}"`
  })

  // const importCode = imports.join('\r\n')

  // const serviceCode = {
  //   a: ''
  // }

  // type ServiceType = string

  // type SelectType = (a: serviceCode) => ServiceType

  // const useRequest = (select: ServiceType) => {
  //   return select(services)
  // }

  return
}

// import { PosterDownloadRecordService } from '~/http/services/material-service/poster-download-record.service'
// import { PosterService } from '~/http/services/material-service/poster.service'

// const serviceList = {
//   PosterDownloadRecordService,
//   PosterService
// }

// type ServicesType =
//   | typeof PosterDownloadRecordService
//   | typeof PosterService

// type SelectType = (
//   services: typeof serviceList
// ) => ServicesType

// const useRequest = (select: SelectType) => {
//   return new select(serviceList)()
// }

// useRequest(services => services.PosterService)
