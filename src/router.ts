import { createWebHistory, createRouter } from "vue-router"
import { RouteRecordRaw } from "vue-router"
import { userSessionStore } from "./store"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/all",
    name: "all-books",
    component: () => import("./components/BaseList.vue"),
    props: { storeName: "all" },
  },
  {
    path: "/manga",
    name: "manga",
    component: () => import("./components/BaseList.vue"),
    props: { storeName: "manga" },
  },
  {
    path: "/novels",
    name: "novels",
    component: () => import("./components/BaseList.vue"),
    props: { storeName: "novels" },
  },
  {
    path: "/Wishlist",
    name: "wishlist",
    component: () => import("./components/BaseList.vue"),
    props: { storeName: "wishlist" },
  },
  {
    path: "/secret",
    name: "secret",
    component: () => import("./components/Secret.vue"),
  },
  {
    path: "/addbook",
    name: "addbook",
    component: () => import("./components/AddBook.vue"),
  },
  {
    path: "/stats",
    name: "stats",
    component: () => import("./components/Stats.vue"),
    meta: {
      needsAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(
    import.meta.env.ENV === "dev" ? "/" : "/blgallery/"
  ),
  routes,
})

router.beforeEach((to, from, next) => {
  const userSession = userSessionStore()

  if (to.meta.needsAuth) {
    if (userSession.session) {
      return next()
    } else {
      return next("/secret")
    }
  }

  return next()
})

export default router
