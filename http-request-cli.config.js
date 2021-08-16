module.exports = {
  gateway: 'https://gateway.platform.xbt-dev.top',
  apiVersion: 'v2',
  controllerDir: {
    alias: '@/http/controller', // 控制器目录名别
    path: './src/http/controller' // 控制器目录路径
  },
  serviceDir: {
    alias: '@/http/services', // 服务目录名别
    path: './src/http/services' // 服务目录名别
  },
  services: {
    'material-service': 'xbt-platform-material-service'
  }
}
