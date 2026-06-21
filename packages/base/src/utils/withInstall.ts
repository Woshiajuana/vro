import type { App, Plugin } from 'vue'

export type WithInstall<T> = T & Plugin

export const withInstall = <T>(main: any, install?: (app: App) => void): WithInstall<T> => {
  ;(main as WithInstall<T>).install =
    install ??
    ((app: App) => {
      app.component(main.name, main)
    })
  return main
}
