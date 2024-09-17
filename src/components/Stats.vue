<script setup lang="ts">
import { ref, computed, provide, watch } from "vue"
import dayjs from "dayjs"
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { PieChart, LineChart, BarChart } from "echarts/charts"
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components"
import VChart, { THEME_KEY } from "vue-echarts"

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

provide(THEME_KEY, "light")

import { bookListStore } from "../store"
import { storeToRefs } from "pinia"
const store = bookListStore()
const { statsInfo } = storeToRefs(store)

const locationData = computed(() => {
  return statsInfo.value!.locations
})

const timeData = computed(() => {
  return statsInfo.value!.booksByMonth.map((x: any) => ({
    ...x,
    name: dayjs(x.name).format("MMM"),
  }))
})

const authorRatingData = computed(() => {
  return statsInfo
    .value!.authorStats.filter((x: any) => x.count >= 2)
    .sort((a: any, b: any) => b.rating - a.rating)
    .slice(0, 24)
})

const authorCountData = computed(() => {
  return statsInfo
    .value!.authorStats.sort((a: any, b: any) => b.count - a.count)
    .slice(0, 24)
})

const semeData = computed(() => {
  return statsInfo.value!.faveSeme.slice(0, 24)
})
const ukeData = computed(() => {
  return statsInfo.value!.faveUke.slice(0, 24)
})
const setteiData = computed(() => {
  return statsInfo.value!.faveSettei.slice(0, 24)
})

const locationOptions = ref({
  title: {
    text: "Locations",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
    textStyle: {
      fontFamily: "M PLUS Rounded 1c, ui-sans-serif",
    },
  },
  series: [
    {
      name: "Location",
      type: "pie",
      radius: ["30%", "60%"],
      data: locationData,
      label: {
        overflow: "break",
        fontFamily: "M PLUS Rounded 1c, ui-sans-serif",
      },
    },
  ],
})

const timeOptions = ref({
  title: {
    text: "Volumes read per month",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    textStyle: {
      fontFamily: "M PLUS Rounded 1c, ui-sans-serif",
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: timeData.value.map((x: any) => x.name),
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Manga",
      type: "line",
      data: timeData.value.map((x: any) => x.manga),
    },
    {
      name: "Novels",
      type: "line",
      data: timeData.value.map((x: any) => x.novels),
    },
  ],
  height: "50%",
})

const authorRatingOptions = ref({
  title: {
    text: "Authors/illustrators by average rating (2 or more read)",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c}",
    textStyle: {
      fontFamily: "M PLUS Rounded 1c, ui-sans-serif",
    },
  },
  xAxis: {
    type: "category",
    data: authorRatingData.value.map((x: any) => x.name),
    axisLabel: {
      show: true,
      interval: 0,
      rotate: 45,
    },
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "bar",
      data: authorRatingData.value.map((x: any) => x.rating.toFixed(2)),
    },
  ],
  height: "50%",
})

const authorCountOptions = ref({
  title: {
    text: "Authors/illustrators by volumes read",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c}",
    textStyle: {
      fontFamily: "M PLUS Rounded 1c, ui-sans-serif",
    },
  },
  xAxis: {
    type: "category",
    data: authorCountData.value.map((x: any) => x.name),
    axisLabel: {
      show: true,
      interval: 0,
      rotate: 45,
    },
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "bar",
      data: authorCountData.value.map((x: any) => x.count),
    },
  ],
  height: "50%",
})

const faveSemeOptions = ref({
  title: {
    text: "Fave seme traits (4+ rating)",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c}",
    textStyle: {
      fontFamily: "M PLUS Rounded 1c, ui-sans-serif",
    },
  },
  xAxis: {
    type: "category",
    data: semeData.value.map((x: any) => x.name),
    axisLabel: {
      show: true,
      interval: 0,
      rotate: 45,
    },
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "bar",
      data: semeData.value.map((x: any) => x.value),
    },
  ],
  height: "50%",
})

const faveUkeOptions = ref({
  title: {
    text: "Fave uke traits (4+ rating)",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c}",
    textStyle: {
      fontFamily: "M PLUS Rounded 1c, ui-sans-serif",
    },
  },
  xAxis: {
    type: "category",
    data: ukeData.value.map((x: any) => x.name),
    axisLabel: {
      show: true,
      interval: 0,
      rotate: 45,
    },
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "bar",
      data: ukeData.value.map((x: any) => x.value),
    },
  ],
  height: "50%",
})

const faveSetteiOptions = ref({
  title: {
    text: "Fave setting/situations/tropes (4+ rating)",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c}",
    textStyle: {
      fontFamily: "M PLUS Rounded 1c, ui-sans-serif",
    },
  },
  xAxis: {
    type: "category",
    data: setteiData.value.map((x: any) => x.name),
    axisLabel: {
      show: true,
      interval: 0,
      rotate: 45,
    },
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "bar",
      data: setteiData.value.map((x: any) => x.value),
    },
  ],
  height: "50%",
})
</script>

<template>
  <div v-if="statsInfo">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Reading stats</Tab>
        <Tab value="1">Locations</Tab>
        <Tab value="2">Author stats</Tab>
        <Tab value="3">Tag stats</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <v-chart class="chart" :option="timeOptions" autoresize />
        </TabPanel>
        <TabPanel value="1">
          <v-chart class="chart" :option="locationOptions" autoresize />
        </TabPanel>
        <TabPanel value="2">
          <v-chart class="chart" :option="authorRatingOptions" autoresize />
          <v-chart class="chart" :option="authorCountOptions" autoresize />
        </TabPanel>
        <TabPanel value="3">
          <v-chart class="chart" :option="faveSemeOptions" autoresize />
          <v-chart class="chart" :option="faveUkeOptions" autoresize />
          <v-chart class="chart" :option="faveSetteiOptions" autoresize />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped>
.chart {
  height: 50vh;
  width: 100vw;
}
</style>
