import {defineStore} from "pinia";
import {ref} from "vue";
//数字计数器
export const useCounterStore = defineStore(
    'big-counter',
    () => {
        const counter = ref(100)
        const add = (newCounter) => {
            counter.value += newCounter
        }
        return{
            counter,
            add
        }

})
