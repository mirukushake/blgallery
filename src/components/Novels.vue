<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from "vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { bookListStore, filterStore } from "../store"
import { storeToRefs } from "pinia"
import { useDialog } from "primevue/usedialog"
import { useHead } from "@unhead/vue"
import { useI18n } from "vue-i18n"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
const breakpoints = useBreakpoints(breakpointsTailwind)
const mobileDialog = breakpoints.smaller("sm")

dayjs.extend(isBetween)

const { t, locale } = useI18n({ useScope: "global" })

const store = bookListStore()
const { novelsOnly: records, loading } = storeToRefs(store)
const search = filterStore()
const {
  keyword,
  selectedSeme,
  selectedSettei,
  selectedStatus,
  selectedTags,
  selectedTone,
  selectedUke,
  selectedPlay,
  monthReading,
  newest,
} = storeToRefs(search)

const BookInfo = defineAsyncComponent(
  () => import("../components/BookInfo.vue")
)
const dialog = useDialog()
const filteredBooks = computed(() => {
  return records.value
    .filter(
      (book: any) =>
        book.title.toLowerCase().includes(keyword.value.toLowerCase()) ||
        book.authors.some((author: any) =>
          author.name.toLowerCase().includes(keyword.value.toLowerCase())
        )
    )
    .filter(
      (item: any) =>
        !selectedTone.value.length ||
        (item.tone &&
          item.tone.some((b: any) => selectedTone.value.includes(b.id)))
    )
    .filter(
      (item: any) =>
        !selectedSeme.value.length ||
        (item.seme &&
          item.seme.some((b: any) => selectedSeme.value.includes(b.id)))
    )
    .filter(
      (item: any) =>
        !selectedUke.value.length ||
        (item.uke &&
          item.uke.some((b: any) => selectedUke.value.includes(b.id)))
    )
    .filter(
      (item: any) =>
        !selectedSettei.value.length ||
        (item.settei &&
          item.settei.some((b: any) => selectedSettei.value.includes(b.id)))
    )
    .filter(
      (item: any) =>
        !selectedPlay.value.length ||
        (item.play &&
          item.play.some((b: any) => selectedPlay.value.includes(b.id)))
    )
    .filter(
      (item: any) =>
        !selectedTags.value.length ||
        (item.tags &&
          item.tags.some((b: any) => selectedTags.value.includes(b.id)))
    )
    .filter(
      (item: any) =>
        !selectedStatus.value.length ||
        selectedStatus.value.includes(item.status_id)
    )
    .filter(
      (item: any) =>
        monthReading.value === false ||
        (item.read &&
          dayjs(item.read[0]).isBetween(
            `${dayjs().year()}-${dayjs().month() + 1}-01`,
            `${dayjs().year()}-${dayjs().month() + 1}-${dayjs().daysInMonth()}`,
            "day",
            "[]"
          ))
    )
    .sort((a: any, b: any) => {
      if (newest.value === true) {
        return b.added.localeCompare(a.added)
      }
    })
})

const count = computed(() => {
  return filteredBooks.value.length
})

const page = ref(0)
const limit = ref(60)
const offset = computed(() => Number(limit.value * page.value))

async function onPageChange(event: any) {
  page.value = event.page
}

const paginationData = computed(() => {
  return filteredBooks.value.slice(offset.value, offset.value + limit.value)
})

const statusColor = (status: number) => {
  switch (status) {
    case 2:
      return "!bg-yellow-200"
    case 1:
      return "!bg-gray-200"
    case 4:
      return "!bg-green-200"
    case 5:
      return "!bg-red-200"
    case 3:
      return "!bg-blue-200"
  }
}

const showBookInfo = (info: any) => {
  dialog.open(BookInfo, {
    data: info,
    props: {
      header: info.title,
      draggable: false,
      blockScroll: false,
      // breakpoints: {
      //   "960px": "90vw",
      //   "640px": "100vw",
      // },
      modal: true,
      pt: {
        root: {
          class: mobileDialog.value
            ? "p-dialog-maximized fixed top-0 left-0 overflow-y-auto"
            : "w-7/12",
        },
      },
    },
  })
}
useHead({
  title: "mirukushake's BL collection",
})
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen p-5 min-w-screen"
    v-if="loading"
  >
    <div class="flex space-x-2 animate-pulse">
      <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
      <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
      <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
    </div>
  </div>

  <FilterBar v-if="loading === false && filteredBooks" :count="count" />
  <DataView
    lazy
    :value="paginationData"
    data-key="id"
    layout="grid"
    paginator
    :first="offset"
    :rows="limit"
    :total-records="count"
    @page="onPageChange($event)"
    class="!border-none"
    v-if="loading === false && filteredBooks"
  >
    <template #grid="slotProps">
      <div
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 auto-rows-fr"
      >
        <div v-for="item in slotProps.items" :key="item.id" class="">
          <Card
            class="h-full hover:shadow-md cursor-pointer"
            @click="showBookInfo(item)"
          >
            <template #header
              ><span v-if="item.cover"
                ><img
                  :alt="`${item.title.ja} cover`"
                  v-lazy="item.cover"
                  class="object-cover object-right-top h-56 w-full rounded-t-md"
              /></span>
              <span v-else
                ><div
                  class="object-cover object-center h-56 w-full flex justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg></div></span
            ></template>
            <template #title
              ><span class="text-base font-bold">{{
                item.title
              }}</span></template
            >
            <template #subtitle
              ><div>
                <span
                  v-if="item.authors"
                  v-for="(author, index) in item.authors.sort((a: any, b: any) => a.order - b.order)"
                  :class="{ 'ml-2': index > 0 }"
                  >{{ author.name }}</span
                >
              </div></template
            >
            <template #content
              ><div>
                <span class="mr-2"
                  ><Tag
                    :value="item.status[locale]"
                    severity="secondary"
                    :class="statusColor(item.status_id)"
                  ></Tag
                ></span>
                <span v-show="item.rating"
                  ><i class="pi pi-star-fill text-yellow-400"></i>
                  {{ item.rating }}</span
                >
              </div>
              <div class="mt-2">
                <Tag :severity="item.manga === false ? 'secondary' : 'info'"
                  ><div>
                    {{ item.manga === false ? t("novel") : t("manga") }}
                  </div></Tag
                >
              </div></template
            >
          </Card>
        </div>
      </div>
    </template>
  </DataView>
  <DynamicDialog />
  <ScrollTop />
</template>

<style scoped></style>
