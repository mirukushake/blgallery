<script setup lang="ts">
import { watch, ref, defineEmits, defineProps } from "vue"
import { bookListStore, filterStore } from "../store"
import { LocaleName } from "../models/models"
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
dayjs.extend(isBetween)

const { t, locale } = useI18n({ useScope: "global" })
const store = bookListStore()
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
const { metadata } = storeToRefs(store)

interface Props {
  count: number
}

const prop = defineProps<Props>()
const count = ref(prop.count)

watch(
  () => prop.count,
  () => {
    count.value = prop.count
    console.log(prop.count)
  }
)
</script>

<template>
  <Panel toggleable class="mb-10" :collapsed="true">
    <template #header>
      <span class="flex flex-wrap items-center md:flex-nowrap">
        <IconField class="">
          <InputIcon class="pi pi-search" />
          <InputText v-model="keyword" placeholder="Search" class="w-10/12" />
        </IconField>
        <span>{{ count }} results</span>
      </span>
    </template>
    <div class="mt-4 flex flex-col">
      <div class="flex mb-4 gap-4">
        <div class="flex items-center">
          Newest first <ToggleSwitch v-model="newest" class="ml-4" />
        </div>
        <div class="flex items-center">
          Month's reading <ToggleSwitch v-model="monthReading" class="ml-4" />
        </div>
      </div>
      <span class="flex flex-wrap lg:flex-nowrap gap-4"
        ><MultiSelect
          v-model="selectedTone"
          display="chip"
          :options="metadata?.tone"
          option-value="id"
          :option-label="locale === 'ja' ? 'ja' : 'en'"
          filter
          placeholder="Select tone"
          class="w-full lg:w-6/12 mb-4" />
        <MultiSelect
          v-model="selectedSettei"
          display="chip"
          :options="metadata?.settei"
          option-value="id"
          :option-label="locale === 'ja' ? 'ja' : 'en'"
          filter
          placeholder="Select tropes/settings"
          class="w-full lg:w-6/12 mb-4"
      /></span>
      <span class="flex flex-wrap lg:flex-nowrap gap-4">
        <MultiSelect
          v-model="selectedSeme"
          display="chip"
          :options="metadata?.seme"
          option-value="id"
          :option-label="locale === 'ja' ? 'ja' : 'en'"
          filter
          placeholder="Select seme traits"
          class="w-full lg:w-6/12 mb-4"
        />
        <MultiSelect
          v-model="selectedUke"
          display="chip"
          :options="metadata?.uke"
          option-value="id"
          :option-label="locale === 'ja' ? 'ja' : 'en'"
          filter
          placeholder="Select uke traits"
          class="w-full lg:w-6/12 mb-4"
        />
        <MultiSelect
          v-model="selectedPlay"
          display="chip"
          :options="metadata?.play"
          option-value="id"
          :option-label="locale === 'ja' ? 'ja' : 'en'"
          filter
          placeholder="Select play"
          class="w-full lg:w-6/12 mb-4"
        />
        <MultiSelect
          v-model="selectedTags"
          display="chip"
          :options="metadata?.tags"
          option-value="id"
          :option-label="locale === 'ja' ? 'ja' : 'en'"
          filter
          placeholder="Select tags"
          class="w-full lg:w-6/12 mb-4"
        />
      </span>

      <div class="flex flex-wrap w-full lg:w-6/12 mb-4">
        <span
          v-for="item of metadata?.status"
          key="id"
          class="flex items-center mr-4"
        >
          <Checkbox v-model="selectedStatus" :value="item.id" />
          <label for="item" class="ml-1">{{
            item[locale as keyof LocaleName]
          }}</label>
        </span>
      </div>
    </div>
  </Panel>
</template>
