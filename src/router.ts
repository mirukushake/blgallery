import { createWebHistory, createRouter } from "vue-router"
import { RouteRecordRaw } from "vue-router"

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
    path: "/stats",
    name: "stats",
    component: () => import("./components/Stats.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
