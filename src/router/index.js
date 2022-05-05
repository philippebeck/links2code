import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView"
import ContactView from "../views/ContactView"
import LoginView from "../views/LoginView"
import AdminView from "../views/AdminView"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
