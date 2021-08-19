interface ImportMetaEnv {
  VITE_REQUEST_GATEWAY: string
}

declare module '@fast-crud/ui-antdv' {
  declare const _default: {
    install: (app: App<any>) => App<any>
  }
  export default _default
}
