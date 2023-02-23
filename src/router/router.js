import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import AdminPage from "../views/admin/AdminView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/admin",
      component: AdminPage,
      children: [
        {
          path: "dashboard",
          component: () => import("../views/admin/DashboardView.vue"),
        },
        {
          path: "users",
          children: [
            {
              path: "",
              component: () => import("../views/admin/UsersView.vue"),
            },
            {
              name: "users",
              path: ":id",
              component: () =>
                import("../views/admin/single-view/SingleUserView.vue"),
            },
          ],
        },
        {
          path: "networks",
          component: () => import("../views/admin/NetworksView.vue"),
        },
        {
          path: "organizations",
          children: [
            {
              path: "",
              component: () => import("../views/admin/OrganisationView.vue"),
            },
            {
              name: "organizations",
              path: ":id",
              component: () =>
                import("../views/admin/single-view/SingleOrganisationView.vue"),
            },
          ],
        },
        {
          name: "drivers",
          path: "drivers",
          component: () => import("../views/admin/DriversView.vue"),
        },
        {
          path: "all-rides",
          component: () => import("../views/admin/AllRidesView.vue"),
        },
      ],
    },
    {
      path: "/forgot-password",
      component: ForgotPassword,
      name: "forgot-password",
    },
  ],
});

export default router;
