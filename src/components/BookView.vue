<script setup lang="ts">
import { Book, LocaleName, Authors } from '../models/models'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })

defineProps<{
	book: Book
}>()

const emit = defineEmits<{ editView: [boolean] }>()
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
				<!-- biome-ignore lint/a11y/noSvgWithoutTitle: came this way -->
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
					>ちるちる</UButton
				>
				<UButton
					icon="lucide-edit-2"
					size="sm"
					variant="outline"
					class="ml-2"
					@click="() => emit('editView', true)" /></span
			>
		</div>
		<div class="text-wrap">
			<div class="font-bold text-lg">{{ book.title }}</div>
			<div class="mb-4">
				<span
					v-if="book.authors"
					v-for="(author, index) in book.authors?.sort(
            (a: Authors, b: Authors) => a.order - b.order,
          )"
					:class="{ 'ml-2': index > 0 }"
					>{{ author.name }}</span
				>
			</div>
			<div class="text-sm">
				<dl v-if="book.series">
					<dt class="text-xs text-neutral-400 uppercase">Series</dt>
					<dd class="mb-4">{{ book.series.ja }}#{{ book.series_no }}</dd>
				</dl>
				<span class="flex">
					<dl class="mr-6">
						<dt class="text-xs text-neutral-400 uppercase">Medium</dt>
						<dd class="mb-4">
							{{ book.manga === false ? t("novel") : t("manga") }}
						</dd>
					</dl>
					<dl class="mr-6">
						<dt class="text-xs text-neutral-400 uppercase">Label</dt>
						<dd class="mb-4" v-if="book.label">
							{{ book.label?.ja }}
						</dd>
					</dl>
					<dl>
						<dt class="text-xs text-neutral-400 uppercase">Published</dt>
						<dd class="mb-4">{{ book.published }}</dd>
					</dl>
				</span>
			</div>
			<div class="flex flex-wrap gap-x-6 text-sm">
				<dl class="">
					<dt class="text-xs text-neutral-400 uppercase">status</dt>
					<dd class="mb-4 flex items-center">
						{{ book.status[locale as keyof LocaleName] }}
						<span v-if="book.rating" class="flex items-center ml-1"
							><UIcon
								class="mr-0.5 size-4 text-yellow-300"
								name="tabler-star-filled" />{{ book.rating }}</span
						>
					</dd>
				</dl>
				<dl class="">
					<dt class="text-xs text-neutral-400 uppercase">location</dt>
					<dd class="mb-4" v-if="book.location">
						{{ book.location.ja }}
					</dd>
				</dl>
				<dl class="">
					<dt class="text-xs text-neutral-400 uppercase">date added</dt>
					<dd class="mb-4">{{ book.added }}</dd>
				</dl>
				<dl class="">
					<dt class="text-xs text-neutral-400 uppercase">date read</dt>
					<dd class="mb-4">
						<span
							v-if="book.read"
							v-for="(date, index) in book.read.sort((a: any, b: any) => a - b)"
							:class="{ 'ml-2': index > 0 }"
							>{{ date }}</span
						>
					</dd>
				</dl>
			</div>
			<div class="text-sm">
				<dt class="text-xs text-gray-400 uppercase">seme</dt>
				<dd v-if="book.seme" class="">
					<UBadge
						v-for="(tag, index) in book.seme"
						color="neutral"
						size="md"
						variant="soft"
						:class="{ 'mr-2 mt-1': index !== book.seme.length - 1 }"
						>{{ tag[locale as keyof LocaleName] }}</UBadge
					>
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-2">uke</dt>
				<dd v-if="book.uke" class="">
					<UBadge
						v-for="(tag, index) in book.uke"
						color="neutral"
						size="md"
						variant="soft"
						:class="{ 'mr-2 mt-1': index !== book.uke.length - 1 }"
						>{{ tag[locale as keyof LocaleName] }}</UBadge
					>
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-3">Setting/tropes</dt>
				<dd v-if="book.settei" class="">
					<UBadge
						v-for="(tag, index) in book.settei"
						color="neutral"
						size="md"
						variant="soft"
						:class="{ 'mr-2 mt-1': index !== book.settei.length - 1 }"
						>{{ tag[locale as keyof LocaleName] }}</UBadge
					>
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-3">Tone</dt>
				<dd v-if="book.tone" class="">
					<UBadge
						v-for="(tag, index) in book.tone"
						color="neutral"
						size="md"
						variant="soft"
						:class="{ 'mr-2 mt-1': index !== book.tone.length - 1 }"
						>{{ tag[locale as keyof LocaleName] }}</UBadge
					>
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-3">Play</dt>
				<dd v-if="book.play" class="">
					<UBadge
						v-for="(tag, index) in book.play"
						color="neutral"
						size="md"
						variant="soft"
						:class="{ 'mr-2 mt-1': index !== book.play.length - 1 }"
						>{{ tag[locale as keyof LocaleName] }}</UBadge
					>
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-3">Tags</dt>
				<dd v-if="book.tags" class="">
					<UBadge
						v-for="(tag, index) in book.tags"
						color="neutral"
						size="md"
						variant="soft"
						:class="{ 'mr-2 mt-1': index !== book.tags.length - 1 }"
						>{{ tag[locale as keyof LocaleName] }}</UBadge
					>
				</dd>
				<dt class="text-xs text-gray-400 uppercase mt-4">Notes</dt>
				<dd v-if="book.notes" class="">
					{{ book.notes }}
				</dd>
			</div>
		</div>
	</div>
</template>
