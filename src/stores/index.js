//独立维护pinia
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)
export default pinia

//仓库统一导出
// import {useUserStore} from "@/stores/modules/user.js";
// export {useUserStore}
// import {useCounterStore} from "@/stores/modules/counter.js";
// export {useCounterStore}
export * from '@/stores/modules/user.js';
export * from '@/stores/modules/counter.js'
