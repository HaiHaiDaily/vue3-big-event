// pinia 独立维护
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

//仓库 统一导出
// import { useUserStore } from './modules/user'
// export { useUserStore }
// 可以简化成一下写法
export * from './modules/user'
