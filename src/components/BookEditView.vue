<script setup lang="ts">
import { KeepAlive, ref, shallowRef, toRef } from 'vue'
import {
	Book,
	LocaleName,
	Series,
	Authors,
	MetadataAuthors,
	UpdatedBook,
	Seme,
	Uke,
	Settei,
	Tone,
	Play,
	Tags,
} from '../models/models'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })
import {
	CalendarDate,
	parseDate,
	today,
	getLocalTimeZone,
} from '@internationalized/date'

import { storeToRefs } from 'pinia'
import { bookListStore, userSessionStore, filterStore } from '../store'
import { cloneDeep } from 'lodash'
const store = bookListStore()
const search = filterStore()
const { apiFetch } = store
const { records, metadata } = storeToRefs(store)
const { keyword } = storeToRefs(search)
const userSession = userSessionStore()

const props = defineProps<{
	book: Book
}>()

const emit = defineEmits<{ editView: [boolean] }>()

const data = ref<Book>(Object.assign({}, props.book))
const editBookOriginal = ref()
const editBookUpdated = ref()
const defaultDate = shallowRef(today('Asia/Tokyo'))

const { status, location, series, label, author_sort, ...updatedObj } =
	data.value

const format = {
	...updatedObj,
	authors: data.value.authors
		? data.value.authors.map((t: Authors) => t.id)
		: null,
	read: data.value.read ? parseDate(data.value.read[0]) : null,
	published: data.value.published ? parseDate(data.value.published) : null,
	seme: data.value.seme ? data.value.seme.map((t: Seme) => t.id) : null,
	uke: data.value.uke ? data.value.uke.map((t: Uke) => t.id) : null,
	settei: data.value.settei ? data.value.settei.map((t: Settei) => t.id) : null,
	tone: data.value.tone ? data.value.tone.map((t: Tone) => t.id) : null,
	play: data.value.play ? data.value.play.map((t: Play) => t.id) : null,
	tags: data.value.tags ? data.value.tags.map((t: Tags) => t.id) : null,
}

editBookOriginal.value = cloneDeep(format)
editBookUpdated.value = cloneDeep(format)

const medium = [
	{
		label: t('manga'),
		value: true,
	},
	{
		label: t('novel'),
		value: false,
	},
]
</script>

