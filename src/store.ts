import { defineStore } from "pinia"
import { createFetch } from "@vueuse/core"
import { ref, computed } from "vue"
import { Book, Metadata } from "../models/models"

export const bookListStore = defineStore("books", () => {
  const records = ref<Book[]>([])
  const loading = ref<boolean>(true)
  const metadata = ref<Metadata | null>(null)

  const headersInit: HeadersInit = {}

  const apiFetch = createFetch({
    baseUrl: "http://localhost:7666",
    options: {
      async beforeFetch({ options }) {
        options.headers = headersInit
        options.headers.Authorization = `Bearer ${
          import.meta.env.VITE_AIRTABLE_KEY
        }`

        return { options }
      },
    },
    fetchOptions: {
      mode: "cors",
    },
  })

  async function getBooks() {
    const {
      error: booksError,
      data: books,
      isFetching: booksLoading,
    } = await apiFetch("/books", {
      method: "GET",
    }).json()

    records.value = books.value?.data

    const {
      error: metadataError,
      data: metadataList,
      isFetching: metadataLoading,
    } = await apiFetch("/metadata", {
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
  }
})
