import { createRouter, createWebHistory } from 'vue-router'
// import NProgress from 'nprogress'
import routes from './routes'
import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'
// import '@/assets/nprogress.css'

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

export default router
