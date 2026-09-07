<script setup lang="ts">
import { watch, ref } from 'vue'
import { bookListStore, filterStore } from '../store'
import { LocaleName } from '../models/models'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const { t, locale } = useI18n({ useScope: 'global' })
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
	},
)
</script>

<template>
	<UCard
		class=""
		:ui="{
        body: 'p-4 sm:p-4',
      }">
		<div class="flex flex-row justify-between items-center">
			<div class="w-8/12">
				<UInput
					v-model="keyword"
					class="w-full"
					type="search"
					icon="lucide-search" />
			</div>
			<div class="text-sm">{{ count }} volumes</div>
		</div>
	</UCard>
</template>
