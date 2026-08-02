<script setup lang="ts">
import { Book } from '../models/models'
import { ref } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mobileDialog = breakpoints.smaller('sm')

const editView = ref(false)

defineProps<{
	selectedBook: Book
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
	<UModal
		:title="selectedBook.title"
		:fullscreen="mobileDialog"
		:ui="{
      content: 'p-6',
    }">
		<template #content>
			<div class="absolute right-5 top-5">
				<UButton
					icon="lucide-x"
					size="sm"
					color="neutral"
					variant="ghost"
					@click="() => emit('close', false)" />
			</div>
			<BookView
				:book="selectedBook"
				@edit-view="editView = $event"
				v-if="editView === false" />
			<BookEditView
				v-else
				:book="selectedBook"
				@edit-view="editView = $event" />
		</template>
	</UModal>
</template>