<template>
	<div class="flex flex-col md:flex-row w-full mb-6 pr-5">
		<div class="w-full md:min-w-3/12 md:w-4/12 md:mr-8">
			<div v-if="book.cover" class="w-full">
				<img
					alt="book cover"
					:src="book.cover"
					class="object-contain md:object-top w-full h-96 md:h-auto">
			</div>
			<div
				v-else
				class="object-cover object-center h-32 w-full flex justify-center items-center">
				<!-- biome-ignore lint/a11y/noSvgWithoutTitle: came like this -->
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
			</div>
			<span class="flex mt-2 sm:float-right">
				<UButton
					v-if="book.chil_url"
					class=""
					trailing-icon="lucide-external-link"
					size="sm"
					variant="outline"
					>ちるちる
				</UButton>
				<UButton
					label="Save"
					size="sm"
					color="success"
					class="ml-2"
					@click="() => emit('editView', false)" />
				<UButton
					icon="lucide-x"
					size="sm"
					color="error"
					class="ml-2"
					@click="() => emit('editView', false)" />
			</span>
		</div>
		<div class="text-wrap">
			<dl class="text-sm">
				<dt class="text-xs text-gray-400 uppercase">title</dt>
				<dd class="font-bold mb-4">
					<UInput v-model="editBookUpdated.title" />
				</dd>

				<dt class="text-xs text-gray-400 uppercase">author(s)</dt>
				<dd class="mb-4">
					<UInputMenu
						v-model="editBookUpdated.authors"
						multiple
						value-key="id"
						label-key="name"
						:items="metadata?.authors"
						:ui="{ content: 'min-w-fit' }" />
				</dd>
			</dl>
			<div class="text-sm">
				<dl>
					<dt class="text-xs text-neutral-400 uppercase">Series</dt>
					<dd class="flex mb-4">
						<USelectMenu
							clear
							v-model="editBookUpdated.series_id"
							value-key="id"
							label-key="ja"
							:items="metadata?.series"
							:ui="{ content: 'min-w-fit' }"
							class="w-48" />
						<KeepAlive
							><UPopover :arrow="true">
								<UButton
									icon="lucide-plus"
									color="neutral"
									variant="subtle"
									class="ml-2 mr-4" />

								<template #content>
									<NewSeries />
								</template>
							</UPopover>
						</KeepAlive>

						<UInputNumber
							class="w-10"
							v-model="editBookUpdated.series_no"
							placeholder="#"
							:increment="false"
							:decrement="false" />
					</dd>
				</dl>
				<span class="flex">
					<dl class="mr-6">
						<dt class="text-xs text-neutral-400 uppercase">Medium</dt>
						<dd class="mb-4">
							<URadioGroup
								orientation="horizontal"
								variant="list"
								:items="medium"
								v-model="editBookUpdated.manga" />
						</dd>
					</dl>
					<dl class="mr-6">
						<dt class="text-xs text-neutral-400 uppercase">Label</dt>
						<dd class="mb-4">
							<USelectMenu
								v-model="editBookUpdated.label_id"
								value-key="id"
								label-key="ja"
								:items="metadata?.labels"
								:ui="{ content: 'min-w-fit' }"
								class="w-48" />
						</dd>
					</dl>
					<dl>
						<dt class="text-xs text-neutral-400 uppercase">Published</dt>
						<dd class="mb-4">
							<UPopover>
								<UButton
									color="neutral"
									variant="outline"
									icon="i-lucide-calendar">
									{{ editBookUpdated.published ? editBookUpdated.published : 'Select a date' }}
								</UButton>

								<template #content>
									<UCalendar
										v-model="editBookUpdated.published"
										:default-value="defaultDate"
										class="p-2" />
								</template>
							</UPopover>
						</dd>
					</dl>
				</span>
			</div>
			<div class="flex flex-wrap gap-x-6 text-sm">
				<dl class="">
					<dt class="text-xs text-neutral-400 uppercase">status</dt>
					<dd class="mb-4 flex items-center">
						<USelect
							v-model="editBookUpdated.status_id"
							value-key="id"
							label-key="en"
							:items="metadata?.status"
							:ui="{ content: 'min-w-fit' }"
							class="w-24" />
					</dd>
				</dl>
				<dl class="">
					<dt class="text-xs text-neutral-400 uppercase">rating</dt>
					<dd class="mb-4 flex items-center">
						<UInputNumber
							class="w-12"
							v-model="editBookUpdated.series_no"
							:min="0"
							:max="5"
							:step="0.5"
							:increment="false"
							:decrement="false" />
					</dd>
				</dl>
				<dl class="">
					<dt class="text-xs text-neutral-400 uppercase">location</dt>
					<dd class="mb-4" v-if="book.location">
						<USelect
							v-model="editBookUpdated.location_id"
							value-key="id"
							label-key="ja"
							:items="metadata?.locations"
							:ui="{ content: 'min-w-fit' }"
							class="w-36" />
					</dd>
				</dl>
				<dl class="">
					<dt class="text-xs text-neutral-400 uppercase">date added</dt>
					<dd class="mb-4">{{ book.added }}</dd>
				</dl>
				<dl class="">
					<dt class="text-xs text-neutral-400 uppercase">date read</dt>
					<dd class="mb-4">
						<UPopover>
							<UButton
								color="neutral"
								variant="outline"
								icon="i-lucide-calendar">
								{{ editBookUpdated.read ? editBookUpdated.read : 'Select date' }}
							</UButton>

							<template #content>
								<UCalendar
									v-model="editBookUpdated.read"
									:default-value="defaultDate"
									class="p-2" />
							</template>
						</UPopover>
					</dd>
				</dl>
			</div>
			<div class="text-sm">
				<dt class="text-xs text-gray-400 uppercase">seme</dt>
				<dd class="">
					<UInputMenu
						v-model="editBookUpdated.seme"
						multiple
						value-key="id"
						label-key="ja"
						:items="metadata?.seme"
						:ui="{ content: 'min-w-fit', tagsInput: 'w-10' }" />
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-2">uke</dt>
				<dd class="">
					<UInputMenu
						v-model="editBookUpdated.uke"
						multiple
						value-key="id"
						label-key="ja"
						:items="metadata?.uke"
						:ui="{ content: 'min-w-fit', tagsInput: 'w-10' }" />
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-3">Setting/tropes</dt>
				<dd class="">
					<UInputMenu
						v-model="editBookUpdated.settei"
						multiple
						value-key="id"
						label-key="ja"
						:items="metadata?.settei"
						:ui="{ content: 'min-w-fit', tagsInput: 'w-10' }" />
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-3">Tone</dt>
				<dd class="">
					<UInputMenu
						v-model="editBookUpdated.tone"
						multiple
						value-key="id"
						label-key="ja"
						:items="metadata?.tone"
						:ui="{ content: 'min-w-fit', tagsInput: 'w-10' }" />
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-3">Play</dt>
				<dd class="">
					<UInputMenu
						v-model="editBookUpdated.play"
						multiple
						value-key="id"
						label-key="ja"
						:items="metadata?.play"
						:ui="{ content: 'min-w-fit', tagsInput: 'w-10' }" />
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-3">Tags</dt>
				<dd class="">
					<UInputMenu
						v-model="editBookUpdated.tags"
						multiple
						value-key="id"
						label-key="ja"
						:items="metadata?.tags"
						:ui="{ content: 'min-w-fit', tagsInput: 'w-10' }" />
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-4">Notes</dt>
				<dd class="">
					<UTextarea
						v-model="editBookUpdated.notes"
						:rows="5"
						class="w-full" />
				</dd>
			</div>
		</div>
	</div>
</template>
