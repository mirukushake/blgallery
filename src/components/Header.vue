<script setup lang="ts">
import { computed } from 'vue'
import { userSessionStore } from '../store'
import { useI18n } from 'vue-i18n'
import { supabase } from '../plugins/supabase'

import type { NavigationMenuItem } from '@nuxt/ui'
const { locale } = useI18n({ useScope: 'global' })
const userSession = userSessionStore()

supabase.auth.onAuthStateChange((event, session) => {
	userSession.session = session
})

// const changeLocale = () => {
//   if (locale.value === "en") {
//     locale.value = "ja"
//   } else {
//     locale.value = "en"
//   }
// }

const items = computed<NavigationMenuItem[]>(() => [
	{ label: 'All BL', to: '/' },
	{ label: 'Manga', to: '/manga' },
	{ label: 'Novels', to: '/novels' },
])
</script>

<template>
	<UHeader :toggle="false">
		<template #left>
			<UNavigationMenu :items="items" />
		</template>
		<!-- <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template> -->
		<template #right>
			<UTooltip text="Add a book">
				<UButton
					color="neutral"
					variant="ghost"
					to="/addbook"
					icon="lucide-circle-plus" />
			</UTooltip>
			<!-- <UTooltip text="Change ">
          <UButton
            color="neutral"
            variant="ghost"
            to="/add"
            icon="tabler-circle-plus"
          />
        </UTooltip> -->
		</template>
	</UHeader>
</template>
