import { defineStore } from "pinia";
import storeEncrpyt from "@/support/storeEncrypt";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    userId: null,
    token: null,
    expiresIn: null,
    loggedIn: false,
  }),
  actions: {
    login(payload) {
      this.user = payload?.user ?? null;
      this.token = payload.access_token;
      this.userId = payload.id;
      this.loggedIn = true;
    },

    logout() {
      this.user = null;
      this.token = null;
      this.expiresIn = null;
      this.loggedIn = false;
    },

    forceLogout() {
      this.logout();
      this.router.push({ path: "/login" });
    },

    setUser(user) {
      this.user = user;
    },
  },
  persist: {
    serializer: {
      serialize: storeEncrpyt.encrypt,
      deserialize: storeEncrpyt.decrypt,
    },
  },
});
