import HomePage from "../views/HomePage.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import AdminPage from "../views/admin/AdminView.vue";

const metaData = { requiresAuth: true };

const routes = [
  {
    path: "/",
    alias: "/login",
    name: "home",
    component: HomePage,
  },
  {
    path: "/admin",
    component: AdminPage,
    meta: metaData,
    children: [
      {
        path: "dashboard",
        component: () => import("../views/admin/DashboardView.vue"),
        meta: metaData,
      },
      {
        path: "users",
        children: [
          {
            path: "",
            component: () => import("../views/admin/UsersView.vue"),
            meta: metaData,
          },
          {
            name: "users",
            path: ":id",
            component: () =>
              import("../views/admin/single-view/SingleUserView.vue"),
            meta: metaData,
          },
        ],
      },
      {
        path: "networks",
        component: () => import("../views/admin/NetworksView.vue"),
        meta: metaData,
      },
      {
        path: "organizations",
        children: [
          {
            path: "",
            component: () => import("../views/admin/OrganisationView.vue"),
            meta: metaData,
          },
          {
            name: "organizations",
            path: ":id",
            component: () =>
              import("../views/admin/single-view/SingleOrganisationView.vue"),
            meta: metaData,
          },
        ],
      },
      {
        name: "drivers",
        path: "drivers",
        component: () => import("../views/admin/DriversView.vue"),
        meta: metaData,
      },
      {
        path: "all-rides",
        component: () => import("../views/admin/AllRidesView.vue"),
        meta: metaData,
      },
    ],
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    name: "forgot-password",
  },
];

export default routes;
