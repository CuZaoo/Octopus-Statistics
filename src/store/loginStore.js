import {defineStore} from 'pinia'
import {ref} from "vue";
import {logout} from "@/api/login.js"
import {getToken, removeToken} from "@/utils/auth.js";

export const useLoginStore = defineStore(
    'login',
    () => {
        let loginDialogVisible = ref(false);
        let token = ref("")

        function logOut() {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }

        function setToken(token) {
            this.token = token;
        }

        function updateLoginDialogVisible(loginDialogVisible) {
            this.loginDialogVisible = loginDialogVisible
        }

        return {loginDialogVisible, token, logOut, setToken, updateLoginDialogVisible}
    },
    {
        persist: {
            path: ['token', 'loginDialogVisible']
        }
    }
)
