import {defineStore} from 'pinia'
import {ref} from "vue";

export const useGlobalStore = defineStore('global', () => {
    const windowHeight = ref(window.innerHeight)
    const isUserLogin = ref(false)
    return {windowHeight, isUserLogin}
})
