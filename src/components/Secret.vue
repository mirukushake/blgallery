<script setup lang="ts">
import { ref } from "vue"
import { supabase } from "../plugins/supabase"
import router from "../router"
import { userSessionStore } from "../store"
const userSession = userSessionStore()

const email = ref<string>("")
const password = ref<string>("")
const loading = ref(false)

const handleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
  } catch (error: any) {
    alert(error.message)
  } finally {
    router.push("/addbook")
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error: any) {
    alert(error.message)
  } finally {
    userSession.session = null
    router.push("/")
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <form
        class="p-6 space-y-4 md:space-y-6 sm:p-8"
        @submit.prevent="handleLogin"
        v-if="!userSession.session"
      >
        <h1 class="text-xl font-bold">Sign in</h1>
        <FloatLabel>
          <InputText id="email" v-model="email" />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel>
          <Password
            id="password"
            v-model="password"
            toggleMask
            :feedback="false"
          />
          <label for="password">Password</label>
        </FloatLabel>
        <Button label="Log in" type="submit" />
      </form>
      <Button
        v-else="userSession.session"
        label="Log out"
        @click="signOut"
        class="m-6 items-center"
      />
    </div>
  </div>
</template>
