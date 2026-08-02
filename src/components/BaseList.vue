<script setup lang="ts">
import { ref, computed, defineAsyncComponent, watch, useTemplateRef } from 'vue'
import {
	breakpointsTailwind,
	useBreakpoints,
	useElementSize,
} from '@vueuse/core'
import {
	Authors,
	Book,
	Play,
	Seme,
	Uke,
	Settei,
	Tags,
	Tone,
	LocaleName,
} from '../models/models'
import BookTest from './BookTest.vue'
import { bookListStore, filterStore } from '../store'
import { storeToRefs } from 'pinia'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useRoute } from 'vue-router'
dayjs.extend(isBetween)

const { t, locale } = useI18n({ useScope: 'global' })
const breakpoints = useBreakpoints(breakpointsTailwind)

interface Props {
	storeName: string
}

const prop = defineProps<Props>()

const books = ref<Book[]>([])

const store = bookListStore()
const { records, mangaOnly, novelsOnly, wishlist, loading } = storeToRefs(store)
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

const route = useRoute()
watch(
	() => route,
	() => {
		if (prop.storeName === 'all') {
			books.value = records.value
		}

		if (prop.storeName === 'manga') {
			books.value = mangaOnly.value
		}

		if (prop.storeName === 'novels') {
			books.value = novelsOnly.value
		}

		if (prop.storeName === 'wishlist') {
			books.value = wishlist.value
		}
	},
	{ flush: 'pre', immediate: true, deep: true },
)

const BookInfo = defineAsyncComponent(
	() => import('../components/BookInfo.vue'),
)

const filteredBooks = computed(() => {
	return books.value
		.filter(
			(book: Book) =>
				book.title.toLowerCase().includes(keyword.value.toLowerCase()) ||
				(book.authors
					? book.authors.some((author: Authors) =>
							author.name.toLowerCase().includes(keyword.value.toLowerCase()),
						)
					: false),
		)
		.filter(
			(item: Book) =>
				!selectedTone.value.length ||
				item.tone?.some((b: Tone) => selectedTone.value.includes(b.id)),
		)
		.filter(
			(item: Book) =>
				!selectedSeme.value.length ||
				item.seme?.some((b: Seme) => selectedSeme.value.includes(b.id)),
		)
		.filter(
			(item: Book) =>
				!selectedUke.value.length ||
				item.uke?.some((b: Uke) => selectedUke.value.includes(b.id)),
		)
		.filter(
			(item: Book) =>
				!selectedSettei.value.length ||
				item.settei?.some((b: Settei) => selectedSettei.value.includes(b.id)),
		)
		.filter(
			(item: Book) =>
				!selectedTags.value.length ||
				item.tags?.some((b: Tags) => selectedTags.value.includes(b.id)),
		)
		.filter(
			(item: Book) =>
				!selectedPlay.value.length ||
				item.play?.some((b: Play) => selectedPlay.value.includes(b.id)),
		)
		.filter(
			(item: Book) =>
				!selectedStatus.value.length ||
				selectedStatus.value.includes(item.status_id),
		)
		.filter(
			(item: Book) =>
				monthReading.value === false ||
				(item.read &&
					dayjs(item.read[0]).isBetween(
						`${dayjs().year()}-${dayjs().month() + 1}-01`,
						`${dayjs().year()}-${dayjs().month() + 1}-${dayjs().daysInMonth()}`,
						'day',
						'[]',
					)),
		)
		.sort((a: Book, b: Book) => {
			if (newest.value === true) {
				return b.added.localeCompare(a.added)
			}
			return 0
		})
})

const statusColor = (status: number) => {
	switch (status) {
		case 2:
			return 'warning'
		case 1:
			return 'neutral'
		case 4:
			return 'success'
		case 5:
			return 'error'
		case 3:
			return 'info'
	}
}

const scrollArea = useTemplateRef('scrollArea')
const { width } = useElementSize(() => scrollArea.value?.$el)
const lanes = computed(() =>
	Math.max(1, Math.min(4, Math.floor(width.value / 300))),
)

const selectedBook = ref<Book>()
const overlay = useOverlay()
const modal = overlay.create(BookTest)

async function showBookInfo(info: Book) {
	modal.open({
		selectedBook: info,
	})
}

useHead({
	title: "mirukushake's BL collection",
})
</script>

<template>
	<UScrollArea
		ref="scrollArea"
		v-slot="{ item, index }"
		:items="filteredBooks"
		:virtualize="{
      lanes: lanes,
      gap: 16,
    }"
		class="w-full h-full p-4">
		<UCard
			:ui="{
        body: 'p-0 sm:p-0 flex flex-row items-center',
      }"
			class="hover:drop-shadow-md"
			@click="showBookInfo(item)">
			<div class="flex-none w-24">
				<span v-if="item.cover"
					><img
						:alt="`${item.title} cover`"
						v-lazy="`${item.cover.replace(/\.[^/.]+$/, '')}_thumb.jpeg`"
						class="w-full object-cover object-top-right rounded-l-lg h-32"></span
				>
				<span v-else
					><div
						class="object-cover object-center h-32 w-full flex justify-center items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							class="size-16 text-neutral-200">
							<g
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2">
								<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
								<circle cx="9" cy="9" r="2" />
								<path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
							</g>
						</svg>
					</div></span
				>
			</div>
			<div class="p-2 flex-auto">
				<div class="flex items-center">
					<UBadge
						size="sm"
						variant="outline"
						class="mr-2"
						:color="item.manga === false ? 'secondary' : 'info'"
						>{{ item.manga === false ? t("novel") : t("manga") }}</UBadge
					>
					<UBadge
						size="sm"
						variant="outline"
						:color="statusColor(item.status_id)"
						>{{ item.status[locale as keyof LocaleName] }}</UBadge
					>
					<span v-if="item.rating" class="flex items-center text-sm">
						<UIcon
							class="ml-2 mr-0.5 size-4 text-yellow-300"
							name="tabler-star-filled" />{{ item.rating }}
					</span>
				</div>
				<div class="font-bold text-sm mt-2">
					{{ item.title }}
				</div>
				<div class="text-neutral-500 text-xs">
					<span
						v-if="item.authors"
						v-for="(author, index) in item.authors.sort(
              (a: any, b: any) => a.order - b.order,
            )"
						:class="{ 'ml-2': index > 0 }"
						>{{ author.name }}</span
					>
				</div>
			</div>
		</UCard>
	</UScrollArea>
	<!-- <div
    class="flex items-center justify-center min-h-screen p-5 min-w-screen"
    v-if="loading === true"
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
        <div v-for="(item, index) in slotProps.items" :key="index" class="">
          <Card
            class="h-full hover:shadow-md cursor-pointer"
            @click="showBookInfo(item)"
          >
            <template #header
              ><span v-if="item.cover"
                ><img
                  :alt="`${item.title.ja} cover`"
                  v-lazy="`${item.cover.replace(/\.[^/.]+$/, '')}_thumb.jpeg`"
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
  <ScrollTop /> -->
</template>

<style scoped></style>
