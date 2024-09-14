import { defineStore } from "pinia"
import { createFetch } from "@vueuse/core"
import { ref, computed } from "vue"
import { Book, Metadata } from "./models/models"
import { AuthSession } from "@supabase/supabase-js"

const env = import.meta.env.VITE_ENV

export const userSessionStore = defineStore({
  id: "userSession",
  state: () => ({
    session: null as AuthSession | null,
  }),
  persist: {
    storage: localStorage,
  },
})

export const bookListStore = defineStore("books", () => {
  const records = ref<Book[]>([])
  const loading = ref<boolean>(true)
  const metadata = ref<Metadata | null>(null)
  const auth = userSessionStore()

  const headersInit: HeadersInit = {}

  const apiFetch = createFetch({
    baseUrl:
      env === "dev" ? "http://localhost:7666" : import.meta.env.VITE_BASEURL,
    options: {
      async beforeFetch({ options }) {
        options.headers = headersInit
        options.headers.Authorization = `Bearer ${auth.session?.access_token}`
        options.headers["Content-Type"] = "application/json"

        return { options }
      },
    },
    fetchOptions: {
      mode: "cors",
    },
  })

  async function getBooks() {
    const { data: books, isFetching: booksLoading } = await apiFetch("/books", {
      method: "GET",
    }).json()

    records.value = books.value?.data

    const { data: metadataList } = await apiFetch("/metadata", {
      method: "GET",
    }).json()

    metadata.value = metadataList.value?.data
    loading.value = booksLoading.value
  }

  const bookshelf = computed(() =>
    records.value.filter((book: any) => book.status_id !== 1)
  )

  const mangaOnly = computed(() =>
    bookshelf.value.filter((book: any) => book.manga === true)
  )
  const novelsOnly = computed(() =>
    bookshelf.value.filter((book: any) => book.manga !== true)
  )

  const wishlist = computed(() =>
    records.value.filter((book: any) => book.status_id === 1)
  )

  return {
    records,
    getBooks,
    loading,
    metadata,
    bookshelf,
    wishlist,
    mangaOnly,
    novelsOnly,
    apiFetch,
  }
})
