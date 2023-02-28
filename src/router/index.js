import { createRouter, createWebHistory } from 'vue-router'
// import NProgress from 'nprogress'
import routes from './routes'
import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'
// import '@/assets/nprogress.css'

// NProgress.configure({
//     easing: 'ease',
//     speed: 1000,
//     trickleSpeed: 500,
//     showSpinner: true
// })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach(async (to, from) => {
    const store = useAuthStore()
    const general = useGeneralStore()
    general.abortPendingRequests()

    if (to.meta.requiresAuth && !store.loggedIn && to.name !== 'Login') {
        return { path: '/login', query: { redirect: 'forbidden' } }
    }
})


// router.beforeResolve(async (to, from) => {
//     if (to.name) {
//         NProgress.start()  
//     }
// })

// router.afterEach((to, from) => {
//     NProgress.done()
// })

export default router
