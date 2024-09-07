<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from "vue"
import { bookListStore } from "../store"
import { storeToRefs } from "pinia"
import { useDialog } from "primevue/usedialog"
import { useHead } from "@unhead/vue"

const store = bookListStore()
const { records, loading } = storeToRefs(store)

const BookInfo = defineAsyncComponent(
  () => import("../components/BookInfo.vue")
)
const dialog = useDialog()

const status = ["Want to read", "Owned", "Reading", "Read", "DNF", "All"]

const locationData = computed(() => {
  const bookLocations = records.value
    .filter((a: any) => a.fields.location)
    .reduce((a, c) => {
      a[c.fields.location] = a[c.fields.location] ? a[c.fields.location] + 1 : 1
      return a
    }, {})

  const array = Object.keys(bookLocations).map((key: any) => ({
    label: key,
    data: bookLocations[key],
  }))

  return {
    data: {
      labels: array.map((a: any) => a.label),
      datasets: [
        {
          label: "Volumes",
          data: array.map((a: any) => a.data),
        },
      ],
    },
  }
})

const chartOptions = () => {
  return {
    plugins: {
      legend: {
        labels: {
          cutout: "60%",
        },
      },
    },
  }
}

const statusColor = (status: string) => {
  switch (status) {
    case "Owned":
      return "!bg-yellow-200"
    case "Want to Read":
      return "!bg-gray-200"
    case "Read":
      return "!bg-green-200"
    case "DNF":
      return "!bg-red-200"
    case "Reading":
      return "!bg-blue-200"
  }
}

const showBookInfo = (info: any) => {
  const dialogRef = dialog.open(BookInfo, {
    data: info,
    props: {
      header: info.title,
      style: {
        width: "70vw",
      },
      breakpoints: {
        "960px": "90vw",
        "640px": "100vw",
      },
      modal: true,
    },
  })
}

useHead({
  title: "mirukushake's BL collection | Stats",
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
  <div v-if="!loading">
    <h2 class="text-2xl">Manga/book locations</h2>
    <Chart type="doughnut" :data="locationData.data" class="w-1/2" />
  </div>

  <DynamicDialog />
  <ScrollTop />
</template>

<style scoped></style>
