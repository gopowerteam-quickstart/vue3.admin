export const appConfig = {
  title: '开发系统',
  http: {
    gateway: {
      default: import.meta.env.VITE_GATEWAY_DEFAULT,
      authorization: import.meta.env
        .VITE_GATEWAY_AUTHORIZATION
    }
  },
  websocket: {
    enpoint: import.meta.env.VITE_WEBSOCKET_ENDPOINT,
    events: {
      addExternalUser: '/user/queue/addExternalUser'
    }
  },
  storage: ['public', 'private'] as const
}
