<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
const options = ref([
	{
		label: 'In progress',
		value: false,
	},
	{
		label: 'Completed',
		value: true,
	},
])
</script>

<template>
	<div class="p-6">
		<dl>
			<dt class="text-sm text-gray-400 uppercase">Series</dt>
			<UInput class="mb-4" v-model="name" />
			<dt class="text-sm text-gray-400 uppercase">Status</dt>
			<URadioGroup
				orientation="horizontal"
				variant="list"
				:default-value="false"
				:items="options" />
		</dl>
		<UButton label="Submit" class="mt-4" />
	</div>
</template>
