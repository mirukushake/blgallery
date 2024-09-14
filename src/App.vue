<script setup lang="ts">
import { ref } from "vue"
import { bookListStore, userSessionStore } from "./store"
import { useI18n } from "vue-i18n"
import { supabase } from "./plugins/supabase"
import router from "./router"

const { locale } = useI18n({ useScope: "global" })
const store = bookListStore()
const userSession = userSessionStore()
store.getBooks()

supabase.auth.onAuthStateChange((event, session) => {
  userSession.session = session
})

const changeLocale = () => {
  if (locale.value === "en") {
    locale.value = "ja"
  } else {
    locale.value = "en"
  }
}

const menuitems = ref([
  {
    label: "All BL",
    icon: "pi pi-home",
    route: "/",
  },
  {
    label: "Manga",
    icon: "pi pi-image",
    route: "/manga",
  },
  {
    label: "Novels",
    icon: "pi pi-book",
    route: "/novels",
  },
  {
    label: "Wishlist",
    icon: "pi pi-heart",
    route: "/wishlist",
  },
])
</script>

<template>
  <div class="m-0 p-0 rounded-none">
    <header id="menubar" class="sticky top-0 z-50">
      <Menubar :model="menuitems" class="!rounded-none">
        <template #item="{ item, props, hasSubmenu }">
          <router-link
            v-if="item.route"
            v-slot="{ href, navigate, isActive }"
            :to="item.route"
            custom
          >
            <a
              v-ripple
              :href="href"
              v-bind="props.action"
              @click="navigate"
              :class="isActive ? 'rounded-md bg-blue-200' : 'transparent'"
            >
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a
            v-else
            v-ripple
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
          </a>
        </template>
        <template #end>
          <div class="flex">
            <Button
              :label="locale === 'en' ? '🇯🇵' : '🇺🇸'"
              rounded
              outlined
              @click="changeLocale()"
            />
            <Button
              v-if="userSession.session"
              icon="pi pi-plus"
              rounded
              outlined
              @click="() => router.push({ path: '/addbook' })"
              class="ml-2"
            />
          </div>
        </template>
      </Menubar>
    </header>
    <div id="maincontent" class="mx-auto p-10">
      <RouterView />
    </div>
  </div>
</template>
