import { createWebHistory, createRouter } from "vue-router"
import { RouteRecordRaw } from "vue-router"
import { userSessionStore } from "./store"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/all",
    name: "all-books",
    component: () => import("./components/AllBooks.vue"),
  },
  {
    path: "/manga",
    name: "manga",
    component: () => import("./components/Manga.vue"),
  },
  {
    path: "/novels",
    name: "novels",
    component: () => import("./components/Novels.vue"),
  },
  {
    path: "/Wishlist",
    name: "wishlist",
    component: () => import("./components/Wishlist.vue"),
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
    meta: {
      needsAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
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
