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
    path: "/admin/dashboard",
    component: () => import("../views/admin/DashboardView.vue"),
    meta: metaData,
  },

  {
    path: "/admin/users",
    component: () => import("../views/admin/UsersView.vue"),
    meta: metaData,
  },
  {
    name: "biometric",
    path: "/admin/biometric",
    component: () => import("../views/admin/BiometricView.vue"),
    meta: metaData,
  },
  {
    name: "public-onboarding",
    path: "/admin/public-onboarding",
    component: () => import("../views/admin/PublicOnboardingView.vue"),
    meta: metaData,
  },
  {
    name: "users",
    path: "/admin/users/:id",
    component: () => import("../views/admin/single-view/SingleUserView.vue"),
    meta: metaData,
  },
  {
    path: "/admin/networks",
    component: () => import("../views/admin/NetworksView.vue"),
    meta: metaData,
  },
  {
    path: "/admin/organizations",
    component: () => import("../views/admin/OrganisationView.vue"),
    meta: metaData,
  },
  {
    name: "organizations",
    path: "/admin/organizations/:id",
    component: () =>
      import("../views/admin/single-view/SingleOrganisationView.vue"),
    meta: metaData,
  },
  {
    name: "drivers",
    path: "/admin/drivers",
    component: () => import("../views/admin/DriversView.vue"),
    meta: metaData,
  },
  {
    path: "/admin/all-rides",
    component: () => import("../views/admin/AllRidesView.vue"),
    meta: metaData,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    name: "forgot-password",
  },
];

export default routes;
