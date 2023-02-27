import axios from 'axios'
// import Nprogress from 'nprogress'
import { useGeneralStore } from '@/stores/general'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'


const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

http.defaults.withCredentials = false
const authStore = useAuthStore()

http.interceptors.request.use(config => {
    if (authStore.loggedIn
        && authStore.token !== null) {
        config.headers['Authorization'] = `Bearer ${authStore.token}`
    }
    
   //  Nprogress.start()
    let cancelSource = axios.CancelToken.source()

    // Set cancel token on this request
    config.cancelToken = cancelSource.token

    // Add to pinia to make cancellation available from anywhere
    const store = useGeneralStore();
    store.setCancelToken(cancelSource)

    return config
})

http.interceptors.response.use((response) => {
   //  Nprogress.done(true)
    return response
}, function (err) {
    if (err?.response?.status == 401) {
        authStore.forceLogout()
    }

   //  Nprogress.done(true)
    return Promise.reject(err)
})

export default http