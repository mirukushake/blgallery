<script setup lang="ts">
import { ref, Ref, inject } from "vue"
import { Dialog, Book } from "../../models/models"
import { useI18n } from "vue-i18n"

const { t, locale } = useI18n({ useScope: "global" })

interface LocaleName {
  ja: string
  en: string
}

const dialogRef = inject<Ref<Dialog>>("dialogRef")
const record = ref<Book | null>(null)

record.value = dialogRef?.value.data!
</script>

<template>
  <div class="flex flex-row w-full mb-6" v-if="record">
    <div class="w-4/12 mr-8">
      <div v-if="record.cover">
        <img alt="book cover" :src="record.cover" class="object-top w-full" />
      </div>
      <div v-else>
        <span
          ><div
            class="object-cover object-top h-48 w-full flex justify-center items-center"
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
            </svg></div
        ></span>
      </div>
    </div>

    <div class="text-wrap">
      <dl>
        <dt class="text-sm text-gray-400 uppercase">title</dt>
        <dd class="font-bold mb-4 text-lg">{{ record.title }}</dd>

        <dt class="text-sm text-gray-400 uppercase">author(s)</dt>
        <dd class="mb-4">
          <span
            v-for="(author, index) in record.authors"
            :class="{ 'ml-2': index > 0 }"
            >{{ author.name }}</span
          >
        </dd>
        <span v-if="record.series">
          <dt class="text-sm text-gray-400 uppercase">series</dt>
          <dd class="mb-4">{{ record.series }} {{ record.series_no }}</dd>
        </span>
        <span class="flex">
          <span class="mr-6">
            <dt class="text-sm text-gray-400 uppercase">type</dt>
            <dd class="mb-4">
              {{ record.type === false ? t("novel") : t("manga") }}
            </dd>
          </span>
          <span class="mr-6">
            <dt class="text-sm text-gray-400 uppercase">label</dt>
            <dd class="mb-4">{{ record.label }}</dd>
          </span>
          <span>
            <dt class="text-sm text-gray-400 uppercase">published</dt>
            <dd class="mb-4">{{ record.published }}</dd>
          </span>
        </span>
        <span>
          <span class="flex">
            <span class="mr-6">
              <dt class="text-sm text-gray-400 uppercase">status</dt>
              <dd class="mb-4">
                {{ record.status![locale as keyof LocaleName] }}
                <span v-if="record.rating" class="ml-1"
                  ><i class="pi pi-star-fill text-yellow-400"></i>
                  {{ record.rating }}</span
                >
              </dd>
            </span>
            <span class="">
              <dt class="text-sm text-gray-400 uppercase">date added</dt>
              <dd class="mb-4">{{ record.added }}</dd>
            </span>
            <span v-if="record.read" class="ml-6">
              <dt class="text-sm text-gray-400 uppercase">date read</dt>
              <!-- change to simple array later -->
              <dd class="mb-4">{{ record.read[0].read_date }}</dd>
            </span>
          </span>
          <dt class="text-sm text-gray-400 uppercase">seme</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.seme"
              severity="secondary"
              :class="{ 'ml-2': index > 0 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">uke</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.uke"
              severity="secondary"
              :class="{ 'ml-2': index > 0 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">setting/tropes</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.settei"
              severity="secondary"
              :class="{ 'ml-2': index > 0 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">tone</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.tone"
              severity="secondary"
              :class="{ 'ml-2': index > 0 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">play</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.play"
              severity="secondary"
              :class="{ 'ml-2': index > 0 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">other tags</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.tags"
              severity="secondary"
              :class="{ 'ml-2': index > 0 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">notes</dt>
          <dd class="">{{ record.notes }}</dd>
        </span>
      </dl>
    </div>
  </div>
</template>
