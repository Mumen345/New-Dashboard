import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', {
    state: () => ({
        cancelTokens: [],
        toasts: []
    }),
    getters: {    
        getCancelTokens: () => this.cancelTokens
    },
    actions: {
        abortPendingRequests() {
            this.cancelTokens.forEach((request, i) => {
                if(request.cancel){
                    request.cancel();
                }
            });
    
            // Reset the cancelTokens store
            this.clearCancelTokens();
        },

        setCancelToken(token) {
            this.cancelTokens.push(token)
        },

        clearCancelTokens() {
            this.cancelTokens = []
        },

        notifySuccess(message) {
            this.toasts.push({
                type: 'success',
                message: message,
                key: Math.random().toString(36).slice(2)
            })

            setTimeout(() => this.toasts.shift(), 9000);
        },

        notifyError(message) {
            this.toasts.push({
                type: 'danger',
                message: message,
                key: Math.random().toString(36).slice(2)
            })

            setTimeout(() => this.toasts.shift(), 9000);
        },

        removeToast(key) {
            let index = this.toasts.findIndex(ts => ts.key === key)
            if (index > -1) {
                this.toasts.splice(index, 1)
            }
        }
    }
})
