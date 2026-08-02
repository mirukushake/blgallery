<script setup lang="ts">
import { computed, ref } from 'vue'
import { bookListStore, userSessionStore } from './store'
import { useI18n } from 'vue-i18n'
import { supabase } from './plugins/supabase'
import Header from './components/Header.vue'

const store = bookListStore()
const userSession = userSessionStore()
store.getBooks()

supabase.auth.onAuthStateChange((event, session) => {
	userSession.session = session
})
</script>

<template>
	<UApp>
		<Header />
		<UMain>
			<router-view></router-view>
		</UMain>
	</UApp>
</template>
